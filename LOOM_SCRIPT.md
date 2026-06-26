# Loom Walkthrough Script — HeyAmara Take-Home

**Target length:** ~4–5 min. Conversational, not read-aloud-stiff. Talk like you're showing a teammate, not presenting to a board.

**Setup before you hit record:**
- Browser on the **events list page** (`npm run dev`), full screen, nothing else visible.
- A second tab or split for the **codebase** (VS Code) for the ~45s code moment.
- Have the **RSVP modal** flow ready to demo — it's your "wow" moment, don't fumble it.
- Mic check. Smile while talking; it carries.

> Screen cues are in **[brackets]**. Everything else is what you say.

---

## 0. Cold open (0:00–0:20) — hook, no throat-clearing

**[On the events list page, hero in view]**

> Hey Harvey — thanks for the brief. I'm going to walk you through what I built, but more importantly *how* I built it, because I think the process is the actual signal here.
>
> Quick version: this is HeyAmara — an events experience for the club. A list of upcoming experiences, a deep detail page for each one, and a request-to-attend flow. Built in React, Tailwind, and framer-motion. Let me show you the thinking first, then the product.

---

## 1. The approach — how I used AI (0:20–1:30) — THIS is your differentiator

> You said the bar is taste plus maxing out AI, so let me be specific about my workflow, because I don't just one-shot a prompt and ship it.
>
> **Step one — breadth.** I took your brief and spun up three agents in parallel, each running a different design skill — one tuned for UI/UX, one for taste, one for front-end craft. Three genuinely different directions, fast. Then I reviewed them and picked the strongest *structure* — not the prettiest, the best bones.
>
> **Step two — variation.** I took that winner and generated five full-page variants off it. Same structure, different executions. Picked the best one again.
>
> **Step three — this is where the taste filter does the work.** I went through that page section by section. Hero, list, detail, footer — one at a time. Any section I wasn't happy with, I sent back for targeted variations of *just that section* until it earned its place. Nothing ships because the AI made it; it ships because I chose it.
>
> **Step four — productionize.** Once every section was approved, I wired them into one complete HTML page, then transformed that into this real React codebase — and hardened the parts AI doesn't get right on its own: animation timing, performance, and edge cases.
>
> So the shape of it is: **AI for breadth and speed, my taste as the filter, then real engineering to make it production-grade.** That's how I'd work on your team day to day.

---

## 2. Product walkthrough — the list page (1:30–2:20)

**[Scroll the list page slowly]**

> Now the product. This is the list. First thing — it's deliberately *not* another corporate CRM grid. Dark, violet, a little cosmic. There's a real starfield in the background that reacts to your cursor.
>
> **[Toggle Grid → List view]**
> Two views — a visual grid and a denser ledger list, grouped by month. Same data, different intent.
>
> **[Open a filter, pick a format, then a city]**
> Filtering by format and city, with the applied filters animating in and out. On mobile this whole thing becomes a bottom sheet — I built for both.
>
> **[Hover a card]**
> Every card lifts, the cover zooms, the register chip lights up. Small moments, but they're what make it feel alive instead of static.

---

## 3. The detail page (2:20–3:10)

**[Click into an event — ideally NOT the founders' table first, to prove they're all real]**

> Click any event and you get its own full detail page — and I want to call this out: **every event is fully authored.** Hero, the story, an agenda timeline, hosts, who's at the table, a stylized map. This isn't one template with the name swapped — online events drop the map and read differently, in-person events get the venue and directions.
>
> **[Scroll through About → Agenda → Details/map]**
> The agenda is a timeline with a connecting rail and custom glyphs. The map's a hand-drawn SVG with a pulsing pin — no Google Maps embed, because that would've looked generic and corporate, which is exactly what you said you don't want.
>
> **[Pause on the sidebar]**
> The sidebar's the conversion anchor — date, location, hosts, the people already going, and the call to action.

---

## 4. The RSVP flow — the centerpiece (3:10–3:55)

**[Click "Request to Attend" — let the modal animation play]**

> And this is the moment I'm most proud of. Request to attend — clean two-step flow, validates name and email.
>
> **[Submit the form, let the confirmation play fully — don't talk over the animation]**
> ...and watch this. The table has twelve seats, nine taken. Your seat springs into place — nine becomes ten — confetti, and a real calendar file you can download. It's a tiny celebration that makes saying yes feel like something.
>
> Under the hood it's accessible — focus-trapped, escape-to-close, and it fully respects reduced-motion: if you've got that on, all of this collapses to something calm and static. That mattered to me.

---

## 5. The engineering rigor — 45s of code (3:55–4:35)

**[Switch to VS Code]**

> Quick peek under the hood, because the polish isn't an accident.
>
> **[Show index.css design tokens / tailwind.config]**
> There's an actual design system — a token scale for color, one rule that hairlines are never white, one shared easing curve the whole app animates on. That consistency is what makes it read as expensive.
>
> **[Show a component using useReducedMotion, and LazyImage]**
> Every animated component honors reduced-motion. Images lazy-load with a shimmer and fall back gracefully if a URL dies. The background canvas caps device pixel ratio and cleans itself up. These are the edge cases that separate a demo from something you'd actually launch.

---

## 6. Close (4:35–5:00)

**[Back to the live site, hero]**

> So that's it — built fast with AI for exploration, filtered hard by taste, and finished like production code. If I were on the team, the goal would be to take the front-end work off your plate entirely so you're not the bottleneck anymore.
>
> The brief said move fast — so did I. Happy to walk through any of it on the call. Thanks Harvey.

**[Stop recording]**

---

## Tight version (if you want it under 3 min)
Cut **Section 5** (code) down to two sentences over the live site, and trim Section 2 to just the Grid/List toggle + one hover. Keep Sections 1 (the AI workflow) and 4 (the RSVP modal) at full length — those two are what win you the role.

## Delivery notes
- **Don't narrate the obvious** ("here's a button"). Narrate the *decision* behind it.
- **Let the RSVP animation breathe** — silence over a good animation reads as confidence.
- One take is fine. Energy beats polish on a Loom.
- If you flub a line, just pause and restate — Loom viewers expect human.
