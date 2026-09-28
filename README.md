# SoftFix — agency landing page

Landing page for **SoftFix**, a software solutions studio. *Build. Fix. Scale.*

Built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lenis and Lucide.
Design system and brand rules live in [DESIGN.md](DESIGN.md).

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Project structure

```
src/
  components/
    brand/       Logo (wordmark + icon, traced from the brand guideline), BrandShape (3D pieces)
    layout/      Navbar (top nav + floating pill nav + mobile menu), Footer
    ui/          FadeIn, Magnet, AnimatedText, Buttons, ProjectImage
  sections/      Hero, Marquee, About, Services, Projects, CaseStudy, WhyUs, Process, Contact
  data/          site.ts, services.ts, projects.ts, process.ts  ← edit content here
  lib/scroll.ts  Lenis smooth scroll + anchor helpers
public/
  projects/<slug>/   blurred, web-ready screenshots (WebP, 800w + 1600w)
scripts/
  prepare-assets.py  blurs private data in raw screenshots and exports WebP
```

## Adding a project

1. Put raw screenshots in `Assets/` (git-ignored — they may contain private data).
2. Add an entry to `SHOTS` in `scripts/prepare-assets.py` with a blur box for every
   name, email, avatar, client URL or captured screen, then run `npm run assets`
   (needs `pip install pillow`). **Check the output images before committing.**
3. Add a `Project` to `src/data/projects.ts`. It automatically appears in the
   marquee, the stacked project cards and — if it has a `caseStudy` — its own
   case-study section.

## Before launch

- Set the real inbox in `src/data/site.ts` (`email` is a placeholder) and fill in the
  social profile URLs (empty ones are hidden).
- Add the production domain to `og:image` / canonical tags in `index.html` if the
  host needs absolute URLs.
- The contact form opens the visitor's email app (`mailto:`). Swap `onSubmit` in
  `src/sections/Contact.tsx` for a form service or API when one is available.
