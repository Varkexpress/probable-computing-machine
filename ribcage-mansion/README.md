# The Ribcage — a Roblox life sim

A cozy daily-life game set in the concrete "ribcage" mansion from the reference video:
a spine-shaped arch standing in an icy, foggy sea, with a glass gallery in its crown.

## Open it in Roblox Studio (easiest)
1. Download `RibcageMansion.rbxlx` from this folder.
2. In Roblox Studio: **File > Open from File...** and pick `RibcageMansion.rbxlx`.
3. Press **Play**. The mansion, sea and furniture are built by script when the game starts (takes a few seconds).
   To see it without pressing Play, open **View > Command Bar** and run:
   `require(game.ServerScriptService.Modules.Builder).build()`
4. Optional: in **Lighting**, set **Technology** to **Future** for the warm interior lighting.
5. Saving progress needs a published place with **Game Settings > Security > Enable Studio Access to API Services** on.

## Optional Blender meshes
`blender/exports/` has Rib, Cat, Whale and Fireplace as `.fbx`. Import them in Studio
(**Avatar > Import 3D**) and put them in **ServerStorage > BlenderAssets** with those names;
the game uses them in place of the block-built versions. `blender/ribcage_assets.py`
regenerates them (Blender: Scripting tab > Open > Run Script).

## Editing the code
Scripts live in `roblox/src` (Rojo layout, `roblox/default.project.json`).
After changing them, rebuild the place with `python3 tools/build_place.py`.
Tuning (recipes, chores, pets, weather, day length) is in `roblox/src/ReplicatedStorage/Shared/Config.luau`.
