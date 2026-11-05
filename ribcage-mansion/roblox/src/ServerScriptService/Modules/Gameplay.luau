--!nonstrict
-- Life on the ice: needs, cooking and eating, chores, fires, beds, plants,
-- reading, pets, four homes with deeds, the ferry and boats, the night when
-- the sea freezes, weather, fishing, upgrades, discoveries and the
-- architect's mystery.

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
local Registry = require(script.Parent.Registry)
local Food = require(script.Parent.Food)
local Boats = require(script.Parent.Boats)
local Lore = require(script.Parent.Lore)
local Well = require(script.Parent:WaitForChild("Homes"):WaitForChild("Well"))

local Gameplay = {}

local refs
local remotes: any
local profiles: { [Player]: Data.Profile } = {}
local fishInventory: { [Player]: { { name: string, value: number } } } = {}
local pantry: { [Player]: { [string]: number } } = {}
local chores: { [Player]: { [string]: boolean } } = {}
local fishing: { [Player]: { state: string, token: number, biteAt: number? } } = {}
local cooking: { [Player]: { recipe: any, token: number, started: number, kitchen: any } } = {}
local atKitchen: { [Player]: any } = {}
local cooldowns: { [Player]: { [string]: number } } = {}
local reading: { [Player]: number } = {}

local day = 1
local weather = Config.WEATHER[1]
local frozen = false
local FREEZE_AT, THAW_AT = 22, 4.8

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

-- What eating each snack/drink does (cooked meals use their recipe effects).
local EXTRA_FOOD = {
	tea = { name = "Mug of Tea", effects = { Warmth = 18, Fun = 4 } },
	snack = { name = "Cheese & Crackers", effects = { Hunger = 18 } },
}

----------------------------------------------------------------------------
-- Helpers
----------------------------------------------------------------------------

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
	notify(player, "Every part of today's routine done. A good day on the ice (+40).", "discovery")
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

local function syncNotes(player: Player)
	local profile = profiles[player]
	if profile then
		player:SetAttribute("Notes", idList(profile.notes))
		player:SetAttribute("Melody", profile.flags.melody == true)
	end
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

-- Fades the screen, optionally plays a short camera "ride", then moves the player.
local function teleport(player: Player, cf: CFrame, ride: string?)
	local character = player.Character
	if not character then
		return
	end
	local hold = ride and 2.8 or 0.9
	remotes.Fade:FireClient(player, hold, ride)
	task.delay(ride and 2.6 or 0.35, function()
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

local function locationName(pos: Vector3): (string?, any)
	local interior = Registry.locate(pos)
	if not interior then
		return nil, nil
	end
	if interior.home == "ribcage" then
		local room = Arch.roomAt(pos)
		return "The Ribcage · " .. (room and room.name or "Gallery"), interior
	elseif interior.home == "well" then
		return Well.roomName(pos), interior
	end
	return interior.name, interior
end

----------------------------------------------------------------------------
-- Titles and homes
----------------------------------------------------------------------------

local function refreshTitle(player: Player)
	local profile = profiles[player]
	if not profile then
		return
	end
	local home = Registry.homes[profile.home]
	local title = profile.title ~= "" and profile.title or (home and ("Lives in " .. home.name) or "Visitor")
	player:SetAttribute("Title", title)
	player:SetAttribute("Home", profile.home)
	local head = player.Character and player.Character:FindFirstChild("Head")
	if not head then
		return
	end
	local gui = head:FindFirstChild("TitleTag")
	if not gui then
		gui = Instance.new("BillboardGui")
		gui.Name = "TitleTag"
		gui.Size = UDim2.new(0, 220, 0, 22)
		gui.StudsOffset = Vector3.new(0, 2.4, 0)
		gui.MaxDistance = 70
		local label = Instance.new("TextLabel")
		label.Name = "Text"
		label.Size = UDim2.fromScale(1, 1)
		label.BackgroundTransparency = 1
		label.Font = Enum.Font.GothamMedium
		label.TextSize = 14
		label.TextColor3 = Color3.fromRGB(255, 214, 160)
		label.TextStrokeTransparency = 0.6
		label.Parent = gui
		gui.Parent = head
	end
	gui.Text.Text = title
end

local function updateDeeds()
	for id, home in Registry.homes do
		if home.deedLabel then
			local names = {}
			for player, profile in profiles do
				if profile.home == id then
					table.insert(names, player.DisplayName)
				end
			end
			home.deedLabel.Text = string.upper(home.name) .. "\n" .. (#names == 0 and "no residents yet" or ("home of " .. table.concat(names, ", ")))
		end
	end
end

local function homeSpawn(player: Player): CFrame?
	local profile = profiles[player]
	local home = profile and Registry.homes[profile.home]
	return home and home.spawn
end

local function setupHomes()
	for id, home in Registry.homes do
		if home.deed then
			local claim = Build.prompt(home.deed, "Make this your home", home.name, 1, 9)
			claim.Triggered:Connect(function(player)
				local profile = profiles[player]
				if not profile then
					return
				end
				if profile.home == id then
					notify(player, "You already live here.")
					return
				end
				profile.home = id
				discover(player, "home")
				refreshTitle(player)
				updateDeeds()
				notify(player, "Welcome home. You'll wake up in " .. home.name .. " from now on.", "discovery")
				task.spawn(Data.save, player.UserId, profile)
			end)
			local concierge = Build.prompt(home.deed, "Open concierge", "Upgrades & pets", 0, 9)
			concierge.UIOffset = Vector2.new(0, 70)
			concierge.KeyboardKeyCode = Enum.KeyCode.F
			concierge.Triggered:Connect(function(player)
				remotes.OpenPanel:FireClient(player, "shop")
			end)
		end
	end
end

----------------------------------------------------------------------------
-- Travel: funicular, lift, hatches, ferry
----------------------------------------------------------------------------

local function nearBell(player: Player): boolean
	local hrp = rootPart(player)
	if not hrp then
		return false
	end
	for _, dock in Registry.docks do
		if (dock.bell.Position - hrp.Position).Magnitude < 22 then
			return true
		end
	end
	return false
end

local function setupTravel()
	local up = Build.prompt(refs.funicularBottom, "Ride up to the gallery", "Funicular", 0, 12)
	up.Triggered:Connect(function(player)
		teleport(player, refs.funicularTopArrive, "funicular_up")
	end)
	local down = Build.prompt(refs.funicularTop, "Ride down to the dock", "Funicular", 0, 12)
	down.Triggered:Connect(function(player)
		teleport(player, refs.funicularBottomArrive, "funicular_down")
	end)

	-- The roof hatch is only in reach from the top of the ladder.
	local hatch = Build.prompt(refs.hatch, "Open the hatch", "Roof hatch", 0.3, 7)
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
		teleport(player, CFrame.new(-102, refs.funicularTopArrive.Y, 11) * CFrame.Angles(0, -math.pi / 2, 0))
	end)

	local lift = Registry.misc.vertebraeLift
	if lift then
		local liftUp = Build.prompt(lift.bottom, "Ride the lift up", "Lift", 0, 12)
		liftUp.Triggered:Connect(function(player)
			teleport(player, lift.topArrive, "lift_up")
		end)
		local liftDown = Build.prompt(lift.top, "Ride the lift down", "Lift", 0, 12)
		liftDown.Triggered:Connect(function(player)
			teleport(player, lift.bottomArrive, "lift_down")
		end)
	end

	local parka = Build.prompt(refs.parkaRack, "Put on / take off parka", "Coat rack", 0, 10)
	parka.Triggered:Connect(function(player)
		local on = not player:GetAttribute("Parka")
		Gameplay.setParka(player, on)
		notify(player, on and "Parka on. The cold bites much less outside." or "Parka hung back up.")
	end)

	-- Ferry bells at every dock.
	for _, dock in Registry.docks do
		local bell = Build.prompt(dock.bell, "Ring for the ferry", "Ferry bell", 0, 10)
		bell.Triggered:Connect(function(player)
			remotes.OpenPanel:FireClient(player, "ferry")
		end)
	end
	remotes.Travel.OnServerEvent:Connect(function(player, homeId, inside)
		local home = type(homeId) == "string" and Registry.homes[homeId] or nil
		if not home or not nearBell(player) then
			return
		end
		if frozen then
			notify(player, "The ferry can't get through the ice tonight. Walk across it!", "warn")
			return
		end
		local profile = profiles[player]
		local goInside = inside == true and profile and profile.home == homeId
		teleport(player, goInside and home.spawn or home.dock, "ferry")
		notify(player, "The ferry noses through the floes to " .. home.name .. ".")
	end)
end

function Gameplay.setParka(player: Player, on: boolean)
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

----------------------------------------------------------------------------
-- Fires, lamps, doors
----------------------------------------------------------------------------

local function applyFire(f)
	local lit = f.fuel > 0
	f.fire.Enabled = lit
	f.light.Enabled = lit
	f.embers.Enabled = lit
	local k = f.fuel / 100
	f.fire.Size = math.max(2, f.baseSize * (0.4 + 0.8 * k))
	f.light.Brightness = 0.8 + 2 * k
	f.light.Range = 18 + 16 * k
	for _, p in f.prompts do
		p.ActionText = lit and "Add a log" or "Light the fire"
	end
end

local function feedFire(f, player: Player)
	if f.fuel >= 95 then
		notify(player, "The fire is roaring already.")
		return
	end
	local wasOut = f.fuel <= 0
	f.fuel = math.min(100, f.fuel + 45)
	applyFire(f)
	notify(player, wasOut and "The fire catches. Warm light spills across the concrete." or "You lay a log on the embers.")
	if isNight() then
		completeChore(player, "fire")
	end
end

local function setupFiresLampsDoors()
	for _, f in Registry.fires do
		f.prompts = { Build.prompt(f.core, "Add a log", "Fire", 0.4, 14) }
		if f.basket then
			table.insert(f.prompts, Build.prompt(f.basket, "Add a log", "Log basket", 0.4, 10))
		end
		for _, p in f.prompts do
			p.Triggered:Connect(function(player)
				feedFire(f, player)
			end)
		end
		applyFire(f)
	end

	for _, lamp in Registry.lamps do
		local p = Build.prompt(lamp.part, "Toggle light", "Lamp", 0, 9)
		p.Triggered:Connect(function()
			lamp.light.Enabled = not lamp.light.Enabled
			lamp.part.Material = lamp.light.Enabled and Enum.Material.Neon or Enum.Material.SmoothPlastic
		end)
		lamp.part.Material = Enum.Material.Neon
	end

	for _, door in Registry.doors do
		door.isOpen = false
		local p = Build.prompt(door.part, "Open", "Door", 0, 9)
		p.Triggered:Connect(function()
			door.isOpen = not door.isOpen
			p.ActionText = door.isOpen and "Close" or "Open"
			local info = TweenInfo.new(0.7, Enum.EasingStyle.Quad)
			TweenService:Create(door.part, info, { CFrame = door.isOpen and door.open or door.closed }):Play()
			local handle = door.part:FindFirstChild("Handle")
			if handle then
				local target = (door.isOpen and door.open or door.closed) * door.closed:ToObjectSpace(handle.CFrame)
				TweenService:Create(handle, info, { CFrame = target }):Play()
			end
		end)
	end
end

----------------------------------------------------------------------------
-- Dishes, beds, showers, plants, books, kitchens
----------------------------------------------------------------------------

local function applyDishes(kitchen)
	for _, p in kitchen.dishParts do
		p:Destroy()
	end
	table.clear(kitchen.dishParts)
	for i = 1, kitchen.dirty do
		local col = (i - 1) % 2
		local row = math.floor((i - 1) / 2)
		local p = Build.cylinderY(refs.root, kitchen.dishSpot + Vector3.new(col * 1.6, 0.12 + row * 0.22, 0), 0.2, 1.4, {
			Name = "DirtyPlate",
			Color = Color3.fromRGB(196, 190, 182),
			Material = Enum.Material.SmoothPlastic,
			CanCollide = false,
		})
		table.insert(kitchen.dishParts, p)
	end
end

local function addDish(kitchen)
	if not kitchen then
		return
	end
	kitchen.dirty = math.min(Config.MAX_DIRTY_DISHES, kitchen.dirty + 1)
	applyDishes(kitchen)
end

local function setBedMessy(bed, messy: boolean)
	bed.messyNow = messy
	TweenService:Create(bed.duvet, TweenInfo.new(0.5), { CFrame = messy and bed.messy or bed.tidy }):Play()
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

-- Gives a Tool of food and wires up eating it.
local function giveFood(player: Player, designId: string, displayName: string, effects, quality: string, mult: number, kitchen, cooked: boolean)
	local tool = Food.make(designId, displayName, quality)
	if not tool then
		return
	end
	tool:SetAttribute("Mult", mult)
	local busy = false
	tool.Activated:Connect(function()
		if busy or not tool.Parent then
			return
		end
		busy = true
		task.delay(0.7, function()
			busy = false
		end)
		local character = tool.Parent
		local humanoid = character and character:FindFirstChildOfClass("Humanoid")
		if not humanoid then
			return
		end
		local total = tool:GetAttribute("BitesTotal") or 3
		local bites = tool:GetAttribute("Bites") or total
		local seated = humanoid.SeatPart ~= nil
		local m = mult * (seated and 1.3 or 1)
		for need, amount in effects do
			addNeed(player, need, amount * m / total)
		end
		if seated then
			addNeed(player, "Fun", 2)
			if cooked and not Food.isDrink(designId) then
				completeChore(player, "cook")
			end
		end
		if bites == total then
			if seated then
				notify(player, Food.isDrink(designId) and "You sit with it in both hands." or "You sit down and eat properly. It tastes better this way.")
			else
				notify(player, "Eating standing up... sit down at a table for a bonus.")
			end
		end
		bites -= 1
		tool:SetAttribute("Bites", bites)
		if bites <= 0 then
			tool:Destroy()
			addDish(kitchen)
			notify(player, "All gone. The dish goes back to the sink.")
		else
			Food.shrink(tool, bites / (bites + 1))
		end
	end)
	local backpack = player:FindFirstChildOfClass("Backpack")
	tool.Parent = backpack or player.Character
end

local function setupHomeLife()
	for _, bed in Registry.beds do
		local sleep = Build.prompt(bed.mattress, "Sleep", "Bed", 1, 10)
		sleep.Triggered:Connect(function(player)
			remotes.Fade:FireClient(player, 3)
			task.delay(1.5, function()
				setNeed(player, "Energy", 100)
				addNeed(player, "Warmth", 20)
				setBedMessy(bed, true)
				notify(player, "You slept to the sound of ice knocking softly against the concrete.")
			end)
		end)
		local make = Build.prompt(bed.duvet, "Make the bed", "Bed", 0.8, 10)
		make.UIOffset = Vector2.new(0, 70)
		make.KeyboardKeyCode = Enum.KeyCode.F
		make.Triggered:Connect(function(player)
			if not bed.messyNow then
				notify(player, "The bed is already made. Crisp.")
				return
			end
			setBedMessy(bed, false)
			completeChore(player, "bed")
		end)
		setBedMessy(bed, true)
	end

	for _, shower in Registry.showers do
		local p = Build.prompt(shower.head, "Take a rain shower", "Shower", 0.5, 13)
		p.Triggered:Connect(function(player)
			shower.rain.Enabled = true
			task.delay(6, function()
				shower.rain.Enabled = false
			end)
			setNeed(player, "Hygiene", 100)
			addNeed(player, "Warmth", 10)
			notify(player, "Hot water falling through a shaft of light. Clean.")
		end)
	end
	for _, sink in Registry.sinks do
		local p = Build.prompt(sink, "Wash up", "Sink", 0, 8)
		p.Triggered:Connect(function(player)
			addNeed(player, "Hygiene", 15)
		end)
	end

	for _, plant in Registry.plants do
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

	for _, shelf in Registry.bookshelves do
		local p = Build.prompt(shelf, "Take a book", "Bookshelf", 0, 9)
		p.Triggered:Connect(function(player)
			player:SetAttribute("HasBook", true)
			notify(player, "You pick a worn paperback. Find a seat near a fire to read.")
		end)
	end

	for _, kitchen in Registry.kitchens do
		local wash = Build.prompt(kitchen.sink, "Wash the dishes", "Kitchen sink", 1.5, 9)
		wash.Triggered:Connect(function(player)
			if kitchen.dirty == 0 then
				notify(player, "The sink is empty. Nothing to wash.")
				return
			end
			kitchen.dirty = 0
			applyDishes(kitchen)
			addNeed(player, "Hygiene", 4)
			completeChore(player, "dishes")
			notify(player, "Dishes done, steam on the glass.")
		end)

		local pantryPrompt = Build.prompt(kitchen.pantry, "Look in the pantry", "Pantry", 0, 9)
		pantryPrompt.Triggered:Connect(function(player)
			remotes.OpenPanel:FireClient(player, "pantry")
		end)

		local fridge = Build.prompt(kitchen.fridge, "Grab a snack", "Fridge", 0, 8)
		fridge.Triggered:Connect(function(player)
			if onCooldown(player, "snack", 45) then
				return
			end
			giveFood(player, "snack", EXTRA_FOOD.snack.name, EXTRA_FOOD.snack.effects, "Cold", 1, kitchen, false)
			notify(player, "Cheese and crackers. Find a seat.")
		end)

		local tea = Build.prompt(kitchen.kettle, "Make tea", "Kettle", 0.8, 8)
		tea.Triggered:Connect(function(player)
			if onCooldown(player, "tea", 25) then
				return
			end
			kitchen.steam.Enabled = true
			task.delay(4, function()
				if (kitchen.cooking or 0) == 0 then
					kitchen.steam.Enabled = false
				end
			end)
			giveFood(player, "tea", EXTRA_FOOD.tea.name, EXTRA_FOOD.tea.effects, "Hot", 1, kitchen, false)
			notify(player, "Tea. Hold the mug in both hands.")
		end)
	end

	local bowl = Build.prompt(refs.catBowl, "Fill " .. Config.RESIDENT_CAT_NAME .. "'s bowl", "Cat bowl", 0.3, 8)
	bowl.Triggered:Connect(function(player)
		Pets.fillBowl(player)
	end)

	local record = Build.prompt(refs.recordPlayer, "Play a record", "Record player", 0, 9)
	record.Triggered:Connect(function(player)
		if not ownsUpgrade(player, "RecordPlayer") then
			notify(player, "No needle on it. Buy the Record Player at the concierge.", "warn")
			return
		end
		remotes.Music:FireClient(player)
	end)
end

----------------------------------------------------------------------------
-- Cooking
----------------------------------------------------------------------------

local function hasIngredients(player: Player, recipe): (boolean, string?)
	local stock = pantry[player] or {}
	for item, count in recipe.needs do
		if item == "fish" then
			if #(fishInventory[player] or {}) < count then
				return false, string.format("You need %d fish. Try fishing off the Ribcage dock.", count)
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

local STATION_LABEL = { stove = "Cook on the stove", oven = "Bake in the oven", coffee = "Make coffee" }
local STATION_NAME = { stove = "Stove", oven = "Oven", coffee = "Coffee machine" }

local function setupCooking()
	for _, kitchen in Registry.kitchens do
		for station, label in STATION_LABEL do
			local p = Build.prompt(kitchen[station], label, STATION_NAME[station], 0, 9)
			p.Triggered:Connect(function(player)
				atKitchen[player] = kitchen
				remotes.OpenPanel:FireClient(player, "cook", station)
			end)
		end
	end

	remotes.StartCooking.OnServerInvoke = function(player: Player, recipeId: any)
		local recipe = type(recipeId) == "string" and recipeById[recipeId] or nil
		if not recipe then
			return false, "Unknown recipe."
		end
		local kitchen = atKitchen[player]
		local hrp = rootPart(player)
		local station = kitchen and kitchen[recipe.station]
		if not hrp or not station or (hrp.Position - station.Position).Magnitude > 16 then
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
		cooking[player] = { recipe = recipe, token = token, started = os.clock(), kitchen = kitchen }
		if recipe.station ~= "coffee" then
			kitchen.cooking = (kitchen.cooking or 0) + 1
			kitchen.steam.Enabled = true
		end
		return true, token
	end

	remotes.FinishCooking.OnServerInvoke = function(player: Player, token: any, scores: any)
		local session = cooking[player]
		if not session or session.token ~= token then
			return nil
		end
		cooking[player] = nil
		local recipe = session.recipe
		local kitchen = session.kitchen
		if recipe.station ~= "coffee" then
			kitchen.cooking = math.max(0, (kitchen.cooking or 1) - 1)
			if kitchen.cooking == 0 then
				kitchen.steam.Enabled = false
			end
		end
		if type(scores) ~= "table" then
			scores = {}
		end
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
		discover(player, "firstmeal")
		if recipe.makesTreats then
			local profile = profiles[player]
			profile.treats += recipe.makesTreats
			syncTreats(player)
			addDish(kitchen)
			return { name = recipe.name, quality = label, treats = recipe.makesTreats }
		end
		if recipe.station == "coffee" then
			completeChore(player, "coffee")
		end
		giveFood(player, recipe.id, recipe.name, recipe.effects, label, mult, kitchen, true)
		return { name = recipe.name, quality = label, food = true }
	end
end

----------------------------------------------------------------------------
-- Concierge: upgrades and pets
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
			notify(player, "It's capped. Buy the Roof Telescope at the concierge.", "warn")
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
		if frozen then
			notify(player, "The sea is frozen solid. Fish again after dawn.", "warn")
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
		if weather.id ~= "Blizzard" and not frozen then
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
-- The freeze: at night the sea becomes a floor between the homes
----------------------------------------------------------------------------

local function setFrozen(state: boolean)
	if frozen == state then
		return
	end
	frozen = state
	Workspace:SetAttribute("Frozen", state)
	local ice = Registry.misc.seaIce
	Lore.setFrozen(state)
	if state then
		-- Lift anyone swimming in the sea up onto the new ice.
		for _, player in Players:GetPlayers() do
			local hrp = rootPart(player)
			if hrp and hrp.Position.Y < 3 and not Registry.locate(hrp.Position) then
				player.Character:PivotTo(CFrame.new(hrp.Position.X, 4, hrp.Position.Z))
			end
		end
		ice.CanCollide = true
		ice.CanQuery = true
		TweenService:Create(ice, TweenInfo.new(6), { Transparency = 0.12 }):Play()
		notifyAll("The sea has frozen. Tonight you can walk between the homes.", "discovery")
	else
		ice.CanCollide = false
		ice.CanQuery = false
		TweenService:Create(ice, TweenInfo.new(4), { Transparency = 1 }):Play()
		notifyAll("The ice cracks open with a sound like thunder. Boats and the ferry are running again.", "warn")
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
			Blizzard = "A blizzard is coming in. Best to be inside, near a fire.",
		}
		notifyAll(lines[weather.id] or weather.name, weather.id == "Blizzard" and "warn" or "info")
	end
end

local function newDay()
	day += 1
	Workspace:SetAttribute("Day", day)
	for _, bed in Registry.beds do
		setBedMessy(bed, true)
	end
	for _, plant in Registry.plants do
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
	notifyAll(string.format("Morning, day %d. The pantries are restocked and the plants are thirsty.", day), "chore")
end

local function inBox(pos: Vector3, minV: Vector3, maxV: Vector3): boolean
	return pos.X >= minV.X and pos.X <= maxV.X and pos.Y >= minV.Y and pos.Y <= maxV.Y and pos.Z >= minV.Z and pos.Z <= maxV.Z
end

local function rescue(player: Player)
	setNeed(player, "Warmth", 45)
	local ribcageFire = Registry.fires[1]
	teleport(player, homeSpawn(player) or CFrame.new(ribcageFire.core.Position + Vector3.new(-6, 3, 0)))
	notify(player, "You got dangerously cold, and only just made it back inside.", "warn")
end

local function tickPlayer(player: Player)
	local character = player.Character
	local hrp = rootPart(player)
	local humanoid = character and character:FindFirstChildOfClass("Humanoid")
	if not hrp or not humanoid or humanoid.Health <= 0 then
		return
	end
	local pos = hrp.Position
	local place, interior = locationName(pos)
	local inside = interior ~= nil
	local swimming = humanoid:GetState() == Enum.HumanoidStateType.Swimming
	local inPool = inBox(pos, refs.poolMin - Vector3.new(1, 2, 1), refs.poolMax + Vector3.new(1, 4, 1))
	local onRoof = not inside
		and math.abs(pos.Z) < Arch.W / 2 + 2
		and math.abs(pos.X) < Arch.A * 0.95
		and pos.Y > Arch.yAt(pos.X) + Arch.T / 2 - 2
	local inSea = not inside and pos.Y < 3 and swimming
	local fire, fireDist = Registry.nearestFire(pos)
	local nearFire = fire ~= nil and fire.fuel > 0 and fireDist < Config.WARMTH.fireplaceRange
	local parka = player:GetAttribute("Parka") == true
	local W = Config.WARMTH
	local storm = weather.id == "Blizzard" and W.blizzardMultiplier or 1

	local warmth = getNeed(player, "Warmth")
	if nearFire then
		warmth += W.fireplaceGain * (0.4 + 0.6 * fire.fuel / 100)
	elseif inPool and swimming and ownsUpgrade(player, "HeatedPool") then
		warmth += W.heatedPoolGain
	elseif inside then
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
	local seat = humanoid.SeatPart
	local seated = seat ~= nil
	if seated then
		energyDelta = Config.SEAT_ENERGY_GAIN
		if seat:IsA("VehicleSeat") then
			discover(player, "boat")
		end
	end
	addNeed(player, "Energy", energyDelta)
	addNeed(player, "Hunger", -Config.NEED_DECAY.Hunger)
	addNeed(player, "Hygiene", -Config.NEED_DECAY.Hygiene)

	local fun = -Config.NEED_DECAY.Fun
	if inPool and swimming then
		fun = Config.POOL_FUN_GAIN
	end
	local isReading = seated and player:GetAttribute("HasBook") == true and fire ~= nil and fireDist < 30
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
	local outside = frozen and pos.Y < 6 and "On the Frozen Sea" or "Outside"
	player:SetAttribute("Location", place or (onRoof and "Top of the Spine" or (inSea and "In the Southern Ocean" or outside)))

	if (pos - refs.dockCenter).Magnitude < 45 then
		discover(player, "dock")
	end
	if interior then
		if interior.home == "ribcage" then
			local room = Arch.roomAt(pos)
			if room and room.id == "gallery" then
				discover(player, "gallery")
			elseif room and room.id == "lounge" then
				discover(player, "glassfloor")
			end
		elseif interior.home == "monolith" or interior.home == "vertebrae" or interior.home == "well" then
			discover(player, interior.home)
		end
		if weather.id == "Blizzard" then
			discover(player, "blizzard")
		end
	end
	if inPool and swimming then
		discover(player, "pool")
	end
	if fire and fire.home == "ribcage" and fireDist < 14 then
		discover(player, "fireplace")
	end
	if onRoof then
		discover(player, "roof")
	end
	if frozen and humanoid.FloorMaterial == Enum.Material.Glacier then
		discover(player, "freeze")
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
		for _, f in Registry.fires do
			if f.fuel > 0 then
				f.fuel = math.max(0, f.fuel - 0.12)
				applyFire(f)
				if f.fuel == 0 then
					for _, player in Players:GetPlayers() do
						local hrp = rootPart(player)
						if hrp and (hrp.Position - f.core.Position).Magnitude < 80 then
							notify(player, "The fire has burned down to ash. Add a log?", "warn")
						end
					end
				end
			end
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
	Workspace:SetAttribute("Frozen", false)
	RunService.Heartbeat:Connect(function(dt)
		local before = Lighting.ClockTime
		local after = (before + dt * rate) % 24
		Lighting.ClockTime = after
		Workspace:SetAttribute("Night", isNight())
		if before < 6 and after >= 6 then
			newDay()
		end
		if before < FREEZE_AT - 0.6 and after >= FREEZE_AT - 0.6 then
			notifyAll("It's getting bitterly cold. The sea is starting to freeze...", "info")
		end
		if before < THAW_AT - 0.6 and after >= THAW_AT - 0.6 and frozen then
			notifyAll("The ice is groaning. Get off the sea before dawn!", "warn")
		end
		setFrozen(after >= FREEZE_AT or after < THAW_AT)
	end)
end

----------------------------------------------------------------------------
-- Players
----------------------------------------------------------------------------

local function onPlayerAdded(player: Player)
	local profile = Data.load(player.UserId)
	if profile.home ~= "" and not Registry.homes[profile.home] then
		profile.home = ""
	end
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
	syncNotes(player)
	updateDeeds()

	local function onCharacter(character: Model)
		task.wait(0.3)
		if profiles[player] ~= profile then
			return
		end
		local spawnAt = homeSpawn(player)
		if spawnAt then
			character:PivotTo(spawnAt)
		end
		if player:GetAttribute("Parka") then
			Gameplay.setParka(player, true)
		end
		if profile.activePet ~= "" then
			Pets.setActive(player, profile.activePet)
		end
		refreshTitle(player)
	end
	player.CharacterAdded:Connect(onCharacter)
	if player.Character then
		task.spawn(onCharacter, player.Character)
	end
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
	cooldowns[player] = nil
	reading[player] = nil
	atKitchen[player] = nil
	local session = cooking[player]
	cooking[player] = nil
	if session and session.recipe.station ~= "coffee" then
		session.kitchen.cooking = math.max(0, (session.kitchen.cooking or 1) - 1)
		if session.kitchen.cooking == 0 then
			session.kitchen.steam.Enabled = false
		end
	end
	updateDeeds()
end

function Gameplay.start(builtRefs)
	refs = builtRefs
	local ribcageFire = Registry.fires[1]
	refs.fireLit = function()
		return ribcageFire.fuel > 0
	end

	local old = ReplicatedStorage:FindFirstChild("Remotes")
	if old then
		old:Destroy()
	end
	remotes = Instance.new("Folder")
	remotes.Name = "Remotes"
	for _, name in { "Notify", "Fade", "Fishing", "OpenPanel", "Telescope", "Whale", "Music", "Organ", "Travel" } do
		local r = Instance.new("RemoteEvent")
		r.Name = name
		r.Parent = remotes
	end
	for _, name in { "BuyUpgrade", "AdoptPet", "StartCooking", "FinishCooking" } do
		local r = Instance.new("RemoteFunction")
		r.Name = name
		r.Parent = remotes
	end
	remotes.Parent = ReplicatedStorage

	buildWhaleTemplate()
	setupHomes()
	setupTravel()
	setupFiresLampsDoors()
	setupHomeLife()
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
	Boats.start({ notify = notify })
	Lore.start({
		profile = function(player: Player)
			return profiles[player]
		end,
		openPanel = function(player: Player, kind: string, arg: any)
			remotes.OpenPanel:FireClient(player, kind, arg)
		end,
		syncNotes = syncNotes,
		addCredits = addCredits,
		refreshTitle = refreshTitle,
		discover = discover,
		notify = notify,
		teleport = teleport,
	}, remotes)

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
