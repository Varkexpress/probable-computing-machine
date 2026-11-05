--!nonstrict
-- Brutalist furniture kit shared by every home. Each function takes a frame
-- `cf` sitting on the floor: local +X is right, local +Z is "back" (toward
-- the wall), local -Z is the open side of the room. Everything usable is
-- registered in Registry so gameplay finds it automatically.

local CollectionService = game:GetService("CollectionService")

local Build = require(script.Parent.Build)
local Registry = require(script.Parent.Registry)

local Furnish = {}

local C = Build.Color
Furnish.Color = C

-- Block centred at local (x, y, z) with the given size.
local function blk(folder: Instance, cf: CFrame, x: number, y: number, z: number, size: Vector3, props: { [string]: any }): BasePart
	local p = table.clone(props)
	p.Size = size
	p.CFrame = cf * CFrame.new(x, y, z)
	return Build.part(folder, p)
end
Furnish.blk = blk

-- Block spanning two local corners.
local function span(folder: Instance, cf: CFrame, a: Vector3, b: Vector3, props: { [string]: any }): BasePart
	local minV, maxV = a:Min(b), a:Max(b)
	local c = (minV + maxV) / 2
	return blk(folder, cf, c.X, c.Y, c.Z, maxV - minV, props)
end
Furnish.span = span

local function cylY(folder: Instance, cf: CFrame, x: number, y: number, z: number, height: number, diameter: number, props: { [string]: any }): BasePart
	local p = table.clone(props)
	p.Shape = Enum.PartType.Cylinder
	p.Size = Vector3.new(height, diameter, diameter)
	p.CFrame = cf * CFrame.new(x, y, z) * CFrame.Angles(0, 0, math.pi / 2)
	return Build.part(folder, p)
end
Furnish.cylY = cylY

-- A seat whose occupant faces local direction `look`.
function Furnish.seat(folder: Instance, cf: CFrame, x: number, y: number, z: number, look: Vector3, size: Vector3?, color: Color3?): BasePart
	local pos = (cf * CFrame.new(x, y, z)).Position
	local dir = cf:VectorToWorldSpace(look)
	return Build.part(folder, {
		ClassName = "Seat",
		Name = "Seat",
		Size = size or Vector3.new(3.6, 1, 3.6),
		CFrame = CFrame.lookAt(pos, pos + dir),
		Material = Enum.Material.Fabric,
		Color = color or C.Fabric,
	})
end

local CONCRETE = { Material = Enum.Material.Concrete, Color = C.ConcreteIn }
local MARBLE = { Material = Enum.Material.Marble, Color = C.Marble }
local WOOD = { Material = Enum.Material.Wood, Color = C.Wood }
local METAL = { Material = Enum.Material.Metal, Color = C.Metal }
Furnish.CONCRETE, Furnish.MARBLE, Furnish.WOOD, Furnish.METAL = CONCRETE, MARBLE, WOOD, METAL

local function steamEmitter(parent: Instance): ParticleEmitter
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
	steam.Parent = parent
	return steam
end
Furnish.steamEmitter = steamEmitter

----------------------------------------------------------------------------
-- Lights
----------------------------------------------------------------------------

function Furnish.paperLamp(folder: Instance, pos: Vector3, height: number)
	local shade = Build.cylinderY(folder, pos + Vector3.new(0, height / 2, 0), height, 1.8, {
		Name = "PaperLamp",
		Material = Enum.Material.Neon,
		Color = Color3.fromRGB(255, 226, 180),
	})
	local light = Build.pointLight(shade, C.Warm, 22, 1.4)
	table.insert(Registry.lamps, { part = shade, light = light })
	return shade
end

function Furnish.cubeLamp(folder: Instance, pos: Vector3)
	local cube = Build.part(folder, {
		Name = "CubeLamp",
		Size = Vector3.new(1.4, 1.4, 1.4),
		CFrame = CFrame.new(pos),
		Material = Enum.Material.Neon,
		Color = Color3.fromRGB(255, 220, 170),
	})
	local light = Build.pointLight(cube, C.Warm, 14, 1.2)
	table.insert(Registry.lamps, { part = cube, light = light })
	return cube
end

-- A warm light slot (thin glowing strip) between two world corners.
function Furnish.lightSlot(folder: Instance, a: Vector3, b: Vector3, face: Enum.NormalId?, range: number?)
	local strip = Build.box(folder, a, b, {
		Name = "LightSlot",
		Material = Enum.Material.Neon,
		Color = C.Warm,
		CastShadow = false,
	})
	Build.surfaceLight(strip, face or Enum.NormalId.Bottom, C.Warm, range or 18, 0.9, 70)
	return strip
end

----------------------------------------------------------------------------
-- Plants, books, notes
----------------------------------------------------------------------------

function Furnish.plant(folder: Instance, base: Vector3)
	local pot = Build.cylinderY(folder, base + Vector3.new(0, 1.2, 0), 2.4, 2.2, {
		Name = "PlantPot",
		Material = Enum.Material.Concrete,
		Color = C.ConcreteIn,
	})
	local leaves = Instance.new("Model")
	leaves.Name = "Leaves"
	local rng = Random.new(math.floor(math.abs(base.X * 7 + base.Z * 3)))
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
	table.insert(Registry.plants, { pot = pot, leaves = leaves })
	return pot
end

-- Bookshelf 10 wide, 9 tall, its back against local +Z.
function Furnish.bookshelf(folder: Instance, cf: CFrame)
	local shelf = span(folder, cf, Vector3.new(-5, 0, 0), Vector3.new(5, 9, 1.6), table.clone(WOOD))
	shelf.Name = "Bookshelf"
	local rng = Random.new(math.floor(math.abs(cf.X + cf.Z)))
	for row = 0, 2 do
		local y = 0.4 + row * 3
		local x = -4.6
		while x < 4.4 do
			local w = rng:NextNumber(0.3, 0.6)
			local h = rng:NextNumber(1.6, 2.4)
			local tone = rng:NextNumber(0.25, 0.75)
			span(folder, cf, Vector3.new(x, y + 0.2, -0.4), Vector3.new(x + w, y + 0.2 + h, 0.4), {
				Name = "Book",
				Color = Color3.new(tone * 0.9, tone * 0.75, tone * 0.6),
				CanCollide = false,
			})
			x += w + 0.05
		end
	end
	table.insert(Registry.bookshelves, shelf)
	return shelf
end

-- One of the architect's notes: a folded sheet with a faint glow.
function Furnish.note(folder: Instance, pos: Vector3, id: string, yaw: number?)
	local paper = Build.part(folder, {
		Name = "Note_" .. id,
		Size = Vector3.new(1, 0.06, 1.3),
		CFrame = CFrame.new(pos + Vector3.new(0, 0.03, 0)) * CFrame.Angles(0, yaw or 0.4, 0),
		Material = Enum.Material.SmoothPlastic,
		Color = Color3.fromRGB(236, 228, 210),
		CanCollide = false,
	})
	local glow = Instance.new("PointLight")
	glow.Color = Color3.fromRGB(255, 230, 190)
	glow.Range = 5
	glow.Brightness = 0.6
	glow.Parent = paper
	paper:SetAttribute("NoteId", id)
	CollectionService:AddTag(paper, "ArchitectNote")
	table.insert(Registry.notes, { id = id, part = paper })
	return paper
end

----------------------------------------------------------------------------
-- Kitchen (about 19 x 16 studs): counter on the back wall, island with sink
----------------------------------------------------------------------------

-- opts.pantryA / opts.pantryB: local corners for the pantry if the default
-- spot (front-left) would block a doorway.
function Furnish.kitchen(folder: Instance, cf: CFrame, home: string, opts: { [string]: any }?)
	-- Back counter
	span(folder, cf, Vector3.new(-9.6, 0, 6), Vector3.new(3.6, 3.6, 9.4), table.clone(MARBLE)).Name = "Counter"
	local stove = span(folder, cf, Vector3.new(-8, 3.6, 6.4), Vector3.new(-4, 3.7, 9), {
		Name = "Stove",
		Material = Enum.Material.Glass,
		Color = Color3.fromRGB(10, 10, 10),
	})
	for _, dx in { -7, -5 } do
		cylY(folder, cf, dx, 3.72, 7.7, 0.05, 1.4, { Name = "Ring", Material = Enum.Material.Neon, Color = Color3.fromRGB(255, 60, 30), CanCollide = false })
	end
	local oven = span(folder, cf, Vector3.new(-8, 0.6, 5.85), Vector3.new(-4, 3, 6), {
		Name = "Oven",
		Material = Enum.Material.Glass,
		Color = Color3.fromRGB(20, 18, 16),
	})
	span(folder, cf, Vector3.new(-7.6, 2.6, 5.7), Vector3.new(-4.4, 2.75, 5.85), {
		Name = "OvenHandle",
		Material = Enum.Material.Metal,
		Color = Color3.fromRGB(150, 150, 150),
		CanCollide = false,
	})
	local kettle = cylY(folder, cf, -2.5, 4.4, 7.7, 1.6, 1.4, { Name = "Kettle", Material = Enum.Material.Metal, Color = Color3.fromRGB(150, 150, 150) })
	local coffee = span(folder, cf, Vector3.new(0, 3.6, 6.8), Vector3.new(2, 6.4, 9.2), {
		Name = "CoffeeMachine",
		Material = Enum.Material.Metal,
		Color = Color3.fromRGB(30, 30, 32),
	})
	span(folder, cf, Vector3.new(0.3, 4.8, 6.6), Vector3.new(1.7, 5, 6.8), { Name = "CoffeeLight", Material = Enum.Material.Neon, Color = C.Warm, CanCollide = false })
	-- Fridge and pantry
	local fridge = span(folder, cf, Vector3.new(4, 0, 5), Vector3.new(7.6, 9, 9.4), {
		Name = "Fridge",
		Material = Enum.Material.Metal,
		Color = Color3.fromRGB(40, 40, 42),
	})
	span(folder, cf, Vector3.new(4.4, 4, 4.8), Vector3.new(4.7, 8, 5), {
		Name = "FridgeHandle",
		Material = Enum.Material.Metal,
		Color = Color3.fromRGB(160, 160, 160),
	})
	local pa = opts and opts.pantryA or Vector3.new(-9.6, 0, -6)
	local pb = opts and opts.pantryB or Vector3.new(-6.8, 10, -1)
	local pantry = span(folder, cf, pa, pb, table.clone(WOOD))
	pantry.Name = "Pantry"
	-- Island with sink and stools
	span(folder, cf, Vector3.new(-4, 0, -2), Vector3.new(4, 3.6, 1.6), table.clone(MARBLE)).Name = "KitchenIsland"
	local sink = span(folder, cf, Vector3.new(0.5, 3.6, -1.6), Vector3.new(3.5, 3.7, 1.2), {
		Name = "KitchenSink",
		Material = Enum.Material.Slate,
		Color = Color3.fromRGB(36, 36, 38),
	})
	cylY(folder, cf, 2, 4.6, 1.4, 2, 0.25, { Name = "Tap", Material = Enum.Material.Metal, Color = Color3.fromRGB(150, 150, 150), CanCollide = false })
	for _, x in { -2.6, 0, 2.6 } do
		cylY(folder, cf, x, 1.2, -4, 2.4, 0.4, { Name = "StoolLeg", Material = Enum.Material.Metal, Color = C.Metal })
		Furnish.seat(folder, cf, x, 2.7, -4, Vector3.zAxis, Vector3.new(1.8, 0.6, 1.8), C.Wood)
	end
	-- Pendant light
	local pendant = Build.ellipsoid(folder, cf * CFrame.new(0, 9, 0), Vector3.new(1.6, 1.2, 1.6), {
		Name = "Pendant",
		Material = Enum.Material.Neon,
		Color = C.Warm,
	})
	table.insert(Registry.lamps, { part = pendant, light = Build.pointLight(pendant, C.Warm, 18, 1.1) })

	local kitchen = {
		home = home,
		stove = stove,
		oven = oven,
		coffee = coffee,
		kettle = kettle,
		fridge = fridge,
		pantry = pantry,
		sink = sink,
		dishSpot = (cf * CFrame.new(-2.4, 3.6, -0.2)).Position,
		steam = steamEmitter(stove),
		dirty = 0,
		dishParts = {},
	}
	table.insert(Registry.kitchens, kitchen)
	return kitchen
end

----------------------------------------------------------------------------
-- Dining table for four (about 9 x 9 studs)
----------------------------------------------------------------------------

function Furnish.dining(folder: Instance, cf: CFrame)
	span(folder, cf, Vector3.new(-3, 2.6, -1.6), Vector3.new(3, 3, 1.6), table.clone(MARBLE)).Name = "DiningTable"
	span(folder, cf, Vector3.new(-2.4, 0, -0.6), Vector3.new(-1.4, 2.6, 0.6), table.clone(CONCRETE)).Name = "TableLeg"
	span(folder, cf, Vector3.new(1.4, 0, -0.6), Vector3.new(2.4, 2.6, 0.6), table.clone(CONCRETE)).Name = "TableLeg"
	for _, x in { -1.5, 1.5 } do
		for _, side in { -1, 1 } do
			local z = side * 3
			span(folder, cf, Vector3.new(x - 0.9, 0, z - 0.9), Vector3.new(x + 0.9, 1.3, z + 0.9), table.clone(WOOD)).Name = "ChairBase"
			Furnish.seat(folder, cf, x, 1.6, z, Vector3.new(0, 0, -side), Vector3.new(1.8, 0.6, 1.8), C.Fabric)
			span(folder, cf, Vector3.new(x - 0.9, 1.9, z + side * 0.75), Vector3.new(x + 0.9, 4.2, z + side * 0.95), table.clone(WOOD)).Name = "ChairBack"
		end
	end
	-- A candle in the middle of the table.
	local candle = cylY(folder, cf, 0, 3.4, 0, 0.8, 0.3, { Name = "Candle", Color = Color3.fromRGB(240, 234, 220), CanCollide = false })
	local flame = Build.ellipsoid(folder, cf * CFrame.new(0, 3.95, 0), Vector3.new(0.16, 0.3, 0.16), {
		Name = "CandleFlame",
		Material = Enum.Material.Neon,
		Color = Color3.fromRGB(255, 190, 110),
		CanCollide = false,
	})
	table.insert(Registry.lamps, { part = flame, light = Build.pointLight(flame, Color3.fromRGB(255, 180, 100), 10, 0.8) })
	return candle
end

----------------------------------------------------------------------------
-- Fireplaces: "pit" (sunken square), "slot" (long wall slot), "column"
----------------------------------------------------------------------------

function Furnish.fireplace(folder: Instance, cf: CFrame, style: string, home: string)
	local corePos: CFrame
	if style == "pit" then
		span(folder, cf, Vector3.new(-4.5, 0, -4.5), Vector3.new(4.5, 1, 4.5), table.clone(CONCRETE)).Name = "FirePitRim"
		span(folder, cf, Vector3.new(-3, 0.95, -3), Vector3.new(3, 1.05, 3), { Name = "FirePitBed", Material = Enum.Material.Slate, Color = Color3.fromRGB(20, 18, 18) })
		for i = 1, 4 do
			local a = i * math.pi / 2 + 0.4
			Build.beam(folder, (cf * CFrame.new(math.cos(a) * 1.4, 1.3, math.sin(a) * 1.4)).Position,
				(cf * CFrame.new(-math.cos(a) * 1.4, 1.5, -math.sin(a) * 1.4)).Position, 0.5, 0.5,
				{ Name = "Log", Material = Enum.Material.Wood, Color = Color3.fromRGB(96, 70, 48), CanCollide = false })
		end
		corePos = cf * CFrame.new(0, 1.4, 0)
	elseif style == "slot" then
		-- A deep concrete mass on the back wall with a long glowing slot.
		span(folder, cf, Vector3.new(-7, 0, 5), Vector3.new(7, 6, 8), table.clone(CONCRETE)).Name = "FireMass"
		span(folder, cf, Vector3.new(-5.5, 1.6, 4.9), Vector3.new(5.5, 3.6, 6.5), { Name = "FireSlot", Material = Enum.Material.Slate, Color = Color3.fromRGB(14, 12, 12) })
		span(folder, cf, Vector3.new(-5.2, 1.7, 5.4), Vector3.new(5.2, 1.9, 6.2), { Name = "Embers", Material = Enum.Material.Neon, Color = Color3.fromRGB(255, 110, 40), CanCollide = false })
		corePos = cf * CFrame.new(0, 2.2, 5.6)
	else -- column
		cylY(folder, cf, 0, 2, 0, 4, 4.4, table.clone(CONCRETE)).Name = "FireColumn"
		cylY(folder, cf, 0, 4.2, 0, 0.6, 5, { Name = "FireBowl", Material = Enum.Material.Metal, Color = C.Metal })
		cylY(folder, cf, 0, 4.45, 0, 0.1, 4.2, { Name = "Embers", Material = Enum.Material.Neon, Color = Color3.fromRGB(255, 110, 40), CanCollide = false })
		corePos = cf * CFrame.new(0, 4.8, 0)
	end
	local core = Build.part(folder, {
		Name = "FireCore",
		Size = Vector3.new(2, 1, 2),
		CFrame = corePos,
		Transparency = 1,
		CanCollide = false,
	})
	local fire = Instance.new("Fire")
	fire.Size = style == "slot" and 3 or 5
	fire.Heat = 5
	fire.Color = Color3.fromRGB(255, 140, 50)
	fire.SecondaryColor = Color3.fromRGB(255, 60, 10)
	fire.Parent = core
	local light = Build.pointLight(core, Color3.fromRGB(255, 150, 70), 30, 2.2)
	local embers = Instance.new("ParticleEmitter")
	embers.Rate = 6
	embers.Lifetime = NumberRange.new(1, 2)
	embers.Speed = NumberRange.new(2, 4)
	embers.SpreadAngle = Vector2.new(25, 25)
	embers.Size = NumberSequence.new(0.15, 0)
	embers.LightEmission = 1
	embers.Color = ColorSequence.new(Color3.fromRGB(255, 160, 60))
	embers.Parent = core
	-- Log basket beside it.
	local basket = cylY(folder, cf, 7, 0.9, -2, 1.8, 2.6, { Name = "LogBasket", Material = Enum.Material.Fabric, Color = Color3.fromRGB(70, 60, 50) })
	local entry = { home = home, core = core, fire = fire, light = light, embers = embers, basket = basket, fuel = 80, baseSize = fire.Size }
	table.insert(Registry.fires, entry)
	return entry
end

----------------------------------------------------------------------------
-- Lounge: a long low sofa at local +Z facing -Z, rug in front, lamp
----------------------------------------------------------------------------

function Furnish.lounge(folder: Instance, cf: CFrame, width: number?)
	local w = width or 12
	span(folder, cf, Vector3.new(-w / 2, 0, 5), Vector3.new(w / 2, 1.2, 9), table.clone(WOOD)).Name = "SofaPlinth"
	span(folder, cf, Vector3.new(-w / 2, 1.2, 8), Vector3.new(w / 2, 4.2, 9.4), { Name = "SofaBack", Material = Enum.Material.Fabric, Color = C.Fabric })
	local n = math.floor(w / 4)
	for i = 0, n - 1 do
		local x = -w / 2 + 2 + i * 4
		Furnish.seat(folder, cf, x, 1.7, 6.4, -Vector3.zAxis, Vector3.new(3.8, 1, 3), C.Fabric)
	end
	span(folder, cf, Vector3.new(-w / 2 - 1, 0.01, -1), Vector3.new(w / 2 + 1, 0.1, 4.6), {
		Name = "Rug",
		Material = Enum.Material.Fabric,
		Color = Color3.fromRGB(58, 52, 48),
		CanCollide = false,
	})
	Furnish.paperLamp(folder, (cf * CFrame.new(w / 2 + 2, 0, 7)).Position, 7)
end

----------------------------------------------------------------------------
-- Bed: headboard at local +Z (about 15 x 14 studs with nightstands)
----------------------------------------------------------------------------

function Furnish.bed(folder: Instance, cf: CFrame, home: string)
	span(folder, cf, Vector3.new(-6, 0, -1), Vector3.new(6, 1.4, 13), table.clone(CONCRETE)).Name = "BedPlinth"
	local mattress = span(folder, cf, Vector3.new(-5.6, 1.4, -0.6), Vector3.new(5.6, 2.8, 12.6), {
		Name = "Mattress",
		Material = Enum.Material.Fabric,
		Color = Color3.fromRGB(64, 58, 54),
	})
	local duvet = span(folder, cf, Vector3.new(-5.6, 2.8, -0.6), Vector3.new(5.6, 3.1, 8), {
		Name = "Duvet",
		Material = Enum.Material.Fabric,
		Color = Color3.fromRGB(78, 70, 64),
	})
	for _, x in { -2.8, 2.8 } do
		span(folder, cf, Vector3.new(x - 2.2, 2.8, 9.6), Vector3.new(x + 2.2, 3.9, 12), { Name = "Pillow", Material = Enum.Material.Fabric, Color = Color3.fromRGB(96, 88, 82) })
	end
	span(folder, cf, Vector3.new(-6, 1.4, 12.4), Vector3.new(6, 6, 13), table.clone(WOOD)).Name = "Headboard"
	for _, x in { -7.6, 7.6 } do
		span(folder, cf, Vector3.new(x - 0.8, 0, 10.6), Vector3.new(x + 0.8, 2.2, 12.2), table.clone(CONCRETE)).Name = "Nightstand"
		Furnish.cubeLamp(folder, (cf * CFrame.new(x, 2.9, 11.4)).Position)
	end
	local tidy = duvet.CFrame
	local entry = {
		home = home,
		mattress = mattress,
		duvet = duvet,
		tidy = tidy,
		messy = tidy * CFrame.new(1.2, 0.25, -1.5) * CFrame.Angles(0.06, 0.35, -0.05),
		messyNow = false,
	}
	table.insert(Registry.beds, entry)
	return entry
end

----------------------------------------------------------------------------
-- Bathroom: rain shower in the back-right corner, stone trough sink
----------------------------------------------------------------------------

function Furnish.bath(folder: Instance, cf: CFrame, home: string)
	span(folder, cf, Vector3.new(2, 0, 2), Vector3.new(8, 0.2, 8), { Name = "ShowerTray", Material = Enum.Material.Slate, Color = Color3.fromRGB(40, 40, 42) })
	span(folder, cf, Vector3.new(1.8, 0, 2), Vector3.new(2.2, 11, 5.5), { Name = "ShowerScreen", Material = Enum.Material.Glass, Color = C.Glass, Transparency = 0.7 })
	local head = cylY(folder, cf, 5, 11.5, 5, 0.3, 2.4, { Name = "ShowerHead", Material = Enum.Material.Metal, Color = C.Metal })
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
	local sink = span(folder, cf, Vector3.new(-6, 3, 6), Vector3.new(-1, 4.4, 8), { Name = "Sink", Material = Enum.Material.Slate, Color = Color3.fromRGB(46, 42, 40) })
	span(folder, cf, Vector3.new(-6, 0, 6.6), Vector3.new(-1, 3, 8), table.clone(WOOD)).Name = "Vanity"
	table.insert(Registry.showers, { home = home, head = head, rain = rain })
	table.insert(Registry.sinks, sink)
end

----------------------------------------------------------------------------
-- Deed plinth: "make this your home"
----------------------------------------------------------------------------

function Furnish.deed(folder: Instance, cf: CFrame, homeId: string, title: string)
	local plinth = span(folder, cf, Vector3.new(-1.2, 0, -0.6), Vector3.new(1.2, 3.6, 0.6), table.clone(CONCRETE))
	plinth.Name = "DeedPlinth"
	local plate = span(folder, cf, Vector3.new(-1, 2.2, -0.75), Vector3.new(1, 3.4, -0.6), {
		Name = "DeedPlate",
		Material = Enum.Material.Metal,
		Color = Color3.fromRGB(176, 140, 82),
	})
	local gui = Instance.new("SurfaceGui")
	gui.Face = Enum.NormalId.Front
	gui.SizingMode = Enum.SurfaceGuiSizingMode.PixelsPerStud
	gui.PixelsPerStud = 80
	gui.LightInfluence = 1
	gui.Parent = plate
	local label = Instance.new("TextLabel")
	label.Size = UDim2.fromScale(1, 1)
	label.BackgroundTransparency = 1
	label.TextScaled = true
	label.Font = Enum.Font.GothamMedium
	label.TextColor3 = Color3.fromRGB(40, 30, 16)
	label.Text = string.upper(title) .. "\nno residents yet"
	label.Parent = gui
	local home = Registry.homes[homeId]
	if home then
		home.deed = plinth
		home.deedLabel = label
	end
	return plinth
end

----------------------------------------------------------------------------
-- Dock bell (ferry + boat)
----------------------------------------------------------------------------

function Furnish.bell(folder: Instance, pos: Vector3, home: string, boatSpawn: CFrame)
	Build.cylinderY(folder, pos + Vector3.new(0, 2.5, 0), 5, 0.4, { Name = "BellPost", Material = Enum.Material.Metal, Color = C.Metal })
	Build.box(folder, pos + Vector3.new(-1.2, 5, -0.2), pos + Vector3.new(1.2, 5.3, 0.2), { Name = "BellArm", Material = Enum.Material.Metal, Color = C.Metal })
	local bell = Build.ellipsoid(folder, CFrame.new(pos + Vector3.new(1, 4.3, 0)), Vector3.new(1.1, 1.3, 1.1), {
		Name = "FerryBell",
		Material = Enum.Material.Metal,
		Color = Color3.fromRGB(176, 140, 82),
	})
	table.insert(Registry.docks, { home = home, bell = bell, boatSpawn = boatSpawn })
	return bell
end

return Furnish
