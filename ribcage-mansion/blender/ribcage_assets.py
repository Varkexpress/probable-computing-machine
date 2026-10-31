"""
The Ribcage - Blender asset builder
===================================

Builds the smooth meshes that upgrade the Roblox game's block-built stand-ins:

    Rib        - one curved, tapering concrete rib (used 24 times)
    Cat        - Mochi, the house cat (also used for the adoptable kitten)
    Whale      - the humpback that breaches near the mansion
    Fireplace  - the black suspended "bowl" fireplace from the gallery

How to run
----------
In Blender: open the Scripting workspace, click Open, choose this file, then
Run Script (Alt+P). The meshes appear in the scene and are exported to
blender/exports/ next to this file as .obj and .fbx.

From a terminal:  blender --background --python blender/ribcage_assets.py

Then in Roblox Studio: Avatar > Import 3D (or File > Import 3D), import each
.fbx from blender/exports, and move the imported MeshPart/Model into
ServerStorage > BlenderAssets, keeping the names Rib, Cat, Whale, Fireplace.
Press Play: the game finds them and uses them automatically.

Orientation contract (Roblox space, which the exporter converts to: Y up, -Z forward)
    Rib:        root at the top, +Z edge (where it meets the spine);
                tip at the bottom, -Z edge. The game stretches it to fit.
    Cat/Whale:  head toward Roblox -Z (Blender +Y), back up.
    Fireplace:  flue up, bowl opening toward Roblox -Z (Blender +Y).
The game resizes every asset to fit its slot, so the absolute scale here
doesn't matter.
"""

import math
import os

import bpy  # import bpy before bmesh (needed when run outside Blender)
import bmesh
from mathutils import Matrix, Vector

HERE = os.path.dirname(os.path.abspath(__file__)) if "__file__" in globals() else os.getcwd()
EXPORT_DIR = os.path.join(HERE, "exports")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()
    for block in (bpy.data.meshes, bpy.data.materials):
        for item in list(block):
            if item.users == 0:
                block.remove(item)


def material(name, rgb, roughness=0.8, metallic=0.0, emission=None):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*rgb, 1)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1)
        bsdf.inputs["Emission Strength"].default_value = 6.0
    mat.diffuse_color = (*rgb, 1)
    return mat


def object_from_bmesh(name, bm, mat=None, smooth=True):
    mesh = bpy.data.meshes.new(name)
    bm.normal_update()
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    if smooth:
        for poly in mesh.polygons:
            poly.use_smooth = True
    if mat:
        mesh.materials.append(mat)
    return obj


def sweep(bm, centers, radii_x, radii_n, ring=14, cap_tip=True):
    """Sweeps an elliptical cross-section along a polyline.

    centers: list of Vectors; radii_x / radii_n: per-point half widths along X
    and along the curve's in-plane normal.
    """
    rings = []
    count = len(centers)
    for i, c in enumerate(centers):
        a = centers[max(i - 1, 0)]
        b = centers[min(i + 1, count - 1)]
        tangent = (b - a).normalized()
        side = Vector((1, 0, 0))
        normal = tangent.cross(side).normalized()
        verts = []
        for k in range(ring):
            ang = 2 * math.pi * k / ring
            offset = side * math.cos(ang) * radii_x[i] + normal * math.sin(ang) * radii_n[i]
            verts.append(bm.verts.new(c + offset))
        rings.append(verts)
    for i in range(count - 1):
        r0, r1 = rings[i], rings[i + 1]
        for k in range(ring):
            k2 = (k + 1) % ring
            bm.faces.new((r0[k], r0[k2], r1[k2], r1[k]))
    # Cap the root; pinch the tip to a point.
    bm.faces.new(list(reversed(rings[0])))
    if cap_tip:
        tip = bm.verts.new(centers[-1] + (centers[-1] - centers[-2]).normalized() * radii_n[-1] * 2)
        last = rings[-1]
        for k in range(ring):
            bm.faces.new((last[k], last[(k + 1) % ring], tip))
    return rings


def ellipsoid(bm, center, radii, segments=24, rings=14, rot=None):
    mat = Matrix.Translation(center)
    if rot:
        mat = mat @ rot
    mat = mat @ Matrix.Diagonal((*radii, 1))
    bmesh.ops.create_uvsphere(bm, u_segments=segments, v_segments=rings, radius=1.0, matrix=mat)


# ---------------------------------------------------------------------------
# Rib
# ---------------------------------------------------------------------------

def build_rib():
    """A quarter-ellipse 'claw' in a unit box.

    In Blender coordinates the root is at the top (z = +0.5) on the -Y side and
    the tip is at the bottom (z = -0.5) on the +Y side. After export (Y up,
    -Z forward) that is root at the top +Z edge, tip at the bottom -Z edge.
    """
    steps = 40
    centers, rx, rn = [], [], []
    root_r = 0.07
    for i in range(steps + 1):
        s = i / steps
        a = s * math.pi / 2
        # Ease the curve so it hooks slightly inward at the end, like the video.
        y = -0.5 + root_r + (1 - 2 * root_r) * math.sin(a)
        z = 0.5 - root_r - (1 - 2 * root_r) * (1 - math.cos(a)) ** 0.92
        centers.append(Vector((0, y, z)))
        taper = (1 - s) ** 0.85
        rx.append(0.06 + 0.42 * taper)  # across the rib (X), stretched to ~6 studs in game
        rn.append(0.008 + root_r * taper)
    bm = bmesh.new()
    sweep(bm, centers, rx, rn, ring=16)
    return object_from_bmesh("Rib", bm, material("Concrete", (0.62, 0.62, 0.6), 0.9))


# ---------------------------------------------------------------------------
# Cat
# ---------------------------------------------------------------------------

def build_cat():
    """Mochi, the house cat. Sitting-loaf proportions, head toward +Y."""
    fur = material("CatFur", (0.3, 0.29, 0.28), 0.9)
    dark = material("CatEyes", (0.35, 0.5, 0.18), 0.2)
    bm = bmesh.new()
    # Body
    ellipsoid(bm, Vector((0, -0.1, 0.95)), (0.52, 1.15, 0.48))
    # Chest / shoulders
    ellipsoid(bm, Vector((0, 0.6, 1.05)), (0.45, 0.5, 0.48))
    # Head
    ellipsoid(bm, Vector((0, 1.15, 1.55)), (0.46, 0.42, 0.42))
    # Muzzle
    ellipsoid(bm, Vector((0, 1.5, 1.45)), (0.2, 0.14, 0.13))
    # Ears
    for side in (-1, 1):
        cone = bmesh.ops.create_cone(bm, cap_ends=True, segments=8, radius1=0.16, radius2=0.0, depth=0.36,
                                     matrix=Matrix.Translation((side * 0.24, 1.1, 1.98)) @ Matrix.Rotation(side * -0.25, 4, "Y"))
        del cone
    # Legs
    for x in (-0.28, 0.28):
        for y in (-0.8, 0.65):
            bmesh.ops.create_cone(bm, cap_ends=True, segments=10, radius1=0.13, radius2=0.11, depth=0.62,
                                  matrix=Matrix.Translation((x, y, 0.31)))
    # Tail curving up
    centers, rx, rn = [], [], []
    for i in range(13):
        s = i / 12
        a = s * math.pi * 0.7
        centers.append(Vector((0, -1.2 - 0.5 * math.sin(a), 1.0 + 0.9 * (1 - math.cos(a)))))
        rx.append(0.11 - 0.03 * s)
        rn.append(0.11 - 0.03 * s)
    sweep(bm, centers, rx, rn, ring=10)
    cat = object_from_bmesh("Cat", bm, fur)
    eyes = bmesh.new()
    for side in (-1, 1):
        ellipsoid(eyes, Vector((side * 0.17, 1.5, 1.63)), (0.08, 0.04, 0.08), segments=10, rings=6)
    eye_obj = object_from_bmesh("CatEyes", eyes, dark)
    return join([cat, eye_obj], "Cat")


# ---------------------------------------------------------------------------
# Whale
# ---------------------------------------------------------------------------

def build_whale():
    dark = material("WhaleDark", (0.06, 0.07, 0.085), 0.35)
    bm = bmesh.new()
    centers, rx, rn = [], [], []
    length = 46
    for i in range(41):
        s = i / 40
        y = length / 2 - length * s
        z = -0.6 * math.sin(math.pi * s)
        centers.append(Vector((0, y, z)))
        bulk = math.sin(math.pi * min(1, 0.06 + s * 1.05)) ** 0.55
        rx.append(0.4 + 5.6 * bulk * (1 - 0.75 * s ** 2))
        rn.append(0.4 + 4.6 * bulk * (1 - 0.7 * s ** 2))
    sweep(bm, centers, rx, rn, ring=22, cap_tip=False)
    # Long humpback pectoral fins
    for side in (-1, 1):
        rot = Matrix.Rotation(side * 0.9, 4, "Z") @ Matrix.Rotation(side * 0.35, 4, "Y")
        ellipsoid(bm, Vector((side * 7.5, 9, -2.5)), (7.5, 1.4, 0.35), rot=rot)
    # Flukes
    for side in (-1, 1):
        rot = Matrix.Rotation(side * -0.35, 4, "Z")
        ellipsoid(bm, Vector((side * 4.2, -23.5, -0.4)), (4.6, 1.8, 0.3), rot=rot)
    # Small dorsal hump
    ellipsoid(bm, Vector((0, -8, 4.2)), (0.5, 1.6, 0.9))
    return object_from_bmesh("Whale", bm, dark)


# ---------------------------------------------------------------------------
# Hanging fireplace
# ---------------------------------------------------------------------------

def build_fireplace():
    black = material("BlackSteel", (0.02, 0.02, 0.022), 0.35, metallic=0.6)
    glow = material("Embers", (1.0, 0.35, 0.08), 0.6, emission=(1.0, 0.4, 0.1))
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=40, v_segments=24, radius=1.0)
    # Squash into a bowl and cut an opening facing +Y.
    for v in bm.verts:
        v.co.z *= 0.8
    opening = [f for f in bm.faces if f.calc_center_median().normalized().y > 0.55 and f.calc_center_median().z > -0.35]
    bmesh.ops.delete(bm, geom=opening, context="FACES")
    shell = bmesh.ops.solidify(bm, geom=bm.faces[:], thickness=0.06)
    del shell
    # Tapered neck that meets the flue.
    neck_c, neck_rx, neck_rn = [], [], []
    for i in range(11):
        s = i / 10
        neck_c.append(Vector((0, 0, 0.7 + 1.6 * s)))
        r = 0.55 * (1 - s) ** 2 + 0.16
        neck_rx.append(r)
        neck_rn.append(r)
    sweep(bm, neck_c, neck_rx, neck_rn, ring=24, cap_tip=False)
    bowl = object_from_bmesh("Fireplace", bm, black)
    embers = bmesh.new()
    ellipsoid(embers, Vector((0, 0.15, -0.45)), (0.6, 0.45, 0.16), segments=16, rings=8)
    ember_obj = object_from_bmesh("FireplaceEmbers", embers, glow)
    return join([bowl, ember_obj], "Fireplace")


# ---------------------------------------------------------------------------
# Export
# ---------------------------------------------------------------------------

def join(objs, name):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    obj = bpy.context.view_layer.objects.active
    obj.name = name
    obj.data.name = name
    return obj


def export(obj):
    os.makedirs(EXPORT_DIR, exist_ok=True)
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    saved = obj.location.copy()
    obj.location = (0, 0, 0)
    base = os.path.join(EXPORT_DIR, obj.name)
    bpy.ops.wm.obj_export(
        filepath=base + ".obj",
        export_selected_objects=True,
        forward_axis="NEGATIVE_Z",
        up_axis="Y",
        export_materials=True,
        apply_modifiers=True,
    )
    bpy.ops.export_scene.fbx(
        filepath=base + ".fbx",
        use_selection=True,
        axis_forward="-Z",
        axis_up="Y",
        apply_scale_options="FBX_SCALE_UNITS",
        mesh_smooth_type="FACE",
    )
    obj.location = saved
    print("exported", base + ".obj/.fbx", "-", len(obj.data.polygons), "faces")


def main():
    clear_scene()
    assets = [build_rib(), build_cat(), build_whale(), build_fireplace()]
    # Lay them out side by side so they're easy to look at in the viewport.
    x = 0
    for obj in assets:
        export(obj)
        size = max(obj.dimensions)
        obj.location.x = x + size / 2
        x += size + 2
    blend_path = os.path.join(HERE, "ribcage_assets.blend")
    bpy.ops.wm.save_as_mainfile(filepath=blend_path)
    print("saved", blend_path)


if __name__ == "__main__":
    main()
