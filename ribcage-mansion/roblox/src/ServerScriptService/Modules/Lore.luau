--!nonstrict
-- The architect's mystery. Ten notes are hidden across the four homes. One of
-- them gives the tuning of the ribs; playing it on the rib organ unseals a
-- hatch under the arch. The hatch can only be reached when the sea freezes at
-- night. Below it is the Sternum, a vault with the architect's last note.

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")

local Config = require(ReplicatedStorage:WaitForChild("Shared"):WaitForChild("Config"))
local Build = require(script.Parent.Build)
local Furnish = require(script.Parent.Furnish)
local Registry = require(script.Parent.Registry)

local Lore = {}

local C = Build.Color
local HATCH_POS = Vector3.new(0, 0, -60)
local VAULT = Vector3.new(0, -200, -60) -- floor centre of the Sternum

local hooks
local hatch: BasePart
local hatchPrompt: ProximityPrompt

local noteById = {}
for _, n in Config.NOTES do
	noteById[n.id] = n
end

----------------------------------------------------------------------------
-- Building
----------------------------------------------------------------------------

local function miniModel(folder: Instance, top: Vector3)
	local s = 1 / 160 -- the whole sea, shrunk onto a 10-stud plinth
	local props = { Material = Enum.Material.Concrete, Color = C.ConcreteOut, CanCollide = false }
	-- The Ribcage arch, in miniature.
	local prev
	for i = 0, 16 do
		local t = math.pi * i / 16
		local p = top + Vector3.new(280 * math.cos(t) * s, 220 * math.sin(t) * s, 0)
		if prev then
			Build.beam(folder, prev, p, 0.25, 0.2, props)
		end
		prev = p
	end
	-- The Monolith, the Vertebrae and the Well, at their real bearings.
	Build.box(folder, top + Vector3.new(40, 0, 700) * s + Vector3.new(-0.3, 0, -0.15), top + Vector3.new(40, 0, 700) * s + Vector3.new(0.3, 2, 0.15), props)
	for k = 0, 4 do
		local base = top + Vector3.new(-700 + 36 * k, 0, -420) * s
		Build.box(folder, base + Vector3.new(-0.1, 0.1 + 0.05 * k, -0.1), base + Vector3.new(0.1, 0.3 + 0.05 * k, 0.1), props)
	end
	local well = top + Vector3.new(650, 0, -480) * s
	Build.cylinderY(folder, well + Vector3.new(0, 0.3, 0), 0.6, 0.7, props)
end

local function buildVault(root: Instance)
	local folder = Build.folder(root, "TheSternum")
	local function box(a: Vector3, b: Vector3, props)
		return Build.box(folder, VAULT + a, VAULT + b, props)
	end
	local concrete = { Name = "Vault", Material = Enum.Material.Concrete, Color = C.ConcreteIn }
	box(Vector3.new(-30, -2, -14), Vector3.new(30, 0, 14), { Name = "VaultFloor", Material = Enum.Material.Concrete, Color = C.Floor, Reflectance = 0.08 })
	box(Vector3.new(-30, 20, -14), Vector3.new(30, 22, 14), concrete)
	box(Vector3.new(-32, -2, -14), Vector3.new(-30, 22, 14), concrete)
	box(Vector3.new(30, -2, -14), Vector3.new(32, 22, 14), concrete)
	box(Vector3.new(-32, -2, -16), Vector3.new(32, 22, -14), concrete)
	box(Vector3.new(-32, -2, 14), Vector3.new(32, 22, 16), concrete)
	-- Ribbed ceiling: concrete fins, like the inside of the chest.
	for x = -26, 26, 4 do
		box(Vector3.new(x - 0.4, 15, -14), Vector3.new(x + 0.4, 20, 14), concrete)
	end
	for _, z in { -13.6, 13.6 } do
		Furnish.lightSlot(folder, VAULT + Vector3.new(-28, 0.2, z - 0.2), VAULT + Vector3.new(28, 0.5, z + 0.2), Enum.NormalId.Top, 20)
	end
	-- Plinth with the scale model and the final note.
	box(Vector3.new(-5, 0, -5), Vector3.new(5, 3.4, 5), { Name = "Plinth", Material = Enum.Material.Marble, Color = C.Marble })
	miniModel(folder, VAULT + Vector3.new(0, 3.4, 0))
	local glow = Build.part(folder, {
		Name = "ModelLight",
		Size = Vector3.new(0.2, 0.2, 0.2),
		CFrame = CFrame.new(VAULT + Vector3.new(0, 10, 0)),
		Transparency = 1,
		CanCollide = false,
	})
	Build.pointLight(glow, C.Warm, 24, 1.2)
	Furnish.note(folder, VAULT + Vector3.new(3.6, 3.4, 3.6), "final", 0.6)
	-- The way back up.
	local exit = box(Vector3.new(-29.6, 0, -3), Vector3.new(-29, 11, 3), { Name = "VaultExit", Material = Enum.Material.Metal, Color = C.Metal })
	for _, z in { -3.4, 3.4 } do
		box(Vector3.new(-29.6, 0, z - 0.2), Vector3.new(-28.8, 11.4, z + 0.2), { Name = "ExitFrame", Material = Enum.Material.Neon, Color = C.Warm })
	end
	Registry.addInterior("sternum", "The Sternum", VAULT + Vector3.new(-30, -1, -14), VAULT + Vector3.new(30, 20, 14))
	return exit
end

local function buildHatch(root: Instance)
	local folder = Build.folder(root, "Hatch")
	-- A dark ring just under the surface: visible as a shadow in daytime.
	Build.part(folder, {
		Name = "SunkenRing",
		Shape = Enum.PartType.Cylinder,
		Size = Vector3.new(1, 12, 12),
		CFrame = CFrame.new(HATCH_POS + Vector3.new(0, -3, 0)) * CFrame.Angles(0, 0, math.pi / 2),
		Material = Enum.Material.Metal,
		Color = Color3.fromRGB(30, 32, 34),
	})
	hatch = Build.part(folder, {
		Name = "IceHatch",
		Size = Vector3.new(7, 0.3, 7),
		CFrame = CFrame.new(HATCH_POS + Vector3.new(0, 0.55, 0)),
		Material = Enum.Material.Metal,
		Color = Color3.fromRGB(48, 50, 52),
		Transparency = 1,
		CanCollide = false,
	})
	local light = Build.pointLight(hatch, C.Warm, 14, 0)
	light.Name = "HatchGlow"
	hatchPrompt = Build.prompt(hatch, "Open the hatch", "Sealed hatch", 1, 10)
	hatchPrompt.Enabled = false
end

function Lore.build(root: Instance)
	buildHatch(root)
	Registry.misc.vaultExit = buildVault(root)
end

----------------------------------------------------------------------------
-- Gameplay
----------------------------------------------------------------------------

-- Called by the day cycle when the sea freezes or thaws.
function Lore.setFrozen(frozen: boolean)
	if not hatch then
		return
	end
	hatch.Transparency = frozen and 0 or 1
	hatch.CanCollide = frozen
	hatchPrompt.Enabled = frozen
	local glow = hatch:FindFirstChild("HatchGlow")
	if glow then
		glow.Brightness = frozen and 1.2 or 0
	end
end

local function noteCount(profile): number
	local n = 0
	for id in profile.notes do
		if id ~= "final" then
			n += 1
		end
	end
	return n
end

local function readNote(player: Player, id: string)
	local profile = hooks.profile(player)
	local note = noteById[id]
	if not profile or not note then
		return
	end
	hooks.openPanel(player, "note", id)
	if profile.notes[id] then
		return
	end
	profile.notes[id] = true
	hooks.syncNotes(player)
	if id == "final" then
		hooks.addCredits(player, 300)
		profile.title = "Keeper of the Ice"
		hooks.refreshTitle(player)
		hooks.discover(player, "sternum")
		hooks.notify(player, "You are the Keeper of the Ice now. (+300 credits)", "discovery")
		return
	end
	hooks.addCredits(player, 15)
	local count = noteCount(profile)
	hooks.notify(player, string.format("Architect's note %d of %d found (+15).", count, #Config.NOTES - 1), "discovery")
	if count == #Config.NOTES - 1 then
		hooks.notify(player, "You've found every note. Read the tuning again, and find the floor of glass.", "discovery")
	end
end

function Lore.start(builtHooks, remotes)
	hooks = builtHooks
	for _, n in Registry.notes do
		local p = Build.prompt(n.part, "Read", "A folded note", 0, 8)
		p.Triggered:Connect(function(player)
			readNote(player, n.id)
		end)
	end

	-- The rib organ: the client plays it; the server checks the melody.
	remotes.Organ.OnServerEvent:Connect(function(player, sequence)
		if type(sequence) ~= "table" or #sequence ~= #Config.MELODY then
			return
		end
		for i, key in Config.MELODY do
			if sequence[i] ~= key then
				return
			end
		end
		local hrp = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
		local organ = Registry.misc.organPanel
		if not hrp or not organ or (hrp.Position - organ.Position).Magnitude > 24 then
			return
		end
		local profile = hooks.profile(player)
		if not profile or profile.flags.melody then
			return
		end
		profile.flags.melody = true
		hooks.discover(player, "melody")
		hooks.notify(player, "Every rib answers at once. Far below the arch, something heavy unlocks.", "discovery")
		remotes.Organ:FireAllClients("solved")
	end)

	hatchPrompt.Triggered:Connect(function(player)
		local profile = hooks.profile(player)
		if not profile then
			return
		end
		if not profile.flags.melody then
			hooks.notify(player, "Sealed. Cold metal, and seven grooves cut into it like the keys of an instrument.", "warn")
			return
		end
		hooks.teleport(player, CFrame.new(VAULT + Vector3.new(-24, 3, 0)) * CFrame.Angles(0, -math.pi / 2, 0))
		hooks.notify(player, "You climb down a long ladder into the dark under the arch...")
	end)

	local exitPrompt = Build.prompt(Registry.misc.vaultExit, "Climb back up", "Ladder shaft", 0.5, 10)
	exitPrompt.Triggered:Connect(function(player)
		if Workspace:GetAttribute("Frozen") then
			hooks.teleport(player, CFrame.new(HATCH_POS + Vector3.new(6, 4, 0)))
		else
			hooks.teleport(player, Registry.homes.ribcage.dock)
		end
	end)
end

return Lore
