#!/usr/bin/env python3
"""Generates public/images/og.png - the OpenGraph social share image.
Design: Allison Crank in crankreg.ttf, brand gradient fill, near-black background."""

from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

W, H  = 1200, 630
scale = 3
SW, SH = W * scale, H * scale

font_path = os.path.join(ROOT, 'fonts', 'crankreg.ttf')

# Scale font to fill ~82% of canvas width
target_w = SW * 0.82
font_size = int(SH * 0.55)
font = ImageFont.truetype(font_path, font_size)
draw_tmp = ImageDraw.Draw(Image.new('L', (SW, SH)))
bbox = draw_tmp.textbbox((0, 0), 'Allison Crank', font=font)
font_size = int(font_size * target_w / (bbox[2] - bbox[0]))
font = ImageFont.truetype(font_path, font_size)
draw_tmp = ImageDraw.Draw(Image.new('L', (SW, SH)))
bbox = draw_tmp.textbbox((0, 0), 'Allison Crank', font=font)
text_w = bbox[2] - bbox[0]
text_h = bbox[3] - bbox[1]
x = (SW - text_w) // 2 - bbox[0]
y = (SH - text_h) // 2 - bbox[1]

# Near-black background
bg = Image.new('RGB', (SW, SH), (10, 10, 12))

# Text mask
mask = Image.new('L', (SW, SH), 0)
ImageDraw.Draw(mask).text((x, y), 'Allison Crank', font=font, fill=255)

# Horizontal gradient: #2c1e4a -> #d5825e -> #96a1cd
gradient = Image.new('RGB', (SW, SH))
grad_draw = ImageDraw.Draw(gradient)
stops = [
    (0.00, (44,  30,  74)),
    (0.42, (213, 130,  94)),
    (0.72, (169, 154, 184)),
    (1.00, (150, 161, 205)),
]
for px in range(SW):
    t = px / (SW - 1)
    for i in range(len(stops) - 1):
        t0, c0 = stops[i]
        t1, c1 = stops[i + 1]
        if t0 <= t <= t1:
            f = (t - t0) / (t1 - t0)
            r = int(c0[0] + f * (c1[0] - c0[0]))
            g = int(c0[1] + f * (c1[1] - c0[1]))
            b = int(c0[2] + f * (c1[2] - c0[2]))
            grad_draw.line([(px, 0), (px, SH)], fill=(r, g, b))
            break

# Composite gradient text over background
out = bg.copy()
out.paste(gradient, mask=mask)
out = out.resize((W, H), Image.LANCZOS)

out_path = os.path.join(ROOT, 'public', 'images', 'og.png')
os.makedirs(os.path.dirname(out_path), exist_ok=True)
out.save(out_path, 'PNG', optimize=True)
print(f'Saved -> {out_path}')
print(f'Size: {out.size[0]}x{out.size[1]}px')
