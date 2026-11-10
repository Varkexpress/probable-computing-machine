"""More books: Christmas Cuties, Space Pals (coloring) and Big Activity Book (mazes + word search).
python3 more.py"""
import math, random, string
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.pagesizes import letter
import build as cb
from build import Pen, star, heart, cloud, sparkle, kawaii_face, animal, caption, W, H, LW

def snowflake(pen, x, y, r, lw=3):
    for k in range(6):
        a = math.radians(k * 60); ex, ey = x + r * math.cos(a), y + r * math.sin(a); pen.line([(x, y), (ex, ey)], lw)
        for t in (.55,):
            mx, my = x + r * t * math.cos(a), y + r * t * math.sin(a)
            for d in (-1, 1):
                b = a + d * math.radians(40); pen.line([(mx, my), (mx + r * .3 * math.cos(b), my + r * .3 * math.sin(b))], lw)

def scatter2(pen, rnd, avoid, fn, count=10):
    placed = []
    for _ in range(500):
        if len(placed) >= count: break
        x, y = rnd.uniform(55, W - 55), rnd.uniform(110, H - 60)
        if avoid[0] < x < avoid[2] and avoid[1] < y < avoid[3]: continue
        if any(math.hypot(x - a, y - b) < 75 for a, b in placed): continue
        placed.append((x, y)); fn(pen, rnd, x, y)

def xmas_bg(pen, rnd, x, y):
    k = rnd.random(); r = rnd.uniform(16, 26)
    if k < .5: snowflake(pen, x, y, r)
    elif k < .75: star(pen, x, y, r * .9, rot=rnd.uniform(0, 72), lw=3)
    else: heart(pen, x, y, r * .7, "bg", 3)

# ---------------------------------------------------------------- Christmas pieces
def santa_hat(pen, x, y, s, tilt=1):
    S = lambda v: v * s
    pen.shape(lambda p: (p.moveTo(x - S(120), y), p.curveTo(x - S(90), y + S(120), x + S(10*tilt), y + S(190), x + S(150*tilt), y + S(120)),
                         p.curveTo(x + S(60*tilt), y + S(110), x + S(110), y + S(40), x + S(120), y)), "acc")
    pen.blob([(x - S(135), y + S(5)), (x - S(130), y + S(45)), (x, y + S(60)), (x + S(130), y + S(45)), (x + S(135), y + S(5)), (x, y - S(15))], "bg")
    pen.ellipse(x + S(150*tilt), y + S(120), S(30), S(30), "bg")

def snowman(pen, x, y, s=1):
    S = lambda v: v * s
    pen.ellipse(x, y - S(150), S(150), S(130)); pen.ellipse(x, y + S(60), S(110), S(100))
    for yy in (-100, -160, -220): pen.ellipse(x, y + S(yy), S(10), S(10), "acc", 3)
    pen.shape(lambda p: (p.moveTo(x - S(105), y - S(20)), p.curveTo(x - S(40), y - S(50), x + S(40), y - S(50), x + S(105), y - S(20)),
                         p.lineTo(x + S(100), y + S(10)), p.curveTo(x + S(40), y - S(15), x - S(40), y - S(15), x - S(100), y + S(10))), "acc")
    pen.shape(lambda p: (p.moveTo(x + S(50), y - S(30)), p.lineTo(x + S(80), y - S(130)), p.lineTo(x + S(115), y - S(120)), p.lineTo(x + S(85), y - S(25))), "acc")
    pen.shape(lambda p: (p.moveTo(x - S(70), y + S(140)), p.lineTo(x - S(60), y + S(260)), p.lineTo(x + S(60), y + S(260)), p.lineTo(x + S(70), y + S(140))), "hat")
    pen.blob([(x - S(115), y + S(140)), (x - S(110), y + S(165)), (x, y + S(172)), (x + S(110), y + S(165)), (x + S(115), y + S(140)), (x, y + S(130))], "hat")
    kawaii_face(pen, x, y + S(60), s * .85)
    pen.shape(lambda p: (p.moveTo(x, y + S(45)), p.lineTo(x + S(60), y + S(35)), p.lineTo(x, y + S(30))), "acc", 3)
    for sx in (-1, 1): pen.line([(x + sx*S(140), y - S(110)), (x + sx*S(230), y - S(40)), (x + sx*S(250), y - S(70))], 5)

def gingerbread(pen, x, y, s=1):
    S = lambda v: v * s
    pts = [(0, 230), (-95, 175), (-80, 90), (-190, 60), (-180, -10), (-80, 10), (-130, -200), (-50, -230), (0, -120), (50, -230), (130, -200),
           (80, 10), (180, -10), (190, 60), (80, 90), (95, 175)]
    pen.blob([(x + S(a), y + S(b)) for a, b in pts], "dough")
    for sx in (-1, 1):
        for t in range(3): pen.line([(x + sx*S(130 + t*14), y + S(70)), (x + sx*S(137 + t*14), y + S(25))], 3)
        pen.arc(x + sx*S(85), y - S(185), S(30), 30 if sx > 0 else 110, 70 if sx > 0 else 150, 3)
    for yy in (40, -20, -80): pen.ellipse(x, y + S(yy), S(14), S(14), "acc", 3)
    kawaii_face(pen, x, y + S(150), s * .8)
    heart(pen, x + S(30), y + S(85), S(10), "acc", 3); heart(pen, x - S(30), y + S(85), S(10), "acc", 3)

def tree(pen, x, y, s=1):
    S = lambda v: v * s
    pen.shape(lambda p: (p.moveTo(x - S(35), y - S(230)), p.lineTo(x - S(35), y - S(170)), p.lineTo(x + S(35), y - S(170)), p.lineTo(x + S(35), y - S(230))), "dough")
    for i, (w, yb, h) in enumerate([(220, -180, 170), (175, -70, 150), (125, 40, 140)]):
        pen.shape(lambda p, w=w, yb=yb, h=h: (p.moveTo(x - S(w), y + S(yb)), p.curveTo(x - S(w*.5), y + S(yb + h*.4), x - S(25), y + S(yb + h*.9), x, y + S(yb + h + 40)),
                                               p.curveTo(x + S(25), y + S(yb + h*.9), x + S(w*.5), y + S(yb + h*.4), x + S(w), y + S(yb)),
                                               p.curveTo(x + S(w*.4), y + S(yb - 25), x - S(w*.4), y + S(yb - 25), x - S(w), y + S(yb))), "leaf")
    star(pen, x, y + S(230), S(45))
    for ox, oy in [(-120, -150), (90, -140), (-20, -120), (-70, -30), (60, -20), (0, 80), (-40, 130), (45, 140), (150, -170)]:
        pen.ellipse(x + S(ox), y + S(oy), S(15), S(15), "acc", 3)
    kawaii_face(pen, x, y - S(60), s * .7)
    for gx, gw, gh in [(-170, 80, 70), (150, 90, 60)]: gift(pen, x + S(gx), y - S(235) + S(gh)/2, S(gw), S(gh), face=False)

def gift(pen, x, y, w, h, face=True, s=1):
    pen.shape(lambda p: (p.moveTo(x - w, y - h), p.lineTo(x - w, y + h), p.lineTo(x + w, y + h), p.lineTo(x + w, y - h)), "acc")
    pen.shape(lambda p: (p.moveTo(x - w*1.1, y + h), p.lineTo(x - w*1.1, y + h*1.35), p.lineTo(x + w*1.1, y + h*1.35), p.lineTo(x + w*1.1, y + h)), "acc")
    pen.shape(lambda p: (p.moveTo(x - w*.15, y - h), p.lineTo(x - w*.15, y + h*1.35), p.lineTo(x + w*.15, y + h*1.35), p.lineTo(x + w*.15, y - h)), "bg", 3)
    for sx in (-1, 1): pen.blob([(x, y + h*1.35), (x + sx*w*.6, y + h*1.9), (x + sx*w*.7, y + h*1.45)], "bg", 3)
    if face: kawaii_face(pen, x - w*.55, y, w / 210)

def ornament(pen, x, y, s=1):
    S = lambda v: v * s
    pen.ellipse(x, y, S(170), S(170), "acc")
    pen.shape(lambda p: (p.moveTo(x - S(45), y + S(160)), p.lineTo(x - S(45), y + S(205)), p.lineTo(x + S(45), y + S(205)), p.lineTo(x + S(45), y + S(160))), "metal")
    pen.arc(x, y + S(225), S(22), 0, 360, 4)
    for yy in (90, -90):
        w = math.sqrt(170**2 - yy**2)
        pen.line([(x - S(w), y + S(yy)), (x + S(w), y + S(yy))], 3)
    for k in range(-3, 4): star(pen, x + S(k*45), y + S(118 if k % 2 else 125), S(12), "bg", lw=2.5)
    for k in range(-3, 4): heart(pen, x + S(k*45), y - S(125), S(9), "bg", 2.5)
    kawaii_face(pen, x, y + S(5), s)

def cocoa(pen, x, y, s=1):
    S = lambda v: v * s
    pen.shape(lambda p: (p.moveTo(x + S(120), y + S(60)), p.curveTo(x + S(230), y + S(70), x + S(230), y - S(90), x + S(110), y - S(80)),
                         p.lineTo(x + S(110), y - S(40)), p.curveTo(x + S(180), y - S(40), x + S(180), y + S(30), x + S(120), y + S(25))), "acc")
    pen.shape(lambda p: (p.moveTo(x - S(140), y + S(110)), p.lineTo(x - S(120), y - S(160)), p.curveTo(x - S(60), y - S(190), x + S(60), y - S(190), x + S(120), y - S(160)), p.lineTo(x + S(140), y + S(110))), "acc")
    pen.ellipse(x, y + S(110), S(140), S(35), "dough")
    for mx in (-70, -10, 50): pen.shape(lambda p, mx=mx: (p.moveTo(x + S(mx), y + S(110)), p.lineTo(x + S(mx), y + S(150)), p.lineTo(x + S(mx + 40), y + S(160)), p.lineTo(x + S(mx + 45), y + S(118))), "bg", 3)
    for sx in (-50, 10, 70): pen.c.setLineWidth(3); p = pen.c.beginPath(); p.moveTo(x + S(sx), y + S(185)); p.curveTo(x + S(sx - 25), y + S(215), x + S(sx + 25), y + S(235), x + S(sx), y + S(270)); pen.c.drawPath(p, stroke=1, fill=0)
    kawaii_face(pen, x, y - S(40), s * .9)
    for k in range(-2, 3): snowflake(pen, x + S(k*48), y - S(125), S(14), 2.5)

def stocking(pen, x, y, s=1):
    S = lambda v: v * s
    pen.blob([(x - S(90), y + S(160)), (x - S(95), y - S(60)), (x - S(170), y - S(110)), (x - S(165), y - S(200)), (x - S(60), y - S(210)),
              (x + S(80), y - S(120)), (x + S(95), y + S(160))], "acc")
    pen.shape(lambda p: (p.moveTo(x - S(115), y + S(150)), p.lineTo(x - S(115), y + S(240)), p.lineTo(x + S(120), y + S(240)), p.lineTo(x + S(120), y + S(150))), "bg")
    star(pen, x - S(10), y + S(20), S(40), "bg", lw=3.5); kawaii_face(pen, x - S(25), y - S(120), s * .7)
    pen.shape(lambda p: (p.moveTo(x - S(20), y + S(240)), p.lineTo(x + S(30), y + S(330)), p.lineTo(x + S(60), y + S(315)), p.lineTo(x + S(15), y + S(240))), "acc", 3)

def reindeer(pen, x, y, s=1):
    S = lambda v: v * s
    for sx in (-1, 1):
        pen.line([(x + sx*S(70), y + S(120)), (x + sx*S(110), y + S(250)), (x + sx*S(170), y + S(300))], 9)
        pen.line([(x + sx*S(100), y + S(215)), (x + sx*S(170), y + S(220))], 9); pen.line([(x + sx*S(113), y + S(258)), (x + sx*S(100), y + S(320))], 9)
    animal(pen, "bear", x, y, s); pen.ellipse(x, y - S(25), S(26), S(22), "acc", 4)

def santa_animal(kind):
    def f(pen, x, y, s):
        animal(pen, kind, x, y, s); santa_hat(pen, x - s*10, y + s*110, s * .95)
    return f

XMAS = [("Snowy the Snowman", lambda p, x, y: snowman(p, x, y, 1.0)), ("Ginger Cookie", lambda p, x, y: gingerbread(p, x, y, 1.15)),
        ("Twinkle Tree", lambda p, x, y: tree(p, x, y + 10, 1.05)), ("Santa Kitty", lambda p, x, y: santa_animal("cat")(p, x, y - 30, 1.15)),
        ("Jolly Ornament", lambda p, x, y: ornament(p, x, y, 1.15)), ("Cozy Cocoa", lambda p, x, y: cocoa(p, x, y - 20, 1.2)),
        ("Rudy the Reindeer", lambda p, x, y: reindeer(p, x, y - 40, 1.1)), ("Surprise Gift", lambda p, x, y: gift(p, x, y - 40, 150, 120)),
        ("Lucky Stocking", lambda p, x, y: stocking(p, x + 20, y - 20, 1.15)), ("Santa Panda", lambda p, x, y: santa_animal("panda")(p, x, y - 30, 1.15)),
        ("Penguin Pal", lambda p, x, y: (cb.animal(p, "penguin", x, y, 1.0), santa_hat(p, x - 5, y + 115, .85))),
        ("Santa Bunny", lambda p, x, y: santa_animal("bunny")(p, x, y - 60, 1.05)), ("Holiday Fox", lambda p, x, y: santa_animal("fox")(p, x, y - 30, 1.1)),
        ("Merry Mouse", lambda p, x, y: santa_animal("mouse")(p, x, y - 40, 1.0)), ("Santa Pig", lambda p, x, y: santa_animal("pig")(p, x, y - 30, 1.15))]

def xmas_page(i):
    name, fn = XMAS[i % len(XMAS)]
    def d(c):
        pen = Pen(c); fn(pen, W/2, H/2 + 20); scatter2(pen, random.Random(i * 13 + 2), (W/2 - 250, 110, W/2 + 250, H - 110), xmas_bg, 11)
        caption(c, name + (" II" if i >= len(XMAS) else ""))
    return d

# ---------------------------------------------------------------- Space pieces
def rocket(pen, x, y, s=1):
    S = lambda v: v * s
    for sx in (-1, 1): pen.shape(lambda p, sx=sx: (p.moveTo(x + sx*S(70), y - S(60)), p.lineTo(x + sx*S(150), y - S(190)), p.lineTo(x + sx*S(70), y - S(170))), "acc")
    pen.blob([(x, y + S(260)), (x - S(80), y + S(120)), (x - S(85), y - S(160)), (x, y - S(180)), (x + S(85), y - S(160)), (x + S(80), y + S(120))], "bg")
    pen.shape(lambda p: (p.moveTo(x - S(50), y + S(190)), p.curveTo(x - S(20), y + S(250), x + S(20), y + S(250), x + S(50), y + S(190)), p.lineTo(x - S(50), y + S(190))), "acc")
    pen.ellipse(x, y + S(70), S(55), S(55), "acc2"); pen.ellipse(x, y + S(70), S(40), S(40), "bg", 3); kawaii_face(pen, x, y + S(70), s * .45)
    pen.blob([(x - S(50), y - S(180)), (x - S(65), y - S(260)), (x, y - S(330)), (x + S(65), y - S(260)), (x + S(50), y - S(180))], "acc")
    pen.blob([(x - S(25), y - S(185)), (x - S(30), y - S(240)), (x, y - S(280)), (x + S(30), y - S(240)), (x + S(25), y - S(185))], "acc2", 3)

def planet(pen, x, y, r, ring=False, face=True):
    if ring: pen.ellipse(x, y, r * 1.8, r * .45, "acc2")
    pen.ellipse(x, y, r, r, "acc")
    if ring:
        pen.c.saveState(); p = pen.c.beginPath(); p.rect(x - r*2, y, r*4, r*2); pen.c.clipPath(p, stroke=0, fill=0)
        pen.ellipse(x, y, r * 1.8, r * .45, "acc2", 0); pen.ellipse(x, y, r, r, "acc"); pen.c.restoreState()
        pen.c.setLineWidth(LW); pen.c.arc(x - r*1.8, y - r*.45, x + r*1.8, y + r*.45, 180, 180)
    for k in range(3): a = k * 2.1; pen.ellipse(x + r*.5*math.cos(a), y + r*.55*math.sin(a) + r*.1, r*.13, r*.1, "acc2", 3)
    if face: kawaii_face(pen, x, y - r*.15, r / 170)

def alien(pen, x, y, s=1):
    S = lambda v: v * s
    for sx in (-1, 1): pen.line([(x + sx*S(50), y + S(120)), (x + sx*S(80), y + S(210))], 5); pen.ellipse(x + sx*S(82), y + S(215), S(18), S(18), "acc")
    pen.blob([(x - S(150), y - S(160)), (x - S(165), y + S(10)), (x - S(100), y + S(140)), (x, y + S(165)), (x + S(100), y + S(140)), (x + S(165), y + S(10)), (x + S(150), y - S(160)),
              (x + S(80), y - S(130)), (x, y - S(175)), (x - S(80), y - S(130))], "acc2")
    pen.ellipse(x, y + S(40), S(55), S(60), "bg"); pen.c.setFillColor(black); pen.c.circle(x, y + S(30), S(28), stroke=0, fill=1)
    pen.c.setFillColor(white); pen.c.circle(x - S(10), y + S(45), S(10), stroke=0, fill=1); pen.arc(x, y - S(50), S(30), 200, 340, 4)
    for sx in (-1, 1): pen.ellipse(x + sx*S(95), y - S(50), S(16), S(10), "blush", 2.5)

def astronaut(pen, x, y, s=1):
    S = lambda v: v * s
    pen.shape(lambda p: (p.moveTo(x - S(110), y - S(40)), p.lineTo(x - S(120), y - S(220)), p.lineTo(x + S(120), y - S(220)), p.lineTo(x + S(110), y - S(40))), "bg")
    for sx in (-1, 1): pen.ellipse(x + sx*S(60), y - S(235), S(55), S(28), "acc"); pen.blob([(x + sx*S(110), y - S(50)), (x + sx*S(200), y - S(90)), (x + sx*S(210), y - S(150)), (x + sx*S(170), y - S(150)), (x + sx*S(105), y - S(120))], "bg")
    pen.shape(lambda p: (p.moveTo(x - S(50), y - S(80)), p.lineTo(x - S(50), y - S(150)), p.lineTo(x + S(50), y - S(150)), p.lineTo(x + S(50), y - S(80))), "acc")
    for k in range(3): pen.ellipse(x - S(25) + k*S(25), y - S(115), S(8), S(8), "acc2", 2.5)
    pen.ellipse(x, y + S(110), S(170), S(165), "bg"); pen.ellipse(x, y + S(105), S(125), S(110), "acc2"); pen.ellipse(x, y + S(105), S(100), S(88), "skin")
    kawaii_face(pen, x, y + S(95), s * .85); pen.arc(x - S(60), y + S(160), S(40), 100, 160, 4)
    star(pen, x + S(130), y + S(230), S(28))

def ufo(pen, x, y, s=1):
    S = lambda v: v * s
    pen.shape(lambda p: (p.moveTo(x - S(70), y - S(60)), p.lineTo(x - S(170), y - S(300)), p.lineTo(x + S(170), y - S(300)), p.lineTo(x + S(70), y - S(60))), "acc2", 3)
    pen.ellipse(x, y + S(60), S(100), S(100), "bg"); alien(pen, x, y + S(75), s * .45)
    pen.ellipse(x, y - S(10), S(230), S(70), "acc")
    for k in range(-2, 3): pen.ellipse(x + S(k*80), y - S(20), S(18), S(14), "bg", 3)

def spacebg(pen, rnd, x, y):
    k = rnd.random(); r = rnd.uniform(14, 24)
    if k < .45: star(pen, x, y, r, rot=rnd.uniform(0, 72), lw=3)
    elif k < .7: sparkle(pen, x, y, r)
    elif k < .85: pen.ellipse(x, y, r * .8, r * .8, "bg", 3); pen.ellipse(x + r*.2, y + r*.2, r*.2, r*.2, "bg", 2)
    else: planet(pen, x, y, r * 1.2, ring=True, face=False)

SPACE = [("Zoom Rocket", lambda p, x, y: rocket(p, x, y + 30, 1.1)), ("Happy Planet", lambda p, x, y: planet(p, x, y, 190, True)),
         ("Blip the Alien", lambda p, x, y: alien(p, x, y, 1.25)), ("Astro Kid", lambda p, x, y: astronaut(p, x, y + 20, 1.15)),
         ("Friendly UFO", lambda p, x, y: ufo(p, x, y + 80, 1.05)), ("Moon Buddy", lambda p, x, y: (planet(p, x, y, 200), [p.ellipse(x + a, y + b, r, r, "acc2", 3) for a, b, r in [(-110, 100, 28), (110, -90, 22), (120, 110, 18)]])),
         ("Rocket & Friend", lambda p, x, y: (planet(p, x - 120, y - 150, 110), rocket(p, x + 110, y + 60, .75))),
         ("Space Cat", lambda p, x, y: (cb.animal(p, "cat", x, y - 20, 1.05), p.ellipse(x, y - 15, 230, 215, "bg", 0) if False else None, star(p, x + 180, y + 200, 30))),
         ("Alien Twins", lambda p, x, y: (alien(p, x - 130, y, .75), alien(p, x + 130, y - 20, .8))),
         ("Planet Parade", lambda p, x, y: (planet(p, x - 140, y + 140, 90, True), planet(p, x + 120, y + 60, 120), planet(p, x - 60, y - 170, 100, True)))]

def space_page(i):
    name, fn = SPACE[i % len(SPACE)]
    def d(c):
        pen = Pen(c); fn(pen, W/2, H/2 + 20); scatter2(pen, random.Random(i * 17 + 3), (W/2 - 260, 110, W/2 + 260, H - 100), spacebg, 12)
        caption(c, name + ("" if i < len(SPACE) else f" #{i // len(SPACE) + 1}"))
    return d

# ---------------------------------------------------------------- activity book
def make_maze(cols, rows, seed):
    r = random.Random(seed); seen = {(0, 0)}; walls = set(); stack = [(0, 0)]
    for x in range(cols):
        for y in range(rows):
            if x < cols - 1: walls.add(((x, y), (x + 1, y)))
            if y < rows - 1: walls.add(((x, y), (x, y + 1)))
    parent = {(0, 0): None}
    while stack:
        cx, cy = stack[-1]; nb = [(cx + dx, cy + dy) for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)) if 0 <= cx + dx < cols and 0 <= cy + dy < rows and (cx + dx, cy + dy) not in seen]
        if not nb: stack.pop(); continue
        n = r.choice(nb); seen.add(n); parent[n] = (cx, cy); walls.discard(tuple(sorted([(cx, cy), n]))); stack.append(n)
    path = []; cur = (cols - 1, rows - 1)
    while cur: path.append(cur); cur = parent[cur]
    return walls, path[::-1]

MAZE_STORIES = [("kitty", "the fish"), ("bunny", "the carrot"), ("bear", "the honey"), ("rocket", "the moon"), ("puppy", "the bone"),
                ("penguin", "the igloo"), ("chick", "mama hen"), ("mouse", "the cheese"), ("frog", "the lily pad"), ("panda", "the bamboo")]
def maze_page(i, solution=False):
    cols = 6 + i // 2; rows = int(cols * 1.25)
    walls, path = make_maze(cols, rows, 1000 + i)
    who, goal = MAZE_STORIES[i % len(MAZE_STORIES)]
    def d(c):
        pen = Pen(c); size = min((W - 140) / cols, (H - 260) / rows); ox = (W - size * cols) / 2; oy = 120
        Y = lambda y: oy + (rows - y) * size
        c.setLineWidth(max(3, 9 - cols * .3)); c.setStrokeColor(black); c.setLineCap(1)
        c.line(ox + size, Y(0), ox + size * cols, Y(0)); c.line(ox, Y(rows), ox + size * (cols - 1), Y(rows))
        c.line(ox, Y(0), ox, Y(rows)); c.line(ox + size * cols, Y(0), ox + size * cols, Y(rows))
        for (a, b) in walls:
            if a[0] != b[0]: x = ox + b[0] * size; c.line(x, Y(a[1]), x, Y(a[1] + 1))
            else: y = Y(b[1]); c.line(ox + a[0] * size, y, ox + (a[0] + 1) * size, y)
        if solution:
            c.setStrokeColor(HexColor("#FF5DA2")); c.setLineWidth(max(3, size * .25)); p = c.beginPath()
            for k, (x, y) in enumerate(path):
                px, py = ox + (x + .5) * size, Y(y) - size / 2
                (p.moveTo if k == 0 else p.lineTo)(px, py)
            c.drawPath(p, stroke=1, fill=0)
        # start / goal markers
        pen.ellipse(ox + size / 2, Y(0) + 34, 26, 26, "bg", 3); kawaii_face(pen, ox + size / 2, Y(0) + 34, .32)
        star(pen, ox + size * (cols - .5), Y(rows) - 36, 26, "bg", lw=3)
        c.setFillColor(black); c.setFont("Helvetica-Bold", 20)
        title = f"Maze {i + 1}: Help the {who} find {goal}!" if not solution else f"Maze {i + 1}: answer"
        c.drawCentredString(W / 2, H - 50, title); c.setFont("Helvetica", 11)
        c.drawCentredString(W / 2, H - 70, ["Easy", "Easy", "Medium", "Medium", "Tricky", "Tricky", "Expert"][min(6, i // 5)] + " · start at the smiley, finish at the star")
    return d

WORDS = {"Animals": ["CAT", "DOG", "PANDA", "BUNNY", "TIGER", "ZEBRA", "KOALA", "OTTER", "SHEEP", "HORSE"],
         "Space": ["MOON", "STAR", "ROCKET", "ALIEN", "COMET", "ORBIT", "PLANET", "SUN", "MARS", "GALAXY"],
         "Christmas": ["SANTA", "SNOW", "GIFT", "TREE", "ELF", "STAR", "COCOA", "SLEIGH", "BELLS", "JOLLY"],
         "Yummy Food": ["PIZZA", "TACO", "DONUT", "SUSHI", "APPLE", "BREAD", "CAKE", "NOODLE", "PEAR", "RICE"],
         "Colors": ["RED", "BLUE", "GREEN", "PINK", "PURPLE", "ORANGE", "YELLOW", "BLACK", "WHITE", "BROWN"],
         "Ocean": ["FISH", "WHALE", "SHARK", "CRAB", "WAVE", "SHELL", "CORAL", "SQUID", "SEAL", "BOAT"],
         "Weather": ["RAIN", "SNOW", "WIND", "CLOUD", "STORM", "SUNNY", "FOGGY", "HAIL", "FROST", "RAINBOW"],
         "Bugs": ["ANT", "BEE", "MOTH", "WASP", "SNAIL", "WORM", "BEETLE", "SPIDER", "FLEA", "LADYBUG"],
         "Sports": ["BALL", "GOAL", "SWIM", "RUN", "BIKE", "SKATE", "TENNIS", "SOCCER", "GOLF", "JUMP"],
         "Music": ["DRUM", "SONG", "PIANO", "FLUTE", "BAND", "HARP", "TUBA", "NOTE", "BEAT", "GUITAR"]}
def make_search(words, n, seed):
    r = random.Random(seed)
    while True:
        g = [[None] * n for _ in range(n)]; spots = {}; ok = True
        for w in sorted(words, key=len, reverse=True):
            for _ in range(300):
                dx, dy = r.choice([(1, 0), (0, 1), (1, 1)]); x, y = r.randrange(n), r.randrange(n)
                if x + dx * (len(w) - 1) >= n or y + dy * (len(w) - 1) >= n: continue
                if all(g[y + dy*k][x + dx*k] in (None, w[k]) for k in range(len(w))):
                    for k in range(len(w)): g[y + dy*k][x + dx*k] = w[k]
                    spots[w] = (x, y, dx, dy); break
            else: ok = False
        if ok: break
    for row in g:
        for k in range(n):
            if row[k] is None: row[k] = r.choice(string.ascii_uppercase)
    return g, spots

def search_page(i, solution=False):
    theme = list(WORDS)[i % len(WORDS)]; words = WORDS[theme]; n = 12
    g, spots = make_search(words, n, 77 + i)
    def d(c):
        cell = 36; ox = (W - cell * n) / 2; oy = H - 100
        c.setFillColor(black); c.setFont("Helvetica-Bold", 26); c.drawCentredString(W / 2, H - 60, f"Word Search: {theme}" + (" (answers)" if solution else ""))
        c.setLineWidth(3); c.roundRect(ox - 12, oy - cell * n - 12, cell * n + 24, cell * n + 24, 16, stroke=1, fill=0)
        if solution:
            c.setStrokeColor(HexColor("#FFB3D1")); c.setLineWidth(24); c.setLineCap(1)
            for w, (x, y, dx, dy) in spots.items():
                c.line(ox + (x + .5) * cell, oy - (y + .5) * cell, ox + (x + .5 + dx * (len(w) - 1)) * cell, oy - (y + .5 + dy * (len(w) - 1)) * cell)
            c.setStrokeColor(black); c.setLineWidth(1.5)
        c.setFont("Helvetica-Bold", 20); c.setFillColor(black)
        for y in range(n):
            for x in range(n): c.drawCentredString(ox + (x + .5) * cell, oy - (y + .5) * cell - 8, g[y][x])
        c.setFont("Helvetica-Bold", 18)
        for k, w in enumerate(words):
            cx = W / 2 - 180 + (k % 2) * 220; cy = oy - cell * n - 60 - (k // 2) * 30
            c.rect(cx - 30, cy - 2, 16, 16, stroke=1, fill=0); c.drawString(cx - 6, cy, w)
    return d

def simple_book(fname, title, pages):
    c = canvas.Canvas(fname, pagesize=letter); c.setTitle(title); c.setAuthor("ColorPop Kids")
    for draw in pages:
        draw(c); c.setFont("Helvetica", 8); c.setFillColor(HexColor("#888888")); c.drawCentredString(W / 2, 16, "© ColorPop Kids · personal & single-classroom use"); c.showPage()
    c.save()

# ---------------------------------------------------------------- covers
PX = dict(bg="#FFFFFF", acc="#E63946", acc2="#FFD166", leaf="#2A9D8F", dough="#E9A262", hat="#2D2A32", fur="#FFD6A5", inner="#FFADC6",
          ear="#333333", belly="#FFFFFF", blush="#FF9AA2", eye="#FFFFFF", metal="#CFD8E3", skin="#FFE0CC")
PS = dict(bg="#FFFFFF", acc="#FF9F43", acc2="#7FDBFF", skin="#FFE0CC", blush="#FF9AA2", fur="#FFD6A5", inner="#FFADC6")

def cover(title, sub, bgcol, draw, dark=False):
    def d(c):
        c.setFillColor(HexColor(bgcol)); c.rect(0, 0, W, H, fill=1, stroke=0); draw(c)
        c.setFillColor(white if dark else HexColor("#222222")); c.setFont("Helvetica-Bold", 40); c.drawCentredString(W / 2, H - 90, title)
        c.setFont("Helvetica", 18); c.drawCentredString(W / 2, H - 120, sub)
        c.setFont("Helvetica-Bold", 14); c.drawCentredString(W / 2, 40, "ORIGINAL PAGES  ·  PRINT AT HOME  ·  COLORPOP KIDS")
    return d
def belongs(c):
    pen = Pen(c); star(pen, W / 2, H / 2 + 120, 90, "bg")
    c.setFillColor(black); c.setFont("Helvetica-Bold", 30); c.drawCentredString(W / 2, H / 2 - 40, "This book belongs to:")
    c.setLineWidth(3); c.line(120, H / 2 - 120, W - 120, H / 2 - 120)

def xcover(c):
    pen = Pen(c, PX); tree(pen, W * .3, 330, .75); snowman(pen, W * .72, 300, .6)
    g = Pen(c, dict(PX, acc="#2A9D8F")); gift(g, W * .5, 135, 60, 45)
    for x, y in [(70, 620), (540, 640), (300, 650), (60, 420), (560, 470)]: snowflake(Pen(c), x, y, 18)
def scover(c):
    pen = Pen(c, PS); rocket(pen, W * .3, 330, .7); planet(Pen(c, dict(PS, acc="#B388FF", acc2="#FFD166")), W * .7, 430, 95, True)
    alien(Pen(c, dict(PS, acc2="#7BD389")), W * .7, 210, .6)
    for x, y in [(70, 620), (540, 640), (300, 680), (60, 400), (560, 330), (140, 140)]: star(Pen(c, dict(acc="#FFD43B")), x, y, 15)
def acover(c):
    pen = Pen(c, dict(bg="#FFFFFF", fur="#FFD6A5", inner="#FFADC6", blush="#FF9AA2", belly="#FFFFFF"))
    animal(pen, "bunny", W * .3, 330, .55); animal(Pen(c, dict(fur="#B5E3FF", inner="#FFADC6", blush="#FF9AA2")), "bear", W * .7, 330, .55)
    c.setFillColor(HexColor("#222222")); c.setFont("Helvetica-Bold", 22)
    c.drawCentredString(W / 2, 160, "30 MAZES  +  10 WORD SEARCHES  +  ANSWER KEYS")

if __name__ == "__main__":
    simple_book("Christmas-Cuties-Coloring-Book.pdf", "Christmas Cuties", [cover("Christmas Cuties", "Kawaii holiday coloring book for kids", "#FDF1E7", xcover), belongs] + [xmas_page(i) for i in range(30)])
    simple_book("Space-Pals-Coloring-Book.pdf", "Space Pals", [cover("Space Pals", "Rockets, planets & aliens to color", "#1D1B3A", scover, dark=True), belongs] + [space_page(i) for i in range(30)])
    simple_book("Big-Kids-Activity-Book-Mazes-Word-Search.pdf", "Big Kids Activity Book",
                [cover("Big Kids Activity Book", "Mazes & word searches · ages 5-10", "#EAF6FF", acover), belongs] + [maze_page(i) for i in range(30)] + [search_page(i) for i in range(10)]
                + [maze_page(i, True) for i in range(30)] + [search_page(i, True) for i in range(10)])
    print("done")
