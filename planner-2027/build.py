"""Builds the 2027 hyperlinked digital planner PDF (GoodNotes/Notability/Xodo ready).
Run: python3 build.py [theme]   themes: sage (default), blush, slate"""
import sys, calendar, datetime as dt
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white

YEAR = 2027
THEMES = {
    "sage":  dict(ink="#2F3A33", soft="#7C8B80", line="#D5DDD6", accent="#7FA08A", tint="#EEF3EF", bg="#FBFCFA"),
    "blush": dict(ink="#3D2E31", soft="#8E7378", line="#EBD9DC", accent="#D49AA3", tint="#F8ECEE", bg="#FFFBFB"),
    "slate": dict(ink="#1F2733", soft="#6B7686", line="#D6DCE4", accent="#4F6D8F", tint="#EAF0F6", bg="#FAFBFD"),
}
theme = sys.argv[1] if len(sys.argv) > 1 else "sage"
T = {k: HexColor(v) for k, v in THEMES[theme].items()}
W, H = 1194, 834          # iPad landscape, points
TAB_W = 74                # right-hand tab rail
CW = W - TAB_W            # content width
M = 48                    # margin
MONTHS = list(calendar.month_name)[1:]
MON3 = [m[:3].upper() for m in MONTHS]
DOW = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
cal = calendar.Calendar(firstweekday=0)

# ---- weeks: Monday-start weeks covering the year
first_mon = dt.date(YEAR, 1, 1) - dt.timedelta(days=dt.date(YEAR, 1, 1).weekday())
WEEKS = []
d = first_mon
while d.year <= YEAR and not (d.year == YEAR + 1):
    WEEKS.append(d); d += dt.timedelta(days=7)
    if d > dt.date(YEAR, 12, 31): break
def week_of(day): return (day - first_mon).days // 7

TABS = [("YEAR", "year"), ("GOALS", "goals")] + [(MON3[i], f"m{i}") for i in range(12)] + \
       [("HABITS", "h0"), ("BUDGET", "b0"), ("NOTES", "n0")]

c = canvas.Canvas(f"Planner-{YEAR}-{theme}.pdf", pagesize=(W, H))
c.setTitle(f"{YEAR} Digital Planner"); c.setAuthor("Planner Studio")

def link(dest, x, y, w, h):
    c.linkRect("", dest, (x, y, x + w, y + h), relative=0, thickness=0)

def page(key, title, sub="", active=None):
    c.bookmarkPage(key, fit="Fit")
    c.setFillColor(T["bg"]); c.rect(0, 0, W, H, fill=1, stroke=0)
    # tab rail
    c.setFillColor(T["tint"]); c.rect(CW, 0, TAB_W, H, fill=1, stroke=0)
    th = (H - 20) / len(TABS)
    for i, (lab, dest) in enumerate(TABS):
        y = H - 10 - (i + 1) * th
        on = active == dest
        if on:
            c.setFillColor(T["accent"]); c.roundRect(CW + 6, y + 2, TAB_W - 12, th - 4, 6, fill=1, stroke=0)
        c.setFillColor(white if on else T["soft"]); c.setFont("Helvetica-Bold", 10)
        c.drawCentredString(CW + TAB_W / 2, y + th / 2 - 3.5, lab)
        link(dest, CW, y, TAB_W, th)
    c.setFillColor(T["ink"]); c.setFont("Helvetica-Bold", 30); c.drawString(M, H - M - 22, title)
    if sub:
        c.setFillColor(T["soft"]); c.setFont("Helvetica", 13); c.drawString(M, H - M - 44, sub)

def lines(x, y0, w, y1, step=26):
    c.setStrokeColor(T["line"]); c.setLineWidth(0.8)
    y = y0
    while y > y1:
        c.line(x, y, x + w, y); y -= step

def box(x, y, w, h, label=None, fill=None):
    c.setStrokeColor(T["line"]); c.setLineWidth(1)
    if fill: c.setFillColor(fill)
    c.roundRect(x, y, w, h, 8, fill=1 if fill else 0, stroke=1)
    if label:
        c.setFillColor(T["accent"]); c.setFont("Helvetica-Bold", 10); c.drawString(x + 12, y + h - 20, label)

# ---------- cover
c.setFillColor(T["bg"]); c.rect(0, 0, W, H, fill=1, stroke=0)
c.bookmarkPage("cover")
c.setFillColor(T["tint"]); c.circle(W * 0.72, H * 0.42, 300, fill=1, stroke=0)
c.setFillColor(T["accent"]); c.circle(W * 0.72, H * 0.42, 170, fill=1, stroke=0)
c.setFillColor(T["ink"]); c.setFont("Helvetica-Bold", 120); c.drawString(90, H / 2 + 10, str(YEAR))
c.setFont("Helvetica", 30); c.setFillColor(T["soft"]); c.drawString(96, H / 2 - 40, "DIGITAL PLANNER")
c.setFont("Helvetica", 14); c.drawString(96, H / 2 - 76, "Tap any tab, date or week to jump there.")
c.setFillColor(T["accent"]); c.roundRect(96, H / 2 - 150, 180, 46, 23, fill=1, stroke=0)
c.setFillColor(white); c.setFont("Helvetica-Bold", 16); c.drawCentredString(186, H / 2 - 132, "OPEN PLANNER")
link("year", 96, H / 2 - 150, 180, 46)
c.showPage()

# ---------- year at a glance
page("year", f"{YEAR} at a glance", "Tap a month name for the month, a date for its week.", "year")
gx, gy, cols = M, H - 120, 4
mw, mh = (CW - 2 * M) / cols, (H - 160) / 3
for i in range(12):
    x = gx + (i % cols) * mw; y = gy - (i // cols) * mh
    c.setFillColor(T["accent"]); c.setFont("Helvetica-Bold", 14); c.drawString(x + 6, y - 12, MONTHS[i])
    link(f"m{i}", x, y - 18, mw - 20, 22)
    cw = (mw - 24) / 7
    c.setFont("Helvetica-Bold", 7); c.setFillColor(T["soft"])
    for k, dn in enumerate(DOW): c.drawCentredString(x + 6 + cw * k + cw / 2, y - 32, dn[0])
    c.setFont("Helvetica", 10); c.setFillColor(T["ink"])
    for r, wk in enumerate(cal.monthdatescalendar(YEAR, i + 1)):
        for k, day in enumerate(wk):
            if day.month != i + 1: continue
            cx = x + 6 + cw * k; cy = y - 50 - r * 22
            c.drawCentredString(cx + cw / 2, cy, str(day.day))
            link(f"w{week_of(day)}", cx, cy - 6, cw, 20)
c.showPage()

# ---------- goals
page("goals", f"{YEAR} goals", "Big picture first. Then make it weekly.", "goals")
bw = (CW - 2 * M - 20) / 2; bh = (H - 170 - 20) / 2
for k, lab in enumerate(["HEALTH & ENERGY", "MONEY & CAREER", "RELATIONSHIPS", "GROWTH & FUN"]):
    x = M + (k % 2) * (bw + 20); y = H - 130 - bh - (k // 2) * (bh + 20)
    box(x, y, bw, bh, lab); lines(x + 12, y + bh - 50, bw - 24, y + 10)
c.showPage()

# ---------- months
for i in range(12):
    page(f"m{i}", MONTHS[i], f"{YEAR}  ·  tap a date to open its week", f"m{i}")
    weeks = cal.monthdatescalendar(YEAR, i + 1)
    gw = CW - 2 * M - 230; colw = gw / 7; top = H - 120
    rowh = (top - M - 20) / len(weeks)
    c.setFont("Helvetica-Bold", 10); c.setFillColor(T["soft"])
    for k, dn in enumerate(DOW): c.drawCentredString(M + colw * k + colw / 2, top - 4, dn)
    for r, wk in enumerate(weeks):
        for k, day in enumerate(wk):
            x = M + colw * k; y = top - 16 - (r + 1) * rowh
            inm = day.month == i + 1
            c.setStrokeColor(T["line"]); c.setFillColor(T["bg"] if inm else T["tint"])
            c.rect(x, y, colw, rowh, fill=1, stroke=1)
            c.setFillColor(T["ink"] if inm else T["soft"]); c.setFont("Helvetica-Bold" if inm else "Helvetica", 12)
            c.drawString(x + 8, y + rowh - 18, str(day.day))
            if inm: link(f"w{week_of(day)}", x, y, colw, rowh)
    sx = M + gw + 24; sw = 206
    box(sx, H - 120 - 300, sw, 300, "FOCUS THIS MONTH"); lines(sx + 12, H - 120 - 44, sw - 24, H - 120 - 300 + 10)
    box(sx, M + 4, sw, H - 120 - 300 - M - 24, "NOTES"); lines(sx + 12, H - 120 - 300 - 64, sw - 24, M + 14)
    c.showPage()

# ---------- weeks
for n, start in enumerate(WEEKS):
    end = start + dt.timedelta(days=6)
    sub = f"{start.strftime('%b %d')} – {end.strftime('%b %d, %Y')}"
    mi = start.month - 1 if start.year == YEAR else 0
    page(f"w{n}", f"Week {n + 1}", sub, f"m{mi}")
    # month back-link
    c.setFillColor(T["accent"]); c.setFont("Helvetica-Bold", 11)
    c.drawRightString(CW - M, H - M - 22, f"← {MONTHS[mi].upper()}"); link(f"m{mi}", CW - M - 120, H - M - 30, 120, 24)
    if n > 0:
        c.drawRightString(CW - M - 140, H - M - 22, "‹ PREV"); link(f"w{n-1}", CW - M - 200, H - M - 30, 60, 24)
    if n < len(WEEKS) - 1:
        c.drawRightString(CW - M, H - M - 44, "NEXT ›"); link(f"w{n+1}", CW - M - 60, H - M - 52, 60, 24)
    gw = CW - 2 * M; colw = (gw - 30) / 4; rh = (H - 140 - M - 16) / 2
    for k in range(8):
        x = M + (k % 4) * (colw + 10); y = H - 130 - rh - (k // 4) * (rh + 16)
        if k < 7:
            day = start + dt.timedelta(days=k)
            box(x, y, colw, rh, f"{DOW[k]}  {day.day}", T["tint"] if day.weekday() >= 5 else None)
        else:
            box(x, y, colw, rh, "PRIORITIES")
            for j in range(9):
                yy = y + rh - 50 - j * 26; c.setStrokeColor(T["soft"]); c.rect(x + 12, yy - 2, 10, 10, stroke=1, fill=0)
                c.setStrokeColor(T["line"]); c.line(x + 30, yy - 3, x + colw - 12, yy - 3)
            continue
        lines(x + 12, y + rh - 46, colw - 24, y + 8)
    c.showPage()

# ---------- habits (12)
for i in range(12):
    page("h0" if i == 0 else f"h{i}", f"Habit tracker · {MONTHS[i]}", "One square per day. Don't break the chain.", "h0")
    days = calendar.monthrange(YEAR, i + 1)[1]
    lx = M + 190; cs = min(26, (CW - M - lx) / days); top = H - 130
    c.setFont("Helvetica-Bold", 9); c.setFillColor(T["soft"])
    for dd in range(days): c.drawCentredString(lx + dd * cs + cs / 2, top + 6, str(dd + 1))
    for r in range(16):
        y = top - (r + 1) * 34
        c.setStrokeColor(T["line"]); c.line(M, y + 2, lx - 10, y + 2)
        for dd in range(days): c.roundRect(lx + dd * cs + 2, y + 4, cs - 4, cs - 4, 4, stroke=1, fill=0)
    # month switcher
    c.setFont("Helvetica-Bold", 10)
    for k in range(12):
        x = M + k * 60; c.setFillColor(T["accent"] if k == i else T["soft"]); c.drawString(x, M - 10, MON3[k])
        link(f"h{k}" if k else "h0", x - 4, M - 18, 44, 22)
    c.showPage()

# ---------- budget (12)
for i in range(12):
    page("b0" if i == 0 else f"b{i}", f"Budget · {MONTHS[i]}", "Plan it, then track it.", "b0")
    colw = (CW - 2 * M - 40) / 3; top = H - 120; bh = top - M - 30
    for k, lab in enumerate(["INCOME", "BILLS & FIXED", "SPENDING"]):
        x = M + k * (colw + 20); box(x, M + 30, colw, bh, lab)
        c.setStrokeColor(T["line"]); c.line(x + colw - 90, top - 30, x + colw - 90, M + 40)
        lines(x + 12, top - 50, colw - 24, M + 70)
        c.setFillColor(T["ink"]); c.setFont("Helvetica-Bold", 11); c.drawString(x + 12, M + 44, "TOTAL")
    c.setFont("Helvetica-Bold", 10)
    for k in range(12):
        x = M + k * 60; c.setFillColor(T["accent"] if k == i else T["soft"]); c.drawString(x, M - 10, MON3[k])
        link(f"b{k}" if k else "b0", x - 4, M - 18, 44, 22)
    c.showPage()

# ---------- notes (10)
for i in range(10):
    page("n0" if i == 0 else f"n{i}", "Notes", f"Page {i + 1} of 10", "n0")
    lines(M, H - 130, CW - 2 * M, M, 30)
    if i < 9:
        c.setFillColor(T["accent"]); c.setFont("Helvetica-Bold", 11); c.drawRightString(CW - M, H - M - 22, "NEXT ›")
        link(f"n{i+1}", CW - M - 60, H - M - 30, 60, 24)
    c.showPage()

c.save()
print("pages:", 3 + 12 + len(WEEKS) + 34, "weeks:", len(WEEKS))
