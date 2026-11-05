--!nonstrict
-- Saves credits, discoveries and upgrades between visits.
-- DataStores only work in a published place with "Enable Studio Access to API
-- Services" turned on; otherwise the game still runs and simply doesn't save.

local DataStoreService = game:GetService("DataStoreService")

local Data = {}

local store = nil
local ok = pcall(function()
	store = DataStoreService:GetDataStore("RibcageMansion_v1")
end)
if not ok then
	store = nil
end

export type Profile = {
	credits: number,
	discoveries: { [string]: boolean },
	upgrades: { [string]: boolean },
	fishCaught: number,
	pets: { [string]: boolean },
	activePet: string,
	treats: number,
	home: string,
	notes: { [string]: boolean },
	flags: { [string]: boolean },
	title: string,
}

function Data.default(): Profile
	return { credits = 50, discoveries = {}, upgrades = {}, fishCaught = 0, pets = {}, activePet = "", treats = 2, home = "", notes = {}, flags = {}, title = "" }
end

function Data.load(userId: number): Profile
	local profile = Data.default()
	if not store then
		return profile
	end
	local success, saved = pcall(function()
		return store:GetAsync("u" .. userId)
	end)
	if success and type(saved) == "table" then
		profile.credits = tonumber(saved.credits) or profile.credits
		profile.fishCaught = tonumber(saved.fishCaught) or 0
		for _, id in saved.discoveries or {} do
			profile.discoveries[id] = true
		end
		for _, id in saved.upgrades or {} do
			profile.upgrades[id] = true
		end
		for _, id in saved.pets or {} do
			profile.pets[id] = true
		end
		profile.activePet = type(saved.activePet) == "string" and saved.activePet or ""
		profile.treats = tonumber(saved.treats) or profile.treats
		profile.home = type(saved.home) == "string" and saved.home or ""
		profile.title = type(saved.title) == "string" and saved.title or ""
		for _, id in saved.notes or {} do
			profile.notes[id] = true
		end
		for _, id in saved.flags or {} do
			profile.flags[id] = true
		end
	end
	return profile
end

function Data.save(userId: number, profile: Profile)
	if not store then
		return
	end
	local discoveries, upgrades, pets, notes, flags = {}, {}, {}, {}, {}
	for id in profile.notes do
		table.insert(notes, id)
	end
	for id in profile.flags do
		table.insert(flags, id)
	end
	for id in profile.pets do
		table.insert(pets, id)
	end
	for id in profile.discoveries do
		table.insert(discoveries, id)
	end
	for id in profile.upgrades do
		table.insert(upgrades, id)
	end
	pcall(function()
		store:SetAsync("u" .. userId, {
			credits = profile.credits,
			fishCaught = profile.fishCaught,
			discoveries = discoveries,
			upgrades = upgrades,
			pets = pets,
			activePet = profile.activePet,
			treats = profile.treats,
			home = profile.home,
			title = profile.title,
			notes = notes,
			flags = flags,
		})
	end)
end

return Data
