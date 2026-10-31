--!nonstrict
-- Builds the whole map. Called by Main when the game starts.
--
-- To look at the mansion in Studio without pressing Play, paste this into the
-- Command Bar (View > Command Bar) and press Enter:
--   require(game.ServerScriptService.Modules.Builder).build()

local Workspace = game:GetService("Workspace")

local World = require(script.Parent.World)
local Mansion = require(script.Parent.Mansion)

local Builder = {}

function Builder.build()
	local old = Workspace:FindFirstChild("RibcageWorld")
	if old then
		old:Destroy()
	end
	-- Remove Studio's default baseplate if it is there.
	local baseplate = Workspace:FindFirstChild("Baseplate")
	if baseplate then
		baseplate:Destroy()
	end
	for _, child in Workspace:GetChildren() do
		if child:IsA("SpawnLocation") then
			child:Destroy()
		end
	end

	local root = Instance.new("Folder")
	root.Name = "RibcageWorld"
	root.Parent = Workspace

	local refs = World.build(root)
	local mansionRefs = Mansion.build(root)
	for k, v in mansionRefs do
		refs[k] = v
	end
	refs.root = root
	return refs
end

return Builder
