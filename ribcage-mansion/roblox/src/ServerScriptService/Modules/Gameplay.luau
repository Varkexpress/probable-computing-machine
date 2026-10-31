--!nonstrict
-- Daily life in the mansion: needs, cooking, the pantry, dishes, the bed,
-- plants, reading, the fire, pets, chores, weather, the day/night cycle,
-- fishing for dinner, upgrades and discoveries.

local HttpService = game:GetService("HttpService")
local Lighting = game:GetService("Lighting")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local Workspace = game:GetService("Workspace")

local Shared = ReplicatedStorage:WaitForChild("Shared")
local Arch = require(Shared:WaitForChild("Arch"))
local Config = require(Shared:WaitForChild("Config"))
local Build = require(script.Parent.Build)
local Data = require(script.Parent.Data)
local Pets = require(script.Parent.Pets)

local Gameplay = {}

local refs
local remotes: any
local profiles: { [Player]: Data.Profile } = {}
local fishInventory: { [Player]: { { name: string, value: number } } } = {}
local pantry: { [Player]: { [string]: number } } = {}
local chores: { [Player]: { [string]: boolean } } = {}
local fishing: { [Player]: { state: string, token: number, biteAt: number? } } = {}
local cooking: { [Player]: { recipe: any, token: number, started: number } } = {}
local cooldowns: { [Player]: { [string]: number } } = {}
local reading: { [Player]: number } = {}

local fireFuel = 80
local dirtyDishes = 0
local bedMessy = true
local day = 1
local weather = Config.WEATHER[1]

local discoveryById, upgradeById, recipeById, petById, choreById = {}, {}, {}, {}, {}
for _, d in Config.DISCOVERIES do
	discoveryById[d.id] = d
end
for _, u in Config.UPGRADES do
	upgradeById[u.id] = u
end
for _, r in Config.RECIPES do
	recipeById[r.id] = r
end
for _, p in Config.PETS do
	petById[p.id] = p
end
for _, c in Config.CHORES do
	choreById[c.id] = c
end

----------------------------------------------------------------------------
-- Helpers
----------------------------------------------------------------------------

local function remote(name: string, class: string?): Instance
	local r = Instance.new(class or "RemoteEvent")
	r.Name = name
	r.Parent = remotes
	return r
end

local function notify(player: Player, text: string, kind: string?)
	remotes.Notify:FireClient(player, text, kind or "info")
end

local function notifyAll(text: string, kind: string?)
	remotes.Notify:FireAllClients(text, kind or "info")
end

local function onCooldown(player: Player, key: string, seconds: number): boolean
	local list = cooldowns[player]
	if not list then
		return true
	end
	local now = os.clock()
	if list[key] and now < list[key] then
		notify(player, string.format("Give it %d more seconds.", math.ceil(list[key] - now)))
		return true
	end
	list[key] = now + seconds
	return false
end

local function getNeed(player: Player, need: string): number
	return (player:GetAttribute(need) :: number?) or 100
end

local function setNeed(player: Player, need: string, value: number)
	player:SetAttribute(need, math.clamp(value, 0, 100))
end

local function addNeed(player: Player, need: string, delta: number)
	setNeed(player, need, getNeed(player, need) + delta)
end

local function setCredits(player: Player, value: number)
	local profile = profiles[player]
	if not profile then
		return
	end
	profile.credits = value
	player:SetAttribute("Credits", value)
	local stats = player:FindFirstChild("leaderstats")
	local cv = stats and stats:FindFirstChild("Credits")
	if cv then
		cv.Value = value
	end
end

local function addCredits(player: Player, delta: number)
	local profile = profiles[player]
	if profile then
		setCredits(player, profile.credits + delta)
	end
end

local function idList(set: { [string]: boolean }): string
	local ids = {}
	for id in set do
		table.insert(ids, id)
	end
	return table.concat(ids, ",")
end

local function discover(player: Player, id: string)
	local profile = profiles[player]
	local d = discoveryById[id]
	if not profile or not d or profile.discoveries[id] then
		return
	end
	profile.discoveries[id] = true
	player:SetAttribute("Discoveries", idList(profile.discoveries))
	addCredits(player, d.reward)
	notify(player, string.format("Discovered: %s  (+%d credits)", d.name, d.reward), "discovery")
end

local function completeChore(player: Player, id: string)
	local done = chores[player]
	local chore = choreById[id]
	if not done or not chore or done[id] then
		return
	end
	done[id] = true
	player:SetAttribute("Chores", idList(done))
	addCredits(player, chore.reward)
	notify(player, string.format("Routine: %s  (+%d)", chore.name, chore.reward), "chore")
	for _, c in Config.CHORES do
		if not done[c.id] then
			return
		end
	end
	addCredits(player, 40)
	notify(player, "Every part of today's routine done. A good day in the spine (+40).", "discovery")
end

local function syncFish(player: Player)
	local inv = fishInventory[player] or {}
	local value = 0
	for _, f in inv do
		value += f.value
	end
	player:SetAttribute("FishCount", #inv)
	player:SetAttribute("FishValue", value)
end

local function syncPantry(player: Player)
	player:SetAttribute("Pantry", HttpService:JSONEncode(pantry[player] or {}))
end

local function syncTreats(player: Player)
	local profile = profiles[player]
	player:SetAttribute("Treats", profile and profile.treats or 0)
end

local function restockPantry(player: Player)
	local stock = {}
	for _, item in Config.PANTRY do
		stock[item.id] = item.perDay
	end
	pantry[player] = stock
	syncPantry(player)
end

local function rootPart(player: Player): BasePart?
	local character = player.Character
	return character and character:FindFirstChild("HumanoidRootPart")
end

local function teleport(player: Player, cf: CFrame)
	local character = player.Character
	if not character then
		return
	end
	remotes.Fade:FireClient(player, 0.9)
	task.delay(0.35, function()
		if character.Parent then
			character:PivotTo(cf)
		end
	end)
end

local function ownsUpgrade(player: Player, id: string): boolean
	local profile = profiles[player]
	return profile ~= nil and profile.upgrades[id] == true
end

local function isNight(): boolean
	local t = Lighting.ClockTime
	return t >= 19.5 or t < 5.5
end

----------------------------------------------------------------------------
-- Travel and the station
----------------------------------------------------------------------------

local function setParka(player: Player, on: boolean)
	player:SetAttribute("Parka", on)
	local character = player.Character
	if not character then
		return
	end
	local old = character:FindFirstChild("ParkaShell")
	if old then
		old:Destroy()
	end
	if not on then
		return
	end
	local torso = character:FindFirstChild("UpperTorso") or character:FindFirstChild("Torso")
	if not torso or not torso:IsA("BasePart") then
		return
	end
	local shell = Instance.new("Part")
	shell.Name = "ParkaShell"
	shell.Size = torso.Size * Vector3.new(1.18, 1.25, 1.35)
	shell.CFrame = torso.CFrame * CFrame.new(0, -0.1, 0)
	shell.Color = Color3.fromRGB(58, 54, 50)
	shell.Material = Enum.Material.Fabric
	shell.CanCollide = false
	shell.CanQuery = false
	shell.CanTouch = false
	shell.Massless = true
	local weld = Instance.new("WeldConstraint")
	weld.Part0 = shell
	weld.Part1 = torso
	weld.Parent = shell
	shell.Parent = character
end

local function setupTravel()
	local up = Build.prompt(refs.funicularBottom, "Ride up to the mansion", "Funicular", 0, 12)
	up.Triggered:Connect(function(player)
		teleport(player, refs.funicularTopArrive)
		notify(player, "The funicular hums up the inside of the spine...")
	end)
	local down = Build.prompt(refs.funicularTop, "Ride down to the dock", "Funicular", 0, 12)
	down.Triggered:Connect(function(player)
		teleport(player, refs.funicularBottomArrive)
	end)

	local hatch = Build.prompt(refs.hatch, "Climb onto the spine", "Roof hatch", 0.5, 14)
	hatch.Triggered:Connect(function(player)
		teleport(player, refs.roofArrive)
		notify(player, "Wind, fog and a long way down. A parka helps.", "warn")
	end)
	local roofHatch = Build.part(refs.root, {
		Name = "RoofHatchOutside",
		Size = Vector3.new(4, 0.6, 5),
		CFrame = refs.roofArrive * CFrame.new(0, -3.6, 0) * CFrame.Angles(0, 0, math.atan(Arch.slope(refs.roofArrive.X))),
		Material = Enum.Material.Metal,
		Color = Build.Color.Metal,
	})
	local back = Build.prompt(roofHatch, "Climb back inside", "Roof hatch", 0, 10)
	back.Triggered:Connect(function(player)
		teleport(player, refs.funicularTopArrive)
	end)

	local parka = Build.prompt(refs.parkaRack, "Put on / take off parka", "Coat rack", 0, 10)
	parka.Triggered:Connect(function(player)
		local on = not player:GetAttribute("Parka")
		setParka(player, on)
		notify(player, on and "Parka on. The cold bites much less outside." or "Parka hung back up.")
	end)
end

----------------------------------------------------------------------------
-- Fire, lamps, doors
----------------------------------------------------------------------------

local firePrompts = {}

local function applyFire()
	local fire = refs.fire
	local lit = fireFuel > 0
	fire.fire.Enabled = lit
	fire.light.Enabled = lit
	fire.embers.Enabled = lit
	local k = fireFuel / 100
	fire.fire.Size = 2 + 4 * k
	fire.light.Brightness = 0.8 + 2 * k
	fire.light.Range = 18 + 16 * k
	for _, p in firePrompts do
		p.ActionText = lit and "Add a log" or "Light the fire"
	end
	Workspace:SetAttribute("FireFuel", fireFuel)
end

local function feedFire(player: Player)
	if fireFuel >= 95 then
		notify(player, "The fire is roaring already.")
		return
	end
	local wasOut = fireFuel <= 0
	fireFuel = math.min(100, fireFuel + 45)
	applyFire()
	notify(player, wasOut and "The bowl catches. Warm light spills across the concrete." or "You lay a log on the embers.")
	if isNight() then
		completeChore(player, "fire")
	end
end

local function setupFireAndLights()
	table.insert(firePrompts, Build.prompt(refs.fire.core, "Add a log", "Hanging fireplace", 0.4, 14))
	table.insert(firePrompts, Build.prompt(refs.logBasket, "Add a log", "Log basket", 0.4, 10))
	for _, p in firePrompts do
		p.Triggered:Connect(feedFire)
	end
	applyFire()

	for _, lamp in refs.lamps do
		local p = Build.prompt(lamp.part, "Toggle lamp", "Lamp", 0, 9)
		p.Triggered:Connect(function()
			lamp.light.Enabled = not lamp.light.Enabled
			lamp.part.Material = lamp.light.Enabled and Enum.Material.Neon or Enum.Material.SmoothPlastic
		end)
		lamp.part.Material = Enum.Material.Neon
	end

	for _, door in refs.doors do
		local isOpen = false
		local p = Build.prompt(door.part, "Open", "Door", 0, 9)
		p.Triggered:Connect(function()
			isOpen = not isOpen
			p.ActionText = isOpen and "Close" or "Open"
			local info = TweenInfo.new(0.7, Enum.EasingStyle.Quad)
			TweenService:Create(door.part, info, { CFrame = isOpen and door.open or door.closed }):Play()
			local handle = door.part:FindFirstChild("Handle")
			if handle then
				local target = (isOpen and door.open or door.closed) * door.closed:ToObjectSpace(handle.CFrame)
				TweenService:Create(handle, info, { CFrame = target }):Play()
			end
		end)
	end
end

----------------------------------------------------------------------------
-- Home life: bed, shower, plants, books, dishes, pantry, record player
----------------------------------------------------------------------------

local dishParts = {}

local function applyDishes()
	for _, p in dishParts do
		p:Destroy()
	end
	table.clear(dishParts)
	for i = 1, dirtyDishes do
		local p = Build.cylinderY(refs.root, refs.dishSpot + Vector3.new((i % 2) * 1.6, 0.12 + math.floor((i - 1) / 2) * 0.22, 0), 0.2, 1.4, {
			Name = "DirtyPlate",
			Color = Color3.fromRGB(196, 190, 182),
			Material = Enum.Material.SmoothPlastic,
			CanCollide = false,
		})
		table.insert(dishParts, p)
	end
end

local function setBedMessy(messy: boolean)
	bedMessy = messy
	TweenService:Create(refs.duvet, TweenInfo.new(0.5), { CFrame = messy and refs.duvetMessy or refs.duvetTidy }):Play()
end

local PLANT_FRESH = Color3.fromRGB(58, 92, 60)
local PLANT_DRY = Color3.fromRGB(92, 92, 62)

local function setPlant(plant, watered: boolean)
	plant.watered = watered
	for _, leaf in plant.leaves:GetChildren() do
		if leaf:IsA("BasePart") then
			leaf.Color = watered and PLANT_FRESH or PLANT_DRY
		end
	end
end

local function setupHome()
	local sleep = Build.prompt(refs.bed, "Sleep", "Bed", 1, 10)
	sleep.Triggered:Connect(function(player)
		remotes.Fade:FireClient(player, 3)
		task.delay(1.5, function()
			setNeed(player, "Energy", 100)
			addNeed(player, "Warmth", 20)
			setBedMessy(true)
			notify(player, "You slept to the sound of ice knocking softly against the ribs.")
		end)
	end)
	local make = Build.prompt(refs.duvet, "Make the bed", "Bed", 0.8, 10)
	make.UIOffset = Vector2.new(0, 70)
	make.KeyboardKeyCode = Enum.KeyCode.F
	make.Triggered:Connect(function(player)
		if not bedMessy then
			notify(player, "The bed is already made. Crisp.")
			return
		end
		setBedMessy(false)
		completeChore(player, "bed")
	end)

	local shower = Build.prompt(refs.showerHead, "Take a rain shower", "Shower", 0.5, 12)
	shower.Triggered:Connect(function(player)
		refs.shower.Enabled = true
		task.delay(6, function()
			refs.shower.Enabled = false
		end)
		setNeed(player, "Hygiene", 100)
		addNeed(player, "Warmth", 10)
		notify(player, "Hot water falling through a shaft of light. Clean.")
	end)
	local sink = Build.prompt(refs.sink, "Wash up", "Stone sink", 0, 8)
	sink.Triggered:Connect(function(player)
		addNeed(player, "Hygiene", 15)
	end)

	for _, plant in refs.plants do
		setPlant(plant, false)
		local p = Build.prompt(plant.pot, "Water plant", "Plant", 0.4, 8)
		p.Triggered:Connect(function(player)
			if plant.watered then
				notify(player, "This one is already watered today.")
				return
			end
			setPlant(plant, true)
			addNeed(player, "Fun", 3)
			completeChore(player, "plants")
		end)
	end

	local book = Build.prompt(refs.bookshelf, "Take a book", "Bookshelf", 0, 9)
	book.Triggered:Connect(function(player)
		player:SetAttribute("HasBook", true)
		notify(player, "You pick a worn paperback. Find a seat near the fire to read.")
	end)

	local wash = Build.prompt(refs.galleySink, "Wash the dishes", "Galley sink", 1.5, 9)
	wash.Triggered:Connect(function(player)
		if dirtyDishes == 0 then
			notify(player, "The sink is empty. Nothing to wash.")
			return
		end
		dirtyDishes = 0
		applyDishes()
		addNeed(player, "Hygiene", 4)
		completeChore(player, "dishes")
		notify(player, "Dishes done, steam on the glass.")
	end)

	local pantryPrompt = Build.prompt(refs.pantry, "Look in the pantry", "Pantry", 0, 9)
	pantryPrompt.Triggered:Connect(function(player)
		remotes.OpenPanel:FireClient(player, "pantry")
	end)

	local fridge = Build.prompt(refs.fridge, "Grab a snack", "Fridge", 0, 8)
	fridge.Triggered:Connect(function(player)
		if onCooldown(player, "snack", 45) then
			return
		end
		addNeed(player, "Hunger", 15)
		notify(player, "Cold cheese and crackers, eaten standing up.")
	end)

	local tea = Build.prompt(refs.kettle, "Make tea", "Kettle", 0.8, 8)
	tea.Triggered:Connect(function(player)
		if onCooldown(player, "tea", 25) then
			return
		end
		refs.steam.Enabled = true
		task.delay(4, function()
			refs.steam.Enabled = false
		end)
		addNeed(player, "Warmth", 15)
		addNeed(player, "Fun", 3)
		notify(player, "Tea. Hold the cup in both hands.")
	end)

	local bowl = Build.prompt(refs.catBowl, "Fill " .. Config.RESIDENT_CAT_NAME .. "'s bowl", "Cat bowl", 0.3, 8)
	bowl.Triggered:Connect(function(player)
		Pets.fillBowl(player)
	end)

	local record = Build.prompt(refs.recordPlayer, "Play a record", "Record player", 0, 9)
	record.Triggered:Connect(function(player)
		if not ownsUpgrade(player, "RecordPlayer") then
			notify(player, "No needle on it. Buy the Record Player at the concierge tablet.", "warn")
			return
		end
		remotes.Music:FireClient(player)
	end)
end

----------------------------------------------------------------------------
-- Cooking
----------------------------------------------------------------------------

local stationParts = {}

local function hasIngredients(player: Player, recipe): (boolean, string?)
	local stock = pantry[player] or {}
	for item, count in recipe.needs do
		if item == "fish" then
			if #(fishInventory[player] or {}) < count then
				return false, string.format("You need %d fish. Try fishing off the dock.", count)
			end
		elseif (stock[item] or 0) < count then
			for _, p in Config.PANTRY do
				if p.id == item then
					return false, "Out of " .. string.lower(p.name) .. " until the pantry restocks in the morning."
				end
			end
			return false, "Missing " .. item
		end
	end
	return true
end

local function consume(player: Player, recipe)
	local stock = pantry[player]
	for item, count in recipe.needs do
		if item == "fish" then
			local inv = fishInventory[player]
			table.sort(inv, function(a, b)
				return a.value > b.value
			end)
			for _ = 1, count do
				table.remove(inv)
			end
			syncFish(player)
		else
			stock[item] -= count
		end
	end
	syncPantry(player)
end

local function anyoneCooking(): boolean
	for _ in cooking do
		return true
	end
	return false
end

local function setupCooking()
	stationParts.stove = refs.stove
	stationParts.oven = refs.oven
	stationParts.coffee = refs.coffee
	local labels = { stove = "Cook on the stove", oven = "Bake in the oven", coffee = "Make coffee" }
	local names = { stove = "Stove", oven = "Oven", coffee = "Coffee machine" }
	for station, part in stationParts do
		local p = Build.prompt(part, labels[station], names[station], 0, 9)
		p.Triggered:Connect(function(player)
			remotes.OpenPanel:FireClient(player, "cook", station)
		end)
	end

	remotes.StartCooking.OnServerInvoke = function(player: Player, recipeId: any)
		local recipe = type(recipeId) == "string" and recipeById[recipeId] or nil
		if not recipe then
			return false, "Unknown recipe."
		end
		local hrp = rootPart(player)
		local station = stationParts[recipe.station]
		if not hrp or (hrp.Position - station.Position).Magnitude > 16 then
			return false, "Stand at the " .. recipe.station .. " to make that."
		end
		if cooking[player] then
			return false, "You're already cooking something."
		end
		local ok, why = hasIngredients(player, recipe)
		if not ok then
			return false, why
		end
		consume(player, recipe)
		local token = math.random(1, 1e9)
		cooking[player] = { recipe = recipe, token = token, started = os.clock() }
		if recipe.station ~= "coffee" then
			refs.steam.Enabled = true
		end
		return true, token
	end

	remotes.FinishCooking.OnServerInvoke = function(player: Player, token: any, scores: any)
		local session = cooking[player]
		cooking[player] = nil
		if not anyoneCooking() then
			refs.steam.Enabled = false
		end
		if not session or session.token ~= token or type(scores) ~= "table" then
			return nil
		end
		local recipe = session.recipe
		local total = 0
		for i = 1, #recipe.steps do
			total += math.clamp(tonumber(scores[i]) or 0, 0, 1)
		end
		local quality = total / #recipe.steps
		-- Each step takes real time to play; ignore impossibly fast results.
		if os.clock() - session.started < #recipe.steps * 0.6 then
			quality = math.min(quality, 0.3)
		end
		local label = quality >= 0.9 and "Perfect" or quality >= 0.65 and "Delicious" or quality >= 0.35 and "Decent" or "Slightly burnt"
		local mult = 0.55 + 0.65 * quality
		for need, amount in recipe.effects do
			addNeed(player, need, amount * mult)
		end
		if recipe.makesTreats then
			local profile = profiles[player]
			profile.treats += recipe.makesTreats
			syncTreats(player)
		end
		if recipe.station == "coffee" then
			completeChore(player, "coffee")
		elseif not recipe.makesTreats then
			completeChore(player, "cook")
		end
		if recipe.station ~= "coffee" then
			dirtyDishes = math.min(Config.MAX_DIRTY_DISHES, dirtyDishes + (#recipe.steps >= 4 and 2 or 1))
			applyDishes()
		end
		discover(player, "firstmeal")
		return { name = recipe.name, quality = label }
	end
end

----------------------------------------------------------------------------
-- Upgrades and pets (concierge tablet)
----------------------------------------------------------------------------

local function setupConcierge()
	local shop = Build.prompt(refs.tablet, "Open concierge", "Upgrades & pets", 0, 10)
	shop.Triggered:Connect(function(player)
		remotes.OpenPanel:FireClient(player, "shop")
	end)

	remotes.BuyUpgrade.OnServerInvoke = function(player: Player, id: any)
		local profile = profiles[player]
		local upgrade = type(id) == "string" and upgradeById[id] or nil
		if not profile or not upgrade then
			return false, "Unknown upgrade."
		end
		if profile.upgrades[id] then
			return false, "You already own that."
		end
		if profile.credits < upgrade.price then
			return false, "Not enough credits."
		end
		setCredits(player, profile.credits - upgrade.price)
		profile.upgrades[id] = true
		player:SetAttribute("Up_" .. id, true)
		notify(player, "Installed: " .. upgrade.name, "discovery")
		task.spawn(Data.save, player.UserId, profile)
		return true, "Installed!"
	end

	remotes.AdoptPet.OnServerInvoke = function(player: Player, id: any)
		local profile = profiles[player]
		local pet = type(id) == "string" and petById[id] or nil
		if not profile or not pet then
			return false, "Unknown pet."
		end
		if not profile.pets[id] then
			if profile.credits < pet.price then
				return false, "Not enough credits."
			end
			setCredits(player, profile.credits - pet.price)
			profile.pets[id] = true
			player:SetAttribute("Pet_" .. id, true)
			notify(player, "Welcome home, little " .. string.lower(pet.name) .. ".", "discovery")
		end
		-- Choosing an adopted pet toggles whether it walks with you.
		local newActive = profile.activePet == id and "" or id
		profile.activePet = newActive
		player:SetAttribute("ActivePet", newActive)
		Pets.setActive(player, newActive ~= "" and newActive or nil)
		task.spawn(Data.save, player.UserId, profile)
		return true, newActive ~= "" and "Walking with you." or "Resting at home."
	end

	local scope = Build.prompt(refs.telescope, "Look through telescope", "Telescope", 0, 10)
	scope.Triggered:Connect(function(player)
		if not ownsUpgrade(player, "Telescope") then
			notify(player, "It's capped. Buy the Roof Telescope at the concierge tablet.", "warn")
			return
		end
		remotes.Telescope:FireClient(player, refs.telescope.Position + Vector3.new(0, 4, 0))
	end)
end

----------------------------------------------------------------------------
-- Fishing (ingredients for dinner) and selling the extras
----------------------------------------------------------------------------

local function rollFish(player: Player)
	local golden = ownsUpgrade(player, "GoldenRod")
	local function weight(f): number
		return (golden and f.value >= 30) and f.weight * 3 or f.weight
	end
	local total = 0
	for _, f in Config.FISH do
		total += weight(f)
	end
	local roll = math.random() * total
	for _, f in Config.FISH do
		roll -= weight(f)
		if roll <= 0 then
			return f
		end
	end
	return Config.FISH[1]
end

local function setupFishing()
	local cast = Build.prompt(refs.fishSpot, "Cast line", "Fishing spot", 0, 10)
	cast.Triggered:Connect(function(player)
		if fishing[player] then
			return
		end
		local token = math.random(1, 1e9)
		fishing[player] = { state = "waiting", token = token }
		remotes.Fishing:FireClient(player, "cast")
		local wait = math.random() * (Config.FISH_BITE_MAX - Config.FISH_BITE_MIN) + Config.FISH_BITE_MIN
		if ownsUpgrade(player, "GoldenRod") then
			wait *= 0.5
		end
		task.delay(wait, function()
			local f = fishing[player]
			if not f or f.token ~= token then
				return
			end
			local hrp = rootPart(player)
			if not hrp or (hrp.Position - refs.fishSpot.Position).Magnitude > 25 then
				fishing[player] = nil
				remotes.Fishing:FireClient(player, "left")
				return
			end
			f.state = "bite"
			f.biteAt = os.clock()
			remotes.Fishing:FireClient(player, "bite")
			task.delay(Config.FISH_REEL_WINDOW + 0.3, function()
				local g = fishing[player]
				if g and g.token == token and g.state == "bite" then
					fishing[player] = nil
					remotes.Fishing:FireClient(player, "miss")
				end
			end)
		end)
	end)

	remotes.Fishing.OnServerEvent:Connect(function(player, action)
		if action ~= "reel" then
			return
		end
		local f = fishing[player]
		if not f then
			return
		end
		fishing[player] = nil
		if f.state == "waiting" then
			remotes.Fishing:FireClient(player, "early")
			return
		end
		if f.state == "bite" and f.biteAt and os.clock() - f.biteAt <= Config.FISH_REEL_WINDOW + 0.25 then
			local fish = rollFish(player)
			table.insert(fishInventory[player], { name = fish.name, value = fish.value })
			syncFish(player)
			profiles[player].fishCaught += 1
			remotes.Fishing:FireClient(player, "catch", fish.name, fish.value)
			discover(player, "firstfish")
		else
			remotes.Fishing:FireClient(player, "miss")
		end
	end)

	local sell = Build.prompt(refs.fishCrate, "Sell your fish", "Fish crate", 0, 10)
	sell.Triggered:Connect(function(player)
		local inv = fishInventory[player]
		if not inv or #inv == 0 then
			notify(player, "Your bucket is empty.", "warn")
			return
		end
		local total = 0
		for _, f in inv do
			total += f.value
		end
		local count = #inv
		table.clear(inv)
		syncFish(player)
		addCredits(player, total)
		notify(player, string.format("Sold %d fish for %d credits.", count, total), "discovery")
	end)
end

----------------------------------------------------------------------------
-- Whale breaches (rare, far out in the fog)
----------------------------------------------------------------------------

local function buildWhaleTemplate()
	local model = Instance.new("Model")
	model.Name = "WhaleTemplate"
	local template = Build.asset("Whale")
	local origin = CFrame.new()
	local core = Build.part(model, {
		Name = "Core",
		Size = Vector3.new(12, 10, 46),
		CFrame = origin,
		Transparency = 1,
		CanCollide = false,
	})
	if template then
		Build.placeAsset(template, model, origin, Vector3.new(24, 10, 49), { CanCollide = false })
	else
		local dark = Color3.fromRGB(42, 46, 52)
		Build.ellipsoid(model, origin, Vector3.new(11, 9, 44), { Name = "Body", Color = dark, CanCollide = false })
		Build.ellipsoid(model, origin * CFrame.new(0, -2.4, -4), Vector3.new(8.5, 5, 32), { Name = "Belly", Color = Color3.fromRGB(150, 152, 156), CanCollide = false })
		for _, side in { -1, 1 } do
			Build.ellipsoid(model, origin * CFrame.new(side * 8, -2, -8) * CFrame.Angles(0, side * 0.5, side * 0.4), Vector3.new(12, 1, 3.5), {
				Name = "Flipper",
				Color = dark,
				CanCollide = false,
			})
			Build.ellipsoid(model, origin * CFrame.new(side * 4, 0, 23) * CFrame.Angles(0, side * 0.5, 0), Vector3.new(9, 0.8, 4), {
				Name = "Fluke",
				Color = dark,
				CanCollide = false,
			})
		end
	end
	for _, d in model:GetDescendants() do
		if d:IsA("BasePart") then
			d.Anchored = true
			d.CanCollide = false
		end
	end
	model.PrimaryPart = core
	model.Parent = ReplicatedStorage
end

local function compassWord(v: Vector3): string
	local angle = math.deg(math.atan2(v.X, -v.Z)) % 360
	local names = { "north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west" }
	return names[(math.floor((angle + 22.5) / 45) % 8) + 1]
end

local function whaleLoop()
	while true do
		task.wait(math.random(Config.WHALE_MIN_INTERVAL, Config.WHALE_MAX_INTERVAL))
		if weather.id ~= "Blizzard" then
			local angle = math.random() * math.pi * 2
			local dist = 220 + math.random() * 320
			local pos = Vector3.new(math.cos(angle) * dist, 0, math.sin(angle) * dist)
			remotes.Whale:FireAllClients(pos, math.random() * math.pi * 2)
			notifyAll("Something huge breaks the surface to the " .. compassWord(pos) .. "...", "discovery")
			for _, player in Players:GetPlayers() do
				discover(player, "whale")
			end
		end
	end
end

----------------------------------------------------------------------------
-- Weather, days and the per-second tick
----------------------------------------------------------------------------

local function pickWeather()
	local total = 0
	for _, w in Config.WEATHER do
		if w ~= weather then
			total += w.weight
		end
	end
	local roll = math.random() * total
	for _, w in Config.WEATHER do
		if w ~= weather then
			roll -= w.weight
			if roll <= 0 then
				return w
			end
		end
	end
	return Config.WEATHER[1]
end

local function weatherLoop()
	Workspace:SetAttribute("Weather", weather.id)
	while true do
		task.wait(math.random(Config.WEATHER_MIN_SECONDS, Config.WEATHER_MAX_SECONDS))
		weather = pickWeather()
		Workspace:SetAttribute("Weather", weather.id)
		local lines = {
			Mist = "Sea mist rolls in and swallows the ribs.",
			Still = "The fog thins. The sea goes perfectly still.",
			Snow = "It starts to snow over the Southern Ocean.",
			Blizzard = "A blizzard is coming in. Best to be inside, near the fire.",
		}
		notifyAll(lines[weather.id] or weather.name, weather.id == "Blizzard" and "warn" or "info")
	end
end

local function newDay()
	day += 1
	Workspace:SetAttribute("Day", day)
	setBedMessy(true)
	for _, plant in refs.plants do
		setPlant(plant, false)
	end
	for _, player in Players:GetPlayers() do
		if profiles[player] then
			restockPantry(player)
			chores[player] = {}
			reading[player] = 0
			player:SetAttribute("Chores", "")
		end
	end
	notifyAll(string.format("Morning, day %d. The pantry has been restocked and the plants are thirsty.", day), "chore")
end

local function inBox(pos: Vector3, minV: Vector3, maxV: Vector3): boolean
	return pos.X >= minV.X and pos.X <= maxV.X and pos.Y >= minV.Y and pos.Y <= maxV.Y and pos.Z >= minV.Z and pos.Z <= maxV.Z
end

local function rescue(player: Player)
	setNeed(player, "Warmth", 45)
	teleport(player, CFrame.new(refs.galleryCenter + Vector3.new(6, 4, -2)))
	notify(player, "You got dangerously cold, and found your way back to the fire.", "warn")
end

local function tickPlayer(player: Player)
	local character = player.Character
	local hrp = rootPart(player)
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	if not hrp or not humanoid or humanoid.Health <= 0 then
		return
	end
	local pos = hrp.Position
	local room = Arch.roomAt(pos)
	local swimming = humanoid:GetState() == Enum.HumanoidStateType.Swimming
	local inPool = inBox(pos, refs.poolMin - Vector3.new(1, 2, 1), refs.poolMax + Vector3.new(1, 4, 1))
	local onRoof = room == nil
		and math.abs(pos.Z) < Arch.W / 2 + 2
		and math.abs(pos.X) < Arch.A * 0.95
		and pos.Y > Arch.yAt(pos.X) + Arch.T / 2 - 2
	local inSea = room == nil and pos.Y < 3 and swimming
	local fireDist = (pos - refs.fireplacePos).Magnitude
	local nearFire = fireFuel > 0 and fireDist < Config.WARMTH.fireplaceRange
	local parka = player:GetAttribute("Parka") == true
	local W = Config.WARMTH
	local storm = weather.id == "Blizzard" and W.blizzardMultiplier or 1

	local warmth = getNeed(player, "Warmth")
	if nearFire then
		warmth += W.fireplaceGain * (0.4 + 0.6 * fireFuel / 100)
	elseif inPool and swimming and ownsUpgrade(player, "HeatedPool") then
		warmth += W.heatedPoolGain
	elseif room then
		if warmth < W.indoorsCap then
			warmth = math.min(W.indoorsCap, warmth + W.indoorsGain)
		end
	elseif inSea then
		warmth -= W.seaLoss
	elseif onRoof then
		warmth -= (parka and W.parkaRoofLoss or W.roofLoss) * storm
	else
		warmth -= (parka and W.parkaOutdoorsLoss or W.outdoorsLoss) * storm
	end
	setNeed(player, "Warmth", warmth)

	local hungerEmpty = getNeed(player, "Hunger") <= 0
	local energyDelta = -Config.NEED_DECAY.Energy * (hungerEmpty and 2 or 1)
	local seated = humanoid.SeatPart ~= nil
	if seated then
		energyDelta = Config.SEAT_ENERGY_GAIN
	end
	addNeed(player, "Energy", energyDelta)
	addNeed(player, "Hunger", -Config.NEED_DECAY.Hunger)
	addNeed(player, "Hygiene", -Config.NEED_DECAY.Hygiene)

	local fun = -Config.NEED_DECAY.Fun
	if inPool and swimming then
		fun = Config.POOL_FUN_GAIN
	end
	-- Reading in a seat near the fire.
	local isReading = seated and player:GetAttribute("HasBook") == true and fireDist < 30
	player:SetAttribute("Reading", isReading)
	if isReading then
		fun = Config.READING_FUN_GAIN
		reading[player] = (reading[player] or 0) + 1
		if reading[player] >= 20 then
			completeChore(player, "read")
		end
	end
	addNeed(player, "Fun", fun)

	humanoid.WalkSpeed = getNeed(player, "Energy") < 10 and 10 or 16
	player:SetAttribute("Location", room and room.name or (onRoof and "Top of the Spine" or (inSea and "In the Southern Ocean" or "Outside")))

	if (pos - refs.dockCenter).Magnitude < 45 then
		discover(player, "dock")
	end
	if room then
		if room.id == "gallery" then
			discover(player, "gallery")
		elseif room.id == "lounge" then
			discover(player, "glassfloor")
		end
		if weather.id == "Blizzard" and pos.Z < -8 then
			discover(player, "blizzard")
		end
	end
	if inPool and swimming then
		discover(player, "pool")
	end
	if fireDist < 14 then
		discover(player, "fireplace")
	end
	if onRoof then
		discover(player, "roof")
	end
	local clock = Lighting.ClockTime
	if clock > 5.6 and clock < 7.2 then
		discover(player, "dawn")
	end

	if getNeed(player, "Warmth") <= 0 then
		rescue(player)
	end
end

local function secondLoop()
	while true do
		task.wait(1)
		-- The fire slowly burns down.
		if fireFuel > 0 then
			fireFuel = math.max(0, fireFuel - 0.12)
			if fireFuel == 0 then
				notifyAll("The fireplace has burned down to ash. Someone add a log?", "warn")
			end
			applyFire()
		end
		for _, player in Players:GetPlayers() do
			if profiles[player] then
				local ok, err = pcall(tickPlayer, player)
				if not ok then
					warn("[Ribcage] tick failed:", err)
				end
			end
		end
	end
end

local function dayCycle()
	local rate = 24 / (Config.DAY_LENGTH_MINUTES * 60)
	Lighting.ClockTime = Config.START_CLOCK_TIME
	Workspace:SetAttribute("Day", day)
	RunService.Heartbeat:Connect(function(dt)
		local before = Lighting.ClockTime
		local after = (before + dt * rate) % 24
		Lighting.ClockTime = after
		Workspace:SetAttribute("Night", isNight())
		if before < 6 and after >= 6 then
			newDay()
		end
	end)
end

----------------------------------------------------------------------------
-- Players
----------------------------------------------------------------------------

local function onPlayerAdded(player: Player)
	local profile = Data.load(player.UserId)
	profiles[player] = profile
	fishInventory[player] = {}
	cooldowns[player] = {}
	chores[player] = {}
	restockPantry(player)

	local stats = Instance.new("Folder")
	stats.Name = "leaderstats"
	local credits = Instance.new("IntValue")
	credits.Name = "Credits"
	credits.Value = profile.credits
	credits.Parent = stats
	stats.Parent = player

	for _, need in Config.NEEDS do
		player:SetAttribute(need, need == "Warmth" and 80 or 85)
	end
	player:SetAttribute("Credits", profile.credits)
	player:SetAttribute("Parka", false)
	player:SetAttribute("Chores", "")
	for id in profile.upgrades do
		player:SetAttribute("Up_" .. id, true)
	end
	for id in profile.pets do
		player:SetAttribute("Pet_" .. id, true)
	end
	player:SetAttribute("ActivePet", profile.activePet)
	player:SetAttribute("Discoveries", idList(profile.discoveries))
	syncFish(player)
	syncTreats(player)

	player.CharacterAdded:Connect(function()
		task.wait(0.3)
		if player:GetAttribute("Parka") then
			setParka(player, true)
		end
		if profile.activePet ~= "" then
			Pets.setActive(player, profile.activePet)
		end
	end)
end

local function onPlayerRemoving(player: Player)
	local profile = profiles[player]
	if profile then
		Data.save(player.UserId, profile)
	end
	profiles[player] = nil
	fishInventory[player] = nil
	pantry[player] = nil
	chores[player] = nil
	fishing[player] = nil
	cooking[player] = nil
	cooldowns[player] = nil
	reading[player] = nil
end

function Gameplay.start(builtRefs)
	refs = builtRefs
	refs.fireLit = function()
		return fireFuel > 0
	end

	local old = ReplicatedStorage:FindFirstChild("Remotes")
	if old then
		old:Destroy()
	end
	remotes = Instance.new("Folder")
	remotes.Name = "Remotes"
	for _, name in { "Notify", "Fade", "Fishing", "OpenPanel", "Telescope", "Whale", "Music" } do
		remote(name)
	end
	for _, name in { "BuyUpgrade", "AdoptPet", "StartCooking", "FinishCooking" } do
		remote(name, "RemoteFunction")
	end
	remotes.Parent = ReplicatedStorage

	buildWhaleTemplate()
	setupTravel()
	setupFireAndLights()
	setupHome()
	setupCooking()
	setupConcierge()
	setupFishing()
	Pets.start(refs, {
		notify = notify,
		discover = discover,
		addNeed = addNeed,
		onCooldown = onCooldown,
		completeChore = completeChore,
		useTreat = function(player: Player): boolean
			local profile = profiles[player]
			if not profile or profile.treats <= 0 then
				return false
			end
			profile.treats -= 1
			syncTreats(player)
			return true
		end,
	})

	Players.PlayerAdded:Connect(onPlayerAdded)
	Players.PlayerRemoving:Connect(onPlayerRemoving)
	for _, player in Players:GetPlayers() do
		task.spawn(onPlayerAdded, player)
	end
	game:BindToClose(function()
		for player, profile in profiles do
			Data.save(player.UserId, profile)
		end
	end)

	dayCycle()
	task.spawn(secondLoop)
	task.spawn(weatherLoop)
	task.spawn(whaleLoop)
end

return Gameplay
