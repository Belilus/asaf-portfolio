# Four-lens portfolio content overhaul — design

**Date:** 2026-07-30
**Repo:** `asaf-portfolio` (one codebase → four Vercel sites: Research, Full-Stack, PM, Data)
**Scope class:** Content + new sections. Visual design (Deep Water identity) unchanged.
**Sources of truth:** `SwimEdge/` (state as of 2026-07-30), `asaf-reaserch/` (state as of 2026-07-28), `swimdata-il/`, session Q&A with Asaf (recorded below).

---

## 1. Goals

1. **Accuracy:** every number and claim reflects the current state of SwimEdge and the research repos, verified at implementation time. Single source of truth for numbers.
2. **No repetition:** each fact/phrase has exactly one home per rendered page (worst offender today: PM site).
3. **Surface the newest, strongest material:** SwimEdge claims epic (V22–V23), national archive campaign, research error budget + documented floors, ISA leadership demo.
4. **The AI-direction story, evidence-first, on all four lenses:** Asaf operates agents/skills heavily *and* demonstrably retains control — gates, sign-offs, refusal rules, byte-diff verification. Concrete documented practices, not abstract claims.
5. Fold `swimdata-il` into the SwimEdge case study as public, verifiable evidence of the ingestion method (not a separate project).

## 2. Decision record (from Q&A, 2026-07-30)

| Decision | Choice |
|---|---|
| Scope | Content overhaul + new sections; keep visual design |
| AI story | Evidence-first rewrite AND present on all four lenses, calibrated per audience |
| swimdata-il | Folded into SwimEdge case study; **not** a separate project |
| Numbers | Verified from repos at implementation time; unverifiable claims replaced |
| Research audience | Industry CV/ML + academic labs equally |
| Research: SwimEdge presence | Compact "also built" card (was: hidden) |
| Research: honesty framing | Lead with dual numbers (best-recipe vs honest) + the "0 mm unreachable" negative result |
| Research: AI visibility | Own small section, rigor-framed ("research tooling governance") |
| Full-Stack hero | Scale + verification mix |
| Full-Stack LOC stat | **Dropped entirely**; shape stats instead (controllers/services/pages/migrations) |
| Full-Stack AI evidence | Council + D1–D5 sign-offs; standing verification gates. **Excluded by choice: PII-gap incident, dual-harness lane log** |
| PM audience | Founder-track story *in service of landing PM roles*: "I am the PM who owns SwimEdge", replacing the Loglig incumbent with CS knowledge + PM skills |
| PM traction wording | "Demoed to ISA leadership (July 2026); discussions ongoing" — citable |
| PM narrative key | Long discovery research on Loglig limitations came FIRST and took real time; only then the build. ERD/data modeling + go-to-market as applied method (**phrase as method, not as an IE&M degree**) |
| PM research marker | One-line M.Sc. credential in hero area (research otherwise invisible) |
| PM proof points | All four: archive campaign numbers · claims flow V22–V23 · Loglig competitor analysis · demo-readiness audit + CEO demo guide |
| Data role target | Data engineer first |
| Data lead project | SwimEdge ingestion first; research second (compact) |
| Data: swimdata-il | Named subsection + dashboard screenshot + public GitHub repo link |
| Implementation approach | A — targeted refit inside existing content architecture |
| Extras in scope | Recapture SwimEdge screenshots in English (backend up, login bypass if needed). swimdata-il dashboard screenshot best-effort |

## 3. Foundations (cross-site)

### 3.1 `src/content/facts.ts` — single source of truth for numbers

Typed constants imported by stats strips, metric tables, highlights, and prose builders. Groups: `swimedge`, `research`, `swimdata`. Every entry re-verified at implementation time (see §7 verification table). A number appearing in a stat strip is not repeated verbatim in prose on the same page.

### 3.2 Merged section: "How I build — and how I run AI"

- Replaces the two current overlapping sections (`agents` + `how-i-build`) with **one** section per lens, driven by `src/content/ai-evidence.ts` + new component (working name `HowIWork.tsx`). `AgentOrchestration.tsx`, `agents-story.ts`, `how-i-build.ts` retire into it.
- Structure: short lead (per lens) + evidence cards. Each card = claim + the documented practice backing it + (where useful) the artifact name.
- **Evidence catalog** (selected per lens):
  - `council-gates` — 5-advisor council review on schema/architecture decisions; specs proceed only after Asaf's recorded decisions (e.g., claims spec D1–D5 APPROVED 2026-07-19).
  - `verification-gates` — TDD-first; build + lint + test + i18n gate before UI work is called done; 579 backend + frontend suites green before merge.
  - `byte-diff-gates` — refactors must byte-diff generated engine inputs against a frozen baseline; 4,832-line restructure passed at zero drift.
  - `supervisor-authorization` — research supervisor agent has a written authorization model: mass move/delete/push requires per-item human approval; edits to the third-party engine, ground-truth data, or the memory ledger are refused unconditionally.
  - `human-signoff` — numerical claims aren't "physical" until human inspection in the engine's Animation view; append-only decision log records every session's choices.
  - `quarantine-lineage` — no silent drops: unattributable rows are quarantined with lineage; resolution is recorded (data-governance face of the same discipline).
  - `agent-roster` — four accountable owners (system-supervisor, db-architect, logic-expert, ui-stylist) with per-agent memory ledgers; skills as shared playbooks.
- **Explicitly excluded from featured evidence (Asaf's choice):** the claims-queue PII incident; the Claude Code ↔ Cursor lane-log mechanics.
- Framing sentence family (per-lens wording varies): *heavy use of agents and skills; every consequential change passes gates Asaf designed and decisions Asaf signs. AI accelerates implementation; it does not decide.*

### 3.3 Per-lens calibration

| Lens | Section depth | Cards |
|---|---|---|
| Research | Small, rigor-framed, titled as research-tooling governance | supervisor-authorization, byte-diff-gates, human-signoff |
| Full-Stack | Full | council-gates, verification-gates, agent-roster, byte-diff-gates (one line) |
| PM | Medium, product-framed ("I own what ships") | council-gates (as decision discipline), verification-gates (as release quality), human-signoff (as sign-off culture) |
| Data | Medium, governance-framed | quarantine-lineage, byte-diff-gates, verification-gates |

### 3.4 Editorial rules (enforced by rewrite + dedupe check)

1. One fact, one home per page. Origin story → hero bio only. Traction → one section only.
2. Stat-strip numbers don't reappear verbatim in prose; prose adds context instead.
3. Highlights are scannable claims, never copies of section sentences.
4. `lensMeta.ts` titles/descriptions updated to the new positioning per lens.

### 3.5 Content-model changes

- `projects.ts`: add optional `lenses?: LensId[]` filter to case-study sections (mirrors the existing media filter) so PM-only and Data-only sections are possible; add swimdata-il subsection content under the SwimEdge project (Data lens only).
- `lensLayout.ts`: replace `agents` + `how-i-build` section ids with `how-i-work`; research lens gains compact SwimEdge (via `projectVisibility: ['research','swimedge']` + `emphasis.swimedge.research = 'compact'`).
- `profile.ts`: rewritten headlines/bios/stats per lens (below).

## 4. Per-site designs

### 4.1 Research site

- **Hero.** Bio: current two paragraphs kept with light edits. Stats: `2.1 mm` best-frame REALITY (note carries the honest figure from live artifacts) · combined verified test count across the two suites (replaces wrong "46") · `95` M.Sc. GPA.
- **Case study.** Numbers refreshed from `misha_underwater_lab/docs/error_budget/*.json`; dual-number honesty framing + negative result stay lead; add a teaser row/visual for the 9-cause table (verified: exactly 9 causes, each bucketed code/data/irreducible with status).
- **New: compact SwimEdge card** — two highlights + link to the Full-Stack site (production-shipping ability as differentiator among research candidates).
- **New: research tooling governance section** per §3.3. Reads as methodology; no AI-hype vocabulary.

### 4.2 Full-Stack site

- **Hero.** Stats: `V1→V23` append-forward migrations · `579 + 226` tests green before merge (exact counts re-verified) · `6 roles / 64 pages`. No LOC anywhere on the page. Bio keeps origin story (its only home).
- **Case study.** "Product surface" gains claims flow (V22–V23) + archive campaign as an operations beat (39-meet ISA registry 2020–2025, season sweep, held-results queue 278→0 — figure re-verified). Metrics table: shape + test stats, no LOC rows. Architecture stages re-checked (31 controllers). Highlights deduped against prose.
- **How-I-work section** per §3.3. Research compact card and skills groups stay.

### 4.3 PM site (deepest rewrite)

One arc, each fact once: **lived the problem → researched the incumbent → built the replacement → took it to the federation.**

1. **Hero.** Headline: "Product Founder · SwimEdge — replacing spreadsheet-era federation software." Bio ¶1 = discovery story (swimmer/coach → months studying Loglig's limits and the federation's document reality **before** building; the limitation inventory came first). Bio ¶2 = what exists now + one-line M.Sc. credential. Stats: `Jul 2026` demoed to ISA leadership · `V22–V23` shipped release (archive + identity claims) · `39 meets` national archive under management.
2. **New section "Discovery before code."** Loglig competitor analysis (real artifact), limitation inventory, regulation booklets as requirements documents, ERD/data-model as a product tool; CS + industrial-engineering-style method (ERD, process mapping, go-to-market planning) — *method, not degree*.
3. **"The product."** Six role workflows described once; product boundaries as deliberate trade-offs (quarantine-not-drop as a trust decision).
4. **"Taking it to the federation."** Sole home of traction: demo-readiness audit → CEO demo guide → **demoed to ISA leadership, July 2026; discussions ongoing**; Ministry of Culture and Sport conversation; what a governing body needs before trusting a system of record.
5. **"I own what ships"** (how-I-work, product angle) per §3.3.
6. **Contact** with PM CV.

Product highlights: four non-overlapping claims (discovery artifact · shipped release · archive operations · ISA traction), none duplicating bio or section prose.

### 4.4 Data site (data-engineer positioning)

- **Hero.** Bio close to current. Stats: `3-tier` attribution with quarantine · `39 meets / 278→0` archive campaign · `9-cause` error-attribution table.
- **SwimEdge case leads (ingestion-first)** with new Data-lens-only subsection inside "Federation data ingestion": **"The method, in public — swimdata-il."** Geometry-based PDF parsing (word coordinates → column bands), BCNF normalization, bilingual entity resolution; 4,770 swims / 1,311 swimmers / 72 clubs; dashboard screenshot; public GitHub link (`github.com/Belilus/swimdata-il`). Framed: same method SwimEdge runs at federation scale, published as standalone proof — the one artifact a recruiter can open.
- **Research case second, compact,** angled at error-attribution/data-quality.
- **How-I-work section** governance-flavored per §3.3. Skills groups unchanged.

## 5. Media plan

1. **SwimEdge English screenshots** (in scope):
   - Start backend **without any DB reset** (SwimEdge rules: dev DB `newswimedge`; `reset-all-demo.sh` has a known FK error on the V23 claims table — no resets without Asaf's explicit approval). Start frontend :5173.
   - Try existing demo credentials via UI; if flaky, implement the documented bypass in `scripts/capture-swimedge-media.mjs`: `POST /api/v1/auth/login` → inject JWT into localStorage key `swimedge-auth` (Zustand persist format).
   - English forced via `swimedge-language=en`. Capture per-lens profiles; **visually review every PNG for Hebrew text and cropping** before replacing files in `public/media/`. Broken demo data is reported, not repaired ad hoc.
2. **swimdata-il dashboard** (best-effort): `bash build.sh` → screenshot `web/dashboard.html` → Data-lens subsection. If the build fails, ship subsection with repo link only and report.

## 6. Verification & QA

- All four lens builds green: `npm run build:research|fullstack|pm|data` + typecheck.
- **Dedupe gate:** new script `scripts/check-copy-dedupe.mjs` — composes each lens's rendered copy from the content modules and flags any ≥8-word phrase appearing more than once on the same page. Runs in CI-less mode locally; zero findings required before deploy.
- Visual pass per lens locally (dev server) before deploy.
- Post-deploy spot-check of all four production URLs.

## 7. Numbers to verify at implementation time

| Fact | Site today | Best current knowledge | Verify by |
|---|---|---|---|
| REST controllers | 30 | **31** (counted 2026-07-30) | `find src/main/java -name "*Controller.java"` |
| Service classes | 40 | recount | file count in domain/service packages |
| Flyway migrations | 23 ✓ | V1–V23 ✓ | migration dir listing |
| Backend tests | 579 | 579/0/0/1 documented (LANE-LOG 2026-07-28); 585 `@Test` | prefer fresh `./mvnw test` if runtime permits; else documented figure |
| Frontend tests | 232 | 226/226 (tsk_115) + Task 7 additions | run `npm test` in SwimEdge frontend |
| Pages / components | 64 / 102 | 64 verified / recount components | file counts |
| JPA entities | 31 | recount | entity annotations |
| Archive registry | — (new) | 39 meets (30 ready_full), 2020–2025, ISA national + regional | `competitions/manifest.json` ✓ |
| Held queue | — (new) | 278→0 (commit d0b8cdeb; one doc says 279) | prefer coordination docs consensus; else "~280→0" phrasing |
| "20k+ imported results" | present | **unverified** | search coordination docs / DB count; else replace with archive-campaign facts |
| Research pipeline tests | (conflated) | ~65 documented (62 collected functions) | `pytest --collect-only` in `DataToSwumsuit` |
| Underwater lab tests | 46 | 46/46 documented (38 functions + params) | `pytest --collect-only` in `misha_underwater_lab` |
| mm floors | 2.1 / 2.4 / 9.5 / trunk 0.0 / honest 6.8 | honest figure discrepancy: 6.8 vs 6.6 | read `docs/error_budget/*.json`; use live values |
| 9-cause table | claimed | **verified 2026-07-30** (exactly 9 rows, bucketed) | `ERROR_BUDGET.md` ✓ |
| swimdata-il | — (new) | 4,770 swims / 1,311 swimmers / 72 clubs / 2 championships | repo README ✓ |
| ISA traction | "conversations" | **"Demoed to ISA leadership, July 2026; discussions ongoing"** (Asaf-confirmed) | final wording Asaf-approved in this spec |

## 8. Hygiene & deployment

- Remove uncommitted debug `fetch` instrumentation from `src/components/primitives.tsx`; delete stray `vite.config.ts.timestamp-*.mjs` files.
- **Nothing committed or deployed without Asaf's explicit go.** Flow: diff summary → approval → commit → deploy ×4 with `npx vercel deploy --prod --project <name> --yes --build-env VITE_PORTFOLIO_LENS=<lens>` → verify production URLs.
- Manual follow-up for Asaf (dashboard-only): GitHub auto-deploy wiring on the three newer Vercel projects.

## 9. Out of scope

- Visual/brand redesign; lens-switcher behavior; PWA/QR (already shipped).
- New CV PDFs (existing four remain; content alignment with CVs is a possible follow-up).
- Custom domains.
- Any SwimEdge or asaf-reaserch code changes beyond the capture-script login bypass.

## 10. Risks

| Risk | Mitigation |
|---|---|
| SwimEdge backend won't start / demo logins broken | API-token bypass; if still blocked, ship content overhaul with existing screenshots and report exactly what's blocked |
| Demo DB data looks wrong in captures | Report to Asaf; no DB repairs without approval |
| Honest-frame figure ambiguity (6.8 vs 6.6) | Use live `error_budget` JSON; if absent, regenerate via `tools/build_error_budget.py` on Mac |
| Per-lens section filter adds layout regressions | All four builds + visual pass gate |
