"""
Prepare project screenshots for the public site.

Reads raw screenshots from ./Assets (never committed), blurs every region that
contains private data (people, emails, avatars, client / project names, client
URLs, captured screens), and writes web-ready WebP files to
./public/projects/<slug>/ in two widths (1600 and 800).

Usage:  python scripts/prepare-assets.py
Needs:  pip install pillow
"""

from pathlib import Path
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "Assets"
OUT = ROOT / "public" / "projects"

# Regions are (left, top, right, bottom) in source-pixel coordinates.
USER_CARD = lambda h: (0, h - 48, 250, h)  # signed-in user card, bottom-left

SHOTS = {
    "virtual-tracker": [
        {
            "src": "Screenshot 2026-09-28 044240.png",
            "out": "dashboard",
            "blur": [(1348, 500, 1500, 714)],  # project-health names
        },
        {
            "src": "Screenshot 2026-09-28 044326.png",
            "out": "timesheets",
            "blur": ["user"],
        },
        {
            "src": "Screenshot 2026-09-28 044421.png",
            "out": "activity-screenshots",
            "blur": [
                # people in the four summary cards
                (300, 310, 420, 362), (686, 326, 800, 377),
                (1072, 326, 1180, 377), (1460, 328, 1570, 379),
                # captured screens (row 1 + row 2)
                *[(x, 405, x + 371, 613) for x in (290, 677, 1064, 1450)],
                *[(x, 701, x + 371, 897) for x in (290, 677, 1064, 1450)],
                # member name + app/team line under each capture
                *[(x + 4, 620, x + 280, 680) for x in (290, 677, 1064, 1450)],
                "user",
            ],
            # keep the activity % badges readable on top of the blurred captures
            "keep": [
                (615, 410, 656, 440), (1001, 410, 1043, 440),
                (1383, 410, 1431, 440), (1775, 410, 1815, 440),
                (608, 706, 656, 736), (1001, 706, 1043, 736),
                (1387, 706, 1431, 736), (1775, 706, 1815, 736),
            ],
        },
        {
            "src": "Screenshot 2026-09-28 044459.png",
            "out": "apps",
            "blur": ["user"],
        },
        {
            "src": "Screenshot 2026-09-28 044535.png",
            "out": "urls",
            # client sites, CRM names, a street address, chat IDs
            "blur": [(344, 368, 670, 892), "user"],
        },
        {
            "src": "Screenshot 2026-09-28 044613.png",
            "out": "projects",
            "blur": [(340, 384, 540, 802), "user"],
        },
        {
            "src": "Screenshot 2026-09-28 044707.png",
            "out": "reports",
            "blur": [],
        },
        {
            "src": "Screenshot 2026-09-28 044730.png",
            "out": "members",
            "blur": [(372, 246, 660, 824), (0, 862, 250, 882)],
        },
        {
            "src": "Screenshot 2026-09-28 044759.png",
            "out": "daily-report",
            "blur": [(434, 732, 640, 912), "user"],
        },
        {
            "src": "Screenshot 2026-09-28 044851.png",
            "out": "landing",
            "blur": [],
        },
    ]
}

WIDTHS = (1600, 800)


def blur_region(img: Image.Image, box) -> None:
    region = img.crop(box)
    # pixelate first so nothing is recoverable, then soften for a frosted look
    w, h = region.size
    small = region.resize((max(1, w // 14), max(1, h // 14)), Image.BILINEAR)
    region = small.resize((w, h), Image.BILINEAR).filter(ImageFilter.GaussianBlur(6))
    img.paste(region, box)


def main() -> None:
    for slug, shots in SHOTS.items():
        dest = OUT / slug
        dest.mkdir(parents=True, exist_ok=True)
        for shot in shots:
            img = Image.open(SRC / shot["src"]).convert("RGB")
            original = img.copy()
            for box in shot["blur"]:
                blur_region(img, USER_CARD(img.height) if box == "user" else box)
            for box in shot.get("keep", []):
                img.paste(original.crop(box), box)
            for width in WIDTHS:
                scaled = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
                name = f"{shot['out']}-{width}.webp"
                scaled.save(dest / name, "WEBP", quality=84, method=6)
                print(f"  {slug}/{name}  {scaled.size[0]}x{scaled.size[1]}")


if __name__ == "__main__":
    main()
