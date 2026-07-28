# Portfolio handoff — Claude Cowork polish pass

**Live:** https://asaf-portfolio-ten.vercel.app/  
**Repo:** https://github.com/Belilus/asaf-portfolio  
**Dev:** `npm run dev` → http://localhost:5174 (SwimEdge uses 5173)

**Status (July 2026):** Lens redesign Phases 1–2 are implemented — per-lens project visibility, emphasis tiers, How I Build section, Deep Water visual sync, and research media wired. SwimEdge screenshots intentionally deferred until archive/claims UI is committed.

---

## Non-negotiables

1. Do **NOT** give both projects equal weight on every lens.
2. **Research lens:** show ONLY the research project (SwimEdge hidden).
3. **Full-Stack lens:** SwimEdge full + research compact.
4. **Data lens:** SwimEdge full + research compact (error-budget parallel only).
5. **How I build** section — AI as orchestration (agents + shared skills + verification), NOT "AI wrote my code".
6. **Visual source:** `newSwimEdge/frontend` track-deep + `portal.css` — NOT `.impeccable/` contracts.
7. Do **not** over-claim SwimEdge: archive + ingestion are real; claim-flow UI is NOT shipped yet (backend only, tsk_116 Task 7 pending).

---

## SwimEdge current state (for accurate copy)

- R2 catalog Waves 0–3 done; season sweep held
- Public competition archive (tsk_115) implemented, may be uncommitted
- Claim/promotion backend done 2026-07-28 (V23, 579 tests); frontend pending
- 8 dispatchable agent personas + shared-skills catalog in `docs/agents-skills` + `docs/shared-skills`

---

## Files to change (polish pass)

| File | Purpose |
|---|---|
| `src/content/profile.ts` | Lenses, bio, `projectVisibility` per lens |
| `src/content/projects.ts` | Emphasis tiers + SwimEdge status |
| `src/content/how-i-build.ts` | How I build blocks per lens depth |
| `src/App.tsx` | Filter projects by lens, featured copy |
| `src/components/ProjectCase.tsx` | Tiered layout (full / compact / hidden) |
| `src/components/Skills.tsx` | Renders how-i-build above skill chips |
| `src/index.css` + `tailwind.config.js` + `src/styles/portal.css` | Deep Water sync |

---

## Out of scope

- SwimEdge screenshots (wait for stable UI)
- Inflating metrics or adding a third project
- Rewriting research technical content (already strong)

---

## Media wiring (when images exist)

Drop files in `public/media/` and add `file: '<filename>'` to the matching slot in `projects.ts` `media` array. No component changes needed.

### Research — wired ✅

| Filename | Status |
|---|---|
| `research-waterfall.png` | Wired — Research + compact lenses |
| `research-skeleton.png` | Wired — Research + compact lenses |
| `research-pipeline.png` | Optional — architecture diagram (not yet created) |

### SwimEdge — deferred ⏳

Wait until tsk_115/116 frontend is committed and stable:

| Filename | What to capture |
|---|---|
| `swimedge-dashboard.png` | Admin competition detail |
| `swimedge-career-hub.png` | Swimmer career hub |
| `swimedge-ingestion.png` | Attribution / held-result queue |
| `swimedge-demo.gif` | Short lifecycle walkthrough |

**Before capture:** reseed demo DB (`newSwimEdge/scripts/demo/reset-all-demo.sh`). Dark mode, compress to <400 KB.

---

## Optional polish tasks

1. **Copy-edit** — tone: confident, not inflated; present tense with scope for in-flight work ("backend-ready", "in hardening")
2. **Research pipeline diagram** — optional `research-pipeline.png` from 7-stage architecture in `projects.ts`
3. **CV PDFs** — regenerate from `CV'S/` with corrected professor names (Gera Weiss, Raziel Riemer) → `public/resume/`
4. **Visual QA** — all three lenses in browser; verify Research hides SwimEdge nav link

---

## Already confirmed (do not redo)

- Professor names: **Gera Weiss**, **Raziel Riemer**
- SwimEdge counts: 23 migrations, 30 controllers, 40 services (portfolio is correct)
- Portfolio dev port: **5174**
