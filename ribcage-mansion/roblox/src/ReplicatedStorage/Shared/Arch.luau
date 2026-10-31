--!strict
-- Arch geometry shared by the server builder and the client.
--
-- The mansion is a concrete "spine" shaped like half an ellipse standing in the
-- sea (X runs leg to leg, Y is up, the arch lies in the Z = 0 plane).
-- Ribs hang off the -Z side and curve outward and down toward the water.
-- The living space is a hollow gallery inside the top (crown) of the spine,
-- with floor-to-ceiling glass on the rib (-Z) side.

local Arch = {}

Arch.A = 280 -- half the span, leg to leg (studs)
Arch.B = 220 -- height of the spine's centre line at the crown
Arch.W = 36 -- width of the spine across Z
Arch.T = 28 -- thickness of the spine (radial), i.e. the gallery's height
Arch.SEGMENTS = 160 -- concrete blocks used to approximate the curve
Arch.HABITAT_HALF = 112 -- the hollow gallery spans -112 < x < 112

Arch.RIB_COUNT = 24
Arch.RIB_T_MIN = 0.1 * math.pi
Arch.RIB_T_MAX = 0.9 * math.pi

-- Interior cross-section (Z): glass on the -Z side, a concrete back wall on +Z.
Arch.GLASS_Z = -Arch.W / 2 + 0.6 -- inner face of the glass (-17.4)
Arch.BACK_Z = Arch.W / 2 - 2 -- inner face of the back wall (16)
Arch.SLAB = 2 -- floor / roof slab thickness

export type Room = {
	id: string,
	name: string,
	x0: number,
	x1: number,
	glassFloor: boolean?,
}

-- Rooms run along the gallery from the west end (funicular) to the east end.
Arch.ROOMS = {
	{ id = "station", name = "Funicular Station", x0 = -112, x1 = -86 },
	{ id = "lounge", name = "Glass-Floor Lounge", x0 = -86, x1 = -58, glassFloor = true },
	{ id = "pool", name = "Lap Pool", x0 = -58, x1 = -14 },
	{ id = "gallery", name = "Crown Gallery", x0 = -14, x1 = 38 },
	{ id = "galley", name = "Galley Kitchen", x0 = 38, x1 = 62 },
	{ id = "bedroom", name = "Bedroom", x0 = 62, x1 = 88 },
	{ id = "bath", name = "Rain Bath", x0 = 88, x1 = 112 },
} :: { Room }

-- Point on the spine's centre line for parameter t in [0, pi].
-- t = 0 is the east leg (+X), t = pi/2 the crown, t = pi the west leg (-X).
function Arch.point(t: number): Vector3
	return Vector3.new(Arch.A * math.cos(t), Arch.B * math.sin(t), 0)
end

-- Outward unit normal of the centre line at t (points away from the arch's inside).
function Arch.normal(t: number): Vector3
	local n = Vector3.new(Arch.B * math.cos(t), Arch.A * math.sin(t), 0)
	return n.Unit
end

-- Height of the centre line above x.
function Arch.yAt(x: number): number
	local r = math.clamp(x / Arch.A, -0.999, 0.999)
	return Arch.B * math.sqrt(1 - r * r)
end

-- dy/dx of the centre line.
function Arch.slope(x: number): number
	local y = Arch.yAt(x)
	return -(Arch.B * Arch.B * x) / (Arch.A * Arch.A * y)
end

-- Vertical distance from the centre line to the inner face of a slab.
local function innerOffset(x: number): number
	local s = Arch.slope(x)
	return (Arch.T / 2 - Arch.SLAB) * math.sqrt(1 + s * s)
end

-- Top of the curved floor slab above x.
function Arch.slabTop(x: number): number
	return Arch.yAt(x) - innerOffset(x)
end

-- Underside of the curved roof slab above x.
function Arch.ceilingAt(x: number): number
	return Arch.yAt(x) + innerOffset(x)
end

-- Flat floor height for a room: the highest point of the curved slab under it.
function Arch.roomFloor(room: Room): number
	local nearX: number
	if room.x0 <= 0 and room.x1 >= 0 then
		nearX = 0
	elseif math.abs(room.x0) < math.abs(room.x1) then
		nearX = room.x0
	else
		nearX = room.x1
	end
	return Arch.slabTop(nearX) + 0.2
end

function Arch.roomById(id: string): Room?
	for _, room in Arch.ROOMS do
		if room.id == id then
			return room
		end
	end
	return nil
end

function Arch.roomAt(pos: Vector3): Room?
	if math.abs(pos.Z) > Arch.W / 2 then
		return nil
	end
	for _, room in Arch.ROOMS do
		if pos.X >= room.x0 and pos.X < room.x1 then
			local floorY = Arch.roomFloor(room)
			if pos.Y > floorY - 6 and pos.Y < Arch.ceilingAt(pos.X) + 1 then
				return room
			end
		end
	end
	return nil
end

-- Pool water box (aligned to the 4-stud terrain voxel grid so the water stays
-- exactly inside the basin).
function Arch.poolWater(): (Vector3, Vector3)
	local room = Arch.roomById("pool") :: Room
	local floorY = Arch.roomFloor(room)
	local y0 = 4 * math.floor((floorY - 3) / 4)
	local minV = Vector3.new(-52, y0, -16)
	local maxV = Vector3.new(-20, y0 + 4, -4)
	return minV, maxV
end

return Arch
