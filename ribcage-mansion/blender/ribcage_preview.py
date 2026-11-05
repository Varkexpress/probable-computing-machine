"""
The Ribcage - Blender preview scene
===================================

Builds the whole mansion exterior in Blender with exactly the same numbers the
Roblox builder uses (roblox/src/ReplicatedStorage/Shared/Arch.luau), so you can
look at it, light it, or use it as a reference / thumbnail for your game page.

Run it from Blender's Scripting tab (Open > Run Script), or:
    blender --background --python blender/ribcage_preview.py -- --render

With --render it also renders docs/preview_*.png (Cycles, CPU).

Units: 1 Blender unit = 1 Roblox stud.
Axes: Roblox (x, y, z) -> Blender (x, -z, y), so the ribs hang toward Blender +Y.
"""

import math
import os
import random
import sys

import bpy  # import bpy before bmesh (needed when run outside Blender)
import bmesh
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__)) if "__file__" in globals() else os.getcwd()
sys.path.insert(0, HERE)
import ribcage_assets as assets  # noqa: E402

# Same values as Arch.luau
A, B, W, T = 280.0, 220.0, 36.0, 28.0
SEGMENTS = 160
HABITAT_HALF = 112
RIB_COUNT = 24
RIB_T_MIN, RIB_T_MAX = 0.1 * math.pi, 0.9 * math.pi


def rb(x, y, z):
    """Roblox coordinates -> Blender coordinates."""
    return Vector((x, -z, y))


def point(t):
    return A * math.cos(t), B * math.sin(t)


def normal(t):
    nx, ny = B * math.cos(t), A * math.sin(t)
    l = math.hypot(nx, ny)
    return nx / l, ny / l


def build_spine(concrete):
    bm = bmesh.new()
    rings = []
    steps = SEGMENTS * 2
    for i in range(steps + 1):
        t = math.pi * i / steps
        px, py = point(t)
        nx, ny = normal(t)
        ring = []
        for (sz, sn) in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
            x = px + nx * sn * T / 2
            y = py + ny * sn * T / 2
            ring.append(bm.verts.new(rb(x, y, sz * W / 2)))
        rings.append(ring)
    for i in range(steps):
        a, b = rings[i], rings[i + 1]
        for k in range(4):
            k2 = (k + 1) % 4
            bm.faces.new((a[k], a[k2], b[k2], b[k]))
    # Legs down into the sea.
    for side in (-1, 1):
        bmesh.ops.create_cube(bm, size=1.0, matrix=_box_matrix(rb(side * A, -22, 0), (T, W, 46)))
    return assets.object_from_bmesh("Spine", bm, concrete, smooth=False)


def _box_matrix(center, size):
    from mathutils import Matrix
    return Matrix.Translation(center) @ Matrix.Diagonal((*size, 1))


def build_window_band(glow):
    """The lit glass gallery inside the crown (glass faces the ribs, Roblox -Z)."""
    bm = bmesh.new()
    steps = 80
    t0 = math.acos(HABITAT_HALF / A)
    prev = None
    for i in range(steps + 1):
        t = t0 + (math.pi - 2 * t0) * i / steps
        px, py = point(t)
        nx, ny = normal(t)
        lo = rb(px - nx * (T / 2 - 2), py - ny * (T / 2 - 2), -W / 2 - 0.2)
        hi = rb(px + nx * (T / 2 - 2), py + ny * (T / 2 - 2), -W / 2 - 0.2)
        cur = (bm.verts.new(lo), bm.verts.new(hi))
        if prev:
            bm.faces.new((prev[0], cur[0], cur[1], prev[1]))
        prev = cur
    return assets.object_from_bmesh("GalleryGlass", bm, glow, smooth=False)


def build_ribs(concrete):
    rib = assets.build_rib()
    rib.data.materials.clear()
    rib.data.materials.append(concrete)
    rib.hide_render = True
    rib.hide_viewport = True
    for i in range(RIB_COUNT):
        t = RIB_T_MIN + (RIB_T_MAX - RIB_T_MIN) * i / (RIB_COUNT - 1)
        px, py = point(t)
        nx, ny = normal(t)
        ax = px + nx * (T / 2 - 3)
        ay = py + ny * (T / 2 - 3)
        az = -W / 2 + 3
        down = ay * 0.58
        out = 18 + 78 * math.sin(t) ** 1.3
        center = rb(ax, ay - down / 2, az - out / 2)
        inst = bpy.data.objects.new(f"Rib{i:02d}", rib.data)
        bpy.context.collection.objects.link(inst)
        inst.location = center
        # Rib mesh is a unit box; Blender axes: X thin, Y outward, Z down.
        inst.scale = (6, out, down)


def build_sea(water_mat, ice_mat):
    bpy.ops.mesh.primitive_plane_add(size=6000, location=(0, 0, 0))
    sea = bpy.context.active_object
    sea.name = "Sea"
    sea.data.materials.append(water_mat)
    rng = random.Random(2024)
    for _ in range(260):
        ang = rng.uniform(0, 2 * math.pi)
        dist = rng.uniform(90, 1400)
        x, z = math.cos(ang) * dist, math.sin(ang) * dist
        if abs(z) < 60 and abs(abs(x) - 280) < 70:
            continue
        r = rng.uniform(3, 9) if rng.random() > 0.15 else rng.uniform(13, 23)
        bpy.ops.mesh.primitive_cylinder_add(vertices=rng.randint(6, 9), radius=r, depth=1.2, location=rb(x, 0.2, z))
        floe = bpy.context.active_object
        floe.scale = (1, rng.uniform(0.6, 1.0), 1)
        floe.rotation_euler.z = rng.uniform(0, math.pi)
        floe.data.materials.append(ice_mat)


def rbox(bm, a, b):
    """Axis-aligned box between two Roblox-space corners."""
    lo = Vector((min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])))
    hi = Vector((max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])))
    c = (lo + hi) / 2
    size = hi - lo
    bmesh.ops.create_cube(bm, size=1.0, matrix=_box_matrix(rb(c.x, c.y, c.z), (size.x, size.z, size.y)))


def build_other_homes(concrete, glow):
    """Simplified shells of the Monolith, the Vertebrae and the Well, using
    the same positions and sizes as the Roblox builders."""
    bm = bmesh.new()
    lit = bmesh.new()
    # The Monolith (origin 40, 0, 700)
    ox, oz = 40, 700
    rbox(bm, (ox - 32, -24, oz - 18), (ox + 32, 220, oz + 18))
    rbox(lit, (ox - 6, 10, oz - 18.4), (ox + 6, 70, oz - 18.1))
    rbox(lit, (ox - 1, 70, oz - 18.4), (ox + 1, 210, oz - 18.1))
    rbox(bm, (ox - 5, 3, oz - 112), (ox + 5, 5, oz - 64))
    # The Vertebrae (origin -700, 0, -420)
    vx, vz = -700, -420
    cubes = [(0, 24, 30), (36, 24, 38), (72, 28, 46), (112, 24, 54), (148, 22, 62)]
    for i, (x0, size, f) in enumerate(cubes):
        x1, half = x0 + size, size / 2
        rbox(bm, (vx + x0, f - 2, vz - half), (vx + x1, f + 18, vz + half))
        rbox(lit, (vx + x0 + 3, f + 3, vz - half - 0.3), (vx + x1 - 3, f + 14, vz - half - 0.1))
        cx = vx + (x0 + x1) / 2
        rbox(bm, (cx - 4, -24, vz - 4), (cx + 4, f - 2, vz + 4))
        if i < len(cubes) - 1:
            nx0, _, nf = cubes[i + 1]
            # Bridge as a sloped box between the two cubes.
            p1, p2 = rb(vx + x1, f + 5, vz), rb(vx + nx0, nf + 5, vz)
            mid = (p1 + p2) / 2
            d = p2 - p1
            from mathutils import Matrix
            rot = d.to_track_quat("X", "Z").to_matrix().to_4x4()
            bmesh.ops.create_cube(bm, size=1.0, matrix=Matrix.Translation(mid) @ rot @ Matrix.Diagonal((d.length, 8, 11, 1)))
    rbox(bm, (vx + 9, 3, vz - 80), (vx + 15, 5, vz - 28))
    # The Well (origin 650, 0, -480)
    wx, wz = 650, -480
    seg = 48
    for i in range(seg):
        a0 = i / seg * 2 * math.pi
        a1 = (i + 1) / seg * 2 * math.pi
        target = lit if i % 4 == 2 else bm
        verts = []
        for (a, r) in ((a0, 38), (a1, 38), (a1, 40), (a0, 40)):
            verts.append((wx + r * math.cos(a), wz + r * math.sin(a)))
        for (y0, y1, tgt) in ((-24, 8, bm), (8, 60, target), (60, 66, bm)):
            vs = [tgt.verts.new(rb(x, y, z)) for (x, z) in verts for y in (y0, y1)]
            # vs pairs: (p0 lo, p0 hi, p1 lo, p1 hi, ...)
            quads = [(0, 2, 3, 1), (2, 4, 5, 3), (4, 6, 7, 5), (6, 0, 1, 7), (1, 3, 5, 7), (0, 6, 4, 2)]
            for q in quads:
                tgt.faces.new([vs[k] for k in q])
    rbox(bm, (wx - 5, 3, wz - 112), (wx + 5, 5, wz - 66))
    assets.object_from_bmesh("OtherHomes", bm, concrete, smooth=False)
    assets.object_from_bmesh("OtherHomesGlow", lit, glow, smooth=False)


def setup_world(mood):
    scene = bpy.context.scene
    world = scene.world or bpy.data.worlds.new("World")
    scene.world = world
    world.use_nodes = True
    nt = world.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputWorld")
    bg = nt.nodes.new("ShaderNodeBackground")
    vol = nt.nodes.new("ShaderNodeVolumePrincipled")
    if mood == "dawn":
        bg.inputs["Color"].default_value = (0.75, 0.55, 0.55, 1)
        vol.inputs["Color"].default_value = (0.95, 0.75, 0.75, 1)
    else:
        bg.inputs["Color"].default_value = (0.32, 0.4, 0.55, 1)
        vol.inputs["Color"].default_value = (0.65, 0.72, 0.85, 1)
    bg.inputs["Strength"].default_value = 2.2
    vol.inputs["Density"].default_value = 0.0006
    # A low, pale sun behind the fog.
    sun_data = bpy.data.lights.new("Sun", type="SUN")
    sun_data.energy = 2.5 if mood == "dawn" else 1.6
    sun_data.color = (1.0, 0.72, 0.62) if mood == "dawn" else (0.75, 0.82, 1.0)
    sun_data.angle = math.radians(8)
    sun = bpy.data.objects.new("Sun", sun_data)
    bpy.context.collection.objects.link(sun)
    sun.rotation_euler = (math.radians(75), 0, math.radians(200 if mood == "dawn" else 150))
    nt.links.new(bg.outputs["Background"], out.inputs["Surface"])
    # Fog lives in a finite box around the scene, so the sky stays visible.
    nt.nodes.remove(vol)
    fog_mat = bpy.data.materials.new("Fog")
    fog_mat.use_nodes = True
    fnt = fog_mat.node_tree
    fnt.nodes.clear()
    fout = fnt.nodes.new("ShaderNodeOutputMaterial")
    fvol = fnt.nodes.new("ShaderNodeVolumePrincipled")
    fvol.inputs["Color"].default_value = (0.95, 0.78, 0.78, 1) if mood == "dawn" else (0.7, 0.78, 0.9, 1)
    fvol.inputs["Density"].default_value = 0.0009
    fnt.links.new(fvol.outputs["Volume"], fout.inputs["Volume"])
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 150))
    fog = bpy.context.active_object
    fog.name = "FogVolume"
    fog.scale = (2600, 2600, 700)
    fog.data.materials.append(fog_mat)


def add_camera(name, loc, target, lens=35):
    cam_data = bpy.data.cameras.new(name)
    cam_data.lens = lens
    cam_data.clip_end = 8000
    cam = bpy.data.objects.new(name, cam_data)
    bpy.context.collection.objects.link(cam)
    cam.location = loc
    direction = Vector(target) - Vector(loc)
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    return cam


def build(mood="blue"):
    assets.clear_scene()
    concrete = assets.material("Concrete", (0.5, 0.5, 0.49), 0.85)
    glow = assets.material("GalleryGlow", (1.0, 0.7, 0.4), 0.5, emission=(1.0, 0.62, 0.32))
    water = assets.material("Water", (0.01, 0.02, 0.035), 0.04)
    ice = assets.material("Ice", (0.85, 0.9, 0.95), 0.7)
    build_spine(concrete)
    build_window_band(glow)
    build_ribs(concrete)
    build_other_homes(concrete, glow)
    build_sea(water, ice)
    setup_world(mood)
    add_camera("CamHero", rb(-60, 18, -720), rb(0, 110, 0), lens=28)
    add_camera("CamAerial", rb(-620, 520, -760), rb(0, 40, -20), lens=26)
    add_camera("CamUnder", rb(-150, 25, -140), rb(40, 200, -40), lens=20)
    add_camera("CamMonolith", rb(230, 12, 330), rb(40, 120, 700), lens=30)
    add_camera("CamIcon", rb(-30, 30, -470), rb(0, 150, 0), lens=30)
    add_camera("CamVertebrae", rb(-560, 20, -600), rb(-620, 40, -420), lens=26)
    add_camera("CamWell", rb(560, 30, -640), rb(650, 30, -480), lens=26)


def render(prefix, only=None, samples=40, size=(1280, 720)):
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = samples
    scene.cycles.use_denoising = True
    scene.cycles.volume_step_rate = 4
    scene.cycles.max_bounces = 4
    scene.render.resolution_x, scene.render.resolution_y = size
    scene.view_settings.look = "AgX - Medium High Contrast"
    scene.view_settings.exposure = 1.0
    docs = os.path.join(os.path.dirname(HERE), "docs")
    os.makedirs(docs, exist_ok=True)
    for cam in [o for o in scene.objects if o.type == "CAMERA"]:
        if only and cam.name[3:].lower() not in only:
            continue
        scene.camera = cam
        scene.render.filepath = os.path.join(docs, f"{prefix}_{cam.name[3:].lower()}.png")
        bpy.ops.render.render(write_still=True)
        print("rendered", scene.render.filepath)


if __name__ == "__main__":
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
    mood = "dawn" if "--dawn" in argv else "blue"
    build(mood)
    if "--render" in argv:
        only = None
        samples = 40
        size = (1280, 720)
        for arg in argv:
            if arg.startswith("--cams="):
                only = arg[7:].lower().split(",")
            if arg.startswith("--samples="):
                samples = int(arg[10:])
            if arg.startswith("--size="):
                w, h = arg[7:].split("x")
                size = (int(w), int(h))
        render("preview" if mood == "blue" else "preview_dawn", only, samples, size)
    else:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, "ribcage_preview.blend"))
