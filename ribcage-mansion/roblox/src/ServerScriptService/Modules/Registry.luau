--!nonstrict
-- One place where every home registers the things players can use, so the
-- gameplay code works the same in all four homes.

local Registry = {}

export type Kitchen = {
	home: string,
	stove: BasePart,
	oven: BasePart,
	coffee: BasePart,
	kettle: BasePart,
	fridge: BasePart,
	pantry: BasePart,
	sink: BasePart, -- where dishes are washed
	dishSpot: Vector3, -- where dirty plates pile up
	steam: ParticleEmitter,
	dirty: number,
	dishParts: { BasePart },
}

export type FireSpot = {
	home: string,
	core: BasePart,
	fire: any,
	light: PointLight,
	embers: ParticleEmitter,
	basket: BasePart?,
	fuel: number,
	baseSize: number,
}

export type Interior = {
	home: string,
	name: string,
	-- Either an axis-aligned box or a custom test.
	min: Vector3?,
	max: Vector3?,
	test: ((Vector3) -> boolean)?,
}

export type Home = {
	id: string,
	name: string,
	center: Vector3,
	spawn: CFrame, -- where residents wake up
	dock: CFrame, -- where the ferry and boat arrive
	deed: BasePart?,
	deedLabel: TextLabel?,
}

Registry.homes = {} :: { [string]: Home }
Registry.homeOrder = {} :: { string }
Registry.kitchens = {} :: { Kitchen }
Registry.fires = {} :: { FireSpot }
Registry.beds = {} :: { { home: string, mattress: BasePart, duvet: BasePart, tidy: CFrame, messy: CFrame, messyNow: boolean } }
Registry.showers = {} :: { { home: string, head: BasePart, rain: ParticleEmitter } }
Registry.sinks = {} :: { BasePart }
Registry.plants = {} :: { { pot: BasePart, leaves: Instance, watered: boolean? } }
Registry.bookshelves = {} :: { BasePart }
Registry.lamps = {} :: { { part: BasePart, light: Light } }
Registry.doors = {} :: { { part: BasePart, closed: CFrame, open: CFrame, isOpen: boolean? } }
Registry.interiors = {} :: { Interior }
Registry.docks = {} :: { { home: string, bell: BasePart, boatSpawn: CFrame } }
Registry.notes = {} :: { { id: string, part: BasePart } }
Registry.misc = {} :: { [string]: any }

function Registry.addHome(home: Home)
	Registry.homes[home.id] = home
	table.insert(Registry.homeOrder, home.id)
end

function Registry.addInterior(home: string, name: string, minV: Vector3, maxV: Vector3)
	table.insert(Registry.interiors, { home = home, name = name, min = minV:Min(maxV), max = minV:Max(maxV) })
end

function Registry.addInteriorTest(home: string, name: string, test: (Vector3) -> boolean)
	table.insert(Registry.interiors, { home = home, name = name, test = test })
end

-- Which home and room a position is inside, if any.
function Registry.locate(pos: Vector3): Interior?
	for _, i in Registry.interiors do
		if i.test then
			if i.test(pos) then
				return i
			end
		elseif pos.X >= i.min.X and pos.X <= i.max.X and pos.Y >= i.min.Y and pos.Y <= i.max.Y and pos.Z >= i.min.Z and pos.Z <= i.max.Z then
			return i
		end
	end
	return nil
end

function Registry.nearestFire(pos: Vector3): (FireSpot?, number)
	local best, bestDist = nil, math.huge
	for _, f in Registry.fires do
		local d = (f.core.Position - pos).Magnitude
		if d < bestDist then
			best, bestDist = f, d
		end
	end
	return best, bestDist
end

function Registry.nearestKitchen(pos: Vector3): Kitchen?
	local best, bestDist = nil, math.huge
	for _, k in Registry.kitchens do
		local d = (k.stove.Position - pos).Magnitude
		if d < bestDist then
			best, bestDist = k, d
		end
	end
	return best
end

function Registry.reset()
	table.clear(Registry.homes)
	table.clear(Registry.homeOrder)
	table.clear(Registry.kitchens)
	table.clear(Registry.fires)
	table.clear(Registry.beds)
	table.clear(Registry.showers)
	table.clear(Registry.sinks)
	table.clear(Registry.plants)
	table.clear(Registry.bookshelves)
	table.clear(Registry.lamps)
	table.clear(Registry.doors)
	table.clear(Registry.interiors)
	table.clear(Registry.docks)
	table.clear(Registry.notes)
	table.clear(Registry.misc)
end

return Registry
