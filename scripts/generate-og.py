#!/usr/bin/env python3
"""Generates public/images/og.png — the OpenGraph social share image."""

from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

WIDTH, HEIGHT = 1200, 630
BG           = (0,   0,   0)     # black
TEXT_DARK    = (255, 255, 255)   # white
TEXT_MED     = (220, 220, 220)   # off-white
TEXT_LIGHT   = (170, 170, 170)   # light grey
TEXT_LIGHTER = (120, 120, 120)   # muted grey

# ── Base canvas ────────────────────────────────────────────────────────────
img  = Image.new('RGB', (WIDTH, HEIGHT), BG)
draw = ImageDraw.Draw(img)

# ── Headshot (right half, full bleed) ──────────────────────────────────────
hs_path = os.path.join(ROOT, 'images', 'headshot.png')
headshot = Image.open(hs_path).convert('RGB')
headshot = headshot.resize((HEIGHT, HEIGHT), Image.LANCZOS)   # 630×630
img.paste(headshot, (WIDTH - HEIGHT, 0))

# Gradient fade: headshot fades to black on its left edge
fade_width = 280
for x in range(fade_width):
    t       = x / fade_width          # 0 = black, 1 = headshot
    alpha   = int(255 * (1 - t))      # opaque black → transparent
    overlay = Image.new('RGB', (1, HEIGHT), BG)
    mask    = Image.new('L',   (1, HEIGHT), alpha)
    img.paste(overlay, (WIDTH - HEIGHT + x, 0), mask)

# Also darken the headshot overall for contrast
dark_overlay = Image.new('RGB', (HEIGHT, HEIGHT), (0, 0, 0))
dark_mask    = Image.new('L',   (HEIGHT, HEIGHT), 80)   # ~30% dark veil
img.paste(dark_overlay, (WIDTH - HEIGHT, 0), dark_mask)

# ── Fonts ──────────────────────────────────────────────────────────────────
try:
    font_name = ImageFont.truetype(os.path.join(ROOT, 'fonts', 'crankreg.ttf'), 80)
except Exception as e:
    print(f'  crankreg not loaded: {e}')
    font_name = ImageFont.load_default()

SYSTEM_FONT = '/System/Library/Fonts/Helvetica.ttc'
try:
    font_role  = ImageFont.truetype(SYSTEM_FONT, 22)
    font_small = ImageFont.truetype(SYSTEM_FONT, 17)
    font_url   = ImageFont.truetype(SYSTEM_FONT, 15)
except Exception as e:
    print(f'  system font not loaded: {e}')
    font_role = font_small = font_url = ImageFont.load_default()

# ── Text ───────────────────────────────────────────────────────────────────
LEFT = 68

draw.text((LEFT, 212), 'Allison Crank',                    font=font_name,  fill=TEXT_DARK)
draw.text((LEFT, 316), 'Interaction Designer & Researcher', font=font_role,  fill=TEXT_MED)
draw.text((LEFT, 350), 'Paris',                             font=font_small, fill=TEXT_LIGHT)
draw.text((LEFT, 378), 'Founder, Crank Studio',             font=font_small, fill=TEXT_LIGHT)
draw.text((LEFT, 575), 'allisoncrank.com',                  font=font_url,   fill=TEXT_LIGHTER)

# ── Save ───────────────────────────────────────────────────────────────────
out_dir = os.path.join(ROOT, 'public', 'images')
os.makedirs(out_dir, exist_ok=True)
out_path = os.path.join(out_dir, 'og.png')
img.save(out_path, 'PNG', optimize=True)
print(f'✓  Saved → {out_path}')
print(f'   Size: {img.size[0]}×{img.size[1]}px')
