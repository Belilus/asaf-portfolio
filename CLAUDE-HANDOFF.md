# Portfolio handoff — Claude Cowork polish pass

**Live:** https://asaf-portfolio-ten.vercel.app/  
**Repo:** https://github.com/Belilus/asaf-portfolio  
**Dev:** `npm run dev` → http://localhost:5174 (SwimEdge uses 5173)

**Status (July 2026):** Content refreshed from latest SwimEdge (tsk_115/116) and research (Euler error budget). Research uses clean body PNG from lab; SwimEdge screenshots captured via Playwright.

---

## Non-negotiables

1. Do **NOT** give both projects equal weight on every lens.
2. **Research lens:** show ONLY the research project (SwimEdge hidden).
3. **Full-Stack lens:** SwimEdge full + research compact.
4. **Data lens:** SwimEdge full + research compact (error-budget parallel only).
5. **How I build** section — AI as orchestration, NOT "AI wrote my code".
6. Do **not** over-claim SwimEdge production deployment or season sweep.

---

## Current numbers (verified Jul 2026)

| Project | Metric | Value |
|---------|--------|-------|
| Research | Best frame REALITY (recipe) | 2.1 mm (frame 60) |
| Research | Lower bound | 2.4 mm (frame 62) |
| Research | Honest frame 60 | ~6.6 mm |
| Research | Worst frame (high roll) | 9.5 mm (frame 146) |
| Research | pytest suite | **46 tests** |
| SwimEdge | Backend JUnit | **579 tests** |
| SwimEdge | Frontend Vitest | **232 tests** |
| SwimEdge | Flyway migrations | 23 |

---

## Media capture workflow

### Research (clean body only — no chart/table PNGs)

```bash
cd asaf-reaserch/misha_underwater_lab
python tools/build_error_budget.py
python tools/build_presentation.py

cd ../../asaf-portfolio
npm run capture:research
```

Outputs `public/media/research-body-frame62.png` (profile + lean from lab thumbnail).

### SwimEdge (demo DB only)

```bash
cd newSwimEdge
bash scripts/demo/reset-all-demo.sh
# backend :8080, frontend :5173

cd ../asaf-portfolio
npm run capture:swimedge
```

Outputs:
- `swimedge-archive.png` — public `/competitions/archive`
- `swimedge-dashboard.png` — manager competition detail
- `swimedge-claims.png` — federation held-results tab

Wire `file:` in `src/content/projects.ts` — `MediaPlaceholder` handles rendering.

---

## Files to change (polish pass)

| File | Purpose |
|------|---------|
| `src/content/projects.ts` | Case studies + media slots |
| `src/content/profile.ts` | Lens stats |
| `scripts/capture-research-media.mjs` | Research media |
| `scripts/capture-swimedge-media.mjs` | SwimEdge screenshots |

---

## Out of scope

- Waterfall / bar-chart research images
- Claiming ISA production deployment
- Inflating test counts
