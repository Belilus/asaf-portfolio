# Portfolio handoff — remaining work for Claude

**Repo:** `asaf-portfolio` (React 18 + Vite + TypeScript + Tailwind)  
**Status:** Copy, structure, lens model, and counted metrics are done. Media slots are empty.

---

## Already confirmed / fixed (do not redo)

### Q1 — Professor names ✅
Asaf approved the correct spellings. Portfolio already uses them:
- **Gera Weiss** (not Wiess)
- **Raziel Riemer** (not Reimer)

Locations: `src/content/projects.ts` (research role line), `src/content/profile.ts` (education).

**Still needed:** Fix the same spellings in the Word CVs under `CV'S/` before regenerating PDFs into `public/resume/`.

### Q2 — SwimEdge numbers ✅
Portfolio already uses counted values (23 migrations, 30 controllers, 40 services).  
Cursor fixed the stale **SwimEdge README** (`newSwimEdge/README.md`) and demo script comments (V43 → V23, dropped "14 service domains").

Do **not** change portfolio migration counts — they are correct.

---

## Q3 — Media slots (your main task)

`public/media/` is empty except `README.md`. Seven placeholders render in `ProjectCase.tsx` until each slot gets a `file` property in `src/content/projects.ts`.

### How to wire (one line per image)

1. Save image → `public/media/<filename>`
2. Add `file: '<filename>'` to the matching entry in `projects.ts` `media` array

No component changes needed — `MediaPlaceholder` in `src/components/primitives.tsx` handles it.

### SwimEdge — 4 screenshots (capture from demo DB)

**Critical:** Reseed demo data first — never screenshot prod.

```bash
cd newSwimEdge
bash scripts/demo/reset-all-demo.sh
bash scripts/demo/preflight-demo-b.sh
# backend :8080, frontend :5173
```

Demo logins: `scripts/demo/README.md` (e.g. `demo-manager@swimedge.test` / `Manager2026!`, `demo-yael@swimedge.test` / `Yael2026!`).

| Filename | Caption in projects.ts | What to capture |
|---|---|---|
| `swimedge-dashboard.png` | Competition dashboard | Admin Competition Detail — tab bar visible (Start List, Results, Progression, Scoring). Winter Sprint meet. |
| `swimedge-career-hub.png` | Swimmer career hub | Yael login → `/me/results` — personal bests + progression |
| `swimedge-ingestion.png` | Ingestion & attribution flow | Federation admin — unattributed-result resolution queue |
| `swimedge-demo.gif` (or `.png`) | Demo walkthrough | Short GIF of manager entering Yael → seed → publish, OR still + caption |

**Scrub before publish:** real swimmer names, national IDs, emails, prod club rosters. Demo seed uses fictional names (Yael Cohen, ACT2-F-01…) — safe.

**Capture settings:** dark mode, ~2560×1440, downscale, compress to <400 KB (`pngquant` / squoosh).

### Research — 3 visuals (generate from asaf-reaserch)

| Filename | Caption | Source |
|---|---|---|
| `research-pipeline.png` | Pipeline architecture diagram | Draw/export from the 7-stage flow in `projects.ts` architecture section |
| `research-waterfall.png` | Staged error waterfall | `misha_underwater_lab/docs/ERROR_BUDGET.md` table; generate via `m2a/viz/render_charts.py` → `write_staged_waterfall()` (frame 60: 84.7 → 2.1 mm is the hero) |
| `research-skeleton.png` | Reconstructed vs. observed skeleton | `python tools/build_underwater_reels.py` or `tools/build_presentation.py` — frames 60 (best) and 146 (worst) stick overlay |

Research visuals have no PII risk.

### Suggested `file` lines to add in `projects.ts`

**Research** (~line 189):
```ts
file: 'research-pipeline.png'
file: 'research-waterfall.png'
file: 'research-skeleton.png'
```

**SwimEdge** (~line 351):
```ts
file: 'swimedge-dashboard.png'
file: 'swimedge-career-hub.png'
file: 'swimedge-ingestion.png'
file: 'swimedge-demo.gif'
```

---

## Optional polish after media

1. **CV PDFs** — Regenerate from `CV'S/*/Full-Time.docx` with corrected professor names → `public/resume/`
2. **Visual QA** — `npm run dev`, check both projects in all three lenses (Research / Full-Stack / Data)
3. **Deploy** — Vercel (`base: '/'`) or GitHub Pages (`base: '/asaf-portfolio/'` per README)
4. **Portfolio self-screenshots** — `shot.mjs` exists (Playwright); targets `http://localhost:5174`

---

## Key file map

| File | Purpose |
|---|---|
| `src/content/projects.ts` | Both case studies + media slots |
| `src/content/profile.ts` | Lenses, bio, resume PDF paths |
| `public/media/` | Screenshot/diagram drop folder |
| `public/resume/` | Three lens-specific CV PDFs |
| `public/media/README.md` | Slot guide (duplicate of above) |
