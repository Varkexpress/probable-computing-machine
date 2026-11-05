--!nonstrict
-- THE MONOLITH: a 220-stud slab of board-marked concrete standing alone on a
-- basalt rock to the south. One glass slit runs up its face. Inside, three
-- stacked floors joined by steep concrete ramps.

local Workspace = game:GetService("Workspace")

local Build = require(script.Parent.Parent.Build)
local Furnish = require(script.Parent.Parent.Furnish)
local Registry = require(script.Parent.Parent.Registry)

local Monolith = {}

local C = Build.Color
Monolith.ORIGIN = Vector3.new(40, 0, 700)
local O = Monolith.ORIGIN

-- Interior: x -30..30, z -16..16. Floors (top of slab) at y 10, 30, 50; roof at 70.
local FLOORS = { 10, 30, 50 }
local TOP = 70

local function box(folder, a: Vector3, b: Vector3, props)
	return Build.box(folder, O + a, O + b, props)
end

local function concrete(name: string, color: Color3?)
	return { Name = name, Material = Enum.Material.Concrete, Color = color or C.ConcreteOut }
end

-- A floor slab from y-2 to y with a rectangular stair hole cut out.
local function slabWithHole(folder, y: number, hx0: number, hx1: number, hz0: number, hz1: number)
	local p = concrete("FloorSlab", C.Floor)
	p.Reflectance = 0.05
	box(folder, Vector3.new(-30, y - 2, -16), Vector3.new(hx0, y, 16), p)
	box(folder, Vector3.new(hx1, y - 2, -16), Vector3.new(30, y, 16), p)
	box(folder, Vector3.new(hx0, y - 2, -16), Vector3.new(hx1, y, hz0), p)
	box(folder, Vector3.new(hx0, y - 2, hz1), Vector3.new(hx1, y, 16), p)
	-- Railing along the open side of the hole.
	local rx = hx0 < 0 and hx1 + 0.3 or hx0 - 0.3
	box(folder, Vector3.new(rx - 0.15, y, hz1 - 0.2), Vector3.new(rx + 0.15, y + 3.4, -12), {
		Name = "Rail",
		Material = Enum.Material.Glass,
		Color = C.Glass,
		Transparency = 0.6,
	})
end

-- A straight concrete ramp in the lane x0..x1 from (zStart, yStart) to (zEnd, yEnd).
local function ramp(folder, x0: number, x1: number, zStart: number, yStart: number, zEnd: number, yEnd: number)
	local x = (x0 + x1) / 2
	local p1 = O + Vector3.new(x, yStart - 0.55, zStart)
	local p2 = O + Vector3.new(x, yEnd - 0.55, zEnd)
	local r = Build.beam(folder, p1, p2, x1 - x0, 1, concrete("Ramp", C.Floor))
	r.Size += Vector3.new(0, 0, 1.5)
	-- Painted-on step lines (no collision) so it reads as a stair.
	local n = 18
	for i = 1, n - 1 do
		local t = i / n
		local p = p1:Lerp(p2, t) + Vector3.new(0, 0.56, 0)
		Build.part(folder, {
			Name = "StepLine",
			Size = Vector3.new(x1 - x0, 0.05, 0.2),
			CFrame = CFrame.lookAt(p, p + (p2 - p1)) ,
			Color = Color3.fromRGB(60, 55, 50),
			CanCollide = false,
			CanQuery = false,
		})
	end
end

local function shell(folder)
	-- Foundation and the solid upper mass.
	box(folder, Vector3.new(-32, -24, -18), Vector3.new(32, FLOORS[1], 18), concrete("Foundation", C.ConcreteDark))
	box(folder, Vector3.new(-32, TOP, -18), Vector3.new(32, 220, 18), concrete("Mass"))
	-- Walls between the floors.
	box(folder, Vector3.new(-32, FLOORS[1], 16), Vector3.new(32, TOP, 18), concrete("BackWall", C.ConcreteIn))
	box(folder, Vector3.new(-32, FLOORS[1], -18), Vector3.new(-30, TOP, 16), concrete("SideWall", C.ConcreteIn))
	box(folder, Vector3.new(30, FLOORS[1], -18), Vector3.new(32, TOP, 16), concrete("SideWall", C.ConcreteIn))
	-- Front wall with the glass slit (x -6..6) and the entrance (x -3..3, first 10 studs).
	box(folder, Vector3.new(-30, FLOORS[1], -18), Vector3.new(-6, TOP, -16), concrete("FrontWall", C.ConcreteIn))
	box(folder, Vector3.new(6, FLOORS[1], -18), Vector3.new(30, TOP, -16), concrete("FrontWall", C.ConcreteIn))
	local glass = { Name = "Slit", Material = Enum.Material.Glass, Color = C.Glass, Transparency = 0.78, CastShadow = false }
	box(folder, Vector3.new(-6, FLOORS[1] + 10, -17.3), Vector3.new(6, TOP, -16.7), glass)
	box(folder, Vector3.new(-6, FLOORS[1], -17.3), Vector3.new(-3, FLOORS[1] + 10, -16.7), glass)
	box(folder, Vector3.new(3, FLOORS[1], -17.3), Vector3.new(6, FLOORS[1] + 10, -16.7), glass)
	-- The slit continues up the solid mass as a thin lit groove.
	box(folder, Vector3.new(-1, TOP, -18.3), Vector3.new(1, 210, -17.9), {
		Name = "SlitGlow",
		Material = Enum.Material.Neon,
		Color = Color3.fromRGB(255, 200, 140),
		Transparency = 0.25,
		CastShadow = false,
	})
	-- Board-marking: thin darker lines across the front and back faces.
	for y = 14, 214, 12 do
		for _, z in { -18.05, 18.05 } do
			box(folder, Vector3.new(-32, y, z - 0.05), Vector3.new(32, y + 0.25, z + 0.05), {
				Name = "BoardLine",
				Material = Enum.Material.Concrete,
				Color = Color3.fromRGB(120, 120, 118),
				CanCollide = false,
				CastShadow = false,
			})
		end
	end
	-- Floor slabs with holes for the ramps (alternate sides of the building).
	slabWithHole(folder, FLOORS[2], 22, 28, -16, -2)
	slabWithHole(folder, FLOORS[3], -28, -22, -16, -2)
	ramp(folder, 22, 28, 14, FLOORS[1], -14, FLOORS[2])
	ramp(folder, -28, -22, 14, FLOORS[2], -14, FLOORS[3])
	-- Warm light slots along the back wall of each floor.
	for _, y in FLOORS do
		Furnish.lightSlot(folder, O + Vector3.new(-28, y + 15, 15.6), O + Vector3.new(28, y + 15.3, 16))
	end
end

function Monolith.build(root: Instance)
	local folder = Build.folder(root, "TheMonolith")
	Registry.addHome({
		id = "monolith",
		name = "The Monolith",
		center = O + Vector3.new(0, 30, 0),
		spawn = CFrame.new(O + Vector3.new(0, FLOORS[1] + 3, -8)),
		dock = CFrame.new(O + Vector3.new(0, 8, -96)),
	})

	-- Basalt rock it stands on, with snow, and an approach ramp to the door.
	local terrain = Workspace.Terrain
	terrain:FillBlock(CFrame.new(O + Vector3.new(0, -20, -14)), Vector3.new(112, 48, 104), Enum.Material.Basalt)
	terrain:FillBall(O + Vector3.new(-50, -4, 20), 26, Enum.Material.Basalt)
	terrain:FillBall(O + Vector3.new(48, -6, -40), 22, Enum.Material.Basalt)
	terrain:FillBlock(CFrame.new(O + Vector3.new(0, 4.5, -44)), Vector3.new(104, 1, 36), Enum.Material.Snow)
	Build.beam(folder, O + Vector3.new(0, 4.5, -60), O + Vector3.new(0, FLOORS[1] - 0.5, -17), 8, 1, concrete("ApproachRamp", C.ConcreteOut))
	shell(folder)

	-- Ground floor: kitchen and dining.
	local y1 = FLOORS[1]
	Furnish.kitchen(folder, CFrame.new(O + Vector3.new(-8, y1, 6)), "monolith")
	Furnish.dining(folder, CFrame.new(O + Vector3.new(-12, y1, -9)))
	Furnish.deed(folder, CFrame.new(O + Vector3.new(9, y1, -12)), "monolith", "The Monolith")
	Furnish.plant(folder, O + Vector3.new(-27, y1, -13))
	Furnish.plant(folder, O + Vector3.new(16, y1, 13))
	Furnish.note(folder, O + Vector3.new(-12.5, y1 + 3, -9.6), "n4", 0.2)

	-- Middle floor: the fire room.
	local y2 = FLOORS[2]
	Furnish.fireplace(folder, CFrame.new(O + Vector3.new(-4, y2, -6)), "pit", "monolith")
	Furnish.lounge(folder, CFrame.new(O + Vector3.new(-4, y2, -6)), 16)
	Furnish.bookshelf(folder, CFrame.new(O + Vector3.new(-14, y2, 14.4)))
	Furnish.plant(folder, O + Vector3.new(14, y2, 13))
	Furnish.paperLamp(folder, O + Vector3.new(14, y2, -13), 7)

	-- Top floor: sleeping and bathing.
	local y3 = FLOORS[3]
	Furnish.bed(folder, CFrame.new(O + Vector3.new(8, y3, 2)), "monolith")
	Furnish.bath(folder, CFrame.new(O + Vector3.new(-12, y3, 6)), "monolith")
	Furnish.plant(folder, O + Vector3.new(25, y3, -13))
	Furnish.note(folder, O + Vector3.new(15.6, y3 + 2.2, 13.4), "n5", 1.2)

	-- Dock with the ferry bell and a boat.
	box(folder, Vector3.new(-5, 3, -64), Vector3.new(5, 5, -112), concrete("Pier", C.ConcreteOut))
	for z = -70, -110, -14 do
		Build.cylinderY(folder, O + Vector3.new(-4, -12, z), 32, 2, concrete("Pile", C.ConcreteDark))
		Build.cylinderY(folder, O + Vector3.new(4, -12, z), 32, 2, concrete("Pile", C.ConcreteDark))
	end
	Furnish.bell(folder, O + Vector3.new(-3.5, 5, -108), "monolith", CFrame.new(O + Vector3.new(11, 1.2, -96)))
	Furnish.cubeLamp(folder, O + Vector3.new(3.8, 5.7, -110))

	for i, y in FLOORS do
		local names = { "Kitchen Floor", "Fire Room", "Sleeping Floor" }
		Registry.addInterior("monolith", "The Monolith · " .. names[i], O + Vector3.new(-30, y - 1, -16), O + Vector3.new(30, y + 19, 16))
	end
end

return Monolith
