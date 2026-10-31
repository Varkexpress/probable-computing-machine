-- The Ribcage: client. HUD, daily routine, cooking, pantry, pets & upgrades,
-- fishing, lighting moods, weather, snow, breath, aurora, bobbing ice,
-- whale breaches and the telescope.

local HttpService = game:GetService("HttpService")
local Lighting = game:GetService("Lighting")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local Workspace = game:GetService("Workspace")

local player = Players.LocalPlayer
local Shared = ReplicatedStorage:WaitForChild("Shared")
local Config = require(Shared:WaitForChild("Config"))
local Arch = require(Shared:WaitForChild("Arch"))
local remotes = ReplicatedStorage:WaitForChild("Remotes")
local world = Workspace:WaitForChild("RibcageWorld")

local FONT = Enum.Font.Gotham
local FONT_BOLD = Enum.Font.GothamMedium
local INK = Color3.fromRGB(236, 238, 242)
local MUTED = Color3.fromRGB(160, 170, 185)
local PANEL = Color3.fromRGB(14, 18, 26)
local ACCENT = Color3.fromRGB(255, 196, 130)

----------------------------------------------------------------------------
-- UI helpers
----------------------------------------------------------------------------

local gui = Instance.new("ScreenGui")
gui.Name = "RibcageHUD"
gui.ResetOnSpawn = false
gui.IgnoreGuiInset = true
gui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
gui.Parent = player:WaitForChild("PlayerGui")

local function new(className: string, props: { [string]: any }, parent: Instance?): any
	local inst = Instance.new(className)
	for k, v in props do
		(inst :: any)[k] = v
	end
	inst.Parent = parent
	return inst
end

local function panel(props: { [string]: any }, parent: Instance?): Frame
	local f = new("Frame", {
		BackgroundColor3 = PANEL,
		BackgroundTransparency = 0.25,
		BorderSizePixel = 0,
	}, parent or gui)
	for k, v in props do
		(f :: any)[k] = v
	end
	new("UICorner", { CornerRadius = UDim.new(0, 10) }, f)
	new("UIStroke", { Color = Color3.fromRGB(255, 255, 255), Transparency = 0.88, Thickness = 1 }, f)
	return f
end

local function label(text: string, props: { [string]: any }, parent: Instance): TextLabel
	local l = new("TextLabel", {
		BackgroundTransparency = 1,
		Text = text,
		Font = FONT,
		TextColor3 = INK,
		TextSize = 16,
		TextXAlignment = Enum.TextXAlignment.Left,
	}, parent)
	for k, v in props do
		(l :: any)[k] = v
	end
	return l
end

local function button(text: string, props: { [string]: any }, parent: Instance): TextButton
	local b = new("TextButton", {
		BackgroundColor3 = Color3.fromRGB(40, 48, 62),
		BorderSizePixel = 0,
		Text = text,
		Font = FONT_BOLD,
		TextColor3 = INK,
		TextSize = 16,
		AutoButtonColor = true,
	}, parent)
	for k, v in props do
		(b :: any)[k] = v
	end
	new("UICorner", { CornerRadius = UDim.new(0, 8) }, b)
	return b
end

----------------------------------------------------------------------------
-- Fade
----------------------------------------------------------------------------

local fade = new("Frame", {
	Size = UDim2.fromScale(1, 1),
	BackgroundColor3 = Color3.new(0, 0, 0),
	BackgroundTransparency = 1,
	BorderSizePixel = 0,
	ZIndex = 50,
}, gui)

local function doFade(hold: number)
	TweenService:Create(fade, TweenInfo.new(0.3), { BackgroundTransparency = 0 }):Play()
	task.delay(0.3 + hold, function()
		TweenService:Create(fade, TweenInfo.new(0.6), { BackgroundTransparency = 1 }):Play()
	end)
end
remotes.Fade.OnClientEvent:Connect(doFade)

----------------------------------------------------------------------------
-- Toasts
----------------------------------------------------------------------------

local toastHolder = new("Frame", {
	AnchorPoint = Vector2.new(1, 0),
	Position = UDim2.new(1, -16, 0, 70),
	Size = UDim2.new(0, 340, 0.6, 0),
	BackgroundTransparency = 1,
}, gui)
new("UIListLayout", { Padding = UDim.new(0, 8), HorizontalAlignment = Enum.HorizontalAlignment.Right }, toastHolder)

local function toast(text: string, kind: string?)
	local color = kind == "discovery" and ACCENT or (kind == "warn" and Color3.fromRGB(255, 140, 120) or INK)
	local t = panel({ Size = UDim2.new(1, 0, 0, 0), AutomaticSize = Enum.AutomaticSize.Y }, toastHolder)
	new("UIPadding", {
		PaddingTop = UDim.new(0, 10),
		PaddingBottom = UDim.new(0, 10),
		PaddingLeft = UDim.new(0, 14),
		PaddingRight = UDim.new(0, 14),
	}, t)
	local l = label(text, {
		Size = UDim2.new(1, 0, 0, 0),
		AutomaticSize = Enum.AutomaticSize.Y,
		TextWrapped = true,
		TextColor3 = color,
		Font = kind == "discovery" and FONT_BOLD or FONT,
	}, t)
	task.delay(4.5, function()
		TweenService:Create(t, TweenInfo.new(0.5), { BackgroundTransparency = 1 }):Play()
		TweenService:Create(l, TweenInfo.new(0.5), { TextTransparency = 1 }):Play()
		task.wait(0.55)
		t:Destroy()
	end)
end
remotes.Notify.OnClientEvent:Connect(toast)

----------------------------------------------------------------------------
-- Top bar: location, time, credits
----------------------------------------------------------------------------

local top = panel({
	AnchorPoint = Vector2.new(0.5, 0),
	Position = UDim2.new(0.5, 0, 0, 12),
	Size = UDim2.new(0, 420, 0, 42),
})
local placeLabel = label("", {
	Size = UDim2.new(0.62, -12, 1, 0),
	Position = UDim2.new(0, 14, 0, 0),
	Font = FONT_BOLD,
}, top)
local creditLabel = label("", {
	Size = UDim2.new(0.38, -14, 1, 0),
	Position = UDim2.new(0.62, 0, 0, 0),
	TextXAlignment = Enum.TextXAlignment.Right,
	TextColor3 = ACCENT,
	Font = FONT_BOLD,
}, top)

local function clockText(): string
	local t = Lighting.ClockTime
	local h = math.floor(t)
	local m = math.floor((t - h) * 60)
	return string.format("%02d:%02d", h, m)
end

local function refreshTop()
	placeLabel.Text = string.format("%s  ·  %s", player:GetAttribute("Location") or "Outside", clockText())
	creditLabel.Text = string.format("%d credits", player:GetAttribute("Credits") or 0)
end

----------------------------------------------------------------------------
-- Needs bars
----------------------------------------------------------------------------

local needColors = {
	Warmth = Color3.fromRGB(255, 150, 90),
	Energy = Color3.fromRGB(240, 220, 120),
	Hunger = Color3.fromRGB(150, 210, 130),
	Hygiene = Color3.fromRGB(120, 190, 240),
	Fun = Color3.fromRGB(220, 150, 230),
}
local needsPanel = panel({
	AnchorPoint = Vector2.new(0, 1),
	Position = UDim2.new(0, 16, 1, -16),
	Size = UDim2.new(0, 250, 0, 30 + 26 * #Config.NEEDS),
})
local fills: { [string]: Frame } = {}
for i, need in Config.NEEDS do
	local y = 14 + (i - 1) * 26
	label(need, { Position = UDim2.new(0, 14, 0, y), Size = UDim2.new(0, 70, 0, 18), TextSize = 14, TextColor3 = MUTED }, needsPanel)
	local bg = new("Frame", {
		Position = UDim2.new(0, 86, 0, y + 4),
		Size = UDim2.new(1, -100, 0, 10),
		BackgroundColor3 = Color3.fromRGB(40, 46, 58),
		BorderSizePixel = 0,
	}, needsPanel)
	new("UICorner", { CornerRadius = UDim.new(1, 0) }, bg)
	local fill = new("Frame", {
		Size = UDim2.fromScale(0.8, 1),
		BackgroundColor3 = needColors[need],
		BorderSizePixel = 0,
	}, bg)
	new("UICorner", { CornerRadius = UDim.new(1, 0) }, fill)
	fills[need] = fill
end

local function refreshNeeds()
	for need, fill in fills do
		local v = (player:GetAttribute(need) or 100) / 100
		fill.Size = UDim2.fromScale(math.clamp(v, 0, 1), 1)
		fill.BackgroundTransparency = v < 0.2 and (math.sin(os.clock() * 8) * 0.3 + 0.3) or 0
	end
end

----------------------------------------------------------------------------
-- Bottom right: bucket, treats, parka, journal button
----------------------------------------------------------------------------

local infoPanel = panel({
	AnchorPoint = Vector2.new(1, 1),
	Position = UDim2.new(1, -16, 1, -16),
	Size = UDim2.new(0, 240, 0, 112),
})
local fishLabel = label("", { Position = UDim2.new(0, 14, 0, 10), Size = UDim2.new(1, -28, 0, 20), TextSize = 15 }, infoPanel)
local treatLabel = label("", { Position = UDim2.new(0, 14, 0, 31), Size = UDim2.new(1, -28, 0, 18), TextSize = 13, TextColor3 = MUTED }, infoPanel)
local parkaLabel = label("", { Position = UDim2.new(0, 14, 0, 50), Size = UDim2.new(1, -28, 0, 18), TextSize = 13, TextColor3 = MUTED }, infoPanel)
local journalButton = button("Journal  (J)", { Position = UDim2.new(0, 12, 1, -36), Size = UDim2.new(1, -24, 0, 28) }, infoPanel)

local function refreshInfo()
	local count = player:GetAttribute("FishCount") or 0
	local value = player:GetAttribute("FishValue") or 0
	fishLabel.Text = count > 0 and string.format("Fish: %d  (worth %d)", count, value) or "Fish: none"
	treatLabel.Text = string.format("Pet treats: %d", player:GetAttribute("Treats") or 0)
	local status = player:GetAttribute("Reading") and "Reading by the fire" or (player:GetAttribute("Parka") and "Wearing a parka" or "No parka (cold outside)")
	parkaLabel.Text = status
end

----------------------------------------------------------------------------
-- Today: the daily routine (left, above the needs)
----------------------------------------------------------------------------

local todayPanel = panel({
	AnchorPoint = Vector2.new(0, 1),
	Position = UDim2.new(0, 16, 1, -(16 + 30 + 26 * #Config.NEEDS + 10)),
	Size = UDim2.new(0, 250, 0, 34 + 20 * #Config.CHORES),
})
local todayTitle = label("Today", { Position = UDim2.new(0, 14, 0, 8), Size = UDim2.new(1, -28, 0, 20), Font = FONT_BOLD, TextSize = 15 }, todayPanel)
local choreLabels = {}
for i, chore in Config.CHORES do
	choreLabels[chore.id] = label("", {
		Position = UDim2.new(0, 14, 0, 12 + i * 20),
		Size = UDim2.new(1, -28, 0, 18),
		TextSize = 13,
	}, todayPanel)
end
local todayCollapsed = false

local function refreshToday()
	local done = {}
	for id in string.gmatch(player:GetAttribute("Chores") or "", "[^,]+") do
		done[id] = true
	end
	local count = 0
	for _, chore in Config.CHORES do
		local l = choreLabels[chore.id]
		if done[chore.id] then
			count += 1
		end
		l.Text = (done[chore.id] and "✓  " or "○  ") .. chore.name
		l.TextColor3 = done[chore.id] and MUTED or INK
		l.Visible = not todayCollapsed
	end
	todayTitle.Text = string.format("Day %d  ·  Today %d/%d  %s", Workspace:GetAttribute("Day") or 1, count, #Config.CHORES, todayCollapsed and "(T)" or "")
	todayPanel.Size = UDim2.new(0, 250, 0, todayCollapsed and 36 or 34 + 20 * #Config.CHORES)
end

----------------------------------------------------------------------------
-- Journal
----------------------------------------------------------------------------

local journal = panel({
	AnchorPoint = Vector2.new(0.5, 0.5),
	Position = UDim2.fromScale(0.5, 0.5),
	Size = UDim2.new(0, 460, 0, 500),
	Visible = false,
	ZIndex = 10,
})
local journalTitle = label("Journal", { Position = UDim2.new(0, 20, 0, 14), Size = UDim2.new(1, -80, 0, 28), TextSize = 22, Font = FONT_BOLD }, journal)
local journalClose = button("X", { Position = UDim2.new(1, -46, 0, 12), Size = UDim2.new(0, 32, 0, 32) }, journal)
local journalList = new("ScrollingFrame", {
	Position = UDim2.new(0, 16, 0, 54),
	Size = UDim2.new(1, -32, 1, -70),
	BackgroundTransparency = 1,
	BorderSizePixel = 0,
	ScrollBarThickness = 4,
	AutomaticCanvasSize = Enum.AutomaticSize.Y,
	CanvasSize = UDim2.new(),
}, journal)
new("UIListLayout", { Padding = UDim.new(0, 6) }, journalList)

local function clearRows(holder: Instance)
	for _, c in holder:GetChildren() do
		if c:IsA("Frame") or c:IsA("TextLabel") then
			c:Destroy()
		end
	end
end

local function row(holder: Instance, height: number): Frame
	local r = new("Frame", { Size = UDim2.new(1, -8, 0, height), BackgroundColor3 = Color3.fromRGB(30, 34, 42), BackgroundTransparency = 0.3, BorderSizePixel = 0 }, holder)
	new("UICorner", { CornerRadius = UDim.new(0, 8) }, r)
	return r
end

local function refreshJournal()
	clearRows(journalList)
	local found = {}
	for id in string.gmatch(player:GetAttribute("Discoveries") or "", "[^,]+") do
		found[id] = true
	end
	local count = 0
	for _, d in Config.DISCOVERIES do
		local has = found[d.id] == true
		if has then
			count += 1
		end
		local r = row(journalList, 46)
		label((has and "✓  " or "?  ") .. (has and d.name or "Undiscovered"), {
			Position = UDim2.new(0, 12, 0, 4),
			Size = UDim2.new(1, -90, 0, 20),
			Font = FONT_BOLD,
			TextColor3 = has and ACCENT or MUTED,
		}, r)
		label(d.hint, { Position = UDim2.new(0, 34, 0, 24), Size = UDim2.new(1, -46, 0, 18), TextSize = 13, TextColor3 = MUTED }, r)
		label("+" .. d.reward, { Position = UDim2.new(1, -70, 0, 4), Size = UDim2.new(0, 58, 0, 20), TextXAlignment = Enum.TextXAlignment.Right, TextSize = 14, TextColor3 = MUTED }, r)
	end
	journalTitle.Text = string.format("Journal  ·  %d / %d discovered", count, #Config.DISCOVERIES)
end

local function toggleJournal()
	journal.Visible = not journal.Visible
	if journal.Visible then
		refreshJournal()
	end
end
journalButton.Activated:Connect(toggleJournal)
journalClose.Activated:Connect(toggleJournal)

----------------------------------------------------------------------------
-- Generic centred panel with a scrolling list
----------------------------------------------------------------------------

local function listPanel(title: string, width: number, height: number)
	local p = panel({
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.fromScale(0.5, 0.5),
		Size = UDim2.new(0, width, 0, height),
		Visible = false,
		ZIndex = 10,
	})
	local t = label(title, { Position = UDim2.new(0, 20, 0, 14), Size = UDim2.new(1, -80, 0, 28), TextSize = 20, Font = FONT_BOLD }, p)
	local close = button("X", { Position = UDim2.new(1, -46, 0, 12), Size = UDim2.new(0, 32, 0, 32) }, p)
	close.Activated:Connect(function()
		p.Visible = false
	end)
	local list = new("ScrollingFrame", {
		Position = UDim2.new(0, 16, 0, 54),
		Size = UDim2.new(1, -32, 1, -70),
		BackgroundTransparency = 1,
		BorderSizePixel = 0,
		ScrollBarThickness = 4,
		AutomaticCanvasSize = Enum.AutomaticSize.Y,
		CanvasSize = UDim2.new(),
	}, p)
	new("UIListLayout", { Padding = UDim.new(0, 8) }, list)
	return p, list, t
end

local function sectionHeader(holder: Instance, text: string)
	label(text, { Size = UDim2.new(1, -8, 0, 24), Font = FONT_BOLD, TextColor3 = ACCENT, TextSize = 15 }, holder)
end

local function itemRow(holder: Instance, name: string, desc: string, buttonText: string, buttonColor: Color3, onClick: (() -> ())?)
	local r = row(holder, 74)
	label(name, { Position = UDim2.new(0, 12, 0, 8), Size = UDim2.new(1, -150, 0, 20), Font = FONT_BOLD }, r)
	label(desc, {
		Position = UDim2.new(0, 12, 0, 30),
		Size = UDim2.new(1, -150, 0, 40),
		TextSize = 13,
		TextWrapped = true,
		TextYAlignment = Enum.TextYAlignment.Top,
		TextColor3 = MUTED,
	}, r)
	local b = button(buttonText, {
		AnchorPoint = Vector2.new(1, 0.5),
		Position = UDim2.new(1, -10, 0.5, 0),
		Size = UDim2.new(0, 126, 0, 34),
		BackgroundColor3 = buttonColor,
		AutoButtonColor = onClick ~= nil,
		TextSize = 14,
	}, r)
	if onClick then
		b.Activated:Connect(function()
			b.Text = "..."
			onClick()
		end)
	end
	return r
end

local BUY = Color3.fromRGB(110, 78, 44)
local OWNED = Color3.fromRGB(46, 52, 46)

----------------------------------------------------------------------------
-- Concierge: upgrades and pets
----------------------------------------------------------------------------

local shop, shopList = listPanel("Concierge", 500, 520)

local function refreshShop()
	clearRows(shopList)
	sectionHeader(shopList, "Pets")
	local active = player:GetAttribute("ActivePet") or ""
	for _, pet in Config.PETS do
		local owned = player:GetAttribute("Pet_" .. pet.id) == true
		local text = not owned and (pet.price == 0 and "Adopt (free)" or "Adopt · " .. pet.price)
			or (active == pet.id and "Leave at home" or "Walk with me")
		itemRow(shopList, pet.name, pet.desc, text, owned and Color3.fromRGB(52, 60, 72) or BUY, function()
			local ok, msg = remotes.AdoptPet:InvokeServer(pet.id)
			if not ok then
				toast(msg, "warn")
			end
			task.wait(0.1)
			refreshShop()
		end)
	end
	sectionHeader(shopList, "Upgrades")
	for _, u in Config.UPGRADES do
		local owned = player:GetAttribute("Up_" .. u.id) == true
		itemRow(shopList, u.name, u.desc, owned and "Owned" or (u.price .. " credits"), owned and OWNED or BUY, (not owned) and function()
			local ok, msg = remotes.BuyUpgrade:InvokeServer(u.id)
			if not ok then
				toast(msg, "warn")
			end
			refreshShop()
		end or nil)
	end
end

----------------------------------------------------------------------------
-- Pantry
----------------------------------------------------------------------------

local pantryPanel, pantryList = listPanel("Pantry", 360, 470)

local function getPantry(): { [string]: number }
	local raw = player:GetAttribute("Pantry")
	if type(raw) ~= "string" then
		return {}
	end
	local ok, decoded = pcall(function()
		return HttpService:JSONDecode(raw)
	end)
	return ok and decoded or {}
end

local function refreshPantry()
	clearRows(pantryList)
	local stock = getPantry()
	label("Restocks every morning at 06:00. Fish come from the dock.", {
		Size = UDim2.new(1, -8, 0, 34),
		TextSize = 13,
		TextWrapped = true,
		TextColor3 = MUTED,
	}, pantryList)
	for _, item in Config.PANTRY do
		local r = row(pantryList, 30)
		label(item.name, { Position = UDim2.new(0, 12, 0, 0), Size = UDim2.new(1, -70, 1, 0), TextSize = 14 }, r)
		local n = stock[item.id] or 0
		label(tostring(n), {
			Position = UDim2.new(1, -60, 0, 0),
			Size = UDim2.new(0, 48, 1, 0),
			TextXAlignment = Enum.TextXAlignment.Right,
			TextColor3 = n > 0 and ACCENT or MUTED,
			Font = FONT_BOLD,
		}, r)
	end
end

----------------------------------------------------------------------------
-- Cooking: recipe list, then a timing minigame for each step
----------------------------------------------------------------------------

local STEP_TEXT = {
	chop = { verb = "Chop", hint = "Bring the knife down in the zone." },
	stir = { verb = "Stir", hint = "Stop the spoon in the zone." },
	flip = { verb = "Flip", hint = "Flip when it's golden." },
	pour = { verb = "Pour", hint = "Stop pouring at the line." },
	season = { verb = "Season", hint = "A pinch, not a handful." },
	bake = { verb = "Take it out", hint = "Open the oven at the right moment." },
}

local cookPanel, cookList, cookTitle = listPanel("Galley", 520, 520)
local cooking = false

local cookGame = panel({
	AnchorPoint = Vector2.new(0.5, 1),
	Position = UDim2.new(0.5, 0, 1, -110),
	Size = UDim2.new(0, 420, 0, 150),
	Visible = false,
	ZIndex = 12,
})
local gameTitle = label("", { Position = UDim2.new(0, 16, 0, 10), Size = UDim2.new(1, -32, 0, 22), Font = FONT_BOLD, TextXAlignment = Enum.TextXAlignment.Center, ZIndex = 13 }, cookGame)
local gameHint = label("", { Position = UDim2.new(0, 16, 0, 34), Size = UDim2.new(1, -32, 0, 18), TextSize = 13, TextColor3 = MUTED, TextXAlignment = Enum.TextXAlignment.Center, ZIndex = 13 }, cookGame)
local track = new("Frame", {
	Position = UDim2.new(0, 24, 0, 62),
	Size = UDim2.new(1, -48, 0, 18),
	BackgroundColor3 = Color3.fromRGB(40, 40, 44),
	BorderSizePixel = 0,
	ZIndex = 13,
}, cookGame)
new("UICorner", { CornerRadius = UDim.new(1, 0) }, track)
local zone = new("Frame", { BackgroundColor3 = Color3.fromRGB(170, 130, 80), BorderSizePixel = 0, ZIndex = 14 }, track)
new("UICorner", { CornerRadius = UDim.new(1, 0) }, zone)
local marker = new("Frame", {
	AnchorPoint = Vector2.new(0.5, 0.5),
	Size = UDim2.new(0, 6, 1, 10),
	Position = UDim2.fromScale(0, 0.5),
	BackgroundColor3 = INK,
	BorderSizePixel = 0,
	ZIndex = 15,
}, track)
local stopButton = button("Now!  (click or R)", {
	AnchorPoint = Vector2.new(0.5, 1),
	Position = UDim2.new(0.5, 0, 1, -12),
	Size = UDim2.new(0, 200, 0, 34),
	BackgroundColor3 = BUY,
	ZIndex = 13,
}, cookGame)

local stopSignal = Instance.new("BindableEvent")
stopButton.Activated:Connect(function()
	stopSignal:Fire()
end)

-- Plays one timing step; returns a score from 0 to 1.
local function playStep(kind: string, index: number, total: number, recipeName: string): number
	local info = STEP_TEXT[kind] or STEP_TEXT.stir
	gameTitle.Text = string.format("%s  ·  %s  (%d/%d)", recipeName, info.verb, index, total)
	gameHint.Text = info.hint
	local width = math.max(0.1, 0.22 - index * 0.015)
	local center = 0.2 + math.random() * 0.6
	zone.Size = UDim2.fromScale(width, 1)
	zone.Position = UDim2.fromScale(center - width / 2, 0)
	local speed = 0.55 + index * 0.08
	local start = os.clock()
	local stopped = false
	local conn = stopSignal.Event:Connect(function()
		stopped = true
	end)
	local x = 0
	while not stopped do
		local t = (os.clock() - start) * speed
		x = 1 - math.abs((t % 2) - 1) -- ping-pong 0..1
		marker.Position = UDim2.fromScale(x, 0.5)
		if os.clock() - start > 12 then
			break
		end
		RunService.RenderStepped:Wait()
	end
	conn:Disconnect()
	local dist = math.abs(x - center)
	local score = dist <= width / 2 and 1 or math.clamp(1 - (dist - width / 2) / (width * 1.5), 0, 1)
	zone.BackgroundColor3 = score >= 1 and Color3.fromRGB(120, 160, 110) or (score > 0.4 and Color3.fromRGB(190, 160, 90) or Color3.fromRGB(170, 90, 80))
	task.wait(0.45)
	zone.BackgroundColor3 = Color3.fromRGB(170, 130, 80)
	return score
end

local function cook(recipe)
	if cooking then
		return
	end
	local ok, tokenOrMsg = remotes.StartCooking:InvokeServer(recipe.id)
	if not ok then
		toast(tokenOrMsg, "warn")
		return
	end
	cooking = true
	cookPanel.Visible = false
	cookGame.Visible = true
	local scores = {}
	for i, kind in recipe.steps do
		scores[i] = playStep(kind, i, #recipe.steps, recipe.name)
	end
	cookGame.Visible = false
	cooking = false
	local result = remotes.FinishCooking:InvokeServer(tokenOrMsg, scores)
	if result then
		toast(string.format("%s %s.", result.quality, result.name), "chore")
	end
end

local function ingredientText(recipe, stock): (string, boolean)
	local parts = {}
	local can = true
	for item, count in recipe.needs do
		local have = item == "fish" and (player:GetAttribute("FishCount") or 0) or (stock[item] or 0)
		local name = item
		for _, p in Config.PANTRY do
			if p.id == item then
				name = string.lower(p.name)
			end
		end
		if have < count then
			can = false
		end
		table.insert(parts, string.format("%s %d/%d", name, math.min(have, count), count))
	end
	table.sort(parts)
	return table.concat(parts, " · "), can
end

local STATION_TITLES = { stove = "Stove", oven = "Oven", coffee = "Coffee machine" }

local function openCook(station: string)
	clearRows(cookList)
	cookTitle.Text = "Galley  ·  " .. (STATION_TITLES[station] or station)
	local stock = getPantry()
	for _, recipe in Config.RECIPES do
		if recipe.station == station then
			local ingredients, can = ingredientText(recipe, stock)
			itemRow(cookList, recipe.name, recipe.desc .. "\n" .. ingredients, can and "Cook" or "Missing items", can and BUY or OWNED, can and function()
				task.spawn(cook, recipe)
			end or nil)
		end
	end
	cookPanel.Visible = true
end

remotes.OpenPanel.OnClientEvent:Connect(function(which, arg)
	if which == "shop" then
		refreshShop()
		shop.Visible = true
	elseif which == "pantry" then
		refreshPantry()
		pantryPanel.Visible = true
	elseif which == "cook" then
		openCook(arg)
	end
end)

----------------------------------------------------------------------------
-- Record player (upgrade)
----------------------------------------------------------------------------

local music = new("Sound", { Name = "RecordPlayerMusic", Looped = true, Volume = 0.5 }, gui)
remotes.Music.OnClientEvent:Connect(function()
	if Config.SOUNDS.Music == "" then
		toast("The record spins in silence. (Paste a music asset ID into Config.SOUNDS.Music.)")
		return
	end
	music.SoundId = Config.SOUNDS.Music
	if music.IsPlaying then
		music:Stop()
		toast("You lift the needle.")
	else
		music:Play()
		toast("The needle drops. Warm crackle, then music.")
	end
end)

----------------------------------------------------------------------------
-- Fishing
----------------------------------------------------------------------------

local fishPanel = panel({
	AnchorPoint = Vector2.new(0.5, 1),
	Position = UDim2.new(0.5, 0, 1, -120),
	Size = UDim2.new(0, 340, 0, 96),
	Visible = false,
})
local fishText = label("", {
	Position = UDim2.new(0, 14, 0, 8),
	Size = UDim2.new(1, -28, 0, 36),
	TextXAlignment = Enum.TextXAlignment.Center,
	TextWrapped = true,
}, fishPanel)
local reelButton = button("REEL  (R)", {
	AnchorPoint = Vector2.new(0.5, 1),
	Position = UDim2.new(0.5, 0, 1, -10),
	Size = UDim2.new(0, 180, 0, 36),
}, fishPanel)

local fishingState = "idle"
local function reel()
	if fishingState == "waiting" or fishingState == "bite" then
		remotes.Fishing:FireServer("reel")
	end
end
reelButton.Activated:Connect(reel)

local function hideFishSoon()
	local stamp = os.clock()
	fishPanel:SetAttribute("Stamp", stamp)
	task.delay(2.2, function()
		if fishPanel:GetAttribute("Stamp") == stamp then
			fishPanel.Visible = false
			fishingState = "idle"
		end
	end)
end

remotes.Fishing.OnClientEvent:Connect(function(state, name, value)
	fishPanel.Visible = true
	reelButton.Visible = true
	fishPanel:SetAttribute("Stamp", nil)
	fishingState = state
	if state == "cast" then
		fishText.Text = "Line in the water... wait for a bite.\n(Reeling too early scares the fish.)"
		fishText.TextColor3 = INK
		reelButton.BackgroundColor3 = Color3.fromRGB(40, 48, 62)
	elseif state == "bite" then
		fishText.Text = "BITE!  Reel it in now!"
		fishText.TextColor3 = ACCENT
		reelButton.BackgroundColor3 = Color3.fromRGB(170, 100, 40)
	elseif state == "catch" then
		fishText.Text = string.format("You caught a %s! (worth %d)", name, value)
		fishText.TextColor3 = ACCENT
		reelButton.Visible = false
		hideFishSoon()
	elseif state == "early" then
		fishText.Text = "Too early - the fish swam off."
		fishText.TextColor3 = MUTED
		reelButton.Visible = false
		hideFishSoon()
	elseif state == "miss" then
		fishText.Text = "It got away..."
		fishText.TextColor3 = MUTED
		reelButton.Visible = false
		hideFishSoon()
	elseif state == "left" then
		fishText.Text = "You walked away from your line."
		fishText.TextColor3 = MUTED
		reelButton.Visible = false
		hideFishSoon()
	end
end)

UserInputService.InputBegan:Connect(function(input, processed)
	if processed then
		return
	end
	if input.KeyCode == Enum.KeyCode.R then
		if cooking then
			stopSignal:Fire()
		else
			reel()
		end
	elseif input.KeyCode == Enum.KeyCode.T then
		todayCollapsed = not todayCollapsed
	elseif input.KeyCode == Enum.KeyCode.J then
		toggleJournal()
	elseif input.KeyCode == Enum.KeyCode.Escape then
		shop.Visible = false
		journal.Visible = false
		pantryPanel.Visible = false
		cookPanel.Visible = false
	end
end)

----------------------------------------------------------------------------
-- Intro card
----------------------------------------------------------------------------

do
	local card = new("Frame", { Size = UDim2.fromScale(1, 1), BackgroundColor3 = Color3.fromRGB(8, 12, 20), BackgroundTransparency = 0.15, BorderSizePixel = 0, ZIndex = 40 }, gui)
	local title = label(string.upper(Config.GAME_NAME), {
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.fromScale(0.5, 0.42),
		Size = UDim2.new(1, 0, 0, 60),
		TextXAlignment = Enum.TextXAlignment.Center,
		TextSize = 54,
		Font = Enum.Font.GothamBold,
		ZIndex = 41,
	}, card)
	local tag = label(Config.TAGLINE, {
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.fromScale(0.5, 0.42),
		Size = UDim2.new(1, 0, 0, 30),
		TextXAlignment = Enum.TextXAlignment.Center,
		TextSize = 20,
		TextColor3 = MUTED,
		ZIndex = 41,
	}, card)
	tag.Position = UDim2.new(0.5, 0, 0.42, 52)
	local help = label("Ride the funicular in the glass booth up to the mansion.  Stay warm.  Press J for your journal.", {
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = UDim2.new(0.5, 0, 0.42, 100),
		Size = UDim2.new(0.9, 0, 0, 24),
		TextXAlignment = Enum.TextXAlignment.Center,
		TextSize = 16,
		TextColor3 = ACCENT,
		TextWrapped = true,
		ZIndex = 41,
	}, card)
	task.delay(5, function()
		local info = TweenInfo.new(1.4)
		TweenService:Create(card, info, { BackgroundTransparency = 1 }):Play()
		for _, l in { title, tag, help } do
			TweenService:Create(l, info, { TextTransparency = 1 }):Play()
		end
		task.wait(1.5)
		card:Destroy()
	end)
end

----------------------------------------------------------------------------
-- Lighting moods: blue hour, night, pink dawn, grey polar day
----------------------------------------------------------------------------

type Mood = {
	t: number,
	atmo: Color3,
	decay: Color3,
	density: number,
	tint: Color3,
	ambient: Color3,
	outdoor: Color3,
	brightness: number,
}
local MOODS: { Mood } = {
	{ t = 0, atmo = Color3.fromRGB(52, 62, 86), decay = Color3.fromRGB(16, 22, 36), density = 0.38, tint = Color3.fromRGB(196, 208, 255), ambient = Color3.fromRGB(26, 30, 42), outdoor = Color3.fromRGB(44, 52, 72), brightness = 0.5 },
	{ t = 4.6, atmo = Color3.fromRGB(52, 62, 86), decay = Color3.fromRGB(16, 22, 36), density = 0.38, tint = Color3.fromRGB(196, 208, 255), ambient = Color3.fromRGB(26, 30, 42), outdoor = Color3.fromRGB(44, 52, 72), brightness = 0.5 },
	{ t = 6.3, atmo = Color3.fromRGB(236, 182, 176), decay = Color3.fromRGB(150, 108, 136), density = 0.46, tint = Color3.fromRGB(255, 226, 230), ambient = Color3.fromRGB(60, 52, 60), outdoor = Color3.fromRGB(150, 122, 132), brightness = 1.4 },
	{ t = 9.5, atmo = Color3.fromRGB(176, 190, 210), decay = Color3.fromRGB(98, 114, 140), density = 0.45, tint = Color3.fromRGB(230, 236, 250), ambient = Color3.fromRGB(46, 52, 64), outdoor = Color3.fromRGB(110, 122, 140), brightness = 1.8 },
	{ t = 15.5, atmo = Color3.fromRGB(176, 190, 210), decay = Color3.fromRGB(98, 114, 140), density = 0.45, tint = Color3.fromRGB(230, 236, 250), ambient = Color3.fromRGB(46, 52, 64), outdoor = Color3.fromRGB(110, 122, 140), brightness = 1.8 },
	{ t = 18, atmo = Color3.fromRGB(128, 148, 184), decay = Color3.fromRGB(48, 64, 100), density = 0.42, tint = Color3.fromRGB(206, 218, 255), ambient = Color3.fromRGB(36, 42, 56), outdoor = Color3.fromRGB(88, 100, 128), brightness = 1.2 },
	{ t = 20.5, atmo = Color3.fromRGB(52, 62, 86), decay = Color3.fromRGB(16, 22, 36), density = 0.38, tint = Color3.fromRGB(196, 208, 255), ambient = Color3.fromRGB(26, 30, 42), outdoor = Color3.fromRGB(44, 52, 72), brightness = 0.5 },
	{ t = 24, atmo = Color3.fromRGB(52, 62, 86), decay = Color3.fromRGB(16, 22, 36), density = 0.38, tint = Color3.fromRGB(196, 208, 255), ambient = Color3.fromRGB(26, 30, 42), outdoor = Color3.fromRGB(44, 52, 72), brightness = 0.5 },
}

local function applyMood()
	local atmosphere = Lighting:FindFirstChildOfClass("Atmosphere")
	local grade = Lighting:FindFirstChild("Grade") :: ColorCorrectionEffect?
	local t = Lighting.ClockTime
	local a, b = MOODS[1], MOODS[2]
	for i = 1, #MOODS - 1 do
		if t >= MOODS[i].t and t <= MOODS[i + 1].t then
			a, b = MOODS[i], MOODS[i + 1]
			break
		end
	end
	local k = (t - a.t) / math.max(b.t - a.t, 0.001)
	k = k * k * (3 - 2 * k)
	if atmosphere then
		atmosphere.Color = a.atmo:Lerp(b.atmo, k)
		atmosphere.Decay = a.decay:Lerp(b.decay, k)
		local weatherFog = 0
		local wid = Workspace:GetAttribute("Weather")
		for _, w in Config.WEATHER do
			if w.id == wid then
				weatherFog = w.fog
			end
		end
		local target = math.max(a.density + (b.density - a.density) * k, weatherFog)
		atmosphere.Density += (target - atmosphere.Density) * 0.08
	end
	if grade then
		grade.TintColor = a.tint:Lerp(b.tint, k)
	end
	Lighting.Ambient = a.ambient:Lerp(b.ambient, k)
	Lighting.OutdoorAmbient = a.outdoor:Lerp(b.outdoor, k)
	Lighting.Brightness = a.brightness + (b.brightness - a.brightness) * k
end

local function weatherInfo()
	local wid = Workspace:GetAttribute("Weather")
	for _, w in Config.WEATHER do
		if w.id == wid then
			return w
		end
	end
	return Config.WEATHER[1]
end

local function isNight(): boolean
	local t = Lighting.ClockTime
	return t > 19.8 or t < 5.4
end

----------------------------------------------------------------------------
-- Snow (at night) that follows the camera
----------------------------------------------------------------------------

local snowPart = new("Part", {
	Name = "SnowEmitter",
	Anchored = true,
	CanCollide = false,
	CanQuery = false,
	CanTouch = false,
	Transparency = 1,
	Size = Vector3.new(120, 1, 120),
}, Workspace)
local snow = new("ParticleEmitter", {
	Rate = 220,
	Lifetime = NumberRange.new(5, 7),
	Speed = NumberRange.new(6, 9),
	EmissionDirection = Enum.NormalId.Bottom,
	SpreadAngle = Vector2.new(20, 20),
	Size = NumberSequence.new(0.18),
	Transparency = NumberSequence.new(0.15),
	Color = ColorSequence.new(Color3.fromRGB(240, 244, 255)),
	Acceleration = Vector3.new(2, -1, 1),
	LightInfluence = 1,
	Enabled = false,
}, snowPart)

----------------------------------------------------------------------------
-- Aurora (upgrade)
----------------------------------------------------------------------------

local aurora: Model? = nil
local auroraBeams: { Beam } = {}

local function buildAurora()
	local model = Instance.new("Model")
	model.Name = "Aurora"
	local anchor = new("Part", {
		Anchored = true,
		CanCollide = false,
		CanQuery = false,
		CanTouch = false,
		Transparency = 1,
		Size = Vector3.one,
		Position = Vector3.new(0, 0, 0),
	}, model)
	for i = 1, 6 do
		local z = 500 + i * 60
		local y = 380 + i * 25
		local a0 = new("Attachment", { Position = Vector3.new(-900, y, z) }, anchor)
		local a1 = new("Attachment", { Position = Vector3.new(900, y + 40, z - 100) }, anchor)
		local beam = new("Beam", {
			Attachment0 = a0,
			Attachment1 = a1,
			Width0 = 160,
			Width1 = 220,
			LightEmission = 1,
			LightInfluence = 0,
			FaceCamera = true,
			Segments = 60,
			Color = ColorSequence.new({
				ColorSequenceKeypoint.new(0, Color3.fromRGB(80, 255, 170)),
				ColorSequenceKeypoint.new(0.5, Color3.fromRGB(110, 200, 255)),
				ColorSequenceKeypoint.new(1, Color3.fromRGB(190, 120, 255)),
			}),
			Transparency = NumberSequence.new({
				NumberSequenceKeypoint.new(0, 1),
				NumberSequenceKeypoint.new(0.2, 0.7),
				NumberSequenceKeypoint.new(0.8, 0.75),
				NumberSequenceKeypoint.new(1, 1),
			}),
		}, anchor)
		table.insert(auroraBeams, beam)
	end
	model.Parent = Workspace
	return model
end

----------------------------------------------------------------------------
-- Bobbing ice floes
----------------------------------------------------------------------------

local floeParts: { BasePart } = {}
local floeBase: { CFrame } = {}
local floePhase: { number } = {}
local floeCountSeen = -1

-- Called now and then: parts can still be arriving from the server.
local function collectFloes()
	local floes = world:FindFirstChild("IceFloes")
	if not floes then
		return
	end
	local count = #floes:GetDescendants()
	if count == floeCountSeen then
		return
	end
	floeCountSeen = count
	table.clear(floeParts)
	table.clear(floeBase)
	table.clear(floePhase)
	for _, model in floes:GetChildren() do
		local phase = model:GetAttribute("Phase") or 0
		for _, p in model:GetChildren() do
			if p:IsA("BasePart") then
				-- Remember the resting pose (undo any bob already applied).
				local base = p:GetAttribute("BaseCFrame")
				if typeof(base) ~= "CFrame" then
					base = p.CFrame
					p:SetAttribute("BaseCFrame", base)
				end
				table.insert(floeParts, p)
				table.insert(floeBase, base)
				table.insert(floePhase, phase)
			end
		end
	end
end

----------------------------------------------------------------------------
-- Whale breach
----------------------------------------------------------------------------

local lastWhale: Vector3? = nil

local function splash(pos: Vector3)
	local p = new("Part", {
		Anchored = true,
		CanCollide = false,
		CanQuery = false,
		Transparency = 1,
		Size = Vector3.new(16, 1, 16),
		Position = pos,
	}, Workspace)
	local e = new("ParticleEmitter", {
		Rate = 0,
		Lifetime = NumberRange.new(1.2, 2.2),
		Speed = NumberRange.new(20, 38),
		SpreadAngle = Vector2.new(35, 35),
		EmissionDirection = Enum.NormalId.Top,
		Acceleration = Vector3.new(0, -30, 0),
		Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 1.6), NumberSequenceKeypoint.new(1, 3.5) }),
		Transparency = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.2), NumberSequenceKeypoint.new(1, 1) }),
		Color = ColorSequence.new(Color3.fromRGB(235, 242, 250)),
	}, p)
	e:Emit(140)
	task.delay(3, function()
		p:Destroy()
	end)
end

remotes.Whale.OnClientEvent:Connect(function(pos: Vector3, heading: number)
	local template = ReplicatedStorage:FindFirstChild("WhaleTemplate")
	if not template then
		return
	end
	lastWhale = pos
	local whale = template:Clone()
	whale.Parent = Workspace
	local dir = Vector3.new(math.cos(heading), 0, math.sin(heading))
	local duration = 5.5
	local start = os.clock()
	local splashed1, splashed2 = false, false
	local prev = pos + Vector3.new(0, -30, 0)
	local conn
	conn = RunService.RenderStepped:Connect(function()
		local u = (os.clock() - start) / duration
		if u >= 1 then
			conn:Disconnect()
			whale:Destroy()
			return
		end
		local p = pos + dir * (u * 70 - 35) + Vector3.new(0, -26 + 62 * math.sin(math.pi * u) - 8 * u, 0)
		local vel = p - prev
		prev = p
		if vel.Magnitude > 0.01 then
			local roll = CFrame.Angles(0, 0, u * math.pi * 0.7)
			whale:PivotTo(CFrame.lookAt(p, p + vel) * roll)
		end
		if not splashed1 and p.Y > -2 then
			splashed1 = true
			splash(Vector3.new(p.X, 0, p.Z))
		end
		if splashed1 and not splashed2 and u > 0.6 and p.Y < 2 then
			splashed2 = true
			splash(Vector3.new(p.X, 0, p.Z))
		end
	end)
end)

----------------------------------------------------------------------------
-- Telescope
----------------------------------------------------------------------------

local camera = Workspace.CurrentCamera
local scoping = false
remotes.Telescope.OnClientEvent:Connect(function(eye: Vector3)
	if scoping then
		return
	end
	scoping = true
	local oldFov = camera.FieldOfView
	camera.CameraType = Enum.CameraType.Scriptable
	camera.FieldOfView = 14
	local target = lastWhale or Vector3.new(0, 0, -700)
	local baseDir = Vector3.new(target.X - eye.X, 0, target.Z - eye.Z).Unit
	local start = os.clock()
	toast("Sweeping the horizon... (click to stop)")
	local stop = false
	local inputConn = UserInputService.InputBegan:Connect(function(input)
		if input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch then
			stop = true
		end
	end)
	while not stop and os.clock() - start < 12 do
		local swing = math.sin((os.clock() - start) * 0.5) * 0.9
		local look = (CFrame.Angles(0, swing, 0):VectorToWorldSpace(baseDir) + Vector3.new(0, -0.08, 0)).Unit
		camera.CFrame = CFrame.lookAt(eye, eye + look)
		RunService.RenderStepped:Wait()
	end
	inputConn:Disconnect()
	camera.FieldOfView = oldFov
	camera.CameraType = Enum.CameraType.Custom
	scoping = false
end)

----------------------------------------------------------------------------
-- Your breath fogs in the cold outside
----------------------------------------------------------------------------

local lastBreath = 0
local breathHead: Instance? = nil
local breathEmitter: ParticleEmitter? = nil

local function breathe()
	local now = os.clock()
	if now - lastBreath < 2.6 then
		return
	end
	local loc = player:GetAttribute("Location")
	if loc ~= "Outside" and loc ~= "Top of the Spine" then
		return
	end
	local head = player.Character and player.Character:FindFirstChild("Head")
	if not head then
		return
	end
	lastBreath = now
	if breathHead ~= head or not breathEmitter then
		local att = new("Attachment", { Name = "BreathPoint", Position = Vector3.new(0, -0.2, -0.7) }, head)
		breathEmitter = new("ParticleEmitter", {
			Name = "Breath",
			Rate = 0,
			Lifetime = NumberRange.new(1, 1.6),
			Speed = NumberRange.new(1, 2),
			SpreadAngle = Vector2.new(20, 20),
			EmissionDirection = Enum.NormalId.Front,
			Size = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.2), NumberSequenceKeypoint.new(1, 1.2) }),
			Transparency = NumberSequence.new({ NumberSequenceKeypoint.new(0, 0.55), NumberSequenceKeypoint.new(1, 1) }),
			Color = ColorSequence.new(Color3.fromRGB(235, 240, 250)),
			LightInfluence = 1,
		}, att)
		breathHead = head
	end
	if breathEmitter then
		breathEmitter:Emit(4)
	end
end

----------------------------------------------------------------------------
-- Main loop
----------------------------------------------------------------------------

local lastSlow = 0
local lastFloe = 0
local lastFloeScan = -100
RunService.RenderStepped:Connect(function()
	local now = os.clock()

	-- Snow follows the camera.
	local camPos = camera.CFrame.Position
	snowPart.CFrame = CFrame.new(camPos + Vector3.new(0, 45, 0))
	local w = weatherInfo()
	snow.Enabled = w.snow > 0 and Arch.roomAt(camPos) == nil
	snow.Rate = 140 * w.snow
	snow.Acceleration = Vector3.new(4 + 26 * w.wind, -1, 2 + 10 * w.wind)

	if now - lastFloe > 1 / 30 and #floeParts > 0 then
		lastFloe = now
		local cfs = table.create(#floeParts)
		for i, base in floeBase do
			local ph = floePhase[i]
			local bob = math.sin(now * 0.7 + ph) * 0.22
			cfs[i] = CFrame.new(0, bob, 0) * base * CFrame.Angles(math.sin(now * 0.5 + ph) * 0.015, 0, math.cos(now * 0.6 + ph) * 0.015)
		end
		Workspace:BulkMoveTo(floeParts, cfs, Enum.BulkMoveMode.FireCFrameChanged)
	end

	if now - lastFloeScan > 5 then
		lastFloeScan = now
		collectFloes()
	end

	if now - lastSlow > 0.25 then
		lastSlow = now
		applyMood()
		refreshTop()
		refreshNeeds()
		refreshInfo()
		refreshToday()

		local wantsAurora = player:GetAttribute("Up_Aurora") == true and isNight() and weatherInfo().snow == 0
		breathe()
		if wantsAurora and not aurora then
			aurora = buildAurora()
		elseif not wantsAurora and aurora then
			aurora:Destroy()
			aurora = nil
			table.clear(auroraBeams)
		end
	end

	if aurora then
		for i, beam in auroraBeams do
			beam.CurveSize0 = math.sin(now * 0.3 + i) * 220
			beam.CurveSize1 = math.cos(now * 0.25 + i * 1.7) * 260
		end
	end
end)

player:GetAttributeChangedSignal("Discoveries"):Connect(function()
	if journal.Visible then
		refreshJournal()
	end
end)
