"""Shop logo, listing thumbnails and ad creatives for ColorPop Kids. python3 build_assets.py"""
import os, sys, subprocess, random, math
sys.path.insert(0, "../coloring")
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
import build as cb  # coloring generator (Pen, animal, chibi, ...)

F = "/usr/share/fonts/opentype/inter/"
def font(w, size): return ImageFont.truetype(F + {"black": "Inter-Black.otf", "bold": "Inter-Bold.otf", "semi": "Inter-SemiBold.otf"}[w], size)
os.makedirs("out", exist_ok=True); os.makedirs("tmp", exist_ok=True)

def render_pdf_page(pdf, page, dpi, out):
    subprocess.run(["pdftoppm", "-png", "-r", str(dpi), "-f", str(page), "-l", str(page), "-singlefile", pdf, out[:-4]], check=True)
    return Image.open(out).convert("RGBA")

# ---------------- logo: kawaii crayon mascot in a badge
def logo():
    S = 1000; c = canvas.Canvas("tmp/logo.pdf", pagesize=(S, S))
    c.setFillColor(HexColor("#FF5DA2")); c.circle(S/2, S/2, 500, fill=1, stroke=0)
    c.setFillColor(HexColor("#FFD43B")); c.circle(S/2, S/2, 430, fill=1, stroke=0)
    for i, col in enumerate(["#4ECDC4", "#6C5CE7", "#FF6B6B", "#7BD389", "#FF9F43"]):  # confetti dots
        a = math.radians(30 + i * 72); c.setFillColor(HexColor(col)); c.circle(S/2 + 360*math.cos(a), S/2 + 360*math.sin(a), 26, fill=1, stroke=0)
    pen = cb.Pen(c, dict(bg="#FFFFFF", acc="#FF5DA2", blush="#FF9AA2"))
    c.saveState(); c.translate(S/2, S/2 - 20); c.rotate(-12)
    # crayon body
    pen.shape(lambda p: (p.moveTo(-120, -260), p.lineTo(-120, 200), p.lineTo(120, 200), p.lineTo(120, -260)), "acc", 12)
    pen.shape(lambda p: (p.moveTo(-120, 200), p.lineTo(0, 360), p.lineTo(120, 200)), "bg", 12)
    pen.shape(lambda p: (p.moveTo(-42, 304), p.lineTo(0, 360), p.lineTo(42, 304)), "acc", 10)
    pen.shape(lambda p: (p.moveTo(-120, -200), p.lineTo(120, -200), p.lineTo(120, -150), p.lineTo(-120, -150)), "bg", 10)
    pen.shape(lambda p: (p.moveTo(-120, 120), p.lineTo(120, 120), p.lineTo(120, 160), p.lineTo(-120, 160)), "bg", 10)
    pen.c.setFillColor(HexColor("#FFFFFF")); pen.c.roundRect(-85, -110, 170, 200, 30, fill=1, stroke=0)
    cb.kawaii_face(pen, 0, 10, 1.55)
    c.restoreState(); c.showPage(); c.save()
    im = render_pdf_page("tmp/logo.pdf", 1, 72, "tmp/logo.png")
    mask = Image.new("L", im.size, 0); ImageDraw.Draw(mask).ellipse((0, 0, S, S), fill=255)
    out = Image.new("RGBA", im.size, (0, 0, 0, 0)); out.paste(im, (0, 0), mask); out.save("out/logo-colorpop-kids.png")
    # wordmark version
    wm = Image.new("RGB", (2000, 700), "#FFF7EC"); d = ImageDraw.Draw(wm)
    wm.paste(out.resize((560, 560)), (70, 70), out.resize((560, 560)))
    x = 690
    for ch, col in zip("ColorPop", ["#FF5DA2", "#FF9F43", "#FFC300", "#4ECDC4", "#6C5CE7", "#FF6B6B", "#22A39F", "#FF5DA2"]):
        d.text((x, 150), ch, font=font("black", 210), fill=col); x += d.textlength(ch, font=font("black", 210))
    d.text((700, 400), "KIDS", font=font("black", 150), fill="#2D2A32")
    d.text((1120, 440), "printable fun", font=font("semi", 70), fill="#8C8494"); wm.save("out/logo-wordmark.png")
    return out

def shadowed(page, angle):
    page = page.convert("RGBA"); w, h = page.size
    pad = 60; base = Image.new("RGBA", (w + pad*2, h + pad*2), (0, 0, 0, 0))
    sh = Image.new("RGBA", base.size, (0, 0, 0, 0)); ImageDraw.Draw(sh).rectangle((pad + 14, pad + 22, pad + w + 14, pad + h + 22), fill=(40, 20, 60, 90))
    sh = sh.filter(ImageFilter.GaussianBlur(22)); base.alpha_composite(sh); base.alpha_composite(page, (pad, pad))
    return base.rotate(angle, expand=True, resample=Image.BICUBIC)

def badge(d, xy, text, bg, fg="#FFFFFF", size=54):
    f = font("black", size); w = d.textlength(text, font=f); x, y = xy
    d.rounded_rectangle((x, y, x + w + 70, y + size + 46), radius=(size + 46)//2, fill=bg); d.text((x + 35, y + 18), text, font=f, fill=fg)
    return x + w + 70

def blobs(im, cols, seed):
    d = ImageDraw.Draw(im); r = random.Random(seed); W, H = im.size
    for _ in range(26):
        x, y, s = r.uniform(0, W), r.uniform(0, H), r.uniform(14, 40); d.ellipse((x - s, y - s, x + s, y + s), fill=r.choice(cols))

def thumb(spec, logo_im, size=(2000, 2000), name=None):
    W, H = size; im = Image.new("RGBA", size, spec["bg"]); blobs(im, spec["dots"], hash(spec["title"]) % 999)
    d = ImageDraw.Draw(im)
    # title block
    y = 90 if H == 2000 else 120
    lines = spec["title"].split("\n"); ts = spec.get("tsize", 150)
    while max(d.textlength(l, font=font("black", ts)) for l in lines) > W * 0.9: ts -= 4
    for line in lines:
        f = font("black", ts); w = d.textlength(line, font=f)
        d.text(((W - w)/2 + 6, y + 8), line, font=f, fill="#2D2A32"); d.text(((W - w)/2, y), line, font=f, fill=spec["tcol"]); y += ts + 10
    ss = 70
    while d.textlength(spec["sub"], font=font("bold", ss)) > W * 0.9: ss -= 2
    f = font("bold", ss); w = d.textlength(spec["sub"], font=f); d.text(((W - w)/2, y + 10), spec["sub"], font=f, fill="#2D2A32")
    # fanned pages
    pages = spec["pages"]; n = len(pages); top = y + 140; ph = int((H - top - 280) * 0.95)
    for k, (pdf, pg) in enumerate(pages):
        p = render_pdf_page(pdf, pg, 150, f"tmp/p{k}.png"); p = p.resize((int(ph * p.width / p.height), ph))
        ang = (k - (n - 1)/2) * 9; s = shadowed(p, ang)
        cx = W/2 + (k - (n - 1)/2) * (W * 0.24); im.alpha_composite(s, (int(cx - s.width/2), int(top - 40 + abs(k - (n - 1)/2) * 30)))
    d = ImageDraw.Draw(im)
    bs = 54 if W >= 2000 else 40; bl = list(spec["badges"])
    total = lambda b: sum(d.textlength(t, font=font("black", bs)) + 96 for t, _ in b)
    while total(bl) > W - 300: bl.pop()
    x = 60; yb = H - 60 - (bs + 46) - 50
    for t, col in bl: x = badge(d, (x, yb), t, col, size=bs) + 26
    lg = logo_im.resize((190, 190)); im.alpha_composite(lg, (W - 230, H - 230))
    im.convert("RGB").save(f"out/{name or spec['file']}.png")

CH = "../coloring/Anime-Chibi-Friends-Coloring-Book.pdf"; KW = "../coloring/Kawaii-Animals-and-Snacks-Coloring-Book.pdf"
MD = "../coloring/Magic-Patterns-Mandala-Coloring-Book.pdf"; PL = "../planner-2027/Planner-2027-sage.pdf"
SPECS = [
  dict(file="thumb-chibi", title="CHIBI HERO\nFRIENDS", sub="Anime-style coloring book for kids", tcol="#6C5CE7", bg="#FFE8F3",
       dots=["#FFC6E0", "#D9D2FF", "#C9F2EE"], pages=[(CH, 1), (CH, 5), (CH, 9)], badges=[("30 PAGES", "#FF5DA2"), ("PRINT AT HOME", "#6C5CE7"), ("AGES 4-10", "#22A39F")]),
  dict(file="thumb-kawaii", title="KAWAII CRITTERS\n& SNACKS", sub="Cute animals + happy foods to color", tcol="#FF6B6B", bg="#FFF4D6",
       dots=["#FFE08A", "#FFCFCF", "#CDEFD9"], pages=[(KW, 3), (KW, 1), (KW, 6)], tsize=135, badges=[("30 PAGES", "#FF6B6B"), ("INSTANT DOWNLOAD", "#FF9F43"), ("AGES 3-8", "#22A39F")]),
  dict(file="thumb-mandala", title="MAGIC\nPATTERNS", sub="Easy mandalas for calm kids", tcol="#22A39F", bg="#E6FAF6",
       dots=["#BDEFE6", "#FFE3F0", "#E5E0FF"], pages=[(MD, 3), (MD, 1), (MD, 5)], badges=[("30 PAGES", "#22A39F"), ("CALM ACTIVITY", "#6C5CE7"), ("AGES 5+", "#FF5DA2")]),
  dict(file="thumb-bundle", title="90-PAGE COLORING\nBUNDLE", sub="Chibi heroes · Kawaii critters · Magic patterns", tcol="#FF5DA2", bg="#F1ECFF",
       dots=["#DCD3FF", "#FFD3E8", "#FFF0B3"], pages=[(CH, 1), (KW, 1), (MD, 1)], tsize=130, badges=[("3 BOOKS", "#FF5DA2"), ("SAVE 33%", "#FF9F43"), ("PRINT AGAIN & AGAIN", "#6C5CE7")]),
  dict(file="thumb-planner", title="2027 DIGITAL\nPLANNER", sub="Hyperlinked · GoodNotes · Notability", tcol="#4F7A63", bg="#EEF5EF",
       dots=["#D6E8DB", "#F8E1E5", "#DCE6F2"], pages=[(PL, 4), (PL, 1), (PL, 17)], tsize=140, badges=[("102 PAGES", "#4F7A63"), ("3 COLORS", "#D49AA3"), ("iPAD & ANDROID", "#4F6D8F")]),
]
if __name__ == "__main__":
    lg = logo()
    for s in SPECS:
        thumb(s, lg)                                   # 2000x2000 listing thumbnail
        thumb(dict(s, tsize=int(s.get("tsize", 150) * .8)), lg, (1000, 1500), s["file"].replace("thumb", "pin"))  # Pinterest pin
    print("ok")
