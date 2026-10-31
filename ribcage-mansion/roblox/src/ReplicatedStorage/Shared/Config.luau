--!nonstrict
-- Tuning values and content tables. Change numbers here to rebalance the game.

local Config = {}

Config.GAME_NAME = "The Ribcage"
Config.TAGLINE = "A quiet life inside a concrete spine on the Southern Ocean"

-- One full day/night cycle, in real minutes.
Config.DAY_LENGTH_MINUTES = 20
Config.START_CLOCK_TIME = 17.6 -- the blue hour, like the opening of the video

-- Needs (0-100). Values are change per second.
Config.NEEDS = { "Warmth", "Energy", "Hunger", "Hygiene", "Fun" }
Config.NEED_DECAY = {
	Energy = 0.05,
	Hunger = 0.09,
	Hygiene = 0.06,
	Fun = 0.07,
}
Config.WARMTH = {
	indoorsGain = 0.6, -- inside the gallery, up to indoorsCap
	indoorsCap = 75,
	fireplaceGain = 2.5, -- next to a lit fireplace, up to 100
	fireplaceRange = 22,
	outdoorsLoss = 0.6,
	parkaOutdoorsLoss = 0.2,
	roofLoss = 1.2, -- wind on top of the spine
	parkaRoofLoss = 0.45,
	seaLoss = 4.0, -- swimming in the Southern Ocean
	heatedPoolGain = 2.0,
	blizzardMultiplier = 2.0, -- outdoor losses during a blizzard
}
Config.SEAT_ENERGY_GAIN = 0.4
Config.POOL_FUN_GAIN = 1.5
Config.READING_FUN_GAIN = 1.2 -- per second while reading in a seat

----------------------------------------------------------------------------
-- Cooking
----------------------------------------------------------------------------
-- Ingredients come from the pantry (free, restocks every morning) and from
-- fishing off the dock. Each recipe is a short sequence of steps; every step
-- is a timing bar where you stop the marker inside the sweet spot.
-- Step kinds: "chop", "stir", "flip", "pour", "bake", "season".

Config.PANTRY = {
	{ id = "flour", name = "Flour", perDay = 4 },
	{ id = "eggs", name = "Eggs", perDay = 4 },
	{ id = "milk", name = "Milk", perDay = 4 },
	{ id = "cocoa", name = "Cocoa", perDay = 3 },
	{ id = "coffee", name = "Coffee beans", perDay = 3 },
	{ id = "rice", name = "Rice", perDay = 3 },
	{ id = "miso", name = "Miso", perDay = 2 },
	{ id = "veg", name = "Vegetables", perDay = 4 },
	{ id = "butter", name = "Butter", perDay = 3 },
	{ id = "berries", name = "Frozen berries", perDay = 2 },
}

Config.RECIPES = {
	{
		id = "coffee",
		name = "Morning Coffee",
		station = "coffee",
		needs = { coffee = 1, milk = 1 },
		steps = { "pour", "pour" },
		effects = { Energy = 30, Warmth = 10, Fun = 5 },
		desc = "Grind, pour, steam. The first thing every morning.",
	},
	{
		id = "cocoa",
		name = "Hot Cocoa",
		station = "stove",
		needs = { cocoa = 1, milk = 1 },
		steps = { "pour", "stir" },
		effects = { Warmth = 30, Hunger = 8, Fun = 10 },
		desc = "Thick and dark, for watching the ice drift past.",
	},
	{
		id = "pancakes",
		name = "Berry Pancakes",
		station = "stove",
		needs = { flour = 1, eggs = 1, milk = 1, berries = 1 },
		steps = { "stir", "pour", "flip", "flip" },
		effects = { Hunger = 45, Fun = 12 },
		desc = "A slow breakfast at the island.",
	},
	{
		id = "miso",
		name = "Miso Soup",
		station = "stove",
		needs = { miso = 1, veg = 1 },
		steps = { "chop", "pour", "stir" },
		effects = { Hunger = 30, Warmth = 25 },
		desc = "Light, salty and steaming.",
	},
	{
		id = "searedfish",
		name = "Pan-Seared Fish & Rice",
		station = "stove",
		needs = { fish = 1, rice = 1, butter = 1 },
		steps = { "chop", "season", "flip", "stir" },
		effects = { Hunger = 70, Warmth = 10, Fun = 8 },
		desc = "Whatever you caught today, crisp-skinned, with butter rice.",
	},
	{
		id = "stew",
		name = "Fisherman's Stew",
		station = "stove",
		needs = { fish = 2, veg = 2, butter = 1 },
		steps = { "chop", "chop", "stir", "season", "stir" },
		effects = { Hunger = 90, Warmth = 35, Fun = 10 },
		desc = "A big pot that fogs up the gallery glass.",
	},
	{
		id = "bread",
		name = "Fresh Bread",
		station = "oven",
		needs = { flour = 2, butter = 1, eggs = 1 },
		steps = { "stir", "season", "bake" },
		effects = { Hunger = 50, Fun = 15 },
		desc = "The whole spine smells of it for an hour.",
	},
	{
		id = "pettreats",
		name = "Pet Treats",
		station = "oven",
		needs = { fish = 1, flour = 1, eggs = 1 },
		steps = { "chop", "stir", "bake" },
		effects = {},
		makesTreats = 3,
		desc = "Makes 3 treats for the cat (and any other pets you adopt).",
	},
}

-- Each finished meal leaves dirty dishes in the galley sink.
Config.MAX_DIRTY_DISHES = 6

----------------------------------------------------------------------------
-- Pets
----------------------------------------------------------------------------
-- Mochi the house cat lives in the mansion for everyone. Adopted pets follow
-- the player who adopted them.

Config.RESIDENT_CAT_NAME = "Mochi"
Config.PETS = {
	{ id = "Cat", name = "Cat", price = 0, desc = "A grey tabby kitten that follows you around." },
	{ id = "Samoyed", name = "Samoyed Puppy", price = 180, desc = "A fluffy white dog that loves the cold." },
	{ id = "Rabbit", name = "Snow Rabbit", price = 120, desc = "A white lop-eared rabbit. Very soft." },
	{ id = "Penguin", name = "Little Penguin", price = 260, desc = "A small Adelie penguin. Waddles after you." },
}

----------------------------------------------------------------------------
-- Daily routine
----------------------------------------------------------------------------
-- Resets every in-game morning (06:00). Each chore pays once per day.

Config.CHORES = {
	{ id = "coffee", name = "Make the morning coffee", reward = 10 },
	{ id = "feedcat", name = "Feed Mochi", reward = 10 },
	{ id = "cook", name = "Cook a proper meal", reward = 20 },
	{ id = "dishes", name = "Wash the dishes", reward = 10 },
	{ id = "plants", name = "Water the plants", reward = 10 },
	{ id = "bed", name = "Make the bed", reward = 5 },
	{ id = "fire", name = "Keep the fire going after dark", reward = 10 },
	{ id = "read", name = "Read by the fire", reward = 10 },
}

----------------------------------------------------------------------------
-- Weather
----------------------------------------------------------------------------
-- Changes every few minutes. Changes fog, snow, wind and how cold it is outside.

Config.WEATHER = {
	{ id = "Mist", name = "Sea mist", weight = 4, fog = 0.5, snow = 0, wind = 0.2 },
	{ id = "Still", name = "Still and clear", weight = 3, fog = 0.3, snow = 0, wind = 0 },
	{ id = "Snow", name = "Snowfall", weight = 3, fog = 0.45, snow = 1, wind = 0.4 },
	{ id = "Blizzard", name = "Blizzard", weight = 1, fog = 0.68, snow = 3, wind = 1 },
}
Config.WEATHER_MIN_SECONDS = 180
Config.WEATHER_MAX_SECONDS = 360

----------------------------------------------------------------------------
-- Discoveries and upgrades
----------------------------------------------------------------------------

Config.DISCOVERIES = {
	{ id = "dock", name = "The Dock", hint = "Where every visitor arrives.", reward = 10 },
	{ id = "gallery", name = "Crown Gallery", hint = "The long glass room at the very top of the spine.", reward = 25 },
	{ id = "fireplace", name = "Hanging Fireplace", hint = "Warm your hands by the floating fire.", reward = 25 },
	{ id = "glassfloor", name = "Glass Floor", hint = "Stand over a 200-stud drop.", reward = 25 },
	{ id = "pool", name = "Lap Pool", hint = "Swim the length of the spine.", reward = 25 },
	{ id = "mochi", name = "Mochi", hint = "The cat of the house. Usually somewhere warm.", reward = 20 },
	{ id = "firstmeal", name = "First Meal", hint = "Cook something in the galley.", reward = 20 },
	{ id = "firstfish", name = "First Catch", hint = "Fish from the end of the dock.", reward = 20 },
	{ id = "roof", name = "On Top of the Spine", hint = "There is a hatch in the station ceiling.", reward = 40 },
	{ id = "blizzard", name = "Storm Watcher", hint = "Sit by the glass during a blizzard.", reward = 30 },
	{ id = "dawn", name = "Pink Dawn", hint = "Be awake when the sun comes up.", reward = 30 },
	{ id = "whale", name = "Whale Sighting", hint = "Keep watching the sea.", reward = 50 },
}

Config.UPGRADES = {
	{ id = "HeatedPool", name = "Heated Pool", price = 120, desc = "Swimming in the lap pool warms you up instead of just being fun." },
	{ id = "RecordPlayer", name = "Record Player", price = 80, desc = "Puts a turntable in the gallery. Plays music for you (set a song ID in Config)." },
	{ id = "Telescope", name = "Roof Telescope", price = 100, desc = "A brass telescope on top of the spine for looking far out to sea." },
	{ id = "Aurora", name = "Aurora Australis", price = 150, desc = "The southern lights dance over the arch on clear nights (for you)." },
	{ id = "GoldenRod", name = "Golden Fishing Rod", price = 200, desc = "Bites come faster and rare fish are three times as likely." },
}

-- Fishing
Config.FISH_BITE_MIN = 3
Config.FISH_BITE_MAX = 8
Config.FISH_REEL_WINDOW = 1.9 -- seconds you have to reel once a fish bites
Config.FISH = {
	{ name = "Antarctic Silverfish", value = 6, weight = 40 },
	{ name = "Krill Bucket", value = 4, weight = 30 },
	{ name = "Icefish", value = 12, weight = 18 },
	{ name = "Antarctic Toothfish", value = 30, weight = 9 },
	{ name = "Golden Icefish", value = 120, weight = 1.5 },
}

-- Whale breaching event
Config.WHALE_MIN_INTERVAL = 180
Config.WHALE_MAX_INTERVAL = 360

-- Optional sounds. Paste Roblox audio asset IDs (numbers) from the Creator
-- Store, e.g. Config.SOUNDS.Fire = "rbxassetid://123456". Empty = silent.
Config.SOUNDS = {
	Wind = "",
	Fire = "",
	Music = "",
	Kettle = "",
}

Config.BLENDER_ASSET_FOLDER = "BlenderAssets"

return Config
