--!nonstrict
-- The world around the mansion: the Southern Ocean, the rock the west leg
-- stands on, the dock, ice floes, the night sea ice, lighting and fog.

local Lighting = game:GetService("Lighting")
local PhysicsService = game:GetService("PhysicsService")
local Workspace = game:GetService("Workspace")

local Build = require(script.Parent.Build)
local Furnish = require(script.Parent.Furnish)
local Registry = require(script.Parent.Registry)

local World = {}

local C = Build.Color

local function setupLighting()
	pcall(function()
		(Lighting :: any).Technology = Enum.Technology.Future
	end)
	Lighting.Ambient = Color3.fromRGB(40, 46, 58)
	Lighting.OutdoorAmbient = Color3.fromRGB(96, 108, 130)
	Lighting.Brightness = 1.6
	Lighting.EnvironmentDiffuseScale = 0.6
	Lighting.EnvironmentSpecularScale = 0.8
	Lighting.GlobalShadows = true
	Lighting.ShadowSoftness = 0.4
	Lighting.GeographicLatitude = -70

	for _, child in Lighting:GetChildren() do
		if child:IsA("Sky") or child:IsA("Atmosphere") or child:IsA("PostEffect") then
			child:Destroy()
		end
	end

	local atmosphere = Instance.new("Atmosphere")
	atmosphere.Density = 0.42
	atmosphere.Offset = 0.2
	atmosphere.Color = Color3.fromRGB(170, 186, 208)
	atmosphere.Decay = Color3.fromRGB(80, 98, 128)
	atmosphere.Glare = 0
	atmosphere.Haze = 2.2
	atmosphere.Parent = Lighting

	local sky = Instance.new("Sky")
	sky.CelestialBodiesShown = true
	sky.StarCount = 2500
	sky.SunAngularSize = 14
	sky.MoonAngularSize = 9
	sky.Parent = Lighting

	local cc = Instance.new("ColorCorrectionEffect")
	cc.Name = "Grade"
	cc.Contrast = 0.08
	cc.Saturation = -0.12
	cc.TintColor = Color3.fromRGB(226, 234, 255)
	cc.Parent = Lighting

	local bloom = Instance.new("BloomEffect")
	bloom.Intensity = 0.6
	bloom.Size = 30
	bloom.Threshold = 1.6
	bloom.Parent = Lighting

	local sun = Instance.new("SunRaysEffect")
	sun.Intensity = 0.04
	sun.Spread = 0.6
	sun.Parent = Lighting
end

local function setupOcean()
	local terrain = Workspace.Terrain
	terrain.WaterColor = Color3.fromRGB(16, 26, 38)
	terrain.WaterTransparency = 0.25
	terrain.WaterReflectance = 1
	terrain.WaterWaveSize = 0.04
	terrain.WaterWaveSpeed = 4
	terrain:Clear()

	-- 4 x 4 tiles of 512 studs = a 2048-stud square of sea; the fog hides the edge.
	local tile = 512
	for ix = -2, 1 do
		for iz = -2, 1 do
			local cx = ix * tile + tile / 2
			local cz = iz * tile + tile / 2
			terrain:FillBlock(CFrame.new(cx, -20, cz), Vector3.new(tile, 40, tile), Enum.Material.Water)
			terrain:FillBlock(CFrame.new(cx, -44, cz), Vector3.new(tile, 8, tile), Enum.Material.Basalt)
		end
	end
end

-- Rock island under the west leg, with snow on top.
local function setupIsland(root: Instance)
	local terrain = Workspace.Terrain
	local cx = -275
	terrain:FillBlock(CFrame.new(cx, -18, 0), Vector3.new(112, 48, 124), Enum.Material.Rock)
	terrain:FillBall(Vector3.new(cx - 40, -6, 40), 34, Enum.Material.Rock)
	terrain:FillBall(Vector3.new(cx - 46, -8, -38), 30, Enum.Material.Rock)
	terrain:FillBall(Vector3.new(cx + 44, -10, 52), 22, Enum.Material.Rock)
	terrain:FillBlock(CFrame.new(cx, 7, 0), Vector3.new(108, 2, 120), Enum.Material.Snow)
	terrain:FillBall(Vector3.new(cx - 40, 6, 40), 18, Enum.Material.Snow)

	local folder = Build.folder(root, "Island")
	-- Snowy rocks for some shape.
	local rng = Random.new(7)
	for _ = 1, 26 do
		local x = cx + rng:NextNumber(-56, 56)
		local z = rng:NextNumber(-62, 62)
		if math.abs(x - (-280)) > 22 or math.abs(z) > 24 then
			local s = rng:NextNumber(3, 9)
			Build.part(folder, {
				Name = "Boulder",
				Size = Vector3.new(s * 1.3, s, s),
				CFrame = CFrame.new(x, 7 + s * 0.2, z) * CFrame.Angles(rng:NextNumber(-0.4, 0.4), rng:NextNumber(0, 6.28), rng:NextNumber(-0.4, 0.4)),
				Material = Enum.Material.Rock,
				Color = Color3.fromRGB(58, 60, 64),
			})
		end
	end
end

local function setupDock(root: Instance)
	local folder = Build.folder(root, "Dock")
	local refs = {}

	-- Concrete pier running from the island out to sea (toward -Z).
	local pierX = -248
	Build.box(folder, Vector3.new(pierX - 6, 6, -58), Vector3.new(pierX + 6, 8, -126), {
		Name = "Pier",
		Material = Enum.Material.Concrete,
		Color = C.ConcreteOut,
	})
	for z = -66, -122, -14 do
		for _, side in { -5, 5 } do
			Build.cylinderY(folder, Vector3.new(pierX + side, -10, z), 34, 2.2, {
				Name = "Pile",
				Material = Enum.Material.Concrete,
				Color = C.ConcreteDark,
			})
		end
	end
	-- Low lamp posts along the pier.
	for _, z in { -70, -98, -122 } do
		for _, side in { -5.4, 5.4 } do
			local post = Build.part(folder, {
				Name = "PierLamp",
				Size = Vector3.new(0.8, 3, 0.8),
				CFrame = CFrame.new(pierX + side, 9.5, z),
				Material = Enum.Material.Neon,
				Color = C.Warm,
			})
			Build.pointLight(post, C.Warm, 14, 1.2)
		end
	end

	-- Fishing spot at the end of the pier.
	local spot = Build.part(folder, {
		Name = "FishingSpot",
		Size = Vector3.new(4, 0.4, 4),
		CFrame = CFrame.new(pierX, 8.2, -122),
		Material = Enum.Material.WoodPlanks,
		Color = C.Wood,
	})
	-- A rod leaning on a holder.
	Build.beam(folder, Vector3.new(pierX + 1.5, 8.4, -122), Vector3.new(pierX + 4, 16, -130), 0.25, 0.25, {
		Name = "Rod",
		Color = C.Metal,
		CanCollide = false,
	})
	refs.fishSpot = spot

	local crate = Build.part(folder, {
		Name = "FishCrate",
		Size = Vector3.new(4, 3, 3),
		CFrame = CFrame.new(pierX + 3, 9.5, -74),
		Material = Enum.Material.WoodPlanks,
		Color = C.Wood,
	})
	refs.fishCrate = crate

	-- Funicular booth at the foot of the west leg.
	local boothCenter = Vector3.new(-256, 8, 0)
	Build.box(folder, boothCenter + Vector3.new(-5, 0, -6), boothCenter + Vector3.new(5, 0.6, 6), {
		Name = "BoothFloor",
		Material = Enum.Material.Concrete,
		Color = C.ConcreteIn,
	})
	Build.box(folder, boothCenter + Vector3.new(-5, 12, -6), boothCenter + Vector3.new(5, 13, 6), {
		Name = "BoothRoof",
		Material = Enum.Material.Concrete,
		Color = C.ConcreteIn,
	})
	for _, z in { -6, 6 } do
		Build.box(folder, boothCenter + Vector3.new(-5, 0.6, z - 0.2), boothCenter + Vector3.new(5, 12, z + 0.2), {
			Name = "BoothGlass",
			Material = Enum.Material.Glass,
			Color = C.Glass,
			Transparency = 0.6,
		})
	end
	local car = Build.box(folder, boothCenter + Vector3.new(-5, 0.6, -4), boothCenter + Vector3.new(-4.4, 11, 4), {
		Name = "FunicularDoor",
		Material = Enum.Material.Metal,
		Color = C.Metal,
	})
	local light = Build.box(folder, boothCenter + Vector3.new(-4, 11.6, -4), boothCenter + Vector3.new(4, 11.9, 4), {
		Name = "BoothLight",
		Material = Enum.Material.Neon,
		Color = C.Warm,
	})
	Build.surfaceLight(light, Enum.NormalId.Bottom, C.Warm, 14, 1.5)
	refs.funicularBottom = car
	refs.funicularBottomArrive = CFrame.new(boothCenter + Vector3.new(0, 3.5, 0)) * CFrame.Angles(0, -math.pi / 2, 0)

	refs.dockCenter = Vector3.new(pierX, 8, -90)

	local spawn = Instance.new("SpawnLocation")
	spawn.Name = "DockSpawn"
	spawn.Size = Vector3.new(10, 1, 10)
	spawn.CFrame = CFrame.new(-238, 8, -30)
	spawn.Anchored = true
	spawn.Material = Enum.Material.Concrete
	spawn.Color = C.ConcreteIn
	spawn.Transparency = 0
	spawn.Duration = 0
	spawn.Neutral = true
	spawn.Parent = folder
	-- Remove the default decal so it looks like a paving slab.
	for _, d in spawn:GetChildren() do
		if d:IsA("Decal") then
			d:Destroy()
		end
	end

	return refs
end

-- Areas kept clear of ice floes: the Ribcage legs, island and pier, the
-- sealed hatch under the arch, and the three other homes with their piers.
local CLEAR_ZONES = {
	{ -350, -190, -150, 80 }, -- west leg, island, pier
	{ 210, 350, -60, 60 }, -- east leg
	{ -45, 45, -105, -15 }, -- the hatch under the arch
	{ -45, 125, 570, 775 }, -- the Monolith
	{ -725, -505, -515, -385 }, -- the Vertebrae
	{ 555, 745, -615, -385 }, -- the Well
}

local function floeOverlapsArch(x: number, z: number): boolean
	for _, r in CLEAR_ZONES do
		if x >= r[1] and x <= r[2] and z >= r[3] and z <= r[4] then
			return true
		end
	end
	return false
end

-- The night ice: an invisible sheet over the whole sea that becomes solid
-- (and visible) when the sea freezes. Boats never collide with it.
local function setupSeaIce(root: Instance)
	pcall(function()
		PhysicsService:RegisterCollisionGroup("Boats")
		PhysicsService:RegisterCollisionGroup("SeaIce")
	end)
	PhysicsService:CollisionGroupSetCollidable("Boats", "SeaIce", false)
	local ice = Build.part(root, {
		Name = "SeaIce",
		Size = Vector3.new(2048, 0.8, 2048),
		CFrame = CFrame.new(0, 0, 0),
		Material = Enum.Material.Glacier,
		Color = Color3.fromRGB(206, 222, 236),
		Reflectance = 0.08,
		Transparency = 1,
		CanCollide = false,
		CanQuery = false,
		CanTouch = false,
		CastShadow = false,
	})
	ice.CollisionGroup = "SeaIce"
	Registry.misc.seaIce = ice
	return ice
end

local function setupFloes(root: Instance)
	local folder = Build.folder(root, "IceFloes")
	local rng = Random.new(2024)
	local made = 0
	while made < 170 do
		local angle = rng:NextNumber(0, math.pi * 2)
		local dist = rng:NextNumber(90, 980)
		local x = math.cos(angle) * dist
		local z = math.sin(angle) * dist
		if not floeOverlapsArch(x, z) then
			made += 1
			local big = rng:NextNumber() < 0.15
			local size = big and rng:NextNumber(26, 46) or rng:NextNumber(5, 18)
			local model = Instance.new("Model")
			model.Name = "Floe"
			local pieces = rng:NextInteger(2, 4)
			for i = 1, pieces do
				local s = size * rng:NextNumber(0.5, 1)
				local offset = Vector3.new(rng:NextNumber(-0.35, 0.35) * size, 0, rng:NextNumber(-0.35, 0.35) * size)
				local height = rng:NextNumber(0.8, 1.8)
				local p = Build.part(model, {
					Name = "Ice" .. i,
					Size = Vector3.new(s, height, s * rng:NextNumber(0.6, 1)),
					CFrame = CFrame.new(x, height / 2 - 0.3, z) * CFrame.new(offset) * CFrame.Angles(0, rng:NextNumber(0, math.pi), 0),
					Material = Enum.Material.Snow,
					Color = C.Snow,
				})
				if i == 1 then
					model.PrimaryPart = p
				end
			end
			model:SetAttribute("Phase", rng:NextNumber(0, math.pi * 2))
			model.Parent = folder
		end
	end
	return folder
end

function World.build(root: Instance)
	setupLighting()
	setupOcean()
	setupIsland(root)
	local refs = setupDock(root)
	refs.floes = setupFloes(root)
	refs.seaIce = setupSeaIce(root)
	-- Ferry bell and boat at the Ribcage pier.
	Furnish.bell(Build.folder(root, "Dock"), Vector3.new(-252, 8, -110), "ribcage", CFrame.new(-236, 1.2, -100))
	return refs
end

return World
