--!nonstrict
-- Builds the Ribcage Mansion itself: the concrete spine arch, the hanging ribs
-- and the furnished glass gallery inside the crown.

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local CollectionService = game:GetService("CollectionService")

local Build = require(script.Parent.Build)
local Furnish = require(script.Parent.Furnish)
local Registry = require(script.Parent.Registry)
local Arch = require(ReplicatedStorage:WaitForChild("Shared"):WaitForChild("Arch"))

local Mansion = {}

local C = Build.Color
local A, W, T = Arch.A, Arch.W, Arch.T
local GZ, BZ = Arch.GLASS_Z, Arch.BACK_Z
local STEP_RUN = 1.25
local STEP_RISE = 0.8

local function isGlassFloorX(x: number): boolean
	for _, room in Arch.ROOMS do
		if room.glassFloor and x >= room.x0 and x <= room.x1 then
			return true
		end
	end
	return false
end

----------------------------------------------------------------------------
-- The spine
----------------------------------------------------------------------------

local function concreteColor(y: number): Color3
	-- Darker, wet-stained concrete near the waterline, like the video.
	local k = math.clamp((y - 5) / 45, 0, 1)
	return C.ConcreteDark:Lerp(C.ConcreteOut, k)
end

local function buildSpine(folder: Instance)
	local N = Arch.SEGMENTS
	for i = 0, N - 1 do
		local t1 = math.pi * i / N
		local t2 = math.pi * (i + 1) / N
		local p1, p2 = Arch.point(t1), Arch.point(t2)
		local mid = (p1 + p2) / 2
		local tangent = (p2 - p1).Unit
		local len = (p2 - p1).Magnitude + 1.2
		local normal = Vector3.new(tangent.Y, -tangent.X, 0)
		-- Local X = world Z (spine width), local Y = outward normal, local Z = along the curve.
		local cf = CFrame.fromMatrix(mid, Vector3.zAxis, normal)

		if math.abs(mid.X) < Arch.HABITAT_HALF then
			local glassFloor = isGlassFloorX(mid.X)
			Build.part(folder, {
				Name = "FloorSlab",
				Size = Vector3.new(W, Arch.SLAB, len),
				CFrame = cf * CFrame.new(0, -T / 2 + Arch.SLAB / 2, 0),
				Material = glassFloor and Enum.Material.Glass or Enum.Material.Concrete,
				Color = glassFloor and C.Glass or C.ConcreteOut,
				Transparency = glassFloor and 0.55 or 0,
			})
			Build.part(folder, {
				Name = "RoofSlab",
				Size = Vector3.new(W, Arch.SLAB, len),
				CFrame = cf * CFrame.new(0, T / 2 - Arch.SLAB / 2, 0),
				Material = Enum.Material.Concrete,
				Color = C.ConcreteOut,
			})
			Build.part(folder, {
				Name = "BackWall",
				Size = Vector3.new(2, T - 2 * Arch.SLAB, len),
				CFrame = cf * CFrame.new(W / 2 - 1, 0, 0),
				Material = Enum.Material.Concrete,
				Color = C.ConcreteIn,
			})
			Build.part(folder, {
				Name = "Glass",
				Size = Vector3.new(0.6, T - 2 * Arch.SLAB, len),
				CFrame = cf * CFrame.new(-W / 2 + 0.3, 0, 0),
				Material = Enum.Material.Glass,
				Color = C.Glass,
				Transparency = 0.82,
				CastShadow = false,
			})
			if i % 2 == 0 then
				Build.part(folder, {
					Name = "Mullion",
					Size = Vector3.new(0.8, T - 2 * Arch.SLAB, 0.3),
					CFrame = cf * CFrame.new(-W / 2 + 0.4, 0, len / 2 - 0.6),
					Material = Enum.Material.Metal,
					Color = C.Metal,
				})
			end
		else
			Build.part(folder, {
				Name = "Spine",
				Size = Vector3.new(W, T, len),
				CFrame = cf,
				Material = Enum.Material.Concrete,
				Color = concreteColor(mid.Y),
			})
		end
	end

	-- Legs continue down into the sea.
	for _, side in { -1, 1 } do
		Build.part(folder, {
			Name = "Footing",
			Size = Vector3.new(T, 46, W),
			CFrame = CFrame.new(side * A, -22, 0),
			Material = Enum.Material.Concrete,
			Color = C.ConcreteDark,
		})
	end
end

----------------------------------------------------------------------------
-- The ribs
----------------------------------------------------------------------------

local function ribShape(t: number)
	local attach = Arch.point(t) + Arch.normal(t) * (T / 2 - 3) + Vector3.new(0, 0, -W / 2 + 3)
	local s = math.sin(t)
	local down = attach.Y * 0.58
	local out = 18 + 78 * s ^ 1.3
	return attach, down, out
end

local function buildRibs(folder: Instance)
	local template = Build.asset("Rib")
	for i = 0, Arch.RIB_COUNT - 1 do
		local t = Arch.RIB_T_MIN + (Arch.RIB_T_MAX - Arch.RIB_T_MIN) * i / (Arch.RIB_COUNT - 1)
		local attach, down, out = ribShape(t)
		-- Each rib is its own model so the rib organ can light it up.
		local ribModel = Instance.new("Model")
		ribModel.Name = string.format("Rib%02d", i + 1)
		ribModel:SetAttribute("RibIndex", i + 1)
		ribModel.Parent = folder
		if template then
			-- Blender rib: a quarter-curve normalised to a unit box, root at the
			-- top +Z corner and tip at the bottom -Z corner (see blender/README).
			local center = attach + Vector3.new(0, -down / 2, -out / 2)
			Build.placeAsset(template, ribModel, CFrame.new(center), Vector3.new(6, down, out), {
				Material = Enum.Material.Concrete,
				Color = C.ConcreteOut,
			})
		else
			local SEG = 14
			local prev = attach
			for k = 1, SEG do
				local u = k / SEG
				local a = u * math.pi / 2
				local p = attach + Vector3.new(0, -down * (1 - math.cos(a)), -out * math.sin(a))
				local taper = 1 - (k - 1) / SEG
				local w = 1 + 5.5 * taper
				local d = 1.4 + 7.5 * taper
				local seg = Build.beam(ribModel, prev, p, w, d, {
					Name = "Rib",
					Material = Enum.Material.Concrete,
					Color = C.ConcreteOut,
				}, Vector3.xAxis)
				-- Overlap the joints a little so the curve looks continuous.
				seg.Size += Vector3.new(0, 0, 1)
				prev = p
			end
		end
	end
end

----------------------------------------------------------------------------
-- Rooms
----------------------------------------------------------------------------

local function floorPart(folder: Instance, x0: number, x1: number, z0: number, z1: number, top: number, bottom: number, glass: boolean?)
	return Build.box(folder, Vector3.new(x0, bottom, z0), Vector3.new(x1, top, z1), {
		Name = glass and "GlassFloor" or "Floor",
		Material = glass and Enum.Material.Glass or Enum.Material.Concrete,
		Color = glass and C.Glass or C.Floor,
		Transparency = glass and 0.5 or 0,
		Reflectance = glass and 0 or 0.06,
	})
end

local function seat(folder: Instance, pos: Vector3, look: Vector3, size: Vector3?, color: Color3?)
	return Build.part(folder, {
		ClassName = "Seat",
		Name = "Seat",
		Size = size or Vector3.new(3.6, 1, 3.6),
		CFrame = CFrame.lookAt(pos, pos + look),
		Material = Enum.Material.Fabric,
		Color = color or C.Fabric,
	})
end

local function paperLamp(folder: Instance, base: Vector3, height: number, refs)
	local shade = Build.cylinderY(folder, base + Vector3.new(0, height / 2, 0), height, 1.8, {
		Name = "PaperLamp",
		Material = Enum.Material.SmoothPlastic,
		Color = Color3.fromRGB(255, 226, 180),
		Transparency = 0.05,
	})
	local light = Build.pointLight(shade, C.Warm, 22, 1.4)
	table.insert(refs.lamps, { part = shade, light = light })
	return shade
end

local function cubeLamp(folder: Instance, pos: Vector3, refs)
	local cube = Build.part(folder, {
		Name = "CubeLamp",
		Size = Vector3.new(1.4, 1.4, 1.4),
		CFrame = CFrame.new(pos),
		Material = Enum.Material.SmoothPlastic,
		Color = Color3.fromRGB(255, 220, 170),
	})
	local light = Build.pointLight(cube, C.Warm, 14, 1.2)
	table.insert(refs.lamps, { part = cube, light = light })
	return cube
end

local function surface(refs, x0: number, x1: number, z0: number, z1: number, top: number)
	table.insert(refs.catSurfaces, { x0 = math.min(x0, x1), x1 = math.max(x0, x1), z0 = math.min(z0, z1), z1 = math.max(z0, z1), top = top })
end

local function plant(folder: Instance, base: Vector3, refs)
	local pot = Build.cylinderY(folder, base + Vector3.new(0, 1.2, 0), 2.4, 2.2, {
		Name = "PlantPot",
		Material = Enum.Material.Concrete,
		Color = C.ConcreteIn,
	})
	local leaves = Instance.new("Model")
	leaves.Name = "Leaves"
	local rng = Random.new(math.floor(base.X * 7 + base.Z))
	for i = 1, 7 do
		local a = i / 7 * math.pi * 2
		Build.ellipsoid(leaves, CFrame.new(base + Vector3.new(math.cos(a) * 0.9, 3.2 + rng:NextNumber(0, 1.6), math.sin(a) * 0.9))
			* CFrame.Angles(math.sin(a) * 0.6, a, math.cos(a) * 0.6), Vector3.new(0.9, 0.25, 2.6), {
			Name = "Leaf",
			Color = Color3.fromRGB(58, 92, 60),
			Material = Enum.Material.Grass,
			CanCollide = false,
		})
	end
	leaves.Parent = folder
	table.insert(refs.plants, { pot = pot, leaves = leaves })
end

local function wallStrip(folder: Instance, room, floorY: number)
	local farX = math.abs(room.x0) > math.abs(room.x1) and room.x0 or room.x1
	local y = math.min(floorY + 13, Arch.ceilingAt(farX) - 1.2)
	local strip = Build.box(folder, Vector3.new(room.x0 + 1, y, BZ - 0.4), Vector3.new(room.x1 - 1, y + 0.3, BZ), {
		Name = "LightSlot",
		Material = Enum.Material.Neon,
		Color = C.Warm,
		CastShadow = false,
	})
	Build.surfaceLight(strip, Enum.NormalId.Bottom, C.Warm, 18, 0.9, 70)
end

local function steps(folder: Instance, boundary: number, leftY: number, rightY: number)
	local d = math.abs(leftY - rightY)
	if d < 0.35 then
		return
	end
	local n = math.ceil(d / STEP_RISE)
	local rise = d / n
	local high = math.max(leftY, rightY)
	local low = math.min(leftY, rightY)
	local dir = rightY < leftY and 1 or -1 -- steps go into the lower room
	for k = 1, n - 1 do
		local xa = boundary + dir * (k - 1) * STEP_RUN
		local xb = boundary + dir * k * STEP_RUN
		Build.box(folder, Vector3.new(xa, low - 1, GZ), Vector3.new(xb, high - k * rise, BZ), {
			Name = "Step",
			Material = Enum.Material.Concrete,
			Color = C.Floor,
			Reflectance = 0.05,
		})
	end
end

local DOOR_Z0, DOOR_Z1, DOOR_H = 5, 13, 10

local function partition(folder: Instance, boundary: number, leftY: number, rightY: number, hingeZ: number, refs)
	local low = math.min(leftY, rightY)
	local high = math.max(leftY, rightY)
	local top = Arch.ceilingAt(boundary) + 1
	local props = { Name = "Partition", Material = Enum.Material.Concrete, Color = C.ConcreteIn }
	Build.box(folder, Vector3.new(boundary - 0.5, low - 1, GZ), Vector3.new(boundary + 0.5, top, DOOR_Z0), props)
	Build.box(folder, Vector3.new(boundary - 0.5, low - 1, DOOR_Z1), Vector3.new(boundary + 0.5, top, BZ), props)
	Build.box(folder, Vector3.new(boundary - 0.5, high + DOOR_H, DOOR_Z0), Vector3.new(boundary + 0.5, top, DOOR_Z1), props)

	-- A tall timber door that swings into the higher room.
	local dir = hingeZ == DOOR_Z0 and 1 or -1
	local hinge = CFrame.new(boundary, high + DOOR_H / 2, hingeZ)
	local closed = hinge * CFrame.new(0, 0, dir * 4)
	local swingSign = rightY < leftY and 1 or -1 -- open toward the higher (left) room
	local open = hinge * CFrame.Angles(0, -dir * swingSign * math.pi / 2, 0) * CFrame.new(0, 0, dir * 4)
	local door = Build.part(folder, {
		Name = "Door",
		Size = Vector3.new(0.6, DOOR_H, 8),
		CFrame = closed,
		Material = Enum.Material.Wood,
		Color = C.Wood,
	})
	Build.part(door, {
		Name = "Handle",
		Size = Vector3.new(1.2, 0.3, 0.3),
		CFrame = closed * CFrame.new(0, 0, dir * 3.2),
		Material = Enum.Material.Metal,
		Color = C.Metal,
		CanCollide = false,
	})
	table.insert(refs.doors, { part = door, closed = closed, open = open })
end

local function roomFurniture(folder: Instance, room, L: number, refs)
	local id = room.id
	local function v(x: number, y: number, z: number): Vector3
		return Vector3.new(x, L + y, z)
	end

	if id == "station" then
		-- Funicular doors set into the west end.
		local door = Build.box(folder, v(-111.6, 0, -6), v(-110.8, 11, 6), {
			Name = "FunicularDoor",
			Material = Enum.Material.Metal,
			Color = C.Metal,
		})
		for _, z in { -6.4, 6.4 } do
			Build.box(folder, v(-111.4, 0, z - 0.2), v(-110.6, 11.4, z + 0.2), {
				Name = "DoorFrameLight",
				Material = Enum.Material.Neon,
				Color = C.Warm,
			})
		end
		refs.funicularTop = door
		refs.funicularTopArrive = CFrame.new(v(-105, 3, 0)) * CFrame.Angles(0, -math.pi / 2, 0)

		-- Bench along the glass and a parka rack on the back wall.
		surface(refs, -108, -101, -16.6, -13.6, L + 1.8)
		refs.catSpots.window = v(-104, 1.8, -15)
		Furnish.note(folder, v(-102.4, 1.8, -15.2), "n1", 0.3)
		refs.deedFrame = CFrame.new(v(-99, 0, -6)) * CFrame.Angles(0, math.pi / 2, 0)
		plant(folder, v(-98, 0, 14), refs)
		Build.box(folder, v(-108, 0, -16.6), v(-101, 1.8, -13.6), {
			Name = "Bench",
			Material = Enum.Material.Wood,
			Color = C.Wood,
		})
		local rack = Build.box(folder, v(-108, 7, 15.2), v(-101, 7.4, 15.6), {
			Name = "ParkaRack",
			Material = Enum.Material.Metal,
			Color = C.Metal,
		})
		local parkaColors = { Color3.fromRGB(190, 70, 40), Color3.fromRGB(230, 230, 225), Color3.fromRGB(40, 50, 60) }
		for i, col in parkaColors do
			Build.box(folder, v(-107.5 + i * 1.8, 2.6, 14.4), v(-106.3 + i * 1.8, 7, 15.4), {
				Name = "Parka",
				Material = Enum.Material.Fabric,
				Color = col,
			})
		end
		refs.parkaRack = rack

		-- A climbable steel truss up to the roof hatch.
		local ceil = Arch.ceilingAt(-104)
		local trussHeight = 2 * math.floor((ceil - L) / 2)
		local truss = Instance.new("TrussPart")
		truss.Name = "HatchLadder"
		truss.Size = Vector3.new(2, trussHeight, 2)
		truss.CFrame = CFrame.new(-104, L + trussHeight / 2, 11)
		truss.Anchored = true
		truss.Material = Enum.Material.Metal
		truss.Color = C.Metal
		truss.Parent = folder
		local hatch = Build.box(folder, Vector3.new(-106, ceil - 0.4, 8.5), Vector3.new(-102, ceil, 13.5), {
			Name = "RoofHatch",
			Material = Enum.Material.Metal,
			Color = C.Metal,
		})
		refs.hatch = hatch
		local roofX = -100
		refs.roofArrive = CFrame.new(roofX, Arch.yAt(roofX) + T / 2 * math.sqrt(1 + Arch.slope(roofX) ^ 2) + 4, 4)
	elseif id == "lounge" then
		for _, x in { -80, -73 } do
			Build.box(folder, v(x - 2, 0, -15), v(x + 2, 0.8, -8), {
				Name = "ChaiseBase",
				Material = Enum.Material.Wood,
				Color = C.Wood,
			})
			seat(folder, v(x, 1.3, -11.5), -Vector3.zAxis, Vector3.new(3.8, 1, 6.8))
			Build.box(folder, v(x - 2, 0.8, -9), v(x + 2, 3.6, -8), {
				Name = "ChaiseBack",
				Material = Enum.Material.Fabric,
				Color = C.Fabric,
			})
		end
		Build.box(folder, v(-77.8, 0, -7), v(-75.2, 2.6, -4.4), {
			Name = "SideTable",
			Material = Enum.Material.Marble,
			Color = C.Marble,
		})
		Build.ellipsoid(folder, CFrame.new(v(-76.5, 3.1, -5.7)), Vector3.new(1.6, 1, 1.6), {
			Name = "Bowl",
			Material = Enum.Material.Slate,
			Color = Color3.fromRGB(60, 50, 44),
		})
		-- Glass of red wine.
		Build.cylinderY(folder, v(-75.9, 3.2, -4.9), 1.2, 0.18, { Name = "WineStem", Material = Enum.Material.Glass, Transparency = 0.5, CanCollide = false })
		Build.cylinderY(folder, v(-75.9, 3.9, -4.9), 0.5, 0.6, { Name = "Wine", Color = Color3.fromRGB(90, 10, 20), CanCollide = false })
		paperLamp(folder, v(-84, 0, 14), 6, refs)
		refs.glassFloorCenter = v(-76, 0, -4)
		refs.catSpots.glassfloor = v(-68, 0, -4)

		-- The rib organ: seven brass keys, one for each group of ribs outside.
		Build.box(folder, v(-80, 0, 13.4), v(-71, 3.4, BZ), { Name = "OrganConsole", Material = Enum.Material.Concrete, Color = C.ConcreteIn })
		local panel = Build.box(folder, v(-79.6, 3.4, 13.6), v(-71.4, 3.5, 15.8), {
			Name = "OrganPanel",
			Material = Enum.Material.SmoothPlastic,
			Color = Color3.fromRGB(30, 26, 22),
		})
		CollectionService:AddTag(panel, "RibOrgan")
		Registry.misc.organPanel = panel
		for k = 0, 6 do
			local h = 6 + k * 1.4
			Build.cylinderY(folder, v(-79 + k * 1.2, 3.4 + h / 2, 15.6), h, 0.7, {
				Name = "OrganPipe",
				Material = Enum.Material.Metal,
				Color = Color3.fromRGB(176, 140, 82),
				CanCollide = false,
			})
		end
		surface(refs, -82, -71, -15, -8, L + 1.8)
		plant(folder, v(-83, 0, 4), refs)
	elseif id == "pool" then
		refs.poolRoom = room
		local wMin, wMax = Arch.poolWater()
		refs.poolMin, refs.poolMax = wMin, wMax
		local rimTop = wMax.Y + 0.3
		local rim = { Name = "PoolRim", Material = Enum.Material.Concrete, Color = C.ConcreteIn }
		Build.box(folder, Vector3.new(wMin.X - 1, wMin.Y, wMax.Z), Vector3.new(wMax.X + 1, rimTop, wMax.Z + 0.6), rim)
		Build.box(folder, Vector3.new(wMin.X - 1, wMin.Y, GZ), Vector3.new(wMax.X + 1, rimTop, wMin.Z), rim)
		Build.box(folder, Vector3.new(wMin.X - 1, wMin.Y, GZ), Vector3.new(wMin.X, rimTop, wMax.Z + 0.6), rim)
		Build.box(folder, Vector3.new(wMax.X, wMin.Y, GZ), Vector3.new(wMax.X + 1, rimTop, wMax.Z + 0.6), rim)
		Build.box(folder, Vector3.new(wMin.X, wMin.Y - 1, wMin.Z), Vector3.new(wMax.X, wMin.Y, wMax.Z), {
			Name = "PoolBottom",
			Material = Enum.Material.Slate,
			Color = Color3.fromRGB(26, 30, 34),
		})
		-- Underwater glow.
		local glow = Build.box(folder, Vector3.new(wMin.X + 1, wMin.Y, wMax.Z + 0.6), Vector3.new(wMax.X - 1, wMin.Y + 0.3, wMax.Z + 0.8), {
			Name = "PoolLight",
			Material = Enum.Material.Neon,
			Color = Color3.fromRGB(150, 200, 255),
			Transparency = 0.3,
		})
		Build.surfaceLight(glow, Enum.NormalId.Front, Color3.fromRGB(150, 200, 255), 12, 0.8)
		-- Towels on a bench.
		Build.box(folder, v(-40, 0, 13), v(-30, 1.6, 15.6), { Name = "Bench", Material = Enum.Material.Wood, Color = C.Wood })
		Build.box(folder, v(-38, 1.6, 13.4), v(-35, 2.2, 15.2), { Name = "Towels", Material = Enum.Material.Fabric, Color = Color3.fromRGB(80, 74, 70) })
		Furnish.note(folder, v(-32.5, 1.6, 14.3), "n10", -0.2)
	elseif id == "gallery" then
		-- Long low sofa with its back to the glass.
		Build.box(folder, v(-10, 0, -17.2), v(22, 1.2, -10.6), { Name = "SofaPlinth", Material = Enum.Material.Wood, Color = C.Wood })
		Build.box(folder, v(-10, 1.2, -17.2), v(22, 4.4, -15.6), { Name = "SofaBack", Material = Enum.Material.Fabric, Color = C.Fabric })
		for x = -8, 20, 4 do
			seat(folder, v(x, 1.7, -13), Vector3.zAxis, Vector3.new(3.9, 1, 4.6))
		end
		-- Black marble coffee table and a stone bowl.
		Build.box(folder, v(0, 0, -9), v(10, 2.4, -3), { Name = "CoffeeTable", Material = Enum.Material.Marble, Color = C.Marble })
		Build.ellipsoid(folder, CFrame.new(v(3, 2.9, -6)), Vector3.new(2, 1.2, 2), {
			Name = "Bowl",
			Material = Enum.Material.Slate,
			Color = Color3.fromRGB(70, 58, 50),
		})
		Build.box(folder, v(-6, 0.01, -9.5), v(14, 0.1, 2), { Name = "Rug", Material = Enum.Material.Fabric, Color = Color3.fromRGB(58, 52, 48), CanCollide = false })
		-- Paper floor lamps.
		paperLamp(folder, v(-12, 0, -15), 7, refs)
		paperLamp(folder, v(24, 0, -15), 7, refs)
		paperLamp(folder, v(-12, 0, 13), 7, refs)

		-- The suspended fireplace.
		local fx, fz = 28, -3
		local bowlCenter = v(fx, 5.5, fz)
		local ceil = Arch.ceilingAt(fx)
		Build.cylinderY(folder, Vector3.new(fx, (bowlCenter.Y + 3 + ceil) / 2, fz), ceil - bowlCenter.Y - 3, 1.4, {
			Name = "Flue",
			Material = Enum.Material.Metal,
			Color = C.Metal,
		})
		local template = Build.asset("Fireplace")
		local facing = CFrame.new(bowlCenter) * CFrame.Angles(0, math.pi / 2, 0) -- opening faces -X, toward the sofa
		if template then
			-- Mesh is a bowl with a neck on top; its bounding box centre sits 3 studs above the bowl centre.
			Build.placeAsset(template, folder, facing * CFrame.new(0, 3, 0), Vector3.new(8, 12.4, 7.7))
		else
			Build.ellipsoid(folder, facing, Vector3.new(8, 6.5, 8), { Name = "FireBowl", Material = Enum.Material.Metal, Color = C.Metal })
			Build.ellipsoid(folder, facing * CFrame.new(0, -0.4, -2.6), Vector3.new(5.4, 3, 3.4), {
				Name = "FireMouth",
				Material = Enum.Material.Neon,
				Color = Color3.fromRGB(255, 120, 40),
			})
		end
		local core = Build.part(folder, {
			Name = "FireCore",
			Size = Vector3.new(2, 1, 2),
			CFrame = facing * CFrame.new(0, -0.6, -3.2),
			Transparency = 1,
			CanCollide = false,
		})
		local fire = Instance.new("Fire")
		fire.Size = 4
		fire.Heat = 4
		fire.Color = Color3.fromRGB(255, 140, 50)
		fire.SecondaryColor = Color3.fromRGB(255, 60, 10)
		fire.Parent = core
		local fireLight = Build.pointLight(core, Color3.fromRGB(255, 150, 70), 32, 2.4)
		local embers = Instance.new("ParticleEmitter")
		embers.Rate = 6
		embers.Lifetime = NumberRange.new(1, 2)
		embers.Speed = NumberRange.new(2, 4)
		embers.SpreadAngle = Vector2.new(25, 25)
		embers.Size = NumberSequence.new(0.15, 0)
		embers.LightEmission = 1
		embers.Color = ColorSequence.new(Color3.fromRGB(255, 160, 60))
		embers.Parent = core
		refs.fire = { core = core, fire = fire, light = fireLight, embers = embers }
		refs.fireplacePos = core.Position

		-- Concierge tablet for upgrades.
		local tablet = Build.box(folder, v(10, 4, BZ - 0.3), v(14, 7, BZ), { Name = "ConciergeTablet", Material = Enum.Material.Glass, Color = C.Metal })
		local screen = Build.box(folder, v(10.3, 4.3, BZ - 0.4), v(13.7, 6.7, BZ - 0.3), {
			Name = "Screen",
			Material = Enum.Material.Neon,
			Color = Color3.fromRGB(120, 170, 220),
		})
		local gui = Instance.new("SurfaceGui")
		gui.Face = Enum.NormalId.Front
		gui.SizingMode = Enum.SurfaceGuiSizingMode.PixelsPerStud
		gui.PixelsPerStud = 50
		gui.Parent = screen
		local label = Instance.new("TextLabel")
		label.Size = UDim2.fromScale(1, 1)
		label.BackgroundTransparency = 1
		label.Text = "CONCIERGE\nupgrades"
		label.TextScaled = true
		label.Font = Enum.Font.GothamMedium
		label.TextColor3 = Color3.fromRGB(20, 30, 40)
		label.Parent = gui
		refs.tablet = tablet

		-- Bookshelf on the back wall.
		local shelf = Build.box(folder, v(-6, 0, 14.4), v(4, 9, BZ), { Name = "Bookshelf", Material = Enum.Material.Wood, Color = C.Wood })
		local bookRng = Random.new(11)
		for row = 0, 2 do
			local y = 0.4 + row * 3
			Build.box(folder, v(-6, y + 2.6, 14.3), v(4, y + 2.8, BZ), { Name = "Shelf", Material = Enum.Material.Wood, Color = C.Wood })
			local x = -5.6
			while x < 3.4 do
				local w = bookRng:NextNumber(0.3, 0.6)
				local h = bookRng:NextNumber(1.6, 2.4)
				local tone = bookRng:NextNumber(0.25, 0.75)
				Build.box(folder, v(x, y + 0.2, 14.0), v(x + w, y + 0.2 + h, 14.8), {
					Name = "Book",
					Color = Color3.new(tone * 0.9, tone * 0.75, tone * 0.6),
					CanCollide = false,
				})
				x += w + 0.05
			end
		end
		refs.bookshelf = shelf

		-- Record player cabinet (works for players who own the upgrade).
		Build.box(folder, v(17, 0, 13.4), v(22, 2.6, BZ), { Name = "RecordCabinet", Material = Enum.Material.Wood, Color = C.Wood })
		local platter = Build.cylinderY(folder, v(19.5, 2.75, 14.8), 0.3, 2.2, { Name = "RecordPlayer", Material = Enum.Material.Metal, Color = C.Metal })
		Build.cylinderY(folder, v(19.5, 2.95, 14.8), 0.1, 1.9, { Name = "Record", Color = Color3.fromRGB(12, 12, 12), CanCollide = false })
		refs.recordPlayer = platter

		-- Log basket and Mochi's bed by the fire.
		local basket = Build.cylinderY(folder, v(33, 0.9, -9), 1.8, 2.6, { Name = "LogBasket", Material = Enum.Material.Fabric, Color = Color3.fromRGB(70, 60, 50) })
		for i = 1, 3 do
			Build.beam(folder, v(32.2 + i * 0.4, 2, -9.8), v(32.2 + i * 0.4, 2.2, -8.2), 0.5, 0.5, { Name = "Log", Material = Enum.Material.Wood, Color = Color3.fromRGB(96, 70, 48), CanCollide = false })
		end
		refs.logBasket = basket
		Build.ellipsoid(folder, CFrame.new(v(33, 0.3, 4)), Vector3.new(4, 0.6, 3.4), { Name = "CatBed", Material = Enum.Material.Fabric, Color = Color3.fromRGB(150, 120, 96), CanCollide = false })
		refs.catSpots.firebed = v(33, 0.6, 4)
		refs.catSpots.sofa = v(14, 2.2, -13)
		refs.catSpots.rug = v(5, 0.1, 0)
		surface(refs, -10, 22, -15.6, -10.6, L + 2.2)
		surface(refs, 0, 10, -9, -3, L + 2.4)
		surface(refs, 31, 35, 2.3, 5.7, L + 0.6)
		plant(folder, v(-12, 0, 6), refs)
		plant(folder, v(36, 0, 14), refs)
		refs.galleryCenter = v(8, 0, 0)
	elseif id == "galley" then
		Build.box(folder, v(46, 0, -2), v(56, 3.6, 4), { Name = "KitchenIsland", Material = Enum.Material.Marble, Color = C.Marble })
		for _, x in { 48, 51, 54 } do
			Build.cylinderY(folder, v(x, 1.2, -4.5), 2.4, 0.4, { Name = "StoolLeg", Material = Enum.Material.Metal, Color = C.Metal })
			seat(folder, v(x, 2.7, -4.5), Vector3.zAxis, Vector3.new(1.8, 0.6, 1.8), C.Wood)
		end
		local counter = Build.box(folder, v(46, 0, 12), v(58, 3.6, BZ), { Name = "Counter", Material = Enum.Material.Marble, Color = C.Marble })
		local stove = Build.box(folder, v(48, 3.6, 12.6), v(52, 3.7, 15.4), { Name = "Stove", Material = Enum.Material.Glass, Color = Color3.fromRGB(10, 10, 10) })
		for _, dx in { 49, 51 } do
			Build.cylinderY(folder, v(dx, 3.72, 14), 0.05, 1.4, { Name = "Ring", Material = Enum.Material.Neon, Color = Color3.fromRGB(255, 60, 30), CanCollide = false })
		end
		local kettle = Build.cylinderY(folder, v(53.6, 4.4, 14), 1.6, 1.4, { Name = "Kettle", Material = Enum.Material.Metal, Color = Color3.fromRGB(150, 150, 150) })
		local fridge = Build.box(folder, v(41.5, 0, 11), v(45.5, 9, BZ), { Name = "Fridge", Material = Enum.Material.Metal, Color = Color3.fromRGB(40, 40, 42) })
		Build.box(folder, v(41.3, 4, 11.5), v(41.5, 8, 11.8), { Name = "FridgeHandle", Material = Enum.Material.Metal, Color = Color3.fromRGB(160, 160, 160) })
		-- Pendant lights over the island.
		for _, x in { 48, 54 } do
			local pendant = Build.ellipsoid(folder, CFrame.new(v(x, 9, 1)), Vector3.new(1.6, 1.2, 1.6), {
				Name = "Pendant",
				Material = Enum.Material.Neon,
				Color = C.Warm,
			})
			Build.cylinderY(folder, Vector3.new(x, (L + 9.6 + Arch.ceilingAt(x)) / 2, 1), Arch.ceilingAt(x) - (L + 9.6), 0.1, {
				Name = "Cord",
				Color = C.Metal,
				CanCollide = false,
			})
			table.insert(refs.lamps, { part = pendant, light = Build.pointLight(pendant, C.Warm, 16, 1) })
		end
		refs.stove = stove
		refs.kettle = kettle
		refs.fridge = fridge
		refs.counter = counter
		local coffee = Build.box(folder, v(55.6, 3.6, 13), v(57.6, 6.4, 15.6), { Name = "CoffeeMachine", Material = Enum.Material.Metal, Color = Color3.fromRGB(30, 30, 32) })
		Build.box(folder, v(55.9, 4.8, 12.8), v(57.3, 5, 13), { Name = "CoffeeLight", Material = Enum.Material.Neon, Color = C.Warm, CanCollide = false })
		local oven = Build.box(folder, v(48.2, 0.6, 11.85), v(51.8, 3, 12), { Name = "Oven", Material = Enum.Material.Glass, Color = Color3.fromRGB(20, 18, 16), Transparency = 0.1 })
		Build.box(folder, v(48.6, 2.6, 11.7), v(51.4, 2.75, 11.85), { Name = "OvenHandle", Material = Enum.Material.Metal, Color = Color3.fromRGB(150, 150, 150), CanCollide = false })
		local pantry = Build.box(folder, v(58.6, 0, 12.6), v(61.6, 10, BZ), { Name = "Pantry", Material = Enum.Material.Wood, Color = C.Wood })
		local sinkTop = Build.box(folder, v(52.4, 3.6, -1.4), v(55.4, 3.7, 2.6), { Name = "GalleySink", Material = Enum.Material.Slate, Color = Color3.fromRGB(36, 36, 38) })
		Build.cylinderY(folder, v(53.9, 4.6, 3.2), 2, 0.25, { Name = "Tap", Material = Enum.Material.Metal, Color = Color3.fromRGB(150, 150, 150), CanCollide = false })
		local steam = Instance.new("ParticleEmitter")
		steam.Name = "Steam"
		steam.Enabled = false
		steam.Rate = 14
		steam.Lifetime = NumberRange.new(1.5, 2.5)
		steam.Speed = NumberRange.new(1.5, 3)
		steam.SpreadAngle = Vector2.new(15, 15)
		steam.EmissionDirection = Enum.NormalId.Top
		steam.Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.6), NumberSequenceKeypoint.new(1, 2.4) })
		steam.Transparency = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.6), NumberSequenceKeypoint.new(1, 1) })
		steam.Color = ColorSequence.new(Color3.fromRGB(235, 235, 240))
		steam.Parent = stove
		local bowl = Build.cylinderY(folder, v(43.2, 0.25, 8.6), 0.5, 1.4, { Name = "CatBowl", Material = Enum.Material.Metal, Color = Color3.fromRGB(170, 60, 50) })
		Build.cylinderY(folder, v(44.9, 0.25, 8.6), 0.5, 1.4, { Name = "WaterBowl", Material = Enum.Material.Metal, Color = Color3.fromRGB(60, 110, 170), CanCollide = false })
		local food = Build.cylinderY(folder, v(43.2, 0.55, 8.6), 0.15, 1.1, { Name = "Kibble", Color = Color3.fromRGB(130, 90, 50), CanCollide = false, Transparency = 1 })
		refs.coffee = coffee
		refs.oven = oven
		refs.pantry = pantry
		refs.galleySink = sinkTop
		refs.steam = steam
		refs.catBowl = bowl
		refs.kibble = food
		refs.dishSpot = v(49.5, 3.6, 1)
		refs.catSpots.bowl = v(43.2, 0, 7)
		refs.catSpots.counter = v(47, 3.6, 2.5)
		surface(refs, 46, 56, -2, 4, L + 3.6)
		plant(folder, v(42.5, 0, -15), refs)
	elseif id == "bedroom" then
		Build.box(folder, v(70, 0, 2), v(82, 1.4, BZ), { Name = "BedPlinth", Material = Enum.Material.Concrete, Color = C.ConcreteIn })
		local bed = Build.box(folder, v(70.4, 1.4, 2.4), v(81.6, 2.8, BZ - 0.4), { Name = "Mattress", Material = Enum.Material.Fabric, Color = Color3.fromRGB(64, 58, 54) })
		local duvet = Build.box(folder, v(70.4, 2.8, 2.4), v(81.6, 3.1, 11), { Name = "Duvet", Material = Enum.Material.Fabric, Color = Color3.fromRGB(78, 70, 64) })
		refs.duvet = duvet
		refs.duvetTidy = duvet.CFrame
		refs.duvetMessy = duvet.CFrame * CFrame.new(1.2, 0.25, -1.5) * CFrame.Angles(0.06, 0.35, -0.05)
		surface(refs, 70, 82, 2, BZ, L + 3.1)
		refs.catSpots.bed = v(76, 3.1, 7)
		Furnish.note(folder, v(85, 0, -12), "n2", 0.7)
		plant(folder, v(68.5, 0, -15), refs)
		for _, x in { 73, 79 } do
			Build.box(folder, v(x - 2.2, 2.8, 12.6), v(x + 2.2, 3.9, 15)
			, { Name = "Pillow", Material = Enum.Material.Fabric, Color = Color3.fromRGB(96, 88, 82) })
		end
		Build.box(folder, v(70, 1.4, BZ - 0.6), v(82, 6, BZ), { Name = "Headboard", Material = Enum.Material.Wood, Color = C.Wood })
		for _, x in { 68.4, 83.6 } do
			Build.box(folder, v(x - 0.8, 0, 13.6), v(x + 0.8, 2.2, 15.2), { Name = "Nightstand", Material = Enum.Material.Concrete, Color = C.ConcreteIn })
			cubeLamp(folder, v(x, 2.9, 14.4), refs)
		end
		refs.bed = bed
	elseif id == "bath" then
		-- Rain shower in the back corner behind a glass screen.
		Build.box(folder, v(104, 0, 8), v(111, 0.2, BZ), { Name = "ShowerTray", Material = Enum.Material.Slate, Color = Color3.fromRGB(40, 40, 42) })
		Build.box(folder, v(103.8, 0, 8), v(104.2, 11, 12.5), { Name = "ShowerScreen", Material = Enum.Material.Glass, Color = C.Glass, Transparency = 0.7 })
		local head = Build.cylinderY(folder, v(107.5, 11.5, 12), 0.3, 2.4, { Name = "ShowerHead", Material = Enum.Material.Metal, Color = C.Metal })
		local rain = Instance.new("ParticleEmitter")
		rain.Name = "Rain"
		rain.Enabled = false
		rain.Rate = 160
		rain.Lifetime = NumberRange.new(0.5, 0.6)
		rain.Speed = NumberRange.new(20, 22)
		rain.EmissionDirection = Enum.NormalId.Left -- the cylinder's local -X points down
		rain.SpreadAngle = Vector2.new(6, 6)
		rain.Size = NumberSequence.new(0.06)
		rain.Transparency = NumberSequence.new(0.3)
		rain.Color = ColorSequence.new(Color3.fromRGB(210, 225, 240))
		rain.Parent = head
		local slot = Build.box(folder, v(106, 11.8, BZ - 0.3), v(109, 12.0, BZ), { Name = "ShowerLight", Material = Enum.Material.Neon, Color = Color3.fromRGB(230, 236, 255) })
		Build.surfaceLight(slot, Enum.NormalId.Bottom, Color3.fromRGB(230, 236, 255), 14, 1.2, 60)
		-- Stone trough sink.
		local sink = Build.box(folder, v(97.5, 3, 13), v(102.5, 4.4, BZ), { Name = "Sink", Material = Enum.Material.Slate, Color = Color3.fromRGB(46, 42, 40) })
		Build.box(folder, v(97.5, 0, 14.4), v(102.5, 3, BZ), { Name = "Vanity", Material = Enum.Material.Wood, Color = C.Wood })
		Build.box(folder, v(98, 6, BZ - 0.2), v(102, 11, BZ), { Name = "Mirror", Material = Enum.Material.Glass, Color = Color3.fromRGB(200, 210, 220), Reflectance = 0.6 })
		Build.box(folder, v(100, 0, -16.8), v(108, 1.8, -14), { Name = "Bench", Material = Enum.Material.Wood, Color = C.Wood })
		Build.box(folder, v(101, 1.8, -16.4), v(104, 2.4, -14.4), { Name = "Towels", Material = Enum.Material.Fabric, Color = Color3.fromRGB(70, 64, 60) })
		refs.showerHead = head
		plant(folder, v(110.4, 0, -15), refs)
		refs.shower = rain
		refs.sink = sink
	end
end

local function buildRooms(folder: Instance, refs)
	local levels = {}
	for i, room in Arch.ROOMS do
		local L = Arch.roomFloor(room)
		levels[i] = L
		local farX = math.abs(room.x0) > math.abs(room.x1) and room.x0 or room.x1
		local bottom = Arch.slabTop(farX) - 1
		local roomFolder = Build.folder(folder, room.name)
		if room.id == "pool" then
			local wMin, wMax = Arch.poolWater()
			-- Walkway behind the pool and solid ends beside it.
			floorPart(roomFolder, room.x0, room.x1, wMax.Z + 0.6, BZ, L, bottom)
			floorPart(roomFolder, room.x0, wMin.X - 1, GZ, wMax.Z + 0.6, L, bottom)
			floorPart(roomFolder, wMax.X + 1, room.x1, GZ, wMax.Z + 0.6, L, bottom)
			floorPart(roomFolder, wMin.X - 1, wMax.X + 1, GZ, wMax.Z + 0.6, wMin.Y - 1, bottom)
		elseif room.glassFloor then
			floorPart(roomFolder, room.x0, room.x1, GZ, BZ, L, L - 1, true)
		else
			floorPart(roomFolder, room.x0, room.x1, GZ, BZ, L, bottom)
		end
		wallStrip(roomFolder, room, L)
		roomFurniture(roomFolder, room, L, refs)
		refs.levels[room.id] = L
	end

	-- Steps and doors between rooms.
	for i = 1, #Arch.ROOMS - 1 do
		local left, right = Arch.ROOMS[i], Arch.ROOMS[i + 1]
		local b = left.x1
		steps(folder, b, levels[i], levels[i + 1])
		if right.id == "bedroom" then
			partition(folder, b, levels[i], levels[i + 1], DOOR_Z0, refs)
		elseif right.id == "bath" then
			partition(folder, b, levels[i], levels[i + 1], DOOR_Z1, refs)
		end
	end
end

function Mansion.build(root: Instance)
	local refs: any = { lamps = {}, doors = {}, levels = {}, plants = {}, catSpots = {}, catSurfaces = {} }
	local mansion = Build.folder(root, "Mansion")
	buildSpine(Build.folder(mansion, "Spine"))
	buildRibs(Build.folder(mansion, "Ribs"))
	buildRooms(Build.folder(mansion, "Interior"), refs)

	-- Fill the lap pool with real (swimmable) water.
	local wMin, wMax = Arch.poolWater()
	workspace.Terrain:FillBlock(CFrame.new((wMin + wMax) / 2), wMax - wMin, Enum.Material.Water)

	-- Telescope stand on the roof (shown when a player owns the upgrade).
	local tx = 6
	local roofY = Arch.yAt(tx) + T / 2 * math.sqrt(1 + Arch.slope(tx) ^ 2)
	local telescope = Instance.new("Model")
	telescope.Name = "Telescope"
	local stand = Build.cylinderY(telescope, Vector3.new(tx, roofY + 2, -6), 4, 0.5, { Name = "Stand", Material = Enum.Material.Metal, Color = C.Metal })
	Build.beam(telescope, Vector3.new(tx, roofY + 4, -6), Vector3.new(tx + 1, roofY + 6, -12), 1, 1, {
		Name = "Tube",
		Material = Enum.Material.Metal,
		Color = Color3.fromRGB(180, 140, 70),
	})
	telescope.PrimaryPart = stand
	telescope.Parent = mansion
	refs.telescope = stand
	refs.roofY = roofY
	Furnish.note(mansion, Vector3.new(12, roofY, 3), "n3", 1.1)

	-- Register everything with the shared registry so gameplay can use it.
	Registry.addHome({
		id = "ribcage",
		name = "The Ribcage",
		center = refs.galleryCenter + Vector3.new(0, 6, 0),
		spawn = CFrame.new(refs.galleryCenter + Vector3.new(-4, 3, 4)),
		dock = CFrame.new(-248, 11, -96),
	})
	Furnish.deed(mansion, refs.deedFrame, "ribcage", "The Ribcage")
	table.insert(Registry.kitchens, {
		home = "ribcage",
		stove = refs.stove,
		oven = refs.oven,
		coffee = refs.coffee,
		kettle = refs.kettle,
		fridge = refs.fridge,
		pantry = refs.pantry,
		sink = refs.galleySink,
		dishSpot = refs.dishSpot,
		steam = refs.steam,
		dirty = 0,
		dishParts = {},
	})
	local f = refs.fire
	table.insert(Registry.fires, {
		home = "ribcage",
		core = f.core,
		fire = f.fire,
		light = f.light,
		embers = f.embers,
		basket = refs.logBasket,
		fuel = 80,
		baseSize = f.fire.Size,
	})
	table.insert(Registry.beds, {
		home = "ribcage",
		mattress = refs.bed,
		duvet = refs.duvet,
		tidy = refs.duvetTidy,
		messy = refs.duvetMessy,
		messyNow = false,
	})
	table.insert(Registry.showers, { home = "ribcage", head = refs.showerHead, rain = refs.shower })
	table.insert(Registry.sinks, refs.sink)
	table.insert(Registry.bookshelves, refs.bookshelf)
	for _, p in refs.plants do
		table.insert(Registry.plants, p)
	end
	for _, l in refs.lamps do
		table.insert(Registry.lamps, l)
	end
	for _, d in refs.doors do
		table.insert(Registry.doors, d)
	end
	Registry.addInteriorTest("ribcage", "The Ribcage", function(pos: Vector3): boolean
		return Arch.roomAt(pos) ~= nil
	end)

	return refs
end

return Mansion
