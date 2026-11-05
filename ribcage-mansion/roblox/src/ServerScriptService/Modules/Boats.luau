--!nonstrict
-- A small concrete-grey launch at every dock. Sit in the seat: W/S (or the
-- thumbstick) for throttle, A/D to steer. Physics: the hull floats in the
-- terrain water; a LinearVelocity pushes it across the surface and an
-- AlignOrientation keeps it level and pointing where you steer.

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local Workspace = game:GetService("Workspace")

local Build = require(script.Parent.Build)
local Registry = require(script.Parent.Registry)

local Boats = {}

local MAX_SPEED = 36
local REVERSE = 0.4
local TURN_RATE = 1.3 -- radians per second at full steer
local RETURN_AFTER = 75 -- seconds unattended before a far-away boat goes home

type Boat = {
	model: Model,
	hull: BasePart,
	seat: VehicleSeat,
	lv: LinearVelocity,
	align: AlignOrientation,
	spawn: CFrame,
	heading: number,
	idleSince: number,
	warned: boolean,
}

local boats: { Boat } = {}
local hooks

local function yawOf(cf: CFrame): number
	local _, y = cf:ToEulerAnglesYXZ()
	return y
end

local function attachPart(model: Model, hull: BasePart, cf: CFrame, props): BasePart
	local p = Build.part(model, props)
	p.Anchored = false
	p.Massless = true
	p.CFrame = cf
	p.CollisionGroup = "Boats"
	local weld = Instance.new("WeldConstraint")
	weld.Part0 = hull
	weld.Part1 = p
	weld.Parent = p
	return p
end

local function buildBoat(spawn: CFrame): Boat
	local model = Instance.new("Model")
	model.Name = "Boat"
	local hull = Build.part(model, {
		Name = "Hull",
		Size = Vector3.new(6, 1.6, 14),
		CFrame = spawn,
		Material = Enum.Material.Metal,
		Color = Color3.fromRGB(64, 68, 72),
	})
	hull.Anchored = false
	hull.CustomPhysicalProperties = PhysicalProperties.new(0.3, 0.3, 0.5)
	hull.CollisionGroup = "Boats"

	local grey = Color3.fromRGB(150, 150, 146)
	for _, x in { -2.75, 2.75 } do
		attachPart(model, hull, spawn * CFrame.new(x, 1.3, 0), { Name = "Gunwale", Size = Vector3.new(0.5, 1, 14), Material = Enum.Material.Concrete, Color = grey })
	end
	attachPart(model, hull, spawn * CFrame.new(0, 0.2, -7.6), { Name = "Bow", Size = Vector3.new(4, 1.2, 1.4), Material = Enum.Material.Metal, Color = Color3.fromRGB(64, 68, 72) })
	attachPart(model, hull, spawn * CFrame.new(0, 1.3, 6.6), { Name = "Transom", Size = Vector3.new(6, 1, 0.6), Material = Enum.Material.Concrete, Color = grey })
	attachPart(model, hull, spawn * CFrame.new(0, 1.2, -3), { Name = "Bench", Size = Vector3.new(5, 0.6, 1.6), Material = Enum.Material.Wood, Color = Build.Color.Wood })
	local lantern = attachPart(model, hull, spawn * CFrame.new(0, 2.6, -6.4), { Name = "Lantern", Size = Vector3.new(0.6, 0.8, 0.6), Material = Enum.Material.Neon, Color = Build.Color.Warm })
	Build.pointLight(lantern, Build.Color.Warm, 18, 1.2)

	local seat = Instance.new("VehicleSeat")
	seat.Name = "Helm"
	seat.Size = Vector3.new(2, 0.8, 2)
	seat.CFrame = spawn * CFrame.new(0, 1.2, 3.5)
	seat.Material = Enum.Material.Fabric
	seat.Color = Build.Color.Fabric
	seat.HeadsUpDisplay = false
	seat.MaxSpeed = 0
	seat.Massless = true
	seat.CollisionGroup = "Boats"
	seat.TopSurface = Enum.SurfaceType.Smooth
	seat.BottomSurface = Enum.SurfaceType.Smooth
	seat.Parent = model
	local weld = Instance.new("WeldConstraint")
	weld.Part0 = hull
	weld.Part1 = seat
	weld.Parent = seat

	local att = Instance.new("Attachment")
	att.Name = "Drive"
	att.Parent = hull
	local lv = Instance.new("LinearVelocity")
	lv.Attachment0 = att
	lv.VelocityConstraintMode = Enum.VelocityConstraintMode.Plane
	lv.PrimaryTangentAxis = Vector3.xAxis
	lv.SecondaryTangentAxis = Vector3.zAxis
	lv.RelativeTo = Enum.ActuatorRelativeTo.World
	lv.MaxForce = 8000
	lv.PlaneVelocity = Vector2.zero
	lv.Parent = hull
	local align = Instance.new("AlignOrientation")
	align.Mode = Enum.OrientationAlignmentMode.OneAttachment
	align.Attachment0 = att
	align.MaxTorque = 60000
	align.Responsiveness = 12
	align.CFrame = CFrame.Angles(0, yawOf(spawn), 0)
	align.Parent = hull

	model.PrimaryPart = hull
	model.Parent = Build.folder(Workspace:FindFirstChild("RibcageWorld") or Workspace, "Boats")
	return {
		model = model,
		hull = hull,
		seat = seat,
		lv = lv,
		align = align,
		spawn = spawn,
		heading = yawOf(spawn),
		idleSince = os.clock(),
		warned = false,
	}
end

function Boats.reset(boat: Boat)
	if boat.seat.Occupant then
		return
	end
	boat.hull.AssemblyLinearVelocity = Vector3.zero
	boat.hull.AssemblyAngularVelocity = Vector3.zero
	boat.model:PivotTo(boat.spawn)
	boat.heading = yawOf(boat.spawn)
	boat.align.CFrame = CFrame.Angles(0, boat.heading, 0)
end

local function occupantPlayer(boat: Boat): Player?
	local humanoid = boat.seat.Occupant
	return humanoid and Players:GetPlayerFromCharacter(humanoid.Parent)
end

local function step(dt: number)
	local frozen = Workspace:GetAttribute("Frozen") == true
	local now = os.clock()
	for _, b in boats do
		local player = occupantPlayer(b)
		local throttle, steer = 0, 0
		if player then
			b.idleSince = now
			throttle = b.seat.ThrottleFloat
			steer = b.seat.SteerFloat
			if frozen then
				if (throttle ~= 0 or steer ~= 0) and not b.warned then
					b.warned = true
					hooks.notify(player, "The boat is locked in the ice until dawn. Walk instead.", "warn")
				end
				throttle, steer = 0, 0
			else
				b.warned = false
			end
		elseif now - b.idleSince > RETURN_AFTER and (b.hull.Position - b.spawn.Position).Magnitude > 30 then
			Boats.reset(b)
			b.idleSince = now
		end
		if b.hull.Position.Y < -40 then
			Boats.reset(b)
		end
		local turn = steer * TURN_RATE * dt
		if throttle < -0.05 then
			turn = -turn -- steer like a car in reverse
		end
		b.heading -= turn
		local facing = CFrame.Angles(0, b.heading, 0)
		b.align.CFrame = facing
		local look = facing.LookVector
		local speed = throttle >= 0 and throttle * MAX_SPEED or throttle * MAX_SPEED * REVERSE
		b.lv.PlaneVelocity = Vector2.new(look.X * speed, look.Z * speed)
	end
end

function Boats.start(builtHooks)
	hooks = builtHooks
	for _, dock in Registry.docks do
		local boat = buildBoat(dock.boatSpawn)
		table.insert(boats, boat)
		dock.boat = boat
		boat.seat:GetPropertyChangedSignal("Occupant"):Connect(function()
			local player = occupantPlayer(boat)
			pcall(function()
				if player then
					boat.hull:SetNetworkOwner(player)
					hooks.notify(player, "W / S: throttle   ·   A / D: steer   ·   Space: hop out", "info")
				else
					boat.hull:SetNetworkOwnershipAuto()
				end
			end)
		end)
		local call = Build.prompt(dock.bell, "Bring the boat back", "Dock", 0.5, 10)
		call.UIOffset = Vector2.new(0, 70)
		call.KeyboardKeyCode = Enum.KeyCode.F
		call.Triggered:Connect(function(player)
			if boat.seat.Occupant then
				hooks.notify(player, "Someone is out in it right now.", "warn")
				return
			end
			Boats.reset(boat)
		end)
	end
	RunService.Heartbeat:Connect(step)
end

return Boats
