# HeyAmara ✦

**A members-club events experience** — a curated events list and a deep event-detail page with a two-step RSVP flow, built for a private club of the best recruiters in the world.

This is a take-home project. The goal was to make something that feels like a *place* you'd want to be a member of — premium, opinionated, and the opposite of corporate.

---

## What it is / what to look at

**Events list page** — a collection of member experiences (dinners, masterminds, workshops, retreats) with:
- Grid and list view toggle
- Filtering by type
- A mobile bottom-sheet for filters

**Event detail page** — the centerpiece. A full deep-dive on a single experience:
- A cinematic hero
- About section
- An agenda timeline
- A map card
- A sticky sidebar with the key details and the RSVP entry point

**The RSVP modal** — the standout interaction. It's a two-step flow with:
- An animated seat map that fills from 9 → 10 as you claim your spot
- A confetti moment on confirmation
- A real, downloadable `.ics` calendar file so the event lands in your calendar

---

## Design language

The look is a set of deliberate rules, not defaults. The intent: feel expensive, feel un-corporate.

- **Violet / cosmic dark palette.** A custom `ink` (neutrals) and `brand` (violets) token scale lives in [`tailwind.config.js`](./tailwind.config.js), with the surface system in [`src/index.css`](./src/index.css).
- **Hairlines are never white.** Dividers and edges use violet gradient hairlines — white lines read as cheap on dark.
- **Frosted glass + masked gradient borders.** Surfaces are translucent and blurred; "borders" are masked violet gradients (`.grad-card`) rather than hard 1px lines.
- **One shared easing curve.** `[0.16, 1, 0.3, 1]` everywhere, so all motion feels like it belongs to the same hand.
- **A canvas starfield backdrop** with depth parallax for a sense of atmosphere and space.
- **Type:** Fraunces (display serif) + Inter (text).

---

## Engineering notes

Things built in with production instinct:

- **Motion respects the user.** `useReducedMotion` is honored in every animated component — animations gracefully reduce rather than disappear or break.
- **Accessibility.** aria-labels and roles, focus-visible rings, `aria-live` regions, and a modal that is focus-trapped and scroll-locked while open.
- **Resilient images.** Lazy-loaded shimmer skeletons, gradient fallbacks for covers, and initials-on-error avatars — nothing renders as a broken image.
- **Performance-aware canvas.** The starfield caps `devicePixelRatio`, runs a single `requestAnimationFrame` loop, and cleans up properly on unmount.

---

## Tech stack

- **React 19** + **Vite**
- **Tailwind 3** (custom token scale)
- **framer-motion** for animation
- **react-router-dom** for routing

Data is mocked in [`src/data/`](./src/data) — there's no backend; the focus is the front-end experience.

> **Trade-off, owned:** I skipped TypeScript here in favor of velocity on a short take-home. For a real codebase of this size I'd reach for TS — the speed win was the right call for the scope, not a stance against it.

---

## How I used AI to build this

I treated AI as a way to explore breadth fast, then used my own taste as the filter, then engineered carefully to productionize. Concretely:

1. **Parallel exploration.** I spawned 3 agents in parallel to turn the brief into an HTML artifact — each using a *different* design skill (`ui-ux-promax`, `taste-skill`, `frontend-design`). I reviewed all three and picked the strongest structure.
2. **Variant generation.** I took that winning page and generated 5 full-page variants from it, then chose the best one.
3. **Section-level refinement.** I reviewed the chosen variant section by section. For any section I wasn't happy with, I regenerated variations targeted at *just that section* and swapped in the winner.
4. **Assembly + hardening.** I wired the approved sections into one complete HTML page, then transformed it into this real React codebase — hardening animation, performance, and edge cases by hand.

The throughline: **AI for the breadth and speed of exploration, human taste as the filter, then careful engineering to make it real.**

---

## Run locally

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server
npm run build    # production build
npm run lint     # lint with oxlint
```

Then open the local URL Vite prints (usually `http://localhost:5173`).
