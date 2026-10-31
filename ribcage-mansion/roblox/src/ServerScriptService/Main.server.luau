-- The Ribcage: entry point. Builds the mansion and starts the game systems.

local Players = game:GetService("Players")

-- Hold characters back until the world exists, so nobody falls into the void.
Players.CharacterAutoLoads = false

local Modules = script.Parent:WaitForChild("Modules")
local Builder = require(Modules:WaitForChild("Builder"))
local Gameplay = require(Modules:WaitForChild("Gameplay"))

local started = os.clock()
local refs = Builder.build()
print(string.format("[Ribcage] Mansion built in %.1fs", os.clock() - started))

Gameplay.start(refs)

Players.CharacterAutoLoads = true
for _, player in Players:GetPlayers() do
	if not player.Character then
		task.spawn(function()
			player:LoadCharacter()
		end)
	end
end
