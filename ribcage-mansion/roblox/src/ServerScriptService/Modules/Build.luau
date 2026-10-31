--!nonstrict
-- Small helpers for making anchored parts, lights and prompts in code.

local ServerStorage = game:GetService("ServerStorage")

local Build = {}

Build.Color = {
	ConcreteOut = Color3.fromRGB(168, 168, 164),
	ConcreteDark = Color3.fromRGB(70, 72, 74),
	ConcreteIn = Color3.fromRGB(132, 122, 110),
	Floor = Color3.fromRGB(78, 70, 62),
	Glass = Color3.fromRGB(160, 190, 210),
	Fabric = Color3.fromRGB(46, 42, 40),
	Marble = Color3.fromRGB(28, 26, 26),
	Wood = Color3.fromRGB(70, 48, 34),
	Warm = Color3.fromRGB(255, 196, 130),
	Metal = Color3.fromRGB(24, 24, 26),
	Snow = Color3.fromRGB(236, 241, 246),
	Ice = Color3.fromRGB(214, 228, 240),
}

function Build.folder(parent: Instance, name: string): Folder
	local f = parent:FindFirstChild(name)
	if f and f:IsA("Folder") then
		return f
	end
	local nf = Instance.new("Folder")
	nf.Name = name
	nf.Parent = parent
	return nf
end

-- Build.part(parent, { Size = ..., CFrame = ..., ... }) -> Part
-- Pass ClassName = "WedgePart" etc. for other part types.
function Build.part(parent: Instance, props: { [string]: any }): BasePart
	local p: any = Instance.new(props.ClassName or "Part")
	p.Anchored = true
	p.TopSurface = Enum.SurfaceType.Smooth
	p.BottomSurface = Enum.SurfaceType.Smooth
	p.Material = Enum.Material.SmoothPlastic
	if props.Shape and p:IsA("Part") then
		p.Shape = props.Shape
	end
	if props.Size then
		p.Size = props.Size
	end
	for k, v in props do
		if k ~= "ClassName" and k ~= "Shape" and k ~= "Size" then
			(p :: any)[k] = v
		end
	end
	p.Parent = parent
	return p
end

-- A block spanning two corner points (axis aligned).
function Build.box(parent: Instance, a: Vector3, b: Vector3, props: { [string]: any }?): BasePart
	local minV = a:Min(b)
	local maxV = a:Max(b)
	local p = table.clone(props or {})
	p.Size = maxV - minV
	p.CFrame = CFrame.new((minV + maxV) / 2)
	return Build.part(parent, p)
end

-- A stretched sphere (uses a SpecialMesh so it can be non-uniform).
function Build.ellipsoid(parent: Instance, cf: CFrame, size: Vector3, props: { [string]: any }?): BasePart
	local p = table.clone(props or {})
	p.Size = size
	p.CFrame = cf
	local part = Build.part(parent, p)
	local mesh = Instance.new("SpecialMesh")
	mesh.MeshType = Enum.MeshType.Sphere
	mesh.Parent = part
	return part
end

-- A cylinder whose axis runs along world Y.
function Build.cylinderY(parent: Instance, center: Vector3, height: number, diameter: number, props: { [string]: any }?): BasePart
	local p = table.clone(props or {})
	p.Shape = Enum.PartType.Cylinder
	p.Size = Vector3.new(height, diameter, diameter)
	p.CFrame = CFrame.new(center) * CFrame.Angles(0, 0, math.pi / 2)
	return Build.part(parent, p)
end

-- A part stretched between two points with a given cross-section.
function Build.beam(parent: Instance, p1: Vector3, p2: Vector3, width: number, depth: number, props: { [string]: any }?, up: Vector3?): BasePart
	local p = table.clone(props or {})
	local len = (p2 - p1).Magnitude
	p.Size = Vector3.new(width, depth, len)
	p.CFrame = CFrame.lookAt((p1 + p2) / 2, p2, up or Vector3.yAxis)
	return Build.part(parent, p)
end

function Build.pointLight(parent: Instance, color: Color3, range: number, brightness: number): PointLight
	local l = Instance.new("PointLight")
	l.Color = color
	l.Range = range
	l.Brightness = brightness
	l.Shadows = true
	l.Parent = parent
	return l
end

function Build.surfaceLight(parent: Instance, face: Enum.NormalId, color: Color3, range: number, brightness: number, angle: number?): SurfaceLight
	local l = Instance.new("SurfaceLight")
	l.Face = face
	l.Color = color
	l.Range = range
	l.Brightness = brightness
	l.Angle = angle or 90
	l.Parent = parent
	return l
end

function Build.prompt(parent: Instance, action: string, object: string, hold: number?, distance: number?): ProximityPrompt
	local pp = Instance.new("ProximityPrompt")
	pp.ActionText = action
	pp.ObjectText = object
	pp.HoldDuration = hold or 0
	pp.MaxActivationDistance = distance or 10
	pp.RequiresLineOfSight = false
	pp.Parent = parent
	return pp
end

-- Finds an optional Blender-made asset in ServerStorage.BlenderAssets.
function Build.asset(name: string): Instance?
	local folder = ServerStorage:FindFirstChild("BlenderAssets")
	if not folder then
		return nil
	end
	local found = folder:FindFirstChild(name)
	return found
end

-- Places a copy of an imported asset so its bounding box fills `size`
-- centred on `cf`. Works for a MeshPart or a Model of MeshParts.
function Build.placeAsset(template: Instance, parent: Instance, cf: CFrame, size: Vector3, props: { [string]: any }?): Instance
	-- The 3D importer often wraps a single mesh in a Model; use the mesh itself
	-- so it can be stretched non-uniformly.
	if template:IsA("Model") then
		local parts = {}
		for _, d in template:GetDescendants() do
			if d:IsA("BasePart") then
				table.insert(parts, d)
			end
		end
		if #parts == 1 then
			template = parts[1]
		end
	end
	local clone = template:Clone()
	local function style(part: BasePart)
		part.Anchored = true
		for k, v in (props or {}) :: { [string]: any } do
			pcall(function()
				(part :: any)[k] = v
			end)
		end
	end
	if clone:IsA("BasePart") then
		clone.Size = size
		clone.CFrame = cf
		style(clone)
	elseif clone:IsA("Model") then
		for _, d in clone:GetDescendants() do
			if d:IsA("BasePart") then
				style(d)
			end
		end
		local _, bbSize = clone:GetBoundingBox()
		local scale = math.max(size.X, size.Y, size.Z) / math.max(bbSize.X, bbSize.Y, bbSize.Z)
		clone:ScaleTo(clone:GetScale() * scale)
		local bbCf = clone:GetBoundingBox()
		local offset = bbCf:ToObjectSpace(clone:GetPivot())
		clone:PivotTo(cf * offset)
	end
	clone.Parent = parent
	return clone
end

return Build
