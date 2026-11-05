--!nonstrict
-- THE WELL: a concrete cylinder 80 studs across, sunk into a rock in the
-- east. Rooms ring the outside; in the middle, an open shaft with a still
-- black pool at the bottom and a single glowing cube hanging over it. A
-- spiral ramp climbs the shaft. The roof is open, so snow falls inside.

local Workspace = game:GetService("Workspace")

local Build = require(script.Parent.Parent.Build)
local Furnish = require(script.Parent.Parent.Furnish)
local Registry = require(script.Parent.Parent.Registry)

local Well = {}

local C = Build.Color
Well.ORIGIN = Vector3.new(650, 0, -480)
local W = Well.ORIGIN

local R_OUT = 40 -- outer face of the wall
local R_WALL = 38 -- inner face of the wall
local R_RING = 24 -- inner edge of the ring floors
local R_RAMP = 18 -- inner edge of the spiral ramp
local LEVELS = { 4, 24, 44 } -- top of each ring floor
local TOP = 66
local SEG = 48
local RAMP_START = math.rad(-75) -- the ramp starts (and arrives) at this angle

-- Position at angle a (radians) and radius r, at height y.
local function at(a: number, r: number, y: number): Vector3
	return W + Vector3.new(r * math.cos(a), y, r * math.sin(a))
end

-- A frame standing at (a, r) on level y, local -Z pointing at the shaft.
local function frameAt(a: number, r: number, y: number): CFrame
	local p = at(a, r, y)
	local centre = Vector3.new(W.X, p.Y, W.Z)
	return CFrame.lookAt(p, centre)
end

-- A ring of tangential slabs between radii r0..r1 and heights y0..y1.
local function ring(folder, r0: number, r1: number, y0: number, y1: number, props, skip: ((number) -> boolean)?)
	local mid = (r0 + r1) / 2
	local len = 2 * math.pi * r1 / SEG + 0.6
	for i = 0, SEG - 1 do
		local a = (i + 0.5) / SEG * 2 * math.pi
		if not (skip and skip(a)) then
			local p = table.clone(props)
			p.Size = Vector3.new(len, y1 - y0, r1 - r0)
			p.CFrame = CFrame.lookAt(at(a, mid, (y0 + y1) / 2), Vector3.new(W.X, W.Y + (y0 + y1) / 2, W.Z))
			Build.part(folder, p)
		end
	end
end

local function angleDiff(a: number, b: number): number
	local d = (a - b) % (2 * math.pi)
	if d > math.pi then
		d -= 2 * math.pi
	end
	return math.abs(d)
end

local function shell(folder)
	local concrete = { Name = "Wall", Material = Enum.Material.Concrete, Color = C.ConcreteOut }
	local door = math.rad(-90)
	for i = 0, SEG - 1 do
		local a = i / SEG * 2 * math.pi
		local window = i % 4 == 2
		local isDoor = angleDiff(a, door) < 0.01
		local len = 2 * math.pi * R_OUT / SEG + 0.6
		local function piece(y0: number, y1: number, props)
			local p = table.clone(props)
			p.Size = Vector3.new(len, y1 - y0, R_OUT - R_WALL)
			p.CFrame = CFrame.lookAt(at(a, (R_OUT + R_WALL) / 2, (y0 + y1) / 2), Vector3.new(W.X, (y0 + y1) / 2, W.Z))
			Build.part(folder, p)
		end
		if isDoor then
			piece(-24, LEVELS[1], concrete)
			piece(LEVELS[1] + 10, TOP, concrete)
		elseif window then
			piece(-24, LEVELS[1] + 4, concrete)
			piece(LEVELS[1] + 4, TOP - 6, {
				Name = "SlitWindow",
				Material = Enum.Material.Glass,
				Color = C.Glass,
				Transparency = 0.78,
				CastShadow = false,
			})
			piece(TOP - 6, TOP, concrete)
		else
			piece(-24, TOP, concrete)
		end
	end
	-- Ring floors and the roof ring (open oculus over the shaft).
	local floorProps = { Name = "RingFloor", Material = Enum.Material.Concrete, Color = C.Floor, Reflectance = 0.05 }
	ring(folder, R_RAMP, R_WALL, LEVELS[1] - 2, LEVELS[1], floorProps)
	ring(folder, R_RING, R_WALL, LEVELS[2] - 2, LEVELS[2], floorProps)
	ring(folder, R_RING, R_WALL, LEVELS[3] - 2, LEVELS[3], floorProps)
	ring(folder, R_RAMP, R_OUT, TOP - 2, TOP, { Name = "RoofRing", Material = Enum.Material.Concrete, Color = C.ConcreteOut })
	-- Glass balustrades along the ring edges, open where the ramp arrives.
	local railProps = { Name = "Balustrade", Material = Enum.Material.Glass, Color = C.Glass, Transparency = 0.65, CastShadow = false }
	for li = 2, 3 do
		local y = LEVELS[li]
		ring(folder, R_RING - 0.3, R_RING + 0.1, y, y + 3.4, railProps, function(a)
			local d = (a - RAMP_START) % (2 * math.pi)
			return d > 2 * math.pi - math.rad(32) -- the last stretch of ramp before it arrives
		end)
	end
	-- Warm light slots under each ring floor's ceiling, on the outer wall.
	for li = 1, 3 do
		local y = LEVELS[li] + 15
		ring(folder, R_WALL - 0.4, R_WALL, y, y + 0.3, { Name = "LightSlot", Material = Enum.Material.Neon, Color = C.Warm, CastShadow = false }, function(a)
			return math.floor(a / (2 * math.pi) * SEG) % 3 ~= 0
		end)
	end
	for li = 1, 3 do
		for k = 0, 5 do
			local a = k / 6 * 2 * math.pi + 0.3
			local holder = Build.part(folder, {
				Name = "RingLight",
				Size = Vector3.new(0.2, 0.2, 0.2),
				CFrame = CFrame.new(at(a, 33, LEVELS[li] + 14)),
				Transparency = 1,
				CanCollide = false,
			})
			Build.pointLight(holder, C.Warm, 24, 0.8)
		end
	end
end

local function spiral(folder)
	local turns = 2
	local steps = 36 * turns
	local rise = LEVELS[3] - LEVELS[1]
	local mid = (R_RAMP + R_RING) / 2
	local function p(k: number): Vector3
		local phi = k / steps * turns * 2 * math.pi
		return at(RAMP_START + phi, mid, LEVELS[1] + rise * k / steps - 0.55)
	end
	for k = 0, steps - 1 do
		local a, b = p(k), p(k + 1)
		local seg = Build.beam(folder, a, b, R_RING - R_RAMP, 1, { Name = "Ramp", Material = Enum.Material.Concrete, Color = C.Floor })
		seg.Size += Vector3.new(0.6, 0, 0.5)
		-- Inner glass balustrade over the shaft.
		local phiA = k / steps * turns * 2 * math.pi
		local phiB = (k + 1) / steps * turns * 2 * math.pi
		local ya = LEVELS[1] + rise * k / steps
		local yb = LEVELS[1] + rise * (k + 1) / steps
		Build.beam(folder, at(RAMP_START + phiA, R_RAMP + 0.2, ya + 1.7), at(RAMP_START + phiB, R_RAMP + 0.2, yb + 1.7), 0.3, 3.4, {
			Name = "RampRail",
			Material = Enum.Material.Glass,
			Color = C.Glass,
			Transparency = 0.65,
			CastShadow = false,
		})
	end
end

function Well.build(root: Instance)
	local folder = Build.folder(root, "TheWell")
	local doorA = math.rad(-90)
	Registry.addHome({
		id = "well",
		name = "The Well",
		center = W + Vector3.new(0, 30, 0),
		spawn = CFrame.lookAt(at(doorA, 32, LEVELS[1] + 3), at(doorA, 0, LEVELS[1] + 3)),
		dock = CFrame.new(W + Vector3.new(0, 8, -92)),
	})

	-- Rock island; a dark pool in the middle of the shaft.
	local terrain = Workspace.Terrain
	terrain:FillCylinder(CFrame.new(W + Vector3.new(0, -18, 0)), 42, 72, Enum.Material.Basalt)
	terrain:FillCylinder(CFrame.new(W + Vector3.new(0, 1, 0)), 4, R_RAMP - 1, Enum.Material.Water)
	for k = 0, 5 do
		local a = k / 6 * 2 * math.pi + 0.5
		terrain:FillBall(at(a, 56, 1), 9, Enum.Material.Snow)
	end
	shell(folder)
	spiral(folder)

	-- The hanging cube of light, held by a beam across the oculus.
	Build.box(folder, W + Vector3.new(-R_OUT, TOP - 1.5, -1), W + Vector3.new(R_OUT, TOP + 0.5, 1), { Name = "Crossbeam", Material = Enum.Material.Concrete, Color = C.ConcreteOut })
	Build.cylinderY(folder, W + Vector3.new(0, (TOP - 1.5 + 36) / 2, 0), TOP - 1.5 - 36, 0.15, { Name = "Cable", Color = C.Metal, CanCollide = false })
	local cubeLight = Build.box(folder, W + Vector3.new(-2.5, 31, -2.5), W + Vector3.new(2.5, 36, 2.5), {
		Name = "LightCube",
		Material = Enum.Material.Neon,
		Color = Color3.fromRGB(255, 214, 160),
	})
	Build.pointLight(cubeLight, C.Warm, 48, 1.6)
	Build.box(folder, W + Vector3.new(-R_RAMP, LEVELS[1] - 2.5, -R_RAMP), W + Vector3.new(R_RAMP, -1.5, R_RAMP), {
		Name = "PoolFloor",
		Material = Enum.Material.Slate,
		Color = Color3.fromRGB(14, 16, 20),
	})

	-- Ground ring: entrance, deed, kitchen, dining.
	local l1 = LEVELS[1]
	Furnish.deed(folder, frameAt(math.rad(-106), 33, l1), "well", "The Well")
	-- Pantry tucked beside the counter so it stays clear of the spiral ramp.
	Furnish.kitchen(folder, frameAt(math.rad(90), 28, l1), "well", {
		pantryA = Vector3.new(-9.6, 0, 1),
		pantryB = Vector3.new(-6.8, 10, 5.5),
	})
	Furnish.dining(folder, frameAt(math.rad(180), 31, l1))
	Furnish.plant(folder, at(math.rad(-70), 35, l1))
	Furnish.plant(folder, at(math.rad(140), 35, l1))
	Furnish.note(folder, at(math.rad(180), 31, l1 + 3), "n8", 0.5)

	-- Fire ring.
	local l2 = LEVELS[2]
	local fireFrame = frameAt(0, 34, l2)
	Furnish.fireplace(folder, fireFrame, "column", "well")
	-- Sofa on the shaft side of the fire, facing out toward it.
	Furnish.lounge(folder, CFrame.lookAt(fireFrame.Position, fireFrame.Position + (fireFrame.Position - Vector3.new(W.X, fireFrame.Position.Y, W.Z))), 12)
	Furnish.bookshelf(folder, frameAt(math.rad(50), 36.4, l2))
	Furnish.plant(folder, at(math.rad(-40), 35, l2))
	Furnish.plant(folder, at(math.rad(150), 35, l2))

	-- Sleeping ring.
	local l3 = LEVELS[3]
	Furnish.bed(folder, frameAt(math.rad(90), 25, l3), "well")
	Furnish.bath(folder, frameAt(math.rad(-150), 27, l3), "well")
	Furnish.plant(folder, at(math.rad(20), 35, l3))
	Furnish.note(folder, at(math.rad(-30), 34, l3), "n9", 1.4)

	-- Pier, bell and boat outside the door.
	Build.box(folder, W + Vector3.new(-5, 3, -66), W + Vector3.new(5, 5, -112), { Name = "Pier", Material = Enum.Material.Concrete, Color = C.ConcreteOut })
	Build.box(folder, W + Vector3.new(-5, 3, -R_OUT - 1), W + Vector3.new(5, LEVELS[1], -66), { Name = "Path", Material = Enum.Material.Concrete, Color = C.ConcreteOut })
	for z = -74, -110, -12 do
		Build.cylinderY(folder, W + Vector3.new(-4, -12, z), 32, 1.8, { Name = "Pile", Material = Enum.Material.Concrete, Color = C.ConcreteDark })
		Build.cylinderY(folder, W + Vector3.new(4, -12, z), 32, 1.8, { Name = "Pile", Material = Enum.Material.Concrete, Color = C.ConcreteDark })
	end
	Furnish.bell(folder, W + Vector3.new(-3.5, 5, -108), "well", CFrame.new(W + Vector3.new(11, 1.2, -95)))
	Furnish.cubeLamp(folder, W + Vector3.new(3.8, 5.7, -110))

	Registry.addInteriorTest("well", "The Well", function(pos: Vector3): boolean
		local d = Vector3.new(pos.X - W.X, 0, pos.Z - W.Z).Magnitude
		return d < R_WALL and pos.Y > -2 and pos.Y < TOP
	end)
end

-- Room name for the HUD.
function Well.roomName(pos: Vector3): string
	if pos.Y < LEVELS[2] - 1 then
		return "The Well · Ground Ring"
	elseif pos.Y < LEVELS[3] - 1 then
		return "The Well · Fire Ring"
	end
	return "The Well · Sleeping Ring"
end

return Well
