"""Kids coloring books with ORIGINAL characters (no licensed IP).
python3 build.py  -> 3 PDFs (US Letter, print-ready, single-sided pages)"""
import math, random
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.pagesizes import letter

W, H = letter
LW = 4.2

class Pen:
    """Draw closed shapes either white (coloring page) or with a palette (covers)."""
    def __init__(s, c, pal=None): s.c, s.pal = c, pal
    def fill(s, key):
        s.c.setFillColor(HexColor(s.pal[key]) if s.pal and key in s.pal else white)
    def shape(s, build, key="bg", lw=LW, stroke=1, fill=1):
        p = s.c.beginPath(); build(p); p.close()
        s.fill(key); s.c.setStrokeColor(black); s.c.setLineWidth(lw); s.c.setLineJoin(1); s.c.setLineCap(1)
        s.c.drawPath(p, stroke=stroke, fill=fill)
    def ellipse(s, x, y, rx, ry, key="bg", lw=LW):
        s.fill(key); s.c.setStrokeColor(black); s.c.setLineWidth(lw)
        s.c.ellipse(x - rx, y - ry, x + rx, y + ry, stroke=1 if lw else 0, fill=1)
    def blob(s, pts, key="bg", lw=LW):
        """smooth closed curve through points (Catmull-Rom -> Bezier)"""
        n = len(pts)
        def b(p):
            p.moveTo(*pts[0])
            for i in range(n):
                p0, p1, p2, p3 = pts[i - 1], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
                p.curveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6,
                          p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1])
        s.shape(b, key, lw)
    def line(s, pts, lw=LW):
        p = s.c.beginPath(); p.moveTo(*pts[0])
        for q in pts[1:]: p.lineTo(*q)
        s.c.setLineWidth(lw); s.c.setStrokeColor(black); s.c.drawPath(p, stroke=1, fill=0)
    def arc(s, x, y, r, a0, a1, lw=LW):
        s.c.setLineWidth(lw); s.c.setStrokeColor(black); s.c.arc(x - r, y - r, x + r, y + r, a0, a1 - a0)

def star_pts(x, y, r, n=5, inner=0.45, rot=90):
    out = []
    for i in range(2 * n):
        rr = r if i % 2 == 0 else r * inner; a = math.radians(rot + i * 180 / n)
        out.append((x + rr * math.cos(a), y + rr * math.sin(a)))
    return out
def star(pen, x, y, r, key="acc", n=5, inner=0.45, rot=90, lw=LW):
    pts = star_pts(x, y, r, n, inner, rot)
    pen.shape(lambda p: (p.moveTo(*pts[0]), [p.lineTo(*q) for q in pts[1:]]), key, lw)
def heart(pen, x, y, r, key="acc", lw=LW):
    pen.shape(lambda p: (p.moveTo(x, y - r), p.curveTo(x - r * 1.6, y + r * 0.2, x - r * 0.6, y + r * 1.4, x, y + r * 0.55),
                         p.curveTo(x + r * 0.6, y + r * 1.4, x + r * 1.6, y + r * 0.2, x, y - r)), key, lw)
def cloud(pen, x, y, r, lw=LW):
    pen.blob([(x - 2*r, y), (x - 1.4*r, y + .9*r), (x - .3*r, y + 1.3*r), (x + .8*r, y + 1.1*r),
              (x + 1.8*r, y + .5*r), (x + 1.6*r, y - .5*r), (x, y - .6*r), (x - 1.5*r, y - .55*r)], "bg", lw)
def sparkle(pen, x, y, r): star(pen, x, y, r, "acc", 4, 0.3, 90, 3)

def scatter(pen, rnd, avoid, kinds, count=12):
    placed = []
    for _ in range(400):
        if len(placed) >= count: break
        x, y = rnd.uniform(60, W - 60), rnd.uniform(120, H - 70)
        if avoid[0] < x < avoid[2] and avoid[1] < y < avoid[3]: continue
        if any(math.hypot(x - a, y - b) < 70 for a, b in placed): continue
        placed.append((x, y)); k = rnd.choice(kinds); r = rnd.uniform(14, 24)
        if k == "star": star(pen, x, y, r, rot=rnd.uniform(0, 72))
        elif k == "heart": heart(pen, x, y, r * .8)
        elif k == "sparkle": sparkle(pen, x, y, r)
        elif k == "bubble": pen.ellipse(x, y, r * .7, r * .7, "bg", 3); pen.arc(x, y, r * .45, 100, 160, 2.5)
        elif k == "cloud": cloud(pen, x, y, r * .9, 3.5)
        elif k == "note":
            pen.ellipse(x, y, 9, 7, "ink", 3); pen.line([(x + 8, y), (x + 8, y + 30), (x + 20, y + 22)], 3)

def caption(c, text, sub=None):
    c.setFillColor(black); c.setFont("Helvetica-Bold", 22); c.drawCentredString(W / 2, 62, text)
    if sub: c.setFont("Helvetica", 11); c.drawCentredString(W / 2, 42, sub)

# ------------------------------------------------------------------ chibi characters
NAMES = ["Hana", "Kiko", "Riku", "Yumi", "Sora", "Mika", "Ren", "Aiko", "Taro", "Nori", "Emi", "Kai",
         "Luna", "Momo", "Haru", "Suki", "Toma", "Yuki", "Rin", "Koa", "Mei", "Jun", "Saki", "Nao",
         "Pip", "Ayu", "Kenji", "Lumi", "Tia", "Zen"]
ROLES = [("the Star Mage", "wand", "star"), ("the Sky Ninja", "kunai", "cloud"), ("the Ramen Chef", "ladle", "bubble"),
         ("the Moon Guardian", "wand", "sparkle"), ("the Pop Idol", "mic", "note"), ("the Sword Student", "sword", "sparkle"),
         ("the Cat Whisperer", "kitty", "heart"), ("the Ice-Cream Hero", "icecream", "heart"), ("the Balloon Pilot", "balloon", "cloud"),
         ("the Robot Builder", "wrench", "star")]

def chibi(pen, rnd, cx, cy):
    c = pen.c; c.saveState(); c.translate(cx, cy)
    hair = rnd.choice(["spiky", "twintails", "long", "bob", "ponytail", "buns"])
    girlish = hair in ("twintails", "long", "buns", "ponytail")
    ears = rnd.choice([None, None, "cat", "bow", "star", "fox"])
    role = rnd.choice(ROLES)
    # back hair
    if hair == "twintails":
        for sx in (-1, 1): pen.blob([(sx*130, 220), (sx*215, 160), (sx*230, 20), (sx*200, -110), (sx*170, 0), (sx*140, 120)], "hair")
        for sx in (-1, 1): pen.ellipse(sx*140, 222, 20, 16, "acc")
    if hair == "long":
        pen.blob([(-165, 200), (-185, 40), (-170, -120), (-60, -100), (60, -100), (170, -120), (185, 40), (165, 200), (0, 300)], "hair")
    if hair == "ponytail":
        pen.blob([(120, 250), (230, 260), (260, 120), (215, -40), (190, 100), (150, 200)], "hair")
    if hair == "spiky":
        for a in range(15, 170, 22):
            r = math.radians(a); bx, by = 0, 190
            tip = (bx + 230 * math.cos(r), by + 175 * math.sin(r) + 10)
            l = (bx + 140 * math.cos(r - .28), by + 130 * math.sin(r - .28)); rr = (bx + 140 * math.cos(r + .28), by + 130 * math.sin(r + .28))
            pen.shape(lambda p, l=l, rr=rr, tip=tip: (p.moveTo(*l), p.lineTo(*tip), p.lineTo(*rr)), "hair")
    if hair == "buns":
        for sx in (-1, 1): pen.ellipse(sx*110, 285, 52, 48, "hair")
    if ears == "cat" or ears == "fox":
        tall = 1.35 if ears == "fox" else 1.0
        for sx in (-1, 1):
            pen.shape(lambda p, sx=sx: (p.moveTo(sx*55, 270), p.lineTo(sx*120, 270 + 110*tall), p.lineTo(sx*145, 230)), "hair")
            pen.shape(lambda p, sx=sx: (p.moveTo(sx*80, 270), p.lineTo(sx*118, 250 + 90*tall), p.lineTo(sx*128, 245)), "skin2", 3)
    # body
    dress = girlish and rnd.random() < .75
    for sx in (-1, 1):  # legs + shoes
        pen.shape(lambda p, sx=sx: (p.moveTo(sx*12, -100), p.lineTo(sx*14, -185), p.lineTo(sx*50, -185), p.lineTo(sx*52, -100)), "skin")
        pen.ellipse(sx*36, -192, 32, 18, "shoe")
    if dress:
        pen.shape(lambda p: (p.moveTo(-55, 30), p.curveTo(-70, -40, -100, -90, -110, -130), p.curveTo(-40, -150, 40, -150, 110, -130),
                             p.curveTo(100, -90, 70, -40, 55, 30)), "cloth")
        pen.line([(-104, -112), (104, -112)], 3)
    else:
        pen.shape(lambda p: (p.moveTo(-60, 28), p.lineTo(-68, -110), p.lineTo(68, -110), p.lineTo(60, 28)), "cloth")
        pen.shape(lambda p: (p.moveTo(-68, -100), p.lineTo(-70, -140), p.lineTo(-4, -140), p.lineTo(0, -118),
                             p.lineTo(4, -140), p.lineTo(70, -140), p.lineTo(68, -100)), "cloth2")
    collar = rnd.choice(["sailor", "buttons", "hood", "bow"])
    if collar == "sailor":
        pen.shape(lambda p: (p.moveTo(-58, 28), p.lineTo(0, -40), p.lineTo(58, 28), p.lineTo(30, 28), p.lineTo(0, -5), p.lineTo(-30, 28)), "cloth2")
        heart(pen, 0, -45, 14, "acc", 3)
    elif collar == "buttons":
        for yy in (-10, -45, -80): pen.ellipse(0, yy, 6, 6, "acc", 3)
    elif collar == "hood":
        pen.blob([(-80, 30), (-50, 0), (0, -10), (50, 0), (80, 30), (0, 45)], "cloth2")
        pen.line([(-20, 5), (-24, -50)], 3); pen.line([(20, 5), (24, -50)], 3)
    else:
        for sx in (-1, 1): pen.shape(lambda p, sx=sx: (p.moveTo(0, 5), p.lineTo(sx*38, 25), p.lineTo(sx*38, -15)), "acc", 3)
        pen.ellipse(0, 5, 10, 10, "acc", 3)
    # arms
    pen.blob([(-55, 15), (-100, -20), (-110, -60), (-90, -65), (-70, -30), (-52, -10)], "cloth")
    pen.ellipse(-102, -70, 17, 17, "skin")
    pen.blob([(55, 15), (95, -5), (115, -35), (100, -50), (75, -25), (52, -10)], "cloth")
    # head
    pen.shape(lambda p: (p.moveTo(-148, 180), p.curveTo(-150, 90, -70, 28, 0, 22), p.curveTo(70, 28, 150, 90, 148, 180),
                         p.curveTo(148, 335, -148, 335, -148, 180)), "skin")
    # face
    for sx in (-1, 1):
        ex = sx * 55
        pen.ellipse(ex, 105, 30, 40, "eye", 4)
        pen.c.setFillColor(black); pen.c.ellipse(ex - 17, 74, ex + 17, 120, stroke=0, fill=1)
        pen.c.setFillColor(white); pen.c.ellipse(ex - 10 + sx*2, 100, ex + 6 + sx*2, 120, stroke=0, fill=1)
        pen.c.ellipse(ex + 4, 80, ex + 12, 88, stroke=0, fill=1)
        pen.line([(ex - sx*28, 140), (ex + sx*2, 150), (ex + sx*30, 145)], 4)  # lash line
        for k in range(3): pen.line([(sx*92 + k*9 - 9, 62), (sx*92 + k*9 - 3, 74)], 2.5)  # blush
    mouth = rnd.choice(["smile", "open", "cat", "grin"])
    if mouth == "smile": pen.arc(0, 62, 14, 210, 330, 4)
    elif mouth == "open": pen.shape(lambda p: (p.moveTo(-14, 55), p.curveTo(-12, 30, 12, 30, 14, 55)), "mouth", 3.5)
    elif mouth == "cat": pen.arc(-8, 52, 8, 200, 360, 3.5); pen.arc(8, 52, 8, 180, 340, 3.5)
    else: pen.shape(lambda p: (p.moveTo(-20, 54), p.lineTo(20, 54), p.curveTo(18, 30, -18, 30, -20, 54)), "eye", 3.5)
    # bangs
    def bangs(p):
        p.moveTo(-160, 120); p.curveTo(-185, 345, 185, 345, 160, 120)
        if hair == "spiky":
            tips = [(150, 60), (115, 190), (95, 130), (70, 200), (40, 145), (10, 205), (-25, 140), (-55, 200), (-85, 135), (-110, 195), (-150, 60)]
        elif hair == "bob":
            tips = [(160, 40), (130, 175), (60, 165), (20, 190), (-30, 160), (-90, 175), (-130, 170), (-160, 40)]
        else:
            tips = [(150, 70), (120, 175), (90, 150), (50, 195), (15, 150), (-20, 195), (-55, 150), (-95, 185), (-120, 150), (-150, 70)]
        prev = (160, 120)
        for t in tips:
            mx, my = (prev[0] + t[0]) / 2, max(prev[1], t[1]) + 20
            p.curveTo(prev[0], prev[1], mx, my, t[0], t[1]); prev = t
        p.lineTo(-160, 120)
    pen.shape(bangs, "hair")
    pen.arc(-60, 265, 40, 100, 150, 3); pen.arc(40, 270, 46, 40, 85, 3)  # shine lines
    if ears == "bow":
        for sx in (-1, 1): pen.blob([(85, 270), (85 + sx*45, 305), (85 + sx*50, 250)], "acc")
        pen.ellipse(85, 272, 13, 13, "acc")
    if ears == "star": star(pen, 105, 255, 30, "acc")
    c.saveState(); c.translate(150, -45); c.rotate(-18)
    prop(pen, role[1], 0, 0); c.restoreState()
    pen.ellipse(112, -45, 18, 18, "skin")
    c.restoreState()
    return f"{rnd.choice(NAMES)} {role[0]}", role[2]

def prop(pen, kind, x, y):
    if kind == "wand":
        pen.shape(lambda p: (p.moveTo(x - 6, y), p.lineTo(x + 40, y + 120), p.lineTo(x + 50, y + 116), p.lineTo(x + 4, y - 4)), "acc2", 3.5)
        star(pen, x + 47, y + 135, 30)
    elif kind == "sword":
        pen.shape(lambda p: (p.moveTo(x + 8, y + 20), p.lineTo(x + 30, y + 190), p.lineTo(x + 45, y + 205), p.lineTo(x + 46, y + 185), p.lineTo(x + 26, y + 16)), "metal")
        pen.shape(lambda p: (p.moveTo(x - 18, y + 22), p.lineTo(x + 50, y + 12), p.lineTo(x + 52, y + 26), p.lineTo(x - 16, y + 36)), "acc")
    elif kind == "kunai":
        pen.shape(lambda p: (p.moveTo(x + 10, y + 10), p.lineTo(x + 5, y + 110), p.lineTo(x + 30, y + 160), p.lineTo(x + 35, y + 105), p.lineTo(x + 24, y + 8)), "metal")
        pen.ellipse(x + 17, y + 2, 12, 12, "acc", 3)
    elif kind == "mic":
        pen.shape(lambda p: (p.moveTo(x - 4, y), p.lineTo(x + 18, y + 70), p.lineTo(x + 30, y + 66), p.lineTo(x + 8, y - 4)), "acc2", 3.5)
        pen.ellipse(x + 26, y + 85, 24, 24, "metal")
    elif kind == "ladle":
        pen.line([(x, y), (x + 30, y + 110)], 6); pen.shape(lambda p: (p.moveTo(x + 5, y + 120), p.curveTo(x + 10, y + 165, x + 70, y + 160, x + 65, y + 110)), "metal")
    elif kind == "icecream":
        pen.shape(lambda p: (p.moveTo(x - 20, y + 30), p.lineTo(x + 10, y - 20), p.lineTo(x + 40, y + 30)), "acc2")
        for dx, dy in [(-12, 52), (32, 52), (10, 85)]: pen.ellipse(x + dx, y + dy, 28, 25, "acc")
        heart(pen, x + 10, y + 115, 10, "acc2", 3)
    elif kind == "balloon":
        pen.line([(x, y), (x + 30, y + 120), (x + 20, y + 180)], 2.5); heart(pen, x + 20, y + 200, 50, "acc")
    elif kind == "wrench":
        pen.shape(lambda p: (p.moveTo(x - 6, y), p.lineTo(x + 30, y + 110), p.lineTo(x + 44, y + 106), p.lineTo(x + 8, y - 4)), "metal", 3.5)
        pen.blob([(x + 15, y + 120), (x + 30, y + 150), (x + 55, y + 150), (x + 70, y + 120), (x + 50, y + 125), (x + 40, y + 108)], "metal")
    elif kind == "kitty":
        pen.ellipse(x + 40, y + 60, 48, 40, "cloth2")
        for sx in (-1, 1): pen.shape(lambda p, sx=sx: (p.moveTo(x + 40 + sx*20, y + 92), p.lineTo(x + 40 + sx*42, y + 128), p.lineTo(x + 40 + sx*46, y + 76)), "cloth2")
        for sx in (-1, 1): pen.c.setFillColor(black); pen.c.circle(x + 40 + sx*17, y + 64, 5, stroke=0, fill=1)
        pen.arc(x + 34, y + 50, 6, 200, 360, 2.5); pen.arc(x + 46, y + 50, 6, 180, 340, 2.5)

# ------------------------------------------------------------------ kawaii animals & food
ANIMALS = ["cat", "bear", "bunny", "panda", "fox", "frog", "pig", "mouse", "penguin", "chick"]
FOODS = ["donut", "boba", "onigiri", "cupcake", "icecream", "strawberry", "taco", "toast", "sushi", "pizza"]
def kawaii_face(pen, x, y, s=1.0):
    for sx in (-1, 1):
        pen.c.setFillColor(black); pen.c.circle(x + sx*30*s, y, 11*s, stroke=0, fill=1)
        pen.c.setFillColor(white); pen.c.circle(x + sx*30*s - 3*s, y + 4*s, 4*s, stroke=0, fill=1)
        pen.ellipse(x + sx*52*s, y - 20*s, 13*s, 8*s, "blush", 2.5)
    pen.arc(x - 7*s, y - 14*s, 7*s, 200, 360, 3.5); pen.arc(x + 7*s, y - 14*s, 7*s, 180, 340, 3.5)

def animal(pen, kind, x, y, s=1.0):
    S = lambda v: v * s
    if kind == "penguin":
        pen.ellipse(x, y - S(40), S(130), S(170), "fur"); pen.ellipse(x, y - S(60), S(85), S(120), "belly")
        pen.shape(lambda p: (p.moveTo(x - S(25), y + S(5)), p.lineTo(x, y - S(25)), p.lineTo(x + S(25), y + S(5))), "acc"); kawaii_face(pen, x, y + S(40), s); return
    if kind == "chick":
        pen.ellipse(x, y, S(150), S(140), "fur"); pen.shape(lambda p: (p.moveTo(x - S(20), y + S(130)), p.lineTo(x, y + S(175)), p.lineTo(x + S(20), y + S(135))), "fur")
        pen.shape(lambda p: (p.moveTo(x - S(18), y - S(5)), p.lineTo(x, y - S(28)), p.lineTo(x + S(18), y - S(5))), "acc"); kawaii_face(pen, x, y + S(25), s); return
    ears = {"cat": "tri", "fox": "tall", "bear": "round", "panda": "round", "mouse": "big", "bunny": "long", "pig": "tri", "frog": "eyes"}[kind]
    if ears == "long":
        for sx in (-1, 1): pen.ellipse(x + sx*S(55), y + S(170), S(35), S(95), "fur"); pen.ellipse(x + sx*S(55), y + S(170), S(17), S(70), "inner", 3)
    if ears in ("round", "big"):
        r = S(55) if ears == "round" else S(80)
        for sx in (-1, 1): pen.ellipse(x + sx*S(110), y + S(105), r, r, "ear" if kind == "panda" else "fur"); pen.ellipse(x + sx*S(110), y + S(105), r*.55, r*.55, "inner", 3)
    if ears in ("tri", "tall"):
        h = S(120) if ears == "tall" else S(85)
        for sx in (-1, 1): pen.shape(lambda p, sx=sx: (p.moveTo(x + sx*S(40), y + S(110)), p.lineTo(x + sx*S(115), y + S(95) + h), p.lineTo(x + sx*S(140), y + S(40))), "fur")
    if ears == "eyes":
        for sx in (-1, 1): pen.ellipse(x + sx*S(70), y + S(115), S(50), S(45), "fur")
    pen.ellipse(x, y, S(165), S(135), "fur")
    if kind == "panda":
        for sx in (-1, 1): pen.blob([(x + sx*S(15), y + S(10)), (x + sx*S(45), y + S(35)), (x + sx*S(62), y + S(5)), (x + sx*S(42), y - S(20))], "ear", 0)
    if kind == "pig": pen.ellipse(x, y - S(25), S(30), S(20), "inner", 3.5); pen.c.setFillColor(black); [pen.c.circle(x + d*S(9), y - S(25), S(4), stroke=0, fill=1) for d in (-1, 1)]
    if kind == "fox": pen.blob([(x - S(100), y - S(40)), (x, y - S(130)), (x + S(100), y - S(40)), (x, y - S(60))], "belly", 3)
    if kind == "frog":
        for sx in (-1, 1): pen.ellipse(x + sx*S(70), y + S(120), S(26), S(26), "eye", 3)
        kawaii_face(pen, x, y + S(5), s * 1.1); return
    kawaii_face(pen, x, y + S(5), s)
    if kind in ("cat", "mouse"):
        for sx in (-1, 1):
            for dy in (-12, 4): pen.line([(x + sx*S(75), y + S(dy) - S(10)), (x + sx*S(125), y + S(dy*1.6) - S(10))], 2.5)

def food(pen, kind, x, y, s=1.0):
    S = lambda v: v * s
    if kind == "donut":
        pen.ellipse(x, y, S(150), S(140), "dough"); pen.blob([(x - S(135), y + S(20)), (x - S(80), y + S(115)), (x + S(60), y + S(120)), (x + S(135), y + S(35)),
                                                             (x + S(110), y - S(40)), (x + S(70), y - S(10)), (x + S(20), y - S(60)), (x - S(40), y - S(30)), (x - S(110), y - S(55))], "icing")
        pen.ellipse(x, y + S(40), S(32), S(24), "bg")
        for a in range(0, 360, 40): r = math.radians(a); pen.line([(x + S(95)*math.cos(r), y + S(40) + S(70)*math.sin(r)), (x + S(105)*math.cos(r), y + S(50) + S(70)*math.sin(r))], 4)
        kawaii_face(pen, x, y - S(80), s * .7)
    elif kind == "boba":
        pen.shape(lambda p: (p.moveTo(x - S(110), y + S(130)), p.lineTo(x - S(85), y - S(170)), p.lineTo(x + S(85), y - S(170)), p.lineTo(x + S(110), y + S(130))), "drink")
        pen.ellipse(x, y + S(140), S(125), S(30), "lid"); pen.shape(lambda p: (p.moveTo(x + S(10), y + S(150)), p.lineTo(x + S(50), y + S(280)), p.lineTo(x + S(70), y + S(275)), p.lineTo(x + S(30), y + S(150))), "acc", 3.5)
        for i in range(9): pen.ellipse(x - S(60) + (i % 5)*S(30) + (i//5)*S(15), y - S(140) + (i//5)*S(28), S(13), S(13), "pearl", 3)
        kawaii_face(pen, x, y + S(20), s * .9)
    elif kind == "onigiri":
        pen.blob([(x, y + S(170)), (x - S(80), y + S(60)), (x - S(150), y - S(100)), (x, y - S(130)), (x + S(150), y - S(100)), (x + S(80), y + S(60))], "rice")
        pen.shape(lambda p: (p.moveTo(x - S(70), y - S(127)), p.lineTo(x - S(60), y - S(30)), p.lineTo(x + S(60), y - S(30)), p.lineTo(x + S(70), y - S(127))), "nori")
        kawaii_face(pen, x, y + S(30), s * .9)
    elif kind == "cupcake":
        pen.shape(lambda p: (p.moveTo(x - S(120), y), p.lineTo(x - S(90), y - S(150)), p.lineTo(x + S(90), y - S(150)), p.lineTo(x + S(120), y)), "cloth")
        for k in range(-2, 3): pen.line([(x + S(k*40), y - S(5)), (x + S(k*32), y - S(145))], 3)
        pen.blob([(x - S(140), y), (x - S(110), y + S(80)), (x - S(40), y + S(140)), (x, y + S(200)), (x + S(40), y + S(140)), (x + S(110), y + S(80)), (x + S(140), y), (x, y - S(20))], "icing")
        pen.ellipse(x, y + S(215), S(22), S(22), "acc"); kawaii_face(pen, x, y + S(70), s * .85)
    elif kind == "icecream":
        pen.shape(lambda p: (p.moveTo(x - S(100), y), p.lineTo(x, y - S(230)), p.lineTo(x + S(100), y)), "dough")
        for k in range(-2, 3): pen.line([(x + S(k*35) - S(25), y - S(8)), (x + S(k*35) + S(35), y - S(140) + abs(k)*S(25))], 2.5)
        pen.blob([(x - S(130), y + S(10)), (x - S(120), y + S(120)), (x, y + S(190)), (x + S(120), y + S(120)), (x + S(130), y + S(10)), (x, y - S(15))], "icing")
        kawaii_face(pen, x, y + S(85), s * .85)
    elif kind == "strawberry":
        pen.blob([(x, y - S(180)), (x - S(140), y), (x - S(120), y + S(110)), (x, y + S(130)), (x + S(120), y + S(110)), (x + S(140), y)], "acc")
        for sx in range(-2, 3): pen.shape(lambda p, sx=sx: (p.moveTo(x, y + S(125)), p.lineTo(x + S(sx*45), y + S(170) - abs(sx)*S(12)), p.lineTo(x + S(sx*30) + S(18), y + S(118))), "leaf", 3.5)
        for i in range(10): a = i * 2.4; pen.ellipse(x + S(80)*math.cos(a)*(.5 + i/20), y - S(60) + S(60)*math.sin(a)*(.5 + i/20), S(5), S(8), "pearl", 2)
        kawaii_face(pen, x, y + S(30), s * .85)
    elif kind == "taco":
        pen.blob([(x - S(160), y - S(60)), (x - S(110), y + S(70)), (x, y + S(115)), (x + S(110), y + S(70)), (x + S(160), y - S(60))], "leaf")
        pen.shape(lambda p: (p.moveTo(x - S(165), y - S(70)), p.curveTo(x - S(160), y + S(160), x + S(160), y + S(160), x + S(165), y - S(70)), p.lineTo(x - S(165), y - S(70))), "dough")
        kawaii_face(pen, x, y, s * .9)
    elif kind == "toast":
        pen.blob([(x - S(140), y - S(150)), (x - S(140), y + S(70)), (x - S(170), y + S(150)), (x - S(60), y + S(200)), (x + S(60), y + S(200)), (x + S(170), y + S(150)),
                  (x + S(140), y + S(70)), (x + S(140), y - S(150))], "dough")
        pen.blob([(x - S(70), y - S(40)), (x - S(80), y + S(50)), (x, y + S(80)), (x + S(80), y + S(50)), (x + S(70), y - S(40)), (x, y - S(60))], "icing")
        kawaii_face(pen, x, y - S(90), s * .85)
    elif kind == "sushi":
        pen.ellipse(x, y - S(40), S(170), S(90), "rice")
        pen.blob([(x - S(185), y - S(30)), (x - S(150), y + S(60)), (x, y + S(95)), (x + S(150), y + S(60)), (x + S(185), y - S(30)), (x, y + S(10))], "acc")
        for k in (-1, 0, 1): pen.line([(x + S(k*70) - S(20), y + S(25)), (x + S(k*70) + S(25), y + S(80))], 3)
        kawaii_face(pen, x, y - S(60), s * .85)
    elif kind == "pizza":
        pen.shape(lambda p: (p.moveTo(x, y - S(200)), p.lineTo(x - S(150), y + S(130)), p.curveTo(x - S(50), y + S(165), x + S(50), y + S(165), x + S(150), y + S(130))), "icing")
        pen.shape(lambda p: (p.moveTo(x - S(165), y + S(125)), p.curveTo(x - S(50), y + S(175), x + S(50), y + S(175), x + S(165), y + S(125)),
                             p.lineTo(x + S(170), y + S(170)), p.curveTo(x + S(50), y + S(220), x - S(50), y + S(220), x - S(170), y + S(170))), "dough")
        for dx, dy in [(-60, 60), (55, 75), (0, -70), (-15, 120)]: pen.ellipse(x + S(dx), y + S(dy), S(20), S(20), "acc", 3.5)
        kawaii_face(pen, x, y + S(10), s * .8)

# ------------------------------------------------------------------ mandalas (easy kids)
def mandala(pen, rnd, x, y):
    R = 250
    layers = rnd.randint(4, 5); prev = None
    for li in range(layers):
        r = R * (1 - li / (layers + .6))
        n = rnd.choice([8, 10, 12]) if li < 2 else rnd.choice([6, 8])
        kind = "petal" if li == 0 else rnd.choice([k for k in ["petal", "circle", "point", "heart", "star"] if k != prev])
        prev = kind
        off = rnd.uniform(0, 360 / n)
        for i in range(n):
            a = math.radians(off + i * 360 / n); px, py = x + r * .75 * math.cos(a), y + r * .75 * math.sin(a)
            if kind == "petal":
                tip = (x + r * math.cos(a), y + r * math.sin(a)); w = math.pi / n * .85
                b1 = (x + r * .5 * math.cos(a - w), y + r * .5 * math.sin(a - w)); b2 = (x + r * .5 * math.cos(a + w), y + r * .5 * math.sin(a + w))
                pen.shape(lambda p, b1=b1, b2=b2, tip=tip: (p.moveTo(*b1), p.curveTo(b1[0] + (tip[0]-x)*.4, b1[1] + (tip[1]-y)*.4, tip[0], tip[1], tip[0], tip[1]),
                                                            p.curveTo(tip[0], tip[1], b2[0] + (tip[0]-x)*.4, b2[1] + (tip[1]-y)*.4, *b2)), "bg", 3)
            elif kind == "circle": pen.ellipse(px, py, r * math.pi / n * .7, r * math.pi / n * .7, "bg", 3)
            elif kind == "point":
                w = math.pi / n * .8
                pen.shape(lambda p, a=a, w=w: (p.moveTo(x + r*.55*math.cos(a-w), y + r*.55*math.sin(a-w)), p.lineTo(x + r*math.cos(a), y + r*math.sin(a)),
                                               p.lineTo(x + r*.55*math.cos(a+w), y + r*.55*math.sin(a+w))), "bg", 3)
            elif kind == "heart": heart(pen, px, py, r * math.pi / n * .6, "bg", 3)
            else: star(pen, px, py, r * math.pi / n * .8, "bg", rot=math.degrees(a), lw=3)
        pen.ellipse(x, y, r * .5, r * .5, "bg", 3)
    star(pen, x, y, 30, "bg", lw=3)

# ------------------------------------------------------------------ books
PAL_CHIBI = dict(skin="#FFE0CC", skin2="#FFB8C6", hair="#6C5CE7", eye="#FFFFFF", cloth="#FF7AA2", cloth2="#FFFFFF", acc="#FFD43B",
                 acc2="#A0E7E5", shoe="#5B4B8A", metal="#CFD8E3", mouth="#FF6B81", bg="#FFFFFF", ink="#222222")
PAL_K = dict(fur="#FFD6A5", inner="#FFADC6", ear="#333333", belly="#FFFFFF", blush="#FF9AA2", eye="#FFFFFF", acc="#FF6B6B", bg="#FFFFFF",
             dough="#F4C27A", icing="#FF9ECD", drink="#C8A27A", lid="#FFFFFF", pearl="#3B2A20", rice="#FFFFFF", nori="#2F4F3A", cloth="#8EC5FC", leaf="#7BD389")

def book(fname, title, subtitle, pages, cover_fn):
    c = canvas.Canvas(fname, pagesize=letter); c.setTitle(title); c.setAuthor("Doodle Lantern Studio")
    # cover (colored)
    c.setFillColor(HexColor("#FFF4E6")); c.rect(0, 0, W, H, fill=1, stroke=0)
    cover_fn(c)
    c.setFillColor(HexColor("#222222")); c.setFont("Helvetica-Bold", 38); c.drawCentredString(W / 2, H - 90, title)
    c.setFont("Helvetica", 18); c.drawCentredString(W / 2, H - 120, subtitle)
    c.setFont("Helvetica-Bold", 14); c.drawCentredString(W / 2, 40, f"{len(pages)} ORIGINAL PAGES  ·  PRINT AT HOME  ·  AGES 4-10")
    c.showPage()
    # belongs to
    pen = Pen(c); heart(pen, W / 2, H / 2 + 120, 90, "bg")
    c.setFont("Helvetica-Bold", 30); c.drawCentredString(W / 2, H / 2 - 40, "This book belongs to:")
    c.setLineWidth(3); c.line(120, H / 2 - 120, W - 120, H / 2 - 120); c.showPage()
    for draw in pages:
        draw(c); c.setFont("Helvetica", 8); c.setFillColor(HexColor("#888888"))
        c.drawCentredString(W / 2, 16, "© Doodle Lantern Studio · personal use only"); c.showPage()
    c.save()

def chibi_page(seed):
    def d(c):
        rnd = random.Random(seed); pen = Pen(c)
        rnd_bg = random.Random(seed * 7 + 1)
        name, bgk = chibi(pen, random.Random(seed), W / 2, 330)
        scatter(pen, rnd_bg, (W/2 - 260, 90, W/2 + 260, 720), [bgk, "sparkle", "star"], 10)
        caption(c, name)
    return d

def kawaii_page(i):
    def d(c):
        pen = Pen(c); rnd = random.Random(i * 31)
        if i % 2 == 0:
            k = ANIMALS[(i // 2) % len(ANIMALS)]; animal(pen, k, W / 2, H / 2 + 30, 1.25); name = f"Little {k.title()}"
        else:
            k = FOODS[(i // 2) % len(FOODS)]; food(pen, k, W / 2, H / 2 + 20, 1.3); name = f"Happy {k.title() if k != 'icecream' else 'Ice Cream'}"
        scatter(pen, rnd, (W/2 - 250, 120, W/2 + 250, H - 120), ["heart", "sparkle", "star", "bubble"], 9)
        caption(c, name)
    return d

def mandala_page(i):
    def d(c):
        pen = Pen(c); mandala(pen, random.Random(i * 97 + 5), W / 2, H / 2 + 20)
        caption(c, f"Magic Pattern #{i + 1}")
    return d

def chibi_cover(c):
    for k, (x, seed) in enumerate([(W*0.28, 3), (W*0.72, 8)]):
        pal = dict(PAL_CHIBI); pal["hair"] = ["#6C5CE7", "#FF8C42"][k]; pal["cloth"] = ["#FF7AA2", "#4ECDC4"][k]
        c.saveState(); c.translate(x, 260); c.scale(.62, .62); chibi(Pen(c, pal), random.Random(seed), 0, 0); c.restoreState()
    p = Pen(c, PAL_CHIBI); [star(p, x, y, 18) for x, y in [(80, 600), (530, 620), (300, 640), (60, 380), (560, 400)]]

def kawaii_cover(c):
    p = Pen(c, PAL_K); animal(p, "cat", W * 0.3, 360, .75); food(p, "boba", W * 0.72, 330, .7)
    q = Pen(c, dict(PAL_K, fur="#FFFFFF")); animal(q, "panda", W * 0.5, 160, .45)

def mandala_cover(c):
    pal = dict(bg="#FFC8DD", acc="#FFD43B")
    mandala(Pen(c, pal), random.Random(5), W / 2, H / 2 - 40)

if __name__ == "__main__":
    book("Anime-Chibi-Friends-Coloring-Book.pdf", "Chibi Hero Friends", "Anime-style coloring book for kids",
         [chibi_page(s) for s in range(1, 41)][:30], chibi_cover)
    book("Kawaii-Animals-and-Snacks-Coloring-Book.pdf", "Kawaii Critters & Snacks", "Cute coloring book for kids",
         [kawaii_page(i) for i in range(30)], kawaii_cover)
    book("Magic-Patterns-Mandala-Coloring-Book.pdf", "Magic Patterns", "Easy mandala coloring for kids",
         [mandala_page(i) for i in range(30)], mandala_cover)
    print("done")
