--!nonstrict
-- Pets: Mochi the resident house cat, and adoptable pets that follow their
-- owners around (cat, Samoyed puppy, snow rabbit, little penguin).

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local Workspace = game:GetService("Workspace")

local Shared = ReplicatedStorage:WaitForChild("Shared")
local Arch = require(Shared:WaitForChild("Arch"))
local Config = require(Shared:WaitForChild("Config"))
local Build = require(script.Parent.Build)
local Registry = require(script.Parent.Registry)

local Pets = {}

local petsFolder: Folder
local refs
local hooks

----------------------------------------------------------------------------
-- Models (built from parts; a Blender "Cat" mesh replaces the cat body)
----------------------------------------------------------------------------

local function root(model: Model, size: Vector3): BasePart
	local r = Build.part(model, {
		Name = "Root",
		Size = size,
		CFrame = CFrame.new(0, size.Y / 2, 0),
		Transparency = 1,
		CanCollide = false,
		CanQuery = false,
	})
	model.PrimaryPart = r
	return r
end

local function bit(model: Model, cf: CFrame, size: Vector3, color: Color3, s: number, material: Enum.Material?)
	return Build.ellipsoid(model, CFrame.new(cf.Position * s) * cf.Rotation, size * s, {
		Name = "Bit",
		Color = color,
		Material = material or Enum.Material.SmoothPlastic,
		CanCollide = false,
		CanQuery = false,
		CanTouch = false,
	})
end

local function legs(model: Model, color: Color3, s: number, spread: number, front: number, back: number, height: number)
	for _, x in { -spread, spread } do
		for _, z in { front, back } do
			Build.cylinderY(model, Vector3.new(x, height / 2, z) * s, height * s, 0.32 * s, {
				Name = "Leg",
				Color = color,
				CanCollide = false,
				CanQuery = false,
				CanTouch = false,
			})
		end
	end
end

local builders = {}

function builders.Cat(s: number, color: Color3): Model
	local m = Instance.new("Model")
	root(m, Vector3.new(1.2, 1.9, 2.8) * s)
	local template = Build.asset("Cat")
	if template then
		-- Blender cat mesh proportions (tail up): about 0.9 x 2.1 x 2.8 studs.
		Build.placeAsset(template, m, CFrame.new(0, 1.05 * s, 0), Vector3.new(0.9, 2.1, 2.8) * s, { CanCollide = false, CanQuery = false, Color = color })
		return m
	end
	bit(m, CFrame.new(0, 0.95, 0.15), Vector3.new(1.05, 0.95, 2.3), color, s)
	bit(m, CFrame.new(0, 1.55, -1.15), Vector3.new(0.95, 0.85, 0.85), color, s)
	bit(m, CFrame.new(0, 1.42, -1.55), Vector3.new(0.45, 0.3, 0.3), color:Lerp(Color3.new(1, 1, 1), 0.4), s)
	for _, x in { -0.27, 0.27 } do
		bit(m, CFrame.new(x, 2.0, -1.12) * CFrame.Angles(0, 0, x * -1.2), Vector3.new(0.28, 0.45, 0.16), color, s)
		bit(m, CFrame.new(x * 0.85, 1.65, -1.55), Vector3.new(0.16, 0.18, 0.08), Color3.fromRGB(150, 190, 90), s, Enum.Material.Neon)
	end
	-- Tail curling up.
	bit(m, CFrame.new(0, 1.25, 1.35) * CFrame.Angles(-0.7, 0, 0), Vector3.new(0.22, 0.22, 1.1), color, s)
	bit(m, CFrame.new(0, 1.75, 1.75) * CFrame.Angles(-1.3, 0, 0), Vector3.new(0.22, 0.22, 0.8), color, s)
	legs(m, color, s, 0.3, -0.75, 0.8, 0.6)
	return m
end

function builders.Samoyed(s: number, color: Color3): Model
	local m = Instance.new("Model")
	root(m, Vector3.new(1.6, 2.4, 3.2) * s)
	bit(m, CFrame.new(0, 1.25, 0.1), Vector3.new(1.55, 1.35, 2.7), color, s, Enum.Material.Fabric)
	bit(m, CFrame.new(0, 1.65, -1.05), Vector3.new(1.5, 1.4, 1.1), color, s, Enum.Material.Fabric) -- ruff
	bit(m, CFrame.new(0, 2.1, -1.45), Vector3.new(1.05, 0.95, 1), color, s, Enum.Material.Fabric)
	bit(m, CFrame.new(0, 1.92, -2.0), Vector3.new(0.5, 0.42, 0.6), color, s, Enum.Material.Fabric)
	bit(m, CFrame.new(0, 2.02, -2.3), Vector3.new(0.2, 0.16, 0.12), Color3.fromRGB(20, 20, 20), s)
	for _, x in { -0.3, 0.3 } do
		bit(m, CFrame.new(x, 2.65, -1.35) * CFrame.Angles(0, 0, -x), Vector3.new(0.3, 0.5, 0.2), color, s, Enum.Material.Fabric)
		bit(m, CFrame.new(x * 0.8, 2.25, -1.93), Vector3.new(0.13, 0.13, 0.06), Color3.fromRGB(15, 15, 15), s)
	end
	bit(m, CFrame.new(0, 2.0, 1.25) * CFrame.Angles(0.6, 0, 0), Vector3.new(0.7, 0.7, 1.2), color, s, Enum.Material.Fabric) -- curled tail
	legs(m, color, s, 0.42, -0.85, 0.9, 0.8)
	return m
end

function builders.Rabbit(s: number, color: Color3): Model
	local m = Instance.new("Model")
	root(m, Vector3.new(1, 1.8, 1.6) * s)
	bit(m, CFrame.new(0, 0.6, 0.15), Vector3.new(1, 1, 1.35), color, s, Enum.Material.Fabric)
	bit(m, CFrame.new(0, 1.15, -0.55), Vector3.new(0.8, 0.75, 0.75), color, s, Enum.Material.Fabric)
	for _, x in { -0.25, 0.25 } do
		bit(m, CFrame.new(x * 1.6, 1.15, -0.45) * CFrame.Angles(0.2, 0, x * 3), Vector3.new(0.25, 0.85, 0.12), color, s, Enum.Material.Fabric)
		bit(m, CFrame.new(x * 0.9, 1.22, -0.88), Vector3.new(0.12, 0.13, 0.06), Color3.fromRGB(30, 20, 20), s)
	end
	bit(m, CFrame.new(0, 0.75, 0.9), Vector3.new(0.4, 0.4, 0.4), Color3.new(1, 1, 1), s, Enum.Material.Fabric)
	return m
end

function builders.Penguin(s: number, _color: Color3): Model
	local m = Instance.new("Model")
	root(m, Vector3.new(1.2, 2.6, 1.2) * s)
	local black = Color3.fromRGB(24, 26, 32)
	bit(m, CFrame.new(0, 1.05, 0), Vector3.new(1.15, 1.9, 1.05), black, s)
	bit(m, CFrame.new(0, 1.0, -0.2), Vector3.new(0.9, 1.6, 0.8), Color3.fromRGB(240, 240, 238), s)
	bit(m, CFrame.new(0, 2.15, 0), Vector3.new(0.85, 0.8, 0.8), black, s)
	bit(m, CFrame.new(0, 2.1, -0.5), Vector3.new(0.2, 0.15, 0.4), Color3.fromRGB(230, 130, 40), s)
	for _, x in { -0.2, 0.2 } do
		bit(m, CFrame.new(x, 2.28, -0.36), Vector3.new(0.16, 0.16, 0.06), Color3.new(1, 1, 1), s)
		bit(m, CFrame.new(x * 2.9, 1.2, 0) * CFrame.Angles(0, 0, x * 1.2), Vector3.new(0.15, 1.1, 0.45), black, s)
		bit(m, CFrame.new(x, 0.06, -0.25), Vector3.new(0.35, 0.1, 0.5), Color3.fromRGB(230, 130, 40), s)
	end
	return m
end

local PET_LOOK = {
	Cat = { scale = 0.75, color = Color3.fromRGB(205, 140, 80) },
	Samoyed = { scale = 0.9, color = Color3.fromRGB(246, 244, 238) },
	Rabbit = { scale = 1, color = Color3.fromRGB(240, 238, 234) },
	Penguin = { scale = 0.85, color = Color3.new() },
}

local function nameTag(model: Model, text: string)
	local gui = Instance.new("BillboardGui")
	gui.Name = "Tag"
	gui.Size = UDim2.new(0, 160, 0, 28)
	gui.StudsOffsetWorldSpace = Vector3.new(0, (model.PrimaryPart :: BasePart).Size.Y / 2 + 1.2, 0)
	gui.MaxDistance = 40
	gui.AlwaysOnTop = false
	local label = Instance.new("TextLabel")
	label.Name = "Text"
	label.Size = UDim2.fromScale(1, 1)
	label.BackgroundTransparency = 1
	label.Text = text
	label.Font = Enum.Font.GothamMedium
	label.TextSize = 15
	label.TextColor3 = Color3.fromRGB(240, 236, 228)
	label.TextStrokeTransparency = 0.6
	label.Parent = gui
	gui.Parent = model.PrimaryPart
end

----------------------------------------------------------------------------
-- Mochi, the resident cat
----------------------------------------------------------------------------

local mochi: Model
local mochiPos: Vector3
local mochiFacing = Vector3.new(0, 0, -1)
local path: { Vector3 } = {}
local idleUntil = 0
local spotName = "firebed"
local bowlFull = false

-- Floor height (plus furniture the cat can hop onto) at an x/z position.
local function catGround(x: number, z: number): number
	local y = Arch.slabTop(x)
	for _, room in Arch.ROOMS do
		if x >= room.x0 and x < room.x1 then
			y = Arch.roomFloor(room)
			break
		end
	end
	for _, s in refs.catSurfaces do
		if x >= s.x0 and x <= s.x1 and z >= s.z0 and z <= s.z1 then
			y = math.max(y, s.top)
		end
	end
	return y
end

local function roomIndex(x: number): number
	for i, room in Arch.ROOMS do
		if x >= room.x0 and x < room.x1 then
			return i
		end
	end
	return x < 0 and 1 or #Arch.ROOMS
end

local function planPath(from: Vector3, to: Vector3): { Vector3 }
	local pts = {}
	local a, b = roomIndex(from.X), roomIndex(to.X)
	-- Walk through the middle of each doorway (z = 9) between rooms.
	if a < b then
		for i = a, b - 1 do
			local bx = Arch.ROOMS[i].x1
			table.insert(pts, Vector3.new(bx - 1.5, 0, 9))
			table.insert(pts, Vector3.new(bx + 1.5, 0, 9))
		end
	elseif a > b then
		for i = a, b + 1, -1 do
			local bx = Arch.ROOMS[i].x0
			table.insert(pts, Vector3.new(bx + 1.5, 0, 9))
			table.insert(pts, Vector3.new(bx - 1.5, 0, 9))
		end
	end
	table.insert(pts, Vector3.new(to.X, 0, to.Z))
	return pts
end

-- True if a closed door stands between two x positions (doors cross the gallery).
local function doorBetween(x1: number, x2: number): boolean
	for _, d in Registry.doors do
		local bx = d.closed.Position.X
		if not d.isOpen and math.min(x1, x2) < bx and math.max(x1, x2) > bx then
			return true
		end
	end
	return false
end

local function chooseSpot()
	local night = workspace:GetAttribute("Night") == true
	local weights = {
		firebed = (refs.fireLit() and 5 or 1) + (night and 3 or 0),
		sofa = 3,
		rug = 2,
		glassfloor = 2,
		bed = night and 4 or 2,
		bowl = bowlFull and 6 or 1,
		counter = 1,
		window = 2,
	}
	weights[spotName] = 0
	for name in weights do
		local spot = refs.catSpots[name]
		if not spot or doorBetween(mochiPos.X, spot.X) then
			weights[name] = 0
		end
	end
	local total = 0
	for _, w in weights do
		total += w
	end
	if total <= 0 then
		return nil
	end
	local roll = math.random() * total
	for name, w in weights do
		if w > 0 then
			roll -= w
			if roll <= 0 then
				return name
			end
		end
	end
	return nil
end

local function placeMochi(pos: Vector3, facing: Vector3, bob: number)
	local flat = Vector3.new(facing.X, 0, facing.Z)
	if flat.Magnitude < 0.01 then
		flat = Vector3.new(0, 0, -1)
	end
	local rootSize = (mochi.PrimaryPart :: BasePart).Size
	local p = pos + Vector3.new(0, rootSize.Y / 2 + bob, 0)
	mochi:PivotTo(CFrame.lookAt(p, p + flat.Unit))
end

local zzz: BillboardGui

local function mochiStep(dt: number)
	local now = os.clock()
	if #path == 0 then
		if now < idleUntil then
			return
		end
		local nextSpot = chooseSpot()
		if not nextSpot then
			-- Shut in: wait by the door and try again later.
			idleUntil = now + 10
			return
		end
		spotName = nextSpot
		local spot = refs.catSpots[spotName]
		path = planPath(mochiPos, spot)
		zzz.Enabled = false
		return
	end
	local target = path[1]
	local flatPos = Vector3.new(mochiPos.X, 0, mochiPos.Z)
	local delta = target - flatPos
	local dist = delta.Magnitude
	local speed = 6
	if dist <= speed * dt then
		flatPos = target
		table.remove(path, 1)
		if #path == 0 then
			-- Arrived: settle in for a while.
			local sleepy = spotName == "firebed" or spotName == "bed" or spotName == "sofa"
			idleUntil = now + (sleepy and math.random(40, 80) or math.random(15, 30))
			zzz.Enabled = sleepy
			if spotName == "bowl" and bowlFull then
				task.delay(4, function()
					bowlFull = false
					refs.kibble.Transparency = 1
				end)
			end
		end
	else
		flatPos += delta.Unit * speed * dt
		mochiFacing = delta.Unit
	end
	local ground = catGround(flatPos.X, flatPos.Z)
	-- Ease the height so hops onto furniture look like jumps, not teleports.
	local y = mochiPos.Y + (ground - mochiPos.Y) * math.min(1, dt * 10)
	mochiPos = Vector3.new(flatPos.X, y, flatPos.Z)
	local bob = #path > 0 and math.abs(math.sin(now * 12)) * 0.12 or 0
	placeMochi(mochiPos, mochiFacing, bob)
end

local function buildMochi()
	mochi = builders.Cat(1, Color3.fromRGB(128, 124, 120))
	mochi.Name = Config.RESIDENT_CAT_NAME
	mochi.Parent = petsFolder
	nameTag(mochi, Config.RESIDENT_CAT_NAME)
	zzz = Instance.new("BillboardGui")
	zzz.Size = UDim2.new(0, 60, 0, 30)
	zzz.StudsOffsetWorldSpace = Vector3.new(0.6, 2.6, 0)
	zzz.MaxDistance = 30
	zzz.Enabled = false
	local z = Instance.new("TextLabel")
	z.Size = UDim2.fromScale(1, 1)
	z.BackgroundTransparency = 1
	z.Text = "z z z"
	z.Font = Enum.Font.GothamMedium
	z.TextSize = 14
	z.TextColor3 = Color3.fromRGB(220, 226, 240)
	z.Parent = zzz
	zzz.Parent = mochi.PrimaryPart

	local spot = refs.catSpots.firebed
	mochiPos = spot
	placeMochi(spot, Vector3.new(-1, 0, 0), 0)
	idleUntil = os.clock() + 20
	zzz.Enabled = true

	local body = mochi.PrimaryPart
	local pet = Build.prompt(body, "Pet " .. Config.RESIDENT_CAT_NAME, "House cat", 0, 9)
	pet.Triggered:Connect(function(player)
		hooks.discover(player, "mochi")
		if hooks.onCooldown(player, "petmochi", 10) then
			return
		end
		hooks.addNeed(player, "Fun", 12)
		local lines = {
			"Mochi purrs like a tiny engine.",
			"Mochi headbutts your hand and demands more.",
			"Mochi stretches, yawns, and goes straight back to sleep.",
			"Mochi slow-blinks at you. That means love.",
			"Mochi flops over. Do NOT touch the belly.",
		}
		hooks.notify(player, lines[math.random(#lines)])
	end)
	local treat = Build.prompt(body, "Give a treat", "House cat", 0.3, 9)
	treat.UIOffset = Vector2.new(0, 70)
	treat.KeyboardKeyCode = Enum.KeyCode.F
	treat.Triggered:Connect(function(player)
		if not hooks.useTreat(player) then
			hooks.notify(player, "No treats. Bake some Pet Treats in the galley oven.", "warn")
			return
		end
		hooks.discover(player, "mochi")
		hooks.addNeed(player, "Fun", 18)
		hooks.completeChore(player, "feedcat")
		hooks.notify(player, "Mochi inhales the treat and follows you hopefully.")
		-- Mochi trots over to the player.
		local hrp = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
		if hrp and Arch.roomAt(hrp.Position) and not doorBetween(mochiPos.X, hrp.Position.X) then
			path = planPath(mochiPos, hrp.Position + hrp.CFrame.LookVector * 2.5)
			spotName = "player"
			idleUntil = os.clock() + 20
		end
	end)
end

function Pets.fillBowl(player: Player): boolean
	if bowlFull then
		hooks.notify(player, "Mochi's bowl is already full.")
		return false
	end
	bowlFull = true
	refs.kibble.Transparency = 0
	hooks.completeChore(player, "feedcat")
	hooks.notify(player, "You fill Mochi's bowl. Somewhere in the house, a cat hears it.")
	-- The sound of kibble summons the cat.
	if not doorBetween(mochiPos.X, refs.catSpots.bowl.X) then
		path = planPath(mochiPos, refs.catSpots.bowl)
		spotName = "bowl"
	end
	return true
end

----------------------------------------------------------------------------
-- Follower pets
----------------------------------------------------------------------------

local followers: { [Player]: { model: Model, kind: string, pos: Vector3 } } = {}
local rayParams = RaycastParams.new()
rayParams.FilterType = Enum.RaycastFilterType.Exclude
rayParams.IgnoreWater = false

local function refreshRayFilter()
	local list = { petsFolder }
	for _, p in Players:GetPlayers() do
		if p.Character then
			table.insert(list, p.Character)
		end
	end
	rayParams.FilterDescendantsInstances = list
end

function Pets.setActive(player: Player, kind: string?)
	local old = followers[player]
	if old then
		old.model:Destroy()
		followers[player] = nil
	end
	if not kind or not builders[kind] then
		return
	end
	local look = PET_LOOK[kind]
	local model = builders[kind](look.scale, look.color)
	model.Name = player.Name .. "_" .. kind
	model.Parent = petsFolder
	local displayName = kind == "Samoyed" and "Puppy" or kind
	nameTag(model, player.DisplayName .. "'s " .. displayName)
	local hrp = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
	local start = hrp and (hrp.Position - Vector3.new(0, 3, 0)) or Vector3.zero
	followers[player] = { model = model, kind = kind, pos = start }

	local pet = Build.prompt(model.PrimaryPart, "Pet", displayName, 0, 8)
	pet.Triggered:Connect(function(who)
		if hooks.onCooldown(who, "petfollower", 6) then
			return
		end
		hooks.addNeed(who, "Fun", 8)
		local lines = {
			Cat = "The kitten pounces on your shoelace.",
			Samoyed = "The puppy does the Samoyed smile and wags its whole body.",
			Rabbit = "The rabbit does a happy little binky.",
			Penguin = "The penguin flaps its flippers and squawks.",
		}
		hooks.notify(who, lines[kind] or "Happy noises.")
	end)
	local treat = Build.prompt(model.PrimaryPart, "Give a treat", displayName, 0.3, 8)
	treat.UIOffset = Vector2.new(0, 70)
	treat.KeyboardKeyCode = Enum.KeyCode.F
	treat.Triggered:Connect(function(who)
		if not hooks.useTreat(who) then
			hooks.notify(who, "No treats. Bake some Pet Treats in the galley oven.", "warn")
			return
		end
		hooks.addNeed(who, "Fun", 15)
		hooks.notify(who, "Crunch crunch. Best friends forever.")
	end)
end

local function followerStep(dt: number)
	for player, f in followers do
		local hrp = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
		if not hrp or not f.model.Parent then
			continue
		end
		local goal = (hrp.CFrame * CFrame.new(2.4, 0, 2.6)).Position
		local flat = Vector3.new(f.pos.X, 0, f.pos.Z)
		local goalFlat = Vector3.new(goal.X, 0, goal.Z)
		local dist = (goalFlat - flat).Magnitude
		local moving = dist > 1.2
		if dist > 45 then
			flat = goalFlat
		elseif moving then
			flat = flat:Lerp(goalFlat, math.min(1, dt * 3.5))
		end
		local hit = Workspace:Raycast(flat + Vector3.new(0, hrp.Position.Y + 2, 0), Vector3.new(0, -14, 0), rayParams)
		local groundY = hit and hit.Position.Y or (hrp.Position.Y - 3)
		local y = f.pos.Y + (groundY - f.pos.Y) * math.min(1, dt * 12)
		if math.abs(groundY - f.pos.Y) > 8 then
			y = groundY
		end
		local newPos = Vector3.new(flat.X, y, flat.Z)
		local dir = moving and (goalFlat - Vector3.new(f.pos.X, 0, f.pos.Z)) or hrp.CFrame.LookVector
		f.pos = newPos
		local size = f.model.PrimaryPart.Size
		local hop = moving and math.abs(math.sin(os.clock() * (f.kind == "Rabbit" and 9 or 13))) * (f.kind == "Rabbit" and 0.5 or 0.12) or 0
		local center = newPos + Vector3.new(0, size.Y / 2 + hop, 0)
		local flatDir = Vector3.new(dir.X, 0, dir.Z)
		if flatDir.Magnitude < 0.01 then
			flatDir = Vector3.new(0, 0, -1)
		end
		local cf = CFrame.lookAt(center, center + flatDir.Unit)
		if f.kind == "Penguin" and moving then
			cf *= CFrame.Angles(0, 0, math.sin(os.clock() * 10) * 0.18) -- waddle
		end
		f.model:PivotTo(cf)
	end
end

----------------------------------------------------------------------------

function Pets.start(builtRefs, builtHooks)
	refs = builtRefs
	hooks = builtHooks
	petsFolder = Build.folder(refs.root, "Pets")
	buildMochi()
	local filterTimer = 0
	RunService.Heartbeat:Connect(function(dt)
		mochiStep(dt)
		filterTimer -= dt
		if filterTimer <= 0 then
			filterTimer = 2
			refreshRayFilter()
		end
		followerStep(dt)
	end)
	Players.PlayerRemoving:Connect(function(player)
		Pets.setActive(player, nil)
	end)
end

return Pets
