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
    bg.inputs["Strength"].default_value = 1.4
    vol.inputs["Density"].default_value = 0.0016
    nt.links.new(bg.outputs["Background"], out.inputs["Surface"])
    nt.links.new(vol.outputs["Volume"], out.inputs["Volume"])


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
    build_sea(water, ice)
    setup_world(mood)
    add_camera("CamFront", rb(-40, 40, -760), rb(0, 120, 0), lens=30)
    add_camera("CamAerial", rb(-520, 620, -620), rb(0, 60, -40), lens=30)
    add_camera("CamUnder", rb(-150, 25, -140), rb(40, 200, -40), lens=22)


def render(prefix):
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = 48
    scene.cycles.use_denoising = True
    scene.cycles.volume_step_rate = 4
    scene.cycles.max_bounces = 4
    scene.render.resolution_x = 540
    scene.render.resolution_y = 960
    scene.view_settings.look = "AgX - Medium High Contrast"
    docs = os.path.join(os.path.dirname(HERE), "docs")
    os.makedirs(docs, exist_ok=True)
    for cam in [o for o in scene.objects if o.type == "CAMERA"]:
        scene.camera = cam
        scene.render.filepath = os.path.join(docs, f"{prefix}_{cam.name[3:].lower()}.png")
        bpy.ops.render.render(write_still=True)
        print("rendered", scene.render.filepath)


if __name__ == "__main__":
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
    mood = "dawn" if "--dawn" in argv else "blue"
    build(mood)
    if "--render" in argv:
        render("preview" if mood == "blue" else "preview_dawn")
    else:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, "ribcage_preview.blend"))
