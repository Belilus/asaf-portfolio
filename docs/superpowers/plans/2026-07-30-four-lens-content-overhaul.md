# Four-Lens Portfolio Content Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the four portfolio sites' content to be repetition-free, verified-accurate against the current SwimEdge / asaf-reaserch repos, evidence-first about AI direction, and recapture SwimEdge screenshots in English.

**Architecture:** Targeted refit inside the existing content-module system (`src/content/*`). New `facts.ts` (single source for numbers) and `ai-evidence.ts` + `HowIWork` section (replaces `agents` + `how-i-build` sections). Per-lens filters added to case-study sections/links. All copy in this plan is final — verified numbers flow only from `facts.ts`.

**Tech Stack:** React 18 + Vite + TypeScript + Tailwind (existing). Playwright (existing dep) for screenshots and the dedupe checker. No test framework exists in this repo — the verification cycle for every task is `npx tsc --noEmit` + a lens build + (later) the dedupe gate. Do not add a unit-test framework.

**Spec:** `docs/superpowers/specs/2026-07-30-four-lens-content-overhaul-design.md`

## Global Constraints

- Repo: `/Users/asafbelilus/Documents/GitHub/asaf-portfolio`. SwimEdge repo (read-only except capture script): `/Users/asafbelilus/Documents/GitHub/SwimEdge`. Research repo (read-only): `/Users/asafbelilus/Documents/GitHub/asaf-reaserch`. swimdata-il (read-only): `/Users/asafbelilus/Documents/GitHub/swimdata-il`.
- **One fact, one home per page.** Origin story → hero bio only. Traction → "Taking it to the federation" only. Stat-strip numbers are not repeated verbatim in same-page prose. Highlights never copy section sentences.
- **Never** feature: the claims-queue PII incident; Claude Code ↔ Cursor lane-log mechanics; any lines-of-code stat. swimdata-il is never a separate project.
- PM traction wording exactly: presented/demoed **to ISA leadership, July 2026; discussions ongoing**. Industrial-engineering vocabulary is *method* ("industrial-engineering-style toolbox"), never a degree claim.
- Numbers in copy always come from `facts` imports where the value appears in a stat/metric row; prose may spell numbers only when facts-backed (e.g., "thirty-one controllers" must match `facts.swimedge.controllers`).
- Every task ends with a commit ending in:
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`
- Verify commands run from the portfolio repo root unless a path is given.

---

### Task 1: Verified `facts.ts`

**Files:**
- Create: `src/content/facts.ts`

**Interfaces:**
- Produces: `export const facts` with the exact shape below; later tasks import `{ facts }` from `./facts`.

- [ ] **Step 1: Run the verification commands and record outputs**

```bash
# Research suite counts (authoritative = collected count)
cd /Users/asafbelilus/Documents/GitHub/asaf-reaserch/DataToSwumsuit && python3 -m pytest tests/ --collect-only -q 2>/dev/null | tail -2
cd /Users/asafbelilus/Documents/GitHub/asaf-reaserch/misha_underwater_lab && python3 -m pytest tests/ --collect-only -q 2>/dev/null | tail -2
# Error-budget live figures (honest frame 60 resolves the 6.8-vs-6.6 discrepancy)
ls /Users/asafbelilus/Documents/GitHub/asaf-reaserch/misha_underwater_lab/docs/error_budget/
python3 - <<'EOF'
import json, glob
for f in sorted(glob.glob('/Users/asafbelilus/Documents/GitHub/asaf-reaserch/misha_underwater_lab/docs/error_budget/*.json')):
    print(f); d = json.load(open(f)); print(json.dumps(d, indent=1)[:1500])
EOF
# SwimEdge counts
cd /Users/asafbelilus/Documents/GitHub/SwimEdge
find src/main/java -name "*Controller.java" | wc -l
find src/main/java \( -path "*service*" -o -path "*domain*" \) -name "*Service*.java" ! -name "*Test*" | wc -l
grep -rl "@Entity" src/main/java --include="*.java" | wc -l
ls src/main/resources/db/migration/ | wc -l
find frontend/src/pages -name "*.tsx" | wc -l
find frontend/src/components -name "*.tsx" | wc -l
cd frontend && npx vitest run --reporter=basic 2>&1 | tail -5
# Held-queue figure consensus (278 vs 279) and any verifiable "20k" total
cd /Users/asafbelilus/Documents/GitHub/SwimEdge && grep -rn "278\|279" cli-local/coordination/LANE-LOG.md | tail -5
grep -rn "20[, ]\?000\|20k" cli-local/ docs/ --include="*.md" | head -5
```

Backend test count: do **not** run `./mvnw test` (long, Docker-dependent); use the documented green figure `579` (LANE-LOG 2026-07-28, `./mvnw test` 579/0/0/1) unless a later documented figure appears in `cli-local/coordination/LANE-LOG.md` — search for `mvnw` in the last 100 lines and prefer the newest number.

- [ ] **Step 2: Write `src/content/facts.ts` with the verified values**

Use this exact structure; replace any value the commands above contradict (comment each corrected value with its source):

```ts
/**
 * Single source of truth for every load-bearing number on the four sites.
 * Each value verified against the source repos on 2026-07-30 — see the
 * design spec §7 for the verification table. Update HERE, nowhere else.
 */
export const facts = {
  swimedge: {
    controllers: 31,          // find *Controller.java (2026-07-30)
    services: 40,             // recount in Step 1; correct if needed
    entities: 31,             // recount in Step 1; correct if needed
    migrations: 'V1–V23',
    migrationCount: 23,
    backendTests: 579,        // ./mvnw test 579/0/0/1 (LANE-LOG 2026-07-28)
    frontendTests: 226,       // replace with the vitest run count from Step 1
    pages: 64,
    components: 102,          // recount in Step 1; correct if needed
    roles: 6,
    archiveMeets: 39,         // competitions/manifest.json summary.totalMeets
    archiveYears: '2020–2025',
    heldQueueFrom: 278,       // commit d0b8cdeb; if docs disagree use the larger documented start
    languagesNote: 'Hebrew-first · English · Russian',
  },
  research: {
    bestFrameMm: '2.1',       // frame 60, full recipe
    lowerBoundMm: '2.4',      // frame 62
    honestFrame60Mm: '6.8',   // REPLACE with live error_budget JSON value
    worstFrameMm: '9.5',      // frame 146
    trunkMm: '0.0',
    frames: 43,
    markerFloorMm: '2–6',
    pipelineTests: 65,        // REPLACE with collected count from Step 1
    labTests: 46,             // REPLACE with collected count from Step 1
    errorCauses: 9,           // ERROR_BUDGET.md cause table (verified 2026-07-30)
    restructureLines: 4832,
  },
  swimdata: {
    swims: 4770,
    swimmers: 1311,
    clubs: 72,
    championships: 2,
    repo: 'https://github.com/Belilus/swimdata-il',
  },
} as const

export const totalResearchTests = facts.research.pipelineTests + facts.research.labTests
```

- [ ] **Step 3: Typecheck**

Run: `cd /Users/asafbelilus/Documents/GitHub/asaf-portfolio && npx tsc --noEmit`
Expected: clean (file is additive).

- [ ] **Step 4: Commit**

```bash
git add src/content/facts.ts
git commit -m "Add verified facts.ts as single source for portfolio numbers."
```

---

### Task 2: `HowIWork` section + `ai-evidence.ts`; retire `agents` / `how-i-build`

**Files:**
- Create: `src/content/ai-evidence.ts`
- Create: `src/components/HowIWork.tsx`
- Modify: `src/content/lensLayout.ts` (SectionId union, all four layouts, drop `howIBuildDepth`/`agentsAngle`)
- Modify: `src/App.tsx` (section switch: render `how-i-work`, drop `agents` and `how-i-build` cases)
- Delete: `src/content/agents-story.ts`, `src/content/how-i-build.ts`, `src/components/AgentOrchestration.tsx`, `src/components/HowIBuild.tsx`

**Interfaces:**
- Consumes: `facts`, `totalResearchTests` from Task 1.
- Produces: `SectionId` gains `'how-i-work'` (loses `'agents'`, `'how-i-build'`); `howIWorkForLens(lens: LensId): { title: string; lead: string; cards: { title: string; body: string }[] }` exported from `ai-evidence.ts`; `<HowIWork lens={lensId} />` component.

- [ ] **Step 1: Read the existing render pattern**

Read `src/components/HowIBuild.tsx`, `src/components/AgentOrchestration.tsx`, and the section switch in `src/App.tsx`. `HowIWork.tsx` must reuse their exact wrapper/heading/card markup and Tailwind classes (match the site's look; do not invent new styles).

- [ ] **Step 2: Write `src/content/ai-evidence.ts`**

```ts
import type { LensId } from './profile'
import { facts, totalResearchTests } from './facts'

/**
 * Evidence-first AI-direction story. Every card is a documented practice,
 * not a claim. Per spec: the PII incident and cross-harness lane-log
 * mechanics are deliberately NOT featured.
 */
export interface EvidenceCard {
  title: string
  body: string
}

interface HowIWorkContent {
  title: string
  lead: string
  cards: EvidenceCard[]
}

const councilFullstack: EvidenceCard = {
  title: 'Decisions pass a gate, not a vibe',
  body: `Schema-level and architectural changes go through a five-advisor council review, and every epic starts from a written spec whose open decisions I resolve and sign before implementation. The identity-claims epic shipped only after its five decisions (D1–D5) were recorded — by me, not by a model.`,
}

const councilPm: EvidenceCard = {
  title: 'Recorded decisions before code',
  body: `Every epic opens with a spec whose product decisions are resolved and signed before a line is written — the claims release started as five recorded decisions (D1–D5). Architecture-level changes additionally pass a five-advisor review gate.`,
}

const verificationFullstack: EvidenceCard = {
  title: 'Nothing merges on an agent’s word',
  body: `New behavior starts from a failing test. UI work must pass build, lint, tests, and an i18n completeness check before it counts as done; backend changes run the full JUnit + Testcontainers suite against real PostgreSQL before merge.`,
  // No test-count number here: the hero stat strip owns it on this page.
}

const verificationPm: EvidenceCard = {
  title: 'Release quality is a gate, not a hope',
  body: `Every change clears the full automated suite and an i18n completeness check before it ships. Speed comes from AI leverage; safety comes from the gates it cannot skip.`,
}

const verificationData: EvidenceCard = {
  title: 'TDD at the pipeline boundary',
  body: `Ingestion logic is test-first: the failing test that defines correct behavior exists before the code. The full backend suite runs against real PostgreSQL before anything merges.`,
}

const byteDiff: EvidenceCard = {
  title: 'Refactors must prove themselves',
  body: `A refactor claiming behavior preservation must byte-diff its regenerated engine inputs against a frozen baseline. The ${facts.research.restructureLines.toLocaleString()}-line restructure of the research pipeline passed at zero drift.`,
}

const supervisorAuth: EvidenceCard = {
  title: 'Agents operate under written authority',
  body: `The research supervisor agent runs on an explicit authorization model: mass moves, deletions, and pushes need per-item human approval, and edits to the third-party engine, the ground-truth data, or the append-only memory ledger are refused unconditionally.`,
}

const humanSignoffResearch: EvidenceCard = {
  title: 'Claims need human eyes',
  body: `A fit is not “physically valid” because the numbers look good: new joint-motion structures pass my visual inspection in the engine’s Animation view before any floor is claimed. Every session’s choices land in an append-only decision log.`,
}

const humanSignoffPm: EvidenceCard = {
  title: 'Sign-off is human and recorded',
  body: `AI accelerates the build; accountability never delegates. An append-only decision log and per-epic decision gates stand between a model's output and the product.`,
  // No demo-readiness-audit mention here: "Taking it to the federation" owns it on this page.
}

const quarantineLineage: EvidenceCard = {
  title: 'No silent facts',
  body: `Rows that cannot be attributed are quarantined with a placeholder and full lineage — batch, source document, matching tier — and human resolution is recorded. The same law binds the AI tooling that builds the system: nothing becomes a fact silently.`,
}

const agentRoster: EvidenceCard = {
  title: 'Four owners, real boundaries',
  body: `system-supervisor orchestrates; db-architect owns schema and migrations; logic-expert owns services and contracts; ui-stylist owns the interface. Each carries a memory ledger read at session start and updated at session end; shared skill playbooks hold the procedures so prompts do not drift.`,
}

const content: Record<LensId, HowIWorkContent> = {
  research: {
    title: 'Research tooling governance',
    lead: 'I run the research with AI agents as heavy tooling — under rules written down before the work, with the same rigor the pipeline demands of itself. The constraints, the gates, and the claims are mine.',
    // byteDiff deliberately absent here: the research page's case study owns
    // the byte-diff story in its "Engineering rigor" section (same-page dedupe).
    cards: [supervisorAuth, humanSignoffResearch],
  },
  fullstack: {
    title: 'How I build — and how I run AI',
    lead: 'SwimEdge is solo engineering at federation scale, and I get there by operating AI agents and skills aggressively — inside gates I designed. AI accelerates implementation; the gates and sign-offs decide what merges.',
    cards: [councilFullstack, verificationFullstack, agentRoster, byteDiff],
  },
  pm: {
    title: 'I own what ships',
    lead: 'I ship fast because I use AI leverage everywhere — and I stay trustworthy because every consequential decision is mine, recorded, and gated.',
    cards: [councilPm, verificationPm, humanSignoffPm],
  },
  data: {
    title: 'Governed automation',
    lead: 'The pipeline and the AI tooling that builds it run under the same law: provenance, quarantine, and proof.',
    cards: [quarantineLineage, verificationData, byteDiff],
  },
}

export function howIWorkForLens(lens: LensId): HowIWorkContent {
  return content[lens]
}
```

- [ ] **Step 3: Write `src/components/HowIWork.tsx`**

Model on the deleted components' markup (Step 1). Shape:

```tsx
import { howIWorkForLens } from '../content/ai-evidence'
import type { LensId } from '../content/profile'
// reuse the same primitives/imports HowIBuild.tsx used

export function HowIWork({ lens }: { lens: LensId }) {
  const { title, lead, cards } = howIWorkForLens(lens)
  return (
    /* identical outer section / heading / lead markup as HowIBuild.tsx,
       then the card grid markup AgentOrchestration.tsx used for its blocks */
  )
}
```

- [ ] **Step 4: Update `lensLayout.ts` and `App.tsx`; delete the four retired files**

In `lensLayout.ts`: `SectionId` replaces `'agents' | 'how-i-build'` with `'how-i-work'`; remove `howIBuildDepth`, `agentsAngle` and their imports; section lists become —
- research: `['hero', 'featured', 'project-research', 'project-swimedge', 'how-i-work', 'contact']`
- fullstack: `['hero', 'featured', 'project-swimedge', 'project-research', 'how-i-work', 'skills', 'contact']`
- pm: `['hero', 'featured', 'project-swimedge', 'how-i-work', 'contact']`
- data: `['hero', 'featured', 'project-swimedge', 'project-research', 'how-i-work', 'skills', 'contact']`
(`featured` blocks and other fields stay until Task 3.) In `App.tsx`, replace the `agents` and `how-i-build` cases with one `how-i-work` case rendering `<HowIWork lens={lensId} />` inside the same `SectionReveal` wrapper the old cases used. Then `git rm` the four retired files.

- [ ] **Step 5: Typecheck + one lens build**

Run: `npx tsc --noEmit && npm run build:fullstack`
Expected: clean. (Project visibility for the new `project-swimedge`-on-research / `project-research`-on-fullstack entries lands in Task 3 — a section id with no visible project renders nothing, which is fine for this interim commit; verify the build output loads by `npm run dev` spot-check if uncertain.)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Merge agents + how-i-build into evidence-first HowIWork section."
```

---

### Task 3: `profile.ts` + `lensMeta.ts` rewrite

**Files:**
- Modify: `src/content/profile.ts`
- Modify: `src/content/lensMeta.ts`
- Modify: `src/content/lensLayout.ts` (featured leads only)

**Interfaces:**
- Consumes: `facts`, `totalResearchTests`.
- Produces: `lenses` entries with rewritten `headline/bio/stats`; `projectVisibility` — research: `['research', 'swimedge']`, fullstack: `['swimedge', 'research']` (pm/data unchanged).

- [ ] **Step 1: Rewrite the four lens entries in `profile.ts`**

Import: `import { facts, totalResearchTests } from './facts'`. Keep `profile`, `education`, `alsoDoing` unchanged. Replace per lens:

**research** — keep `label/blurb/headline` and both bio paragraphs exactly as they are. Replace `stats`:

```ts
stats: [
  { value: `${facts.research.bestFrameMm} mm`, label: 'best-frame REALITY', note: `lower-bound recipe; honest frame 60: ${facts.research.honestFrame60Mm} mm` },
  { value: String(totalResearchTests), label: 'tests across two suites', note: `${facts.research.pipelineTests} pipeline + ${facts.research.labTests} underwater lab, incl. golden-file byte-diff` },
  { value: '95', label: 'current M.Sc. GPA', note: 'Ben-Gurion University of the Negev' },
],
projectVisibility: ['research', 'swimedge'],
```

**fullstack** — keep `label/blurb/headline`. Bio ¶1 becomes (¶2 unchanged — it is the origin story's only home on this page):

```ts
bio: [
  'I design and ship production client–server systems end to end — data model, migrations, secure APIs, and the interface people actually use. SwimEdge is the clearest example: a competition management platform for Israeli swimming, built solo from the Postgres schema up through a bilingual RTL React application.',
  'I came to it as a competitive swimmer and coach who kept watching clubs run national meets on spreadsheets. That domain knowledge is why the data model holds up: I knew what a heat sheet, a qualifying minimum, and a disputed result actually are before I wrote a line of it.',
],
stats: [
  { value: facts.swimedge.migrations, label: 'append-forward migrations', note: 'any environment rebuilds deterministically from V1' },
  { value: `${facts.swimedge.backendTests} + ${facts.swimedge.frontendTests}`, label: 'tests green before merge', note: 'JUnit + Testcontainers · Vitest' },
  { value: `${facts.swimedge.roles} roles`, label: `across ${facts.swimedge.pages} pages`, note: 'admin, federation, club, coach, official, swimmer' },
],
projectVisibility: ['swimedge', 'research'],
```

**pm** — replace `headline/bio/stats` (blurb + resume unchanged):

```ts
headline: 'Product Founder · SwimEdge — Replacing Spreadsheet-Era Federation Software',
bio: [
  'SwimEdge did not start with code. It started with a limitation inventory: as a competitive swimmer at BGU and a coach at Wingate I lived the spreadsheet-and-PDF reality of Israeli swimming — and before building anything I spent months studying Loglig, the incumbent platform, mapping where it fails clubs, officials, and swimmers, and reading federation regulation booklets as requirements documents.',
  'The result is a governed system of record for the whole competition lifecycle — registration, seeding, live results, identity, and career analytics — that I designed, built, and took to the federation myself. I am also an M.Sc. computer-science researcher at Ben-Gurion University; the same evidence discipline runs through both.',
],
stats: [
  { value: 'Jul 2026', label: 'demoed to ISA leadership', note: 'discussions ongoing' },
  { value: 'V22–V23', label: 'shipped release', note: 'public archive · identity claims · held-result resolution' },
  { value: `${facts.swimedge.archiveMeets} meets`, label: 'national archive under management', note: `ISA championships ${facts.swimedge.archiveYears}` },
],
```

**data** — keep `label/blurb` and both bio paragraphs. Replace `headline` and `stats`:

```ts
headline: 'Data Engineer · Ingestion, Entity Resolution, Governed Pipelines',
stats: [
  { value: '3-tier', label: 'result attribution', note: 'exact, heuristic, held-for-review — quarantined, never dropped' },
  { value: `${facts.swimedge.archiveMeets}-meet`, label: 'archive campaign', note: `held-result queue worked ${facts.swimedge.heldQueueFrom}→0` },
  { value: `${facts.research.errorCauses}-cause`, label: 'error attribution table', note: 'each split into code vs. data vs. irreducible' },
],
```

- [ ] **Step 2: Update the `featured` blocks in `lensLayout.ts`**

- research: keep title + lead unchanged.
- fullstack: title stays `SwimEdge — solo full-stack platform`; lead → `'Production client–server system for a national sport federation — from Postgres schema to bilingual RTL interface, shipped and operated by one engineer.'`
- pm: title stays `A federation platform built from the pool deck`; lead → `'The product case: replace document handoffs with a governed system of record a federation can trust — and take it to the governing body directly.'`
- data: keep title + lead unchanged.

- [ ] **Step 2b: Update `lensMeta.ts`**

Read the file first; keep its structure and `lensShareUrls`. Replace title/description strings:

- research — title: `Asaf Belilus — Computer Vision & Biomechanics Research`; description: `M.Sc. research reconstructing swimmer kinematics from underwater pose data — with an honest, regenerated error budget.`
- fullstack — title: `Asaf Belilus — Full-Stack Engineer`; description: `SwimEdge: a solo-built federation platform — Spring Boot, React/TypeScript, Postgres, bilingual RTL — verified by test gates before every merge.`
- pm — title: `Asaf Belilus — Product Founder`; description: `SwimEdge: replacing spreadsheet-era federation software. Discovery on the incumbent first; demoed to ISA leadership, July 2026.`
- data — title: `Asaf Belilus — Data Engineer`; description: `Federation-scale ingestion: three-tier attribution, lineage on every row, zero silent drops — with a public, verifiable proof of method.`

- [ ] **Step 3: Typecheck + build two lenses**

Run: `npx tsc --noEmit && npm run build:pm && npm run build:research`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/content/profile.ts src/content/lensMeta.ts
git commit -m "Rewrite per-lens hero copy, stats, and page meta from verified facts."
```

---

### Task 4: Per-lens filters for sections/links + research-project content refresh

**Files:**
- Modify: `src/content/projects.ts` (types + helpers + research project entry)
- Modify: `src/components/ProjectCase.tsx` (use the filtered helpers)

**Interfaces:**
- Consumes: `facts`, `totalResearchTests`.
- Produces: `Project['sections'][number]` and `Project['links'][number]` gain optional `lenses?: LensId[]`; exports `sectionsForLens(project, lens)` and `linksForLens(project, lens)`; `ProjectCase` renders only filtered sections/links.

- [ ] **Step 1: Add the filter fields and helpers in `projects.ts`**

Section type becomes `{ heading: string; body: string[]; lenses?: LensId[] }`; link type gains `lenses?: LensId[]`. Below the existing `mediaForLens`, add:

```ts
export function sectionsForLens(project: Project, lens: LensId) {
  return project.sections.filter((s) => !s.lenses || s.lenses.includes(lens))
}

export function linksForLens(project: Project, lens: LensId) {
  return (project.links ?? []).filter((l) => !l.lenses || l.lenses.includes(lens))
}
```

In `ProjectCase.tsx`, replace every read of `project.sections` with `sectionsForLens(project, lens)` (the component already receives the lens; check its props) and every read of `project.links` with `linksForLens(project, lens)`. `productSections`/`compactSections` heading-selection logic then operates on the filtered list.

- [ ] **Step 2: Refresh the research project entry**

In the `research` project object:

1. `angle.fullstack` → `` `A research problem engineered like production software: a four-layer Python package with an I/O-free numerical core, a pluggable stroke-dispatch layer, and a golden-file regression gate on every refactor.` `` (No test count and no "byte-diff … frozen baseline" phrasing here — `compactHighlights[1]` owns the count and the fullstack/data pages' `byteDiff` evidence card owns the byte-diff story on those pages.)
2. `compactHighlights[1]` → `` `${totalResearchTests} tests across two suites — a golden-file gate blocks any refactor that cannot prove zero output drift.` `` (index 0 unchanged, but replace its trailing `(honest frame 60: 6.8 mm)` figure with `` `${facts.research.honestFrame60Mm} mm` `` interpolation.)
3. Metrics rows — replace the two count-bearing rows and append the cause-table teaser:
   - `Regression suite` row → `{ label: 'Regression suites', value: \`${totalResearchTests} tests\`, hint: 'pipeline + underwater lab, golden-file byte-diff', tone: 'improve' }`
   - Honest-frame row value → `` `${facts.research.honestFrame60Mm} mm` ``
   - Append: `{ label: 'Error causes catalogued', value: String(facts.research.errorCauses), hint: 'each bucketed code vs. data vs. irreducible; 4 fixed by probing', tone: 'improve' }`
4. In `sections` → `Engineering rigor` first paragraph, change nothing else, but the second paragraph's `4,832-line` stays (facts-backed prose; leave as text).
5. `emphasis` stays `{ research: 'full', fullstack: 'compact', pm: 'hidden', data: 'compact' }`.

- [ ] **Step 3: Typecheck + build**

Run: `npx tsc --noEmit && npm run build:research && npm run build:data`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/content/projects.ts src/components/ProjectCase.tsx
git commit -m "Add per-lens section/link filters; refresh research numbers from facts."
```

---

### Task 5: SwimEdge case study — core rewrite (fullstack/data/research-compact) + swimdata-il fold-in

**Files:**
- Modify: `src/content/projects.ts` (swimedge project entry)

**Interfaces:**
- Consumes: `facts`, filters from Task 4.
- Produces: swimedge entry with `emphasis.research: 'compact'`, `compactHighlights`, data-only swimdata-il section + link, rewritten metrics/highlights; media slot `swimdata-dashboard.png` (file lands in Task 8).

- [ ] **Step 1: Apply the swimedge entry rewrite**

1. `emphasis.research` → `'compact'`. Add:

```ts
compactHighlights: [
  'A production federation platform — registration, seeding, live results, identity, and career analytics — built and operated solo.',
  'The same evidence discipline as the research: every imported record carries lineage; ambiguity is quarantined, never guessed.',
],
compactSections: [],
```

2. `angle.fullstack` → `` `A complete client–server system: ${facts.swimedge.controllers} REST controllers over ${facts.swimedge.services} domain services, a ${facts.swimedge.migrations} append-forward Postgres schema, and a bilingual RTL React application with ${facts.swimedge.roles} role-based workflows.` ``

3. `sections` edits:
   - **`The problem` ¶2** → `'The cost lands on everyone: clubs re-key entries by hand, officials reconcile results across incompatible exports, and a swimmer who changes clubs can effectively lose their competitive history.'` (removes the origin-story sentence — hero bio owns it).
   - **`System architecture` ¶1**: replace "Thirty REST controllers sit over roughly forty service classes" with "Thirty-one REST controllers sit over forty domain service classes" (adjust the words if Task 1 corrected the counts).
   - **`System architecture` ¶3**: delete the LOC-free sentence stays as-is; no numbers changes needed beyond keeping "64 pages and over 100 components" consistent with `facts` (adjust if corrected).
   - **`Federation data ingestion` ¶3** ending → "…under which matching tier — the evidence trail a federation needs before it will trust a system with its records."
   - **Append new section after `Federation data ingestion`** (data lens only):

```ts
{
  heading: 'The method, in public — swimdata-il',
  lenses: ['data'],
  body: [
    'The ingestion method has a standalone, public proof. Before scaling it inside SwimEdge, I built swimdata-il — a Data Management course final at BGU that turns the ISA’s PDF-only competition results into a normalised relational database.',
    `The parser reads PDFs by geometry — word coordinates become column bands — instead of fragile text order; bilingual Hebrew/Latin identities are resolved into single swimmers; the schema is normalised to BCNF. Two real championships: ${facts.swimdata.swims.toLocaleString()} swims, ${facts.swimdata.swimmers.toLocaleString()} swimmers, ${facts.swimdata.clubs} clubs — loaded, queryable, and rendered into a self-contained dashboard.`,
    'It is the one piece of this system anyone can open and verify. SwimEdge runs the same method at federation scale — with attribution tiers, quarantine, and lineage on top.',
  ],
},
```

   - **`Product surface` ¶4** (test counts — hero owns the numbers now) → `'Testing is split by cost: component and hook tests run with no server; repository and ingestion end-to-end tests run against real PostgreSQL through Testcontainers. The suite gates every merge.'`
   - **Append to `Product surface`** a new ¶ after ¶3: `` `None of it is demo data. SwimEdge is mid-campaign importing the ISA national archive — a ${facts.swimedge.archiveMeets}-meet registry of championship PDFs from ${facts.swimedge.archiveYears} — through the same ingestion machinery, and the held-result queue has been worked from ${facts.swimedge.heldQueueFrom} unmatched rows to zero.` ``

4. `links` → add:

```ts
links: [
  {
    label: 'swimdata-il on GitHub',
    href: facts.swimdata.repo,
    note: 'public repo — the ingestion method as a standalone, verifiable project',
    lenses: ['data'],
  },
],
```

5. `metrics.rows` → replace entirely (LOC rows dropped by decision):

```ts
rows: [
  { label: 'REST controllers', value: String(facts.swimedge.controllers), hint: 'JWT-secured, role-gated', tone: 'neutral' },
  { label: 'Domain service classes', value: String(facts.swimedge.services), hint: 'organised by domain, not layer', tone: 'neutral' },
  { label: 'JPA entities', value: String(facts.swimedge.entities), hint: 'competition + identity model', tone: 'neutral' },
  { label: 'Flyway migrations', value: facts.swimedge.migrations, hint: 'append-forward, rebuildable from V1', tone: 'neutral' },
  { label: 'React pages / components', value: `${facts.swimedge.pages} / ${facts.swimedge.components}`, hint: facts.swimedge.languagesNote, tone: 'neutral' },
  { label: 'Backend test suite', value: `${facts.swimedge.backendTests} tests`, hint: 'JUnit + Testcontainers', tone: 'improve' },
  { label: 'Frontend test suite', value: `${facts.swimedge.frontendTests} tests`, hint: 'Vitest + Testing Library', tone: 'improve' },
  { label: 'Archive campaign', value: `${facts.swimedge.archiveMeets} meets`, hint: `ISA nationals + regionals, ${facts.swimedge.archiveYears}`, tone: 'improve' },
],
```

6. `highlights` → replace entirely:

```ts
highlights: [
  `Operates a live national-archive campaign: a ${facts.swimedge.archiveMeets}-meet ISA registry ingested through three-tier attribution, with the held-result queue worked to zero.`,
  'Shipped the identity release: public competition archive, swimmer claims, and held-result resolution (V22–V23).',
  'Three-tier result attribution quarantines ambiguous records instead of silently corrupting swimmer histories.',
  'Every ingested row carries lineage — batch, source document, matching tier — so an official can always answer “where did this time come from?”',
],
```

7. `media` → append:

```ts
{
  file: 'swimdata-dashboard.png',
  caption: 'swimdata-il — the ingestion method, public',
  hint: `Self-contained dashboard built from ${facts.swimdata.swims.toLocaleString()} geometry-parsed swims`,
  aspect: 'auto',
  lenses: ['data'],
},
```

8. `status` → `'In active development. Identity release (V22–V23) shipped; the ISA national-archive import campaign and rules-engine hardening are ongoing.'`

- [ ] **Step 2: Typecheck + builds**

Run: `npx tsc --noEmit && npm run build:fullstack && npm run build:data && npm run build:research`
Expected: clean; research build renders the compact SwimEdge card.

- [ ] **Step 3: Commit**

```bash
git add src/content/projects.ts
git commit -m "Rewrite SwimEdge case study: verified numbers, archive campaign, swimdata-il fold-in."
```

---

### Task 6: SwimEdge PM product tier — the four-beat arc

**Files:**
- Modify: `src/content/projects.ts` (swimedge entry: PM fields + PM-only sections)

**Interfaces:**
- Consumes: filters from Task 4; `facts`.
- Produces: `productSections: ['Discovery before code', 'The product', 'Taking it to the federation']`; two new pm-only sections; rewritten `angle.pm`, `productHighlights`.

- [ ] **Step 1: Apply the PM-tier rewrite**

1. `angle.pm` → `'A product story: months of discovery on the incumbent platform, a governed system of record built from that limitation inventory, and a go-to-market that runs through the federation itself.'`

2. Insert **before** `The problem` a pm-only section:

```ts
{
  heading: 'Discovery before code',
  lenses: ['pm'],
  body: [
    'The first product artifact was not a feature — it was a study of the incumbent. I analysed Loglig, the platform Israeli swimming actually runs on, and built a limitation inventory: where entries get re-keyed by hand, where results diverge across exports, where a swimmer’s history breaks at a club change.',
    'Regulation booklets became requirements documents. A season’s rulebook defines the events, age cohorts, and qualifying standards a competition must enforce — so the product treats a printed booklet as structured input, a decision that later became the regulations-ingestion pipeline.',
    'The data model was designed as a product argument, not an implementation detail: an ERD built around identity, lineage, and accountability — who owns a record, who may change it, what evidence backs it. The same industrial-engineering-style toolbox — ERD modeling, process mapping, go-to-market planning — applied with a computer scientist’s rigor.',
  ],
},
```

3. Insert **after** `Product surface` a pm-only section:

```ts
{
  heading: 'Taking it to the federation',
  lenses: ['pm'],
  body: [
    'A federation platform is bought on trust, not features. Before approaching the ISA I ran a formal demo-readiness audit against the live system and wrote a scripted executive demo of the flows a governing body actually cares about: where a result comes from, who approved it, and what happens when it is disputed.',
    'In July 2026 I presented SwimEdge to ISA leadership; discussions are ongoing. In parallel I have engaged the Ministry of Culture and Sport on the broader opportunity — modernising record-keeping across national sport federations — informed by the competitor analysis of the incumbent.',
    'A governing body asks three questions: who is accountable for a record, what happens to history when a swimmer moves, and how hard is it to leave. Most product decisions above trace to one of those three.',
  ],
},
```

4. Rename the existing `Product surface` heading to `The product` (update the heading string; `productSections` and any `compactSections` references must match). Its first paragraph (six roles) stays — it is now the six-workflows' only home on the PM page. Then delete the old `Beyond the code` section entirely (superseded by `Taking it to the federation`; its ISA sentences must not survive anywhere).

5. `productSections` → `['Discovery before code', 'The product', 'Taking it to the federation']`; keep `productMetricsMax: 3` (first three metric rows are the system-shape trio — fine as "it's real" proof).

6. `productHighlights` → replace entirely:

```ts
productHighlights: [
  'Six stakeholder workflows, each seeing only the data it owns — boundaries drawn from federation governance, not org charts.',
  'Trust as the product thesis: quarantine-not-drop, lineage on every record, and held-result resolution as a first-class flow.',
  'Discovery before code: a formal competitor analysis of Loglig and a limitation inventory shaped the product — and took months, on purpose.',
  'Go-to-market through the governing body: readiness audit → federation leadership → Ministry of Culture and Sport.',
],
```

- [ ] **Step 2: Typecheck + PM build + visual spot-check**

Run: `npx tsc --noEmit && npm run build:pm && npm run dev` — open the PM lens locally, confirm the arc renders: hero → featured → Discovery before code → The product → Taking it to the federation → I own what ships → contact, with no ISA/Ministry sentence anywhere except `Taking it to the federation`.

- [ ] **Step 3: Commit**

```bash
git add src/content/projects.ts
git commit -m "Rebuild PM product tier as a four-beat discovery-to-federation arc."
```

---

### Task 7: Dedupe gate — `check-copy-dedupe.mjs`

**Files:**
- Create: `scripts/check-copy-dedupe.mjs`
- Modify: `package.json` (add script `"check:dedupe": "node scripts/check-copy-dedupe.mjs"`)

**Interfaces:**
- Consumes: a running dev server (script starts its own preview) and the lens URLs from `src/lib/lensFromUrl.ts` path scheme.
- Produces: exit 0 = no ≥8-word phrase repeated on any single page; exit 1 with a report otherwise.

- [ ] **Step 1: Write the checker**

```js
// scripts/check-copy-dedupe.mjs
// Flags any 8+-word phrase appearing more than once on a single lens page.
// Usage: node scripts/check-copy-dedupe.mjs  (starts `vite dev` itself)
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'

const LENSES = ['research', 'fullstack', 'pm', 'data']
const WINDOW = 8

const server = spawn('npx', ['vite', '--port', '5199', '--strictPort'], { stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 4000))

const browser = await chromium.launch()
let failed = false
try {
  for (const lens of LENSES) {
    const page = await browser.newPage()
    await page.goto(`http://localhost:5199/?lens=${lens}`, { waitUntil: 'networkidle' })
    const text = await page.evaluate(() => document.body.innerText)
    await page.close()
    const words = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean)
    const seen = new Map()
    const dupes = new Set()
    for (let i = 0; i + WINDOW <= words.length; i++) {
      const phrase = words.slice(i, i + WINDOW).join(' ')
      if (seen.has(phrase) && i - seen.get(phrase) >= WINDOW) dupes.add(phrase)
      if (!seen.has(phrase)) seen.set(phrase, i)
    }
    // collapse overlapping windows into maximal phrases for readable output
    const report = [...dupes].filter((p, _, arr) => !arr.some((q) => q !== p && q.includes(p)))
    if (report.length) {
      failed = true
      console.error(`\n[${lens}] repeated phrases:`)
      for (const p of report) console.error(`  · "${p}"`)
    } else {
      console.log(`[${lens}] clean`)
    }
  }
} finally {
  await browser.close()
  server.kill()
}
process.exit(failed ? 1 : 0)
```

Note: nav/footer chrome appearing once per page cannot repeat *within* a page; if the lens switcher or repeated UI labels (e.g., identical card CTAs) trip the checker, add a `KNOWN_UI = [...]` allowlist of exact phrases at the top and filter them from `report` — allowlist UI chrome only, never body copy.

- [ ] **Step 2: Run it**

Run: `npm run check:dedupe`
Expected: 4× `clean`. Any flagged phrase = a real editorial bug: fix the flagged copy in the content module where it lives (keep the instance in its designated home per the Global Constraints; rewrite the other), then re-run until clean.

- [ ] **Step 3: Commit**

```bash
git add scripts/check-copy-dedupe.mjs package.json src/content
git commit -m "Add per-page copy dedupe gate; fix flagged repetitions."
```

---

### Task 8: Hygiene + swimdata-il dashboard capture (best-effort)

**Files:**
- Modify: `src/components/primitives.tsx` (strip debug instrumentation)
- Delete: `vite.config.ts.timestamp-*.mjs` (4 stray files at repo root)
- Create: `public/media/swimdata-dashboard.png`

- [ ] **Step 1: Strip the debug block**

Open `src/components/primitives.tsx`; find the uncommitted `// #region agent log` … `// #endregion` block (a `fetch('http://127.0.0.1:7538/ingest/...')` inside an `onLoad`) and remove it, restoring the clean `onLoad`-free `<img>` (compare `git diff src/components/primitives.tsx` — the goal is that only the object-fit fix from commit `1174c69` remains; if the diff shows *only* debug code, `git checkout -- src/components/primitives.tsx` is the correct move).

- [ ] **Step 2: Delete stray files**

```bash
rm -f vite.config.ts.timestamp-*.mjs
```

- [ ] **Step 3: Build the swimdata-il dashboard and screenshot it**

```bash
cd /Users/asafbelilus/Documents/GitHub/swimdata-il
pip3 install -r requirements.txt && bash build.sh
```

If the build succeeds, screenshot with the portfolio's Playwright:

```bash
cd /Users/asafbelilus/Documents/GitHub/asaf-portfolio
node - <<'EOF'
import('playwright').then(async ({ chromium }) => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
  await p.goto('file:///Users/asafbelilus/Documents/GitHub/swimdata-il/web/dashboard.html', { waitUntil: 'networkidle' })
  await p.screenshot({ path: 'public/media/swimdata-dashboard.png' })
  await b.close()
})
EOF
```

Then **Read the PNG** and confirm it shows the dashboard (medal tables/podiums visible, English or bilingual is fine here — it is a data artifact). If `build.sh` fails after one honest debugging attempt: delete the `swimdata-dashboard.png` media slot from `projects.ts` (the section + repo link stay) and note the failure in the final report — do not sink time into it.

- [ ] **Step 4: Typecheck + build + commit**

```bash
npx tsc --noEmit && npm run build:data
git add -A
git commit -m "Strip debug instrumentation; add swimdata-il dashboard capture."
```

---

### Task 9: SwimEdge English screenshots

**Files:**
- Modify: `scripts/capture-swimedge-media.mjs` (JWT login bypass)
- Replace: `public/media/swimedge-*.png` (6 files per the media slots)

Backend :8080 and frontend :5173 are **running** (Asaf confirmed). DB reset is pre-approved if data is broken — prefer no reset; if needed use `SwimEdge/scripts/reset-and-run.sh` (dev DB `newswimedge`; note `reset-all-demo.sh` has a known FK error on `swimmer_claim_request` — avoid that script).

- [ ] **Step 1: Probe login API and pick working credentials**

```bash
for c in 'demo-manager@swimedge.test:Manager2026!' 'demo-fed@swimedge.test:Fed2026!' 'demo-yael@swimedge.test:Yael2026!' 'admin@swimedge.dev:admin123'; do
  u="${c%%:*}"; p="${c#*:}"
  code=$(curl -s -o /dev/null -w '%{http_code}' -X POST http://localhost:8080/api/v1/auth/login -H 'Content-Type: application/json' -d "{\"email\":\"$u\",\"password\":\"$p\"}")
  echo "$u → $code"
done
```

Record which accounts return 200. If none do, report to Asaf before any reset (his data may be intentionally non-demo).

- [ ] **Step 2: Add the API-login bypass to the capture script**

In `scripts/capture-swimedge-media.mjs`, before the UI-login step, add a `loginViaApi(page, email, password)` helper and use it instead of form login:

```js
async function loginViaApi(page, email, password) {
  const res = await page.request.post('http://localhost:8080/api/v1/auth/login', {
    data: { email, password },
  })
  if (!res.ok()) throw new Error(`API login failed for ${email}: ${res.status()}`)
  const body = await res.json()
  // Zustand persist format for authStore (persist name 'swimedge-auth').
  // First: read SwimEdge/frontend/src/stores/authStore.ts and mirror its
  // exact persisted state shape { state: { token, user, ... }, version }.
  await page.addInitScript(([k, v]) => localStorage.setItem(k, v), [
    'swimedge-auth',
    JSON.stringify({ state: { token: body.token ?? body.accessToken, user: body.user ?? null, isAuthenticated: true }, version: 0 }),
  ])
  await page.addInitScript(() => localStorage.setItem('swimedge-language', 'en'))
}
```

The exact JSON keys **must** be copied from `authStore.ts`'s persisted shape and the login response DTO (check via the curl above with `-i`) — do not guess; adjust the helper to match.

- [ ] **Step 3: Capture all lenses**

```bash
cd /Users/asafbelilus/Documents/GitHub/asaf-portfolio
LENS=fullstack npm run capture:swimedge
LENS=pm npm run capture:swimedge
LENS=data npm run capture:swimedge
```

- [ ] **Step 4: Visually review every PNG**

Read each of the six `public/media/swimedge-*.png` files (they are images — inspect them): (a) UI text is **English** — any Hebrew label fails the shot; (b) nothing cropped; (c) data looks sane (no empty tables/error toasts). Re-capture failures individually; if a page's data is broken, tell Asaf which page and why before touching the DB.

- [ ] **Step 5: Commit**

```bash
git add public/media scripts/capture-swimedge-media.mjs
git commit -m "Recapture SwimEdge screenshots in English via API-login bypass."
```

---

### Task 10: Full verification matrix

**Files:** none (verification only; fixes land where the failure is)

- [ ] **Step 1: All four builds + typecheck + dedupe**

```bash
npx tsc --noEmit
npm run build:research && npm run build:fullstack && npm run build:pm && npm run build:data
npm run check:dedupe
```
Expected: all clean.

- [ ] **Step 2: Visual pass per lens**

`npm run dev`, open all four lens URLs, verify per page: research (dual-number hero stat, compact SwimEdge card, governance section); fullstack (no LOC anywhere on the page — search the DOM for "LOC" and "lines"; research compact card present); pm (four-beat arc, traction only in its section, one-line M.Sc. credential); data (swimdata-il subsection + screenshot + repo link, ingestion-first order).

- [ ] **Step 3: Commit any fixes**

```bash
git add -A && git commit -m "Fix visual-pass findings across lenses."
```
(Skip the commit if there are none.)

---

### Task 11: Deploy ×4 + production verification

**Gate: confirm with Asaf immediately before this task ("deploying all four now — go?").**

- [ ] **Step 1: Deploy each lens with its build env**

```bash
npx vercel deploy --prod --project asaf-portfolio --yes --build-env VITE_PORTFOLIO_LENS=research
npx vercel deploy --prod --project asaf-portfolio-fullstack --yes --build-env VITE_PORTFOLIO_LENS=fullstack
npx vercel deploy --prod --project asaf-portfolio-pm --yes --build-env VITE_PORTFOLIO_LENS=pm
npx vercel deploy --prod --project asaf-portfolio-data --yes --build-env VITE_PORTFOLIO_LENS=data
```
(Team `belilus1`; see `deploy/DEPLOY.md` if the CLI asks for scope.)

- [ ] **Step 2: Verify production**

Fetch all four live URLs (`asaf-portfolio-ten` / `-fullstack` / `-pm` / `-data` `.vercel.app`); confirm each serves its new hero headline (research: unchanged headline + new stats; fullstack: migrations stat; pm: "Product Founder · SwimEdge — Replacing Spreadsheet-Era Federation Software"; data: "Data Engineer · Ingestion, Entity Resolution, Governed Pipelines") and that screenshots load. Report the four URLs + deployment IDs.

- [ ] **Step 3: Final report to Asaf**

Outcome summary: what shipped per site, every number that changed and its source, screenshot status (incl. any Hebrew/broken-data leftovers), the swimdata-il best-effort result, and the one manual follow-up (GitHub auto-deploy wiring on the three newer Vercel projects).
