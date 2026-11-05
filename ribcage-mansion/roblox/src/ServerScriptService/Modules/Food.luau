--!nonstrict
-- Food you can hold and eat. Every meal is a Tool whose Handle is the plate,
-- bowl, mug or board, with the food modelled on top in parts. The Handle's
-- local Y axis points up while held, so plates are carried flat.

local Food = {}

local CERAMIC = Color3.fromRGB(226, 222, 214)
local STONEWARE = Color3.fromRGB(58, 54, 50)

-- shape: "sphere" (stretched ellipsoid) or "block". Offsets are from the
-- centre of the handle.
type Bit = { shape: string, at: Vector3, size: Vector3, color: Color3, material: Enum.Material?, rot: Vector3? }
type Design = { handle: string, bites: number, bits: { Bit } }

local function plate(): string
	return "plate"
end

local DESIGNS: { [string]: Design } = {
	coffee = {
		handle = "mug",
		bites = 2,
		bits = {
			{ shape = "block", at = Vector3.new(0, 0.36, 0), size = Vector3.new(0.56, 0.05, 0.56), color = Color3.fromRGB(58, 38, 26) },
			{ shape = "sphere", at = Vector3.new(0, 0.39, 0), size = Vector3.new(0.3, 0.02, 0.3), color = Color3.fromRGB(196, 160, 120) },
		},
	},
	tea = {
		handle = "mug",
		bites = 2,
		bits = {
			{ shape = "block", at = Vector3.new(0, 0.36, 0), size = Vector3.new(0.56, 0.05, 0.56), color = Color3.fromRGB(150, 92, 40) },
		},
	},
	cocoa = {
		handle = "darkmug",
		bites = 2,
		bits = {
			{ shape = "block", at = Vector3.new(0, 0.36, 0), size = Vector3.new(0.56, 0.05, 0.56), color = Color3.fromRGB(92, 58, 38) },
			{ shape = "block", at = Vector3.new(-0.1, 0.43, 0.08), size = Vector3.new(0.16, 0.14, 0.16), color = Color3.fromRGB(246, 242, 236), rot = Vector3.new(0, 0.4, 0.2) },
			{ shape = "block", at = Vector3.new(0.12, 0.42, -0.06), size = Vector3.new(0.16, 0.14, 0.16), color = Color3.fromRGB(246, 242, 236), rot = Vector3.new(0.3, 0.9, 0) },
			{ shape = "block", at = Vector3.new(0.02, 0.44, -0.16), size = Vector3.new(0.15, 0.13, 0.15), color = Color3.fromRGB(240, 226, 230), rot = Vector3.new(0, 0.2, 0.3) },
		},
	},
	pancakes = {
		handle = plate(),
		bites = 3,
		bits = {
			{ shape = "sphere", at = Vector3.new(0, 0.16, 0), size = Vector3.new(1.25, 0.18, 1.25), color = Color3.fromRGB(206, 150, 76) },
			{ shape = "sphere", at = Vector3.new(0.03, 0.32, 0.02), size = Vector3.new(1.2, 0.18, 1.2), color = Color3.fromRGB(214, 160, 84) },
			{ shape = "sphere", at = Vector3.new(-0.02, 0.48, -0.02), size = Vector3.new(1.15, 0.18, 1.15), color = Color3.fromRGB(220, 168, 90) },
			{ shape = "sphere", at = Vector3.new(0.05, 0.57, 0.05), size = Vector3.new(0.9, 0.04, 0.8), color = Color3.fromRGB(150, 72, 20), material = Enum.Material.Glass },
			{ shape = "block", at = Vector3.new(0, 0.66, 0), size = Vector3.new(0.3, 0.16, 0.3), color = Color3.fromRGB(250, 226, 130) },
			{ shape = "sphere", at = Vector3.new(0.6, 0.12, 0.45), size = Vector3.new(0.18, 0.18, 0.18), color = Color3.fromRGB(150, 20, 40) },
			{ shape = "sphere", at = Vector3.new(0.7, 0.12, 0.2), size = Vector3.new(0.17, 0.17, 0.17), color = Color3.fromRGB(50, 60, 140) },
			{ shape = "sphere", at = Vector3.new(0.48, 0.12, 0.62), size = Vector3.new(0.17, 0.17, 0.17), color = Color3.fromRGB(50, 60, 140) },
		},
	},
	miso = {
		handle = "bowl",
		bites = 3,
		bits = {
			{ shape = "sphere", at = Vector3.new(0, 0.26, 0), size = Vector3.new(1.32, 0.06, 1.32), color = Color3.fromRGB(196, 160, 104) },
			{ shape = "block", at = Vector3.new(-0.2, 0.3, 0.15), size = Vector3.new(0.22, 0.18, 0.22), color = Color3.fromRGB(244, 238, 222) },
			{ shape = "block", at = Vector3.new(0.25, 0.3, -0.1), size = Vector3.new(0.22, 0.18, 0.22), color = Color3.fromRGB(244, 238, 222) },
			{ shape = "block", at = Vector3.new(0.05, 0.3, 0.32), size = Vector3.new(0.2, 0.16, 0.2), color = Color3.fromRGB(244, 238, 222) },
			{ shape = "sphere", at = Vector3.new(0.1, 0.31, -0.3), size = Vector3.new(0.5, 0.04, 0.12), color = Color3.fromRGB(70, 120, 50) },
			{ shape = "sphere", at = Vector3.new(-0.32, 0.31, -0.12), size = Vector3.new(0.12, 0.04, 0.4), color = Color3.fromRGB(80, 140, 60) },
		},
	},
	searedfish = {
		handle = plate(),
		bites = 3,
		bits = {
			{ shape = "sphere", at = Vector3.new(-0.2, 0.18, 0.05), size = Vector3.new(1.0, 0.24, 0.48), color = Color3.fromRGB(236, 150, 116) },
			{ shape = "sphere", at = Vector3.new(-0.2, 0.28, 0.05), size = Vector3.new(0.86, 0.06, 0.36), color = Color3.fromRGB(160, 96, 52) },
			{ shape = "sphere", at = Vector3.new(0.45, 0.22, -0.3), size = Vector3.new(0.7, 0.38, 0.7), color = Color3.fromRGB(246, 244, 236) },
			{ shape = "sphere", at = Vector3.new(0.5, 0.14, 0.45), size = Vector3.new(0.3, 0.16, 0.18), color = Color3.fromRGB(246, 220, 80) },
			{ shape = "sphere", at = Vector3.new(-0.55, 0.12, -0.45), size = Vector3.new(0.18, 0.05, 0.4), color = Color3.fromRGB(70, 120, 50) },
		},
	},
	stew = {
		handle = "bowl",
		bites = 3,
		bits = {
			{ shape = "sphere", at = Vector3.new(0, 0.26, 0), size = Vector3.new(1.32, 0.07, 1.32), color = Color3.fromRGB(122, 70, 38) },
			{ shape = "block", at = Vector3.new(-0.25, 0.31, 0.1), size = Vector3.new(0.2, 0.16, 0.2), color = Color3.fromRGB(226, 120, 40), rot = Vector3.new(0.3, 0.5, 0) },
			{ shape = "block", at = Vector3.new(0.2, 0.31, 0.25), size = Vector3.new(0.24, 0.18, 0.22), color = Color3.fromRGB(232, 214, 170), rot = Vector3.new(0, 0.9, 0.2) },
			{ shape = "block", at = Vector3.new(0.1, 0.31, -0.28), size = Vector3.new(0.3, 0.16, 0.22), color = Color3.fromRGB(244, 236, 226), rot = Vector3.new(0.2, 0.2, 0) },
			{ shape = "block", at = Vector3.new(-0.3, 0.31, -0.2), size = Vector3.new(0.18, 0.15, 0.18), color = Color3.fromRGB(226, 120, 40), rot = Vector3.new(0, 1.2, 0.3) },
		},
	},
	bread = {
		handle = "board",
		bites = 3,
		bits = {
			{ shape = "sphere", at = Vector3.new(0, 0.38, 0), size = Vector3.new(1.4, 0.7, 0.85), color = Color3.fromRGB(176, 112, 54) },
			{ shape = "block", at = Vector3.new(-0.3, 0.66, 0), size = Vector3.new(0.06, 0.06, 0.6), color = Color3.fromRGB(226, 186, 120), rot = Vector3.new(0, 0.5, 0) },
			{ shape = "block", at = Vector3.new(0.1, 0.7, 0), size = Vector3.new(0.06, 0.06, 0.6), color = Color3.fromRGB(226, 186, 120), rot = Vector3.new(0, 0.5, 0) },
			{ shape = "block", at = Vector3.new(0.45, 0.62, 0), size = Vector3.new(0.06, 0.06, 0.5), color = Color3.fromRGB(226, 186, 120), rot = Vector3.new(0, 0.5, 0) },
		},
	},
	snack = {
		handle = plate(),
		bites = 2,
		bits = {
			{ shape = "block", at = Vector3.new(-0.3, 0.1, 0.1), size = Vector3.new(0.5, 0.06, 0.5), color = Color3.fromRGB(222, 184, 120), rot = Vector3.new(0, 0.3, 0) },
			{ shape = "block", at = Vector3.new(-0.25, 0.16, -0.25), size = Vector3.new(0.5, 0.06, 0.5), color = Color3.fromRGB(222, 184, 120), rot = Vector3.new(0, 0.8, 0) },
			{ shape = "block", at = Vector3.new(0.35, 0.18, 0), size = Vector3.new(0.5, 0.3, 0.4), color = Color3.fromRGB(248, 210, 100) },
			{ shape = "block", at = Vector3.new(0.3, 0.17, 0.42), size = Vector3.new(0.3, 0.24, 0.3), color = Color3.fromRGB(250, 236, 200) },
		},
	},
}

local function newPart(name: string, size: Vector3, color: Color3, material: Enum.Material?, sphere: boolean?): BasePart
	local p = Instance.new("Part")
	p.Name = name
	p.Size = size
	p.Color = color
	p.Material = material or Enum.Material.SmoothPlastic
	p.TopSurface = Enum.SurfaceType.Smooth
	p.BottomSurface = Enum.SurfaceType.Smooth
	p.CanCollide = false
	p.CanQuery = false
	p.CanTouch = false
	p.Massless = true
	p.Anchored = false
	if sphere then
		local mesh = Instance.new("SpecialMesh")
		mesh.MeshType = Enum.MeshType.Sphere
		mesh.Parent = p
	end
	return p
end

local function makeHandle(kind: string): (BasePart, { BasePart })
	local extras = {}
	local handle: BasePart
	if kind == "plate" then
		handle = newPart("Handle", Vector3.new(1.9, 0.12, 1.9), CERAMIC, Enum.Material.SmoothPlastic, true)
	elseif kind == "bowl" then
		handle = newPart("Handle", Vector3.new(1.6, 0.66, 1.6), STONEWARE, Enum.Material.SmoothPlastic, true)
	elseif kind == "board" then
		handle = newPart("Handle", Vector3.new(1.9, 0.14, 1.2), Color3.fromRGB(120, 84, 54), Enum.Material.Wood)
	else -- mug / darkmug: a square brutalist mug
		local color = kind == "darkmug" and STONEWARE or Color3.fromRGB(214, 210, 200)
		handle = newPart("Handle", Vector3.new(0.7, 0.8, 0.7), color, Enum.Material.SmoothPlastic)
		local loop = newPart("MugHandle", Vector3.new(0.12, 0.45, 0.35), color, Enum.Material.SmoothPlastic)
		loop.CFrame = CFrame.new(0.42, 0, 0)
		table.insert(extras, loop)
	end
	return handle, extras
end

-- Builds the Tool for a recipe id. quality is a label like "Perfect".
function Food.make(designId: string, displayName: string, quality: string?): Tool?
	local design = DESIGNS[designId]
	if not design then
		return nil
	end
	local tool = Instance.new("Tool")
	tool.Name = displayName
	tool.CanBeDropped = false
	tool.RequiresHandle = true
	tool.ToolTip = (quality and (quality .. " · ") or "") .. "Click to eat. Sit down for a bonus."
	tool:SetAttribute("Food", designId)
	tool:SetAttribute("Bites", design.bites)
	tool:SetAttribute("BitesTotal", design.bites)
	tool:SetAttribute("Quality", quality or "Decent")

	local handle, extras = makeHandle(design.handle)
	handle.CFrame = CFrame.new()
	handle.Parent = tool
	local foodParts = {}
	for _, e in extras do
		e.Parent = tool
		local w = Instance.new("WeldConstraint")
		w.Part0 = handle
		w.Part1 = e
		w.Parent = e
	end
	for i, b in design.bits do
		local p = newPart("Food" .. i, b.size, b.color, b.material, b.shape == "sphere")
		local rot = b.rot or Vector3.zero
		p.CFrame = CFrame.new(b.at) * CFrame.Angles(rot.X, rot.Y, rot.Z)
		p.Parent = tool
		local w = Instance.new("WeldConstraint")
		w.Part0 = handle
		w.Part1 = p
		w.Parent = p
		table.insert(foodParts, p)
	end
	-- Hold it a little in front of the hand.
	tool.Grip = CFrame.new(0, 0, 0.35)
	return tool
end

-- Shrinks the food after a bite (the plate stays the same).
function Food.shrink(tool: Tool, fraction: number)
	for _, p in tool:GetChildren() do
		if p:IsA("BasePart") and string.sub(p.Name, 1, 4) == "Food" then
			-- Resize in place, keeping the bottom of the food on the plate.
			local old = p.Size
			local new = old * Vector3.new(fraction ^ 0.5, fraction, fraction ^ 0.5)
			local weld = p:FindFirstChildOfClass("WeldConstraint")
			if weld then
				weld.Enabled = false
			end
			p.Size = new
			p.CFrame = p.CFrame * CFrame.new(0, (new.Y - old.Y) / 2, 0)
			if weld then
				weld.Enabled = true
			end
		end
	end
end

function Food.isDrink(designId: string): boolean
	return designId == "coffee" or designId == "tea" or designId == "cocoa"
end

return Food
