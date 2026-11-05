--!nonstrict
-- THE VERTEBRAE: five concrete cubes on tall pylons, stepping up out of the
-- sea to the west like bones of a spine, joined by sloped glass bridges.
-- A lift in the first pylon brings you up from the dock.

local Build = require(script.Parent.Parent.Build)
local Furnish = require(script.Parent.Parent.Furnish)
local Registry = require(script.Parent.Parent.Registry)

local Vertebrae = {}

local C = Build.Color
Vertebrae.ORIGIN = Vector3.new(-700, 0, -420)
local V = Vertebrae.ORIGIN

-- x0 = west edge, s = cube size, f = floor height.
local CUBES = {
	{ x0 = 0, s = 24, f = 30, name = "Entrance Hall" },
	{ x0 = 36, s = 24, f = 38, name = "Kitchen" },
	{ x0 = 72, s = 28, f = 46, name = "Fire Room" },
	{ x0 = 112, s = 24, f = 54, name = "Bedroom" },
	{ x0 = 148, s = 22, f = 62, name = "Bath & Lookout" },
}
local H = 16 -- interior height
local DOOR_H = 9

local function box(folder, a: Vector3, b: Vector3, props)
	return Build.box(folder, V + a, V + b, props)
end

local function concrete(name: string, color: Color3?)
	return { Name = name, Material = Enum.Material.Concrete, Color = color or C.ConcreteOut }
end

-- A wall slab across z at x a..b, with a centred doorway if `door`.
local function endWall(folder, a: number, b: number, half: number, f: number, door: boolean)
	local props = concrete("EndWall", C.ConcreteIn)
	if not door then
		box(folder, Vector3.new(a, f, -half), Vector3.new(b, f + H, half), props)
		return
	end
	box(folder, Vector3.new(a, f, -half), Vector3.new(b, f + H, -3), props)
	box(folder, Vector3.new(a, f, 3), Vector3.new(b, f + H, half), props)
	box(folder, Vector3.new(a, f + DOOR_H, -3), Vector3.new(b, f + H, 3), props)
end

local function cube(folder, i: number)
	local c = CUBES[i]
	local x0, x1, half, f = c.x0, c.x0 + c.s, c.s / 2, c.f
	-- Floor and roof slabs.
	box(folder, Vector3.new(x0, f - 2, -half), Vector3.new(x1, f, half), { Name = "Floor", Material = Enum.Material.Concrete, Color = C.Floor, Reflectance = 0.05 })
	box(folder, Vector3.new(x0, f + H, -half), Vector3.new(x1, f + H + 2, half), concrete("Roof"))
	-- Back wall.
	box(folder, Vector3.new(x0, f, half - 2), Vector3.new(x1, f + H, half), concrete("BackWall", C.ConcreteIn))
	-- Front wall with a deep-set picture window.
	local front = concrete("FrontWall", C.ConcreteIn)
	box(folder, Vector3.new(x0, f, -half), Vector3.new(x1, f + 3, -half + 2), front)
	box(folder, Vector3.new(x0, f + 14, -half), Vector3.new(x1, f + H, -half + 2), front)
	box(folder, Vector3.new(x0, f + 3, -half), Vector3.new(x0 + 3, f + 14, -half + 2), front)
	box(folder, Vector3.new(x1 - 3, f + 3, -half), Vector3.new(x1, f + 14, -half + 2), front)
	box(folder, Vector3.new(x0 + 3, f + 3, -half + 0.7), Vector3.new(x1 - 3, f + 14, -half + 1.3), {
		Name = "Window",
		Material = Enum.Material.Glass,
		Color = C.Glass,
		Transparency = 0.8,
		CastShadow = false,
	})
	-- End walls: doorways toward the neighbours; the last cube ends in glass.
	endWall(folder, x0, x0 + 2, half - 2, f, i > 1)
	if i < #CUBES then
		endWall(folder, x1 - 2, x1, half - 2, f, true)
	else
		local frame = concrete("LookoutFrame", C.ConcreteIn)
		box(folder, Vector3.new(x1 - 2, f, -half + 2), Vector3.new(x1, f + 1, half - 2), frame)
		box(folder, Vector3.new(x1 - 2, f + 15, -half + 2), Vector3.new(x1, f + H, half - 2), frame)
		box(folder, Vector3.new(x1 - 1.3, f + 1, -half + 2), Vector3.new(x1 - 0.7, f + 15, half - 2), {
			Name = "LookoutGlass",
			Material = Enum.Material.Glass,
			Color = C.Glass,
			Transparency = 0.8,
			CastShadow = false,
		})
	end
	-- Pylon down into the sea, and a "spinous process" fin on the roof.
	local cx = (x0 + x1) / 2
	box(folder, Vector3.new(cx - 4, -24, -4), Vector3.new(cx + 4, f - 2, 4), concrete("Pylon", C.ConcreteDark))
	Build.part(folder, {
		Name = "SpineFin",
		Size = Vector3.new(2, 16, 9),
		CFrame = CFrame.new(V + Vector3.new(cx, f + H + 8, 3)) * CFrame.Angles(-0.45, 0, 0),
		Material = Enum.Material.Concrete,
		Color = C.ConcreteOut,
	})
	-- Warm light slot along the back wall.
	Furnish.lightSlot(folder, V + Vector3.new(x0 + 3, f + 13, half - 2.4), V + Vector3.new(x1 - 3, f + 13.3, half - 2))
	Registry.addInterior("vertebrae", "The Vertebrae · " .. c.name, V + Vector3.new(x0 + 2, f - 1, -half + 2), V + Vector3.new(x1 - 2, f + H, half - 2))
end

local function bridge(folder, a, b)
	local p1 = V + Vector3.new(a.x0 + a.s, a.f - 0.55, 0)
	local p2 = V + Vector3.new(b.x0, b.f - 0.55, 0)
	local floor = Build.beam(folder, p1, p2, 7, 1, { Name = "BridgeFloor", Material = Enum.Material.Concrete, Color = C.Floor })
	floor.Size += Vector3.new(0, 0, 1)
	for _, z in { -3.6, 3.6 } do
		Build.beam(folder, p1 + Vector3.new(0, 5.4, z), p2 + Vector3.new(0, 5.4, z), 0.4, 10, {
			Name = "BridgeGlass",
			Material = Enum.Material.Glass,
			Color = C.Glass,
			Transparency = 0.75,
			CastShadow = false,
		})
	end
	Build.beam(folder, p1 + Vector3.new(0, 10.9, 0), p2 + Vector3.new(0, 10.9, 0), 8, 1, concrete("BridgeRoof"))
	Registry.addInterior("vertebrae", "The Vertebrae · Glass Bridge",
		V + Vector3.new(a.x0 + a.s, a.f - 1, -3.6), V + Vector3.new(b.x0, b.f + 10, 3.6))
end

function Vertebrae.build(root: Instance)
	local folder = Build.folder(root, "TheVertebrae")
	Registry.addHome({
		id = "vertebrae",
		name = "The Vertebrae",
		center = V + Vector3.new(85, 40, 0),
		spawn = CFrame.new(V + Vector3.new(6, CUBES[1].f + 3, -4)) * CFrame.Angles(0, -math.pi / 2, 0),
		dock = CFrame.new(V + Vector3.new(12, 8, -50)),
	})

	for i = 1, #CUBES do
		cube(folder, i)
		if i < #CUBES then
			bridge(folder, CUBES[i], CUBES[i + 1])
		end
	end

	-- 1 Entrance hall: lift, deed, dining table.
	local f1 = CUBES[1].f
	local liftDoor = box(folder, Vector3.new(2, f1, -3), Vector3.new(2.6, f1 + 9, 3), { Name = "LiftDoor", Material = Enum.Material.Metal, Color = C.Metal })
	for _, z in { -3.4, 3.4 } do
		box(folder, Vector3.new(2, f1, z - 0.2), Vector3.new(2.8, f1 + 9.4, z + 0.2), { Name = "LiftFrame", Material = Enum.Material.Neon, Color = C.Warm })
	end
	Furnish.dining(folder, CFrame.new(V + Vector3.new(13, f1, 2)))
	Furnish.deed(folder, CFrame.new(V + Vector3.new(18, f1, -7)), "vertebrae", "The Vertebrae")
	Furnish.plant(folder, V + Vector3.new(5, f1, 8))
	Furnish.note(folder, V + Vector3.new(13.5, f1 + 3, 2.6), "n6", -0.3)

	-- 2 Kitchen (pantry moved to the front-right so it can't block a doorway).
	local f2 = CUBES[2].f
	Furnish.kitchen(folder, CFrame.new(V + Vector3.new(48, f2, 0)), "vertebrae", {
		pantryA = Vector3.new(6.8, 0, -9.6),
		pantryB = Vector3.new(9.6, 10, -5),
	})

	-- 3 Fire room: a long slot fire in the back wall, sofa facing it.
	local f3 = CUBES[3].f
	Furnish.fireplace(folder, CFrame.new(V + Vector3.new(86, f3, 2)), "slot", "vertebrae")
	Furnish.lounge(folder, CFrame.new(V + Vector3.new(86, f3, -1)) * CFrame.Angles(0, math.pi, 0), 16)
	Furnish.plant(folder, V + Vector3.new(96, f3, -10))

	-- 4 Bedroom.
	local f4 = CUBES[4].f
	Furnish.bed(folder, CFrame.new(V + Vector3.new(124, f4, -3)), "vertebrae")
	Furnish.plant(folder, V + Vector3.new(116, f4, -9))

	-- 5 Bath and the glass lookout at the end of the spine.
	local f5 = CUBES[5].f
	Furnish.bath(folder, CFrame.new(V + Vector3.new(159, f5, 0)), "vertebrae")
	box(folder, Vector3.new(163, f5, -8.4), Vector3.new(167, f5 + 1.6, -4), { Name = "LookoutBench", Material = Enum.Material.Wood, Color = C.Wood })
	Furnish.note(folder, V + Vector3.new(165, f5 + 1.6, -6.2), "n7", 0.9)

	-- Ground level: platform, lift booth, pier, bell and boat.
	box(folder, Vector3.new(4, 3, -28), Vector3.new(20, 5, -12), concrete("Platform", C.ConcreteOut))
	local booth = box(folder, Vector3.new(8, 5, -12.6), Vector3.new(16, 15, -12), { Name = "LiftBooth", Material = Enum.Material.Metal, Color = C.Metal })
	box(folder, Vector3.new(8, 15, -16), Vector3.new(16, 16, -12), concrete("BoothRoof"))
	local lamp = box(folder, Vector3.new(10, 14.6, -15), Vector3.new(14, 14.9, -13), { Name = "BoothLight", Material = Enum.Material.Neon, Color = C.Warm })
	Build.surfaceLight(lamp, Enum.NormalId.Bottom, C.Warm, 14, 1.4)
	box(folder, Vector3.new(9, 3, -28), Vector3.new(15, 5, -80), concrete("Pier", C.ConcreteOut))
	for z = -34, -78, -14 do
		Build.cylinderY(folder, V + Vector3.new(10, -12, z), 32, 1.8, concrete("Pile", C.ConcreteDark))
		Build.cylinderY(folder, V + Vector3.new(14, -12, z), 32, 1.8, concrete("Pile", C.ConcreteDark))
	end
	Furnish.bell(folder, V + Vector3.new(10, 5, -76), "vertebrae", CFrame.new(V + Vector3.new(22, 1.2, -60)))
	Furnish.cubeLamp(folder, V + Vector3.new(14.2, 5.7, -78))

	Registry.misc.vertebraeLift = {
		bottom = booth,
		top = liftDoor,
		bottomArrive = CFrame.new(V + Vector3.new(12, 8, -20)) * CFrame.Angles(0, math.pi, 0),
		topArrive = CFrame.new(V + Vector3.new(6, f1 + 3, 0)) * CFrame.Angles(0, -math.pi / 2, 0),
	}
end

return Vertebrae
