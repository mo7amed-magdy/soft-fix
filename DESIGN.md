---
version: 1.0
name: SoftFix-design-system
description: "A near-black, blue-tinted canvas (#05080F) carrying the SoftFix brand identity: royal blue #004BF6 and electric cyan #00F2E4 used together as one gradient, with navy #0E1B2B as the brand's quiet surface. Display type is Kanit Black set huge, uppercase and tight, filled with a cool silver gradient; body copy is Figtree (a free stand-in for the brand's Avenir Next); technical labels are JetBrains Mono with `{/}` markers. The checkmark-in-a-split-frame icon is the signature — it ticks, draws and extrudes throughout the page. Motion is scroll-driven and purposeful: reveals, sticky stacking, magnetic hover."

colors:
  brand-blue: "#004BF6"       # primary brand colour (logo frame, fills, CTAs)
  brand-cyan: "#00F2E4"       # accent; always paired with blue or navy
  brand-navy: "#0E1B2B"       # brand dark surface (tiles, light-section text)
  brand-sky: "#4D8BFF"        # blue lifted for small text/icons on dark (AA)
  canvas: "#05080F"           # page background
  surface-1: "#0A101C"
  surface-2: "#0E1624"
  surface-3: "#132033"
  ink: "#D7E2EA"              # primary text on dark
  ink-muted: "#9AA8BA"        # secondary text (≥4.5:1 on canvas)
  ink-subtle: "#6B7A90"       # labels, meta (large/mono only)
  line: "rgba(215,226,234,0.12)"
  white: "#FFFFFF"            # light sections (Services)
  gradient-brand: "linear-gradient(90deg, #004BF6, #00F2E4)"
  gradient-silver: "linear-gradient(180deg, #5E6E86, #DCE7F2)"
  gradient-cta: "linear-gradient(123deg, #00123D 7%, #004BF6 38%, #1668FF 70%, #00CBE6 100%)"

typography:
  display:
    fontFamily: Kanit
    fontWeight: 900
    textTransform: uppercase
    fontSize: "clamp(3rem, 12vw, 160px)"
    lineHeight: 1.0
    letterSpacing: tight
    fill: gradient-silver
  display-number:
    fontFamily: Kanit
    fontWeight: 900
    fontSize: "clamp(3rem, 10vw, 140px)"
    lineHeight: 0.8
  title:
    fontFamily: Kanit
    fontWeight: 500
    textTransform: uppercase
    fontSize: "clamp(1rem, 2.2vw, 2.1rem)"
  body-lg:
    fontFamily: Figtree
    fontWeight: 400
    fontSize: "clamp(1rem, 2vw, 1.35rem)"
    lineHeight: 1.65
  body:
    fontFamily: Figtree
    fontSize: 16px
    lineHeight: 1.6
  eyebrow:
    fontFamily: JetBrains Mono
    fontSize: 11-12px
    fontWeight: 500
    textTransform: uppercase
    letterSpacing: 0.18em
    prefix: "{/}"
  button:
    fontFamily: Figtree
    fontWeight: 500
    textTransform: uppercase
    letterSpacing: 0.1em

rounded:
  chip: 9999px
  button: 9999px
  card: 24-32px
  section-top: "40px / 50px / 60px (sm / md)"
  stack-card: "40px / 50px / 60px"
  app-tile: 28%

spacing:
  gutter: "20px / 24px / 40px (mobile / sm / md)"
  section: "96px → 128px vertical"
  container: 1280px (max-w-7xl)

components:
  button-primary: "pill, gradient-cta body, inset 4px 4px 12px #2F7BFF, 2px white outline at -3px offset, white uppercase label + ArrowUpRight that rotates 45° on hover, scale 1.03 hover"
  button-ghost: "pill, 2px ink border, ink text, bg ink/10 on hover (navy variant on white)"
  glass-card: "surface-1 at 70-75% + backdrop-blur-xl, 1px white/10 border, blue glow shadow 0 30px 120px -20px rgba(0,75,246,.6)"
  framed-card: "1px line border with crosshair corner marks (::before/::after)"
  statement-tile: "brand poster — solid blue / cyan / navy / white / black, Kanit Black uppercase lines, mono meta 'SoftFix / Brand identity' + 'Software solution startup · 2026', brand icon top-right"
  browser-frame: "surface-1 shell, 3 dots, host pill, screenshot inside rounded-2xl"
  chip: "mono 11px uppercase, rounded-full, white/5 fill or 1px border"
  navbar: "fixed, centred glass pill (radius 18px, #070B14 at 40% → 80% once scrolled, 1px white/8 border, blur-xl): logo · links with a small ↗ mark top-right · white 'Start a project ›' button (radius 12px). Links inline from lg (1024px); tablet = logo + CTA + menu; phone = logo + menu"
  lightbox: "tap any project screenshot to open it full-screen; pans sideways on phones, fits the screen on desktop"
---

# SoftFix — design system

## Brand source

Everything here derives from **SoftFix Brand Identity (2026)**:

- **Logo** — the stencil-cut SOFTFIX wordmark whose "O" is the icon. Traced to vector
  in `src/components/brand/paths.ts`; never retype the name in a font as a logo.
- **Icon** — a check inside a frame split into two chamfered pieces. Colour version:
  blue frame, blue→cyan check. Light version: white/silver frame, gradient check.
  Mono version: single colour.
- **Palette** — Blue `#004BF6`, Cyan `#00F2E4`, Navy `#0E1B2B`, White, Black, and the
  blue→cyan gradient. Cyan is an accent: never large cyan text on white.
- **Type** — Avenir Next (primary) / GE SS Two & IBM Plex Sans Arabic (Arabic). The
  site uses Figtree as the free web stand-in for Avenir Next; Kanit Black for display.
- **Voice** — from the brand posters: *Build. Fix. Scale.* · *Automate the chaos.* ·
  *More than a contract — a long-term partnership.* · *We don't just build software.
  We build growth engines.*

## Principles

1. **One chromatic idea.** Blue and cyan appear together as a gradient or as
   blue-with-cyan-accent. Don't introduce other hues (success/error states excepted).
2. **The check is the motif.** Use it for progress, completion and list bullets in
   process contexts (launch card, process steps, tech strip separators).
3. **Huge, silver, uppercase headings; quiet body.** Headings carry the drama, body
   copy stays calm (ink / ink-muted, 1.6 line height, ≤ 70ch).
4. **Show real work.** Product screenshots in browser frames beat illustrations.
   Blur every name, email, avatar, client URL and captured screen before publishing
   (`scripts/prepare-assets.py`).
5. **Motion explains.** Scroll reveals, sticky stacks and the ticking check all
   express progress. Everything respects `prefers-reduced-motion`.

## Page rhythm

| Section | Surface | Signature move |
|---|---|---|
| Navbar | glass pill, fixed | alpha-x style; active section gets a sliding highlight |
| Hero | canvas + aurora beams + dot grid | wordmark letters rise, check draws, magnetic launch card ticks through steps |
| Marquee | canvas | two scroll-linked rows: screenshots ↔ brand statement posters |
| About | canvas | extruded icon pieces slide in from corners; char-by-char scroll reveal |
| Services | **white**, rounded top | huge numbers, hover turns number + chips blue |
| Projects | canvas, rounded top overlapping white | sticky stacking cards scaling to 0.97 |
| Case study | canvas | problem/solution/outcome framed cards, count-up facts, sticky chapter index |
| Why us | canvas + blue glow | word-by-word statement reveal, crosshair cards |
| Process | canvas | gradient track fills on scroll; each step's check ticks |
| Contact | canvas + glow | glass form, inline validation, mailto hand-off |
| Footer | canvas | oversized ghost wordmark bleeding off the edge |

## Do / Don't

- ✅ Keep text on dark at ink or ink-muted; use `brand-sky` (not `brand-blue`) for small blue text.
- ✅ Pair every icon-only control with an accessible label; keep 44px touch targets.
- ✅ Keep one primary (gradient) CTA per view; secondary actions use the ghost pill.
- ❌ Don't place cyan text on white, or blue `#004BF6` body text on canvas (fails AA).
- ❌ Don't use emoji as icons — Lucide only, 1.5–2.2 stroke.
- ❌ Don't animate layout properties; transform/opacity only.
