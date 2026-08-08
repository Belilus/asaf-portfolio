# Gemini brief — asaf-portfolio (seven role lenses)

Use this file to onboard Gemini on the portfolio. Upload the listed source files alongside this brief, or paste the **Ready-to-paste prompt** at the bottom.

---

## What this is

One React/Vite repo builds **seven separate recruiter-facing sites**. Each Vercel deploy locks to one audience via `VITE_PORTFOLIO_LENS`. There is **no lens switcher** in production.

| Lens | Live URL | Vercel project |
|------|----------|----------------|
| Research | https://asaf-portfolio-research.vercel.app | `asaf-portfolio-research` |
| Full-Stack | https://asaf-portfolio-fullstack.vercel.app | `asaf-portfolio-fullstack` |
| PM / Founder | https://asaf-portfolio-pm.vercel.app | `asaf-portfolio-pm` |
| Data Engineering | https://asaf-portfolio-data.vercel.app | `asaf-portfolio-data` |
| Backend | https://asaf-portfolio-backend.vercel.app | `asaf-portfolio-backend` |
| Frontend | https://asaf-portfolio-frontend.vercel.app | `asaf-portfolio-frontend` |
| SWE | https://asaf-portfolio-swe.vercel.app | `asaf-portfolio-swe-intern` |

**Repo:** https://github.com/Belilus/asaf-portfolio  
**Latest commit (content refactor):** `1d3cd0b` — lens headlines, bios, project angles  
**Workspace path:** `/Users/asafbelilus/Documents/GitHub/asaf-portfolio`

**Related repos** (for screenshot capture / deeper context, not required for copy work):

- `../SwimEdge/` — full-stack app featured in the portfolio
- `../asaf-reaserch/` — M.Sc. research pipeline (private)

---

## Architecture (60 seconds)

```
VITE_PORTFOLIO_LENS = research | fullstack | pm | data | backend | frontend
         ↓
portfolioMode.ts / lensFromUrl.ts  → lock lens, resolve URL
         ↓
lensLayout.ts                      → section order per lens
profile.ts                         → hero headline, bio, stats, resume
projects.ts                        → case studies + per-lens angles/emphasis
facts.ts                           → ALL numbers (single source of truth)
         ↓
App.tsx                            → assembles sections
components/*                       → Hero, ProjectCase, HowIWork, Skills, Contact
```

**Local preview:**

```bash
npm run dev:research
npm run dev:fullstack
npm run dev:pm
npm run dev:data
npm run dev:backend
npm run dev:frontend
npm run dev              # hub mode with lens switcher (dev only)
```

**Build one lens:**

```bash
npm run build:research   # etc.
```

---

## Section order per lens

| Section | Research | Full-Stack | PM | Data | Backend | Frontend |
|---------|:--------:|:----------:|:--:|:----:|:-------:|:--------:|
| Hero | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Featured blurb | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Research case study | full | compact | hidden | brief | brief | hidden |
| SwimEdge case study | compact | full | product | full | full | full |
| How I work | ✓ | ✓ (+ roster) | ✓ | ✓ | ✓ (+ roster) | ✓ |
| Skills | — | ✓ | — | ✓ | ✓ | ✓ |
| Contact (+ QR) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

Project depth tiers: `full` · `compact` · `product` · `brief` · `hidden` — set in `projects.ts` → `emphasis`.

---

## Files to upload (read in this order)

### Tier 1 — Content & strategy (start here)

| File | What it controls |
|------|------------------|
| `src/content/profile.ts` | Hero headline, bio, stats strip, resume per lens |
| `src/content/projects.ts` | Both case studies (~600 lines), angles, emphasis, media slots |
| `src/content/lensLayout.ts` | Section order, featured blurbs, contact options |
| `src/content/facts.ts` | Every load-bearing number — **do not invent metrics** |
| `src/content/lensMeta.ts` | Page titles, OG descriptions, share URLs |
| `src/content/ai-evidence.ts` | "How I work" cards + agent roster (fullstack) |
| `src/content/skills.ts` | Skills taxonomy (fullstack + data lenses) |

### Tier 2 — Layout & components

| File | What it controls |
|------|------------------|
| `src/App.tsx` | Section orchestration, theme, lens state |
| `src/components/Hero.tsx` | Hero layout, lens switcher (dev only) |
| `src/components/ProjectCase.tsx` | Case study rendering, metrics, architecture flow |
| `src/components/HowIWork.tsx` | How I work section |
| `src/components/Contact.tsx` | Contact, QR share card |
| `src/components/Skills.tsx` | Skills grid |
| `src/components/Nav.tsx` | Sticky nav links per lens |
| `src/components/primitives.tsx` | Cards, buttons, `MediaPlaceholder` |

### Tier 3 — Visual design

| File | What it controls |
|------|------------------|
| `src/index.css` | Design tokens, Deep Water dark theme |
| `src/styles/portal.css` | Portal card / layout utilities |
| `src/styles/fonts.css` | IBM Plex fonts |
| `index.html` | Meta tags shell |

### Tier 4 — Deploy & tooling

| File | What it controls |
|------|------------------|
| `src/lib/portfolioMode.ts` | `lockedLens()`, single-lens site detection |
| `src/lib/lensFromUrl.ts` | Path/query lens resolution |
| `deploy/DEPLOY.md` | Seven-site Vercel setup |
| `package.json` | `dev:*` and `build:*` scripts |
| `scripts/capture-swimedge-media.mjs` | Playwright screenshot capture |
| `public/media/README.md` | Media slot documentation |

---

## Non-negotiables for any Gemini edit

1. **Numbers** — only change metrics in `facts.ts`; copy elsewhere must interpolate from there.
2. **Seven sites, not one** — each lens is a separate deploy; no cross-lens switcher in production.
3. **Do not over-claim** — SwimEdge is not nationally deployed; ISA demo Jul 2026, discussions ongoing.
4. **How I work** — AI as orchestration with human gates; not "AI wrote my code."
5. **Research test count** — `totalResearchTests` = pipeline + lab suites from `facts.ts` (currently 111).
6. **Do not edit** — `.cursor/plans/four-lens_portfolio_profiles_0c30d638.plan.md`

---

## Known improvement areas (as of Aug 2026)

- Hero + Featured + case-study opener can feel **redundant** (three intros before proof).
- Pages are **text-heavy** (~13k+ chars on fullstack); weak recruiter scan-ability.
- **PM hero** was shortened in `1d3cd0b` but case study may still read engineering-heavy.
- **Research lens** still shows SwimEdge in compact — may dilute research focus.
- Screenshots live in `public/media/` on deploy; capture via `npm run capture:swimedge` (needs SwimEdge on :5173 + :8080).
- Old URL `asaf-portfolio-ten.vercel.app` is **dead** — use `asaf-portfolio-research.vercel.app`.

---

## How to use with Gemini

### Google AI Studio (recommended for copy work)

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Start a new chat → **Add file** → upload Tier 1 files + this `GEMINI-BRIEF.md`
3. Paste the prompt below
4. For UX feedback, also open the seven live URLs in another tab and describe what you see

### Gemini chat (with file upload)

Upload the same Tier 1 bundle. If file limit is tight, minimum set:

```
profile.ts + projects.ts + lensLayout.ts + facts.ts + GEMINI-BRIEF.md
```

### Gemini + GitHub

Point at: `https://github.com/Belilus/asaf-portfolio` branch `main`, commit `1d3cd0b` or later.

### Cursor / IDE

Open `asaf-portfolio` as workspace root; `@`-mention files from the table above.

---

## Ready-to-paste prompt

Copy everything inside the block below into Gemini after uploading the files.

---

```
You are reviewing and improving a seven-lens portfolio (research, fullstack, pm, data, backend, frontend, SWE) built from one React/Vite repo. Each lens is a separate Vercel site locked by VITE_PORTFOLIO_LENS — no tab switcher in production.

I attached GEMINI-BRIEF.md plus the content source files. Read them before proposing changes.

Goals:
1. Stronger above-the-fold hook — a recruiter should grasp my positioning in 5 seconds.
2. Less narrative repetition across hero → featured → case study opener.
3. Sharper per-lens differentiation — research reads like a CV/ML researcher, fullstack like an end-to-end engineer, PM like a founder/PM, data like a pipeline engineer, and SWE like a concise general software engineer.
4. Better scan-ability — shorter paragraphs, clearer hierarchy, less wall-of-text.
5. Recruiter-friendly language on PM and research lenses; technical depth on fullstack and data.

Constraints:
- Do NOT invent or change numbers except in facts.ts (single source of truth).
- Do NOT over-claim SwimEdge national deployment.
- Keep "How I work" framed as AI orchestration with human gates, not autopilot coding.
- Respect project emphasis tiers (full / compact / product / brief / hidden) per lens.
- Propose concrete edits with file paths and before/after snippets.

Live sites to mentally compare (seven separate URLs):
- Research: https://asaf-portfolio-research.vercel.app
- Full-Stack: https://asaf-portfolio-fullstack.vercel.app
- PM: https://asaf-portfolio-pm.vercel.app
- Data Engineering: https://asaf-portfolio-data.vercel.app
- Backend: https://asaf-portfolio-backend.vercel.app
- Frontend: https://asaf-portfolio-frontend.vercel.app
- SWE: https://asaf-portfolio-swe.vercel.app

Start by listing the top 5 issues you see across all seven lenses, then propose prioritized edits to profile.ts, lensLayout.ts, and projects.ts.
```

---

## Quick reference — key metrics (from facts.ts)

| Domain | Metric | Value |
|--------|--------|-------|
| Research | Best frame (lower bound) | 2.1 mm |
| Research | Honest baseline (frame 60) | 6.6 mm |
| Research | Regression tests (both suites) | 111 |
| SwimEdge | Backend tests | 579 |
| SwimEdge | Frontend tests | 232 |
| SwimEdge | Flyway migrations | V1–V23 |
| SwimEdge | Roles | 6 |
| SwimEdge | Imported results | 47,509 across 17 meets |
| Swimdata | Bilingual match rate | 98.3% |
| Swimdata | Name variants → clubs | 105 → 72 |

Verify against `src/content/facts.ts` before quoting — numbers may have been updated since this brief was written.
