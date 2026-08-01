/**
 * The two flagship case studies.
 *
 * Because both repositories are private, this file has to carry the depth a
 * README would normally carry: the problem, the method, the architecture, and
 * the measured results — written so a reader who will never see the code can
 * still judge the engineering.
 */

import { facts, totalResearchTests } from './facts'
import { lenses, type LensId } from './profile'

export type ProjectEmphasis = 'full' | 'compact' | 'product' | 'hidden'

export interface MetricRow {
  label: string
  value: string
  hint?: string
  tone?: 'improve' | 'neutral' | 'warn'
}

export interface ArchStage {
  step: string
  title: string
  body: string
  tech?: string[]
}

export interface MediaSlot {
  /** Drop a file at public/media/<file> and it renders automatically. */
  file?: string
  caption: string
  hint: string
  aspect?: 'wide' | 'tall' | 'square' | 'auto'
  /** If set, only these lenses show this slot. */
  lenses?: LensId[]
}

export interface Project {
  id: 'research' | 'swimedge'
  eyebrow: string
  name: string
  subtitle: string
  period: string
  role: string
  /** One-sentence answer to "what is this?" */
  premise: string
  /** Lens-specific opening framing. */
  angle: Record<LensId, string>
  /** Lens-specific depth — full case study, compact card, or hidden. */
  emphasis: Record<LensId, ProjectEmphasis>
  /** Optional override for compact mode (defaults to first two highlights). */
  compactHighlights?: string[]
  /** Section headings shown inline in compact mode (no accordion). */
  compactSections?: string[]
  /** Product-tier highlights and sections (PM lens). */
  productHighlights?: string[]
  productSections?: string[]
  /** Cap metrics rows in product tier. */
  productMetricsMax?: number
  /** `lenses` restricts a section to specific sites; omitted = shown everywhere. */
  sections: { heading: string; body: string[]; lenses?: LensId[] }[]
  architecture: { title: string; note: string; stages: ArchStage[] }
  metrics: { title: string; note: string; rows: MetricRow[] }
  stack: { group: string; items: string[] }[]
  highlights: string[]
  media: MediaSlot[]
  /** Shown as a muted note — honest about scope and current state. */
  status: string
  links?: { label: string; href: string; note?: string; lenses?: LensId[] }[]
}

export const projects: Project[] = [
  /* ======================================================================
     PROJECT 1 — M.Sc. RESEARCH
     ====================================================================== */
  {
    id: 'research',
    eyebrow: 'M.Sc. Research · Ben-Gurion University',
    name: 'Underwater Pose → Hydrodynamic Simulation',
    subtitle: 'Reconstructing swimmer joint kinematics from 3-D pose data to measure drag and propulsion',
    period: '2026 – Present',
    role: 'Sole developer · Prof. Gera Weiss’s lab, with Prof. Raziel Riemer (Faculty of Engineering)',
    premise:
      'Turn noisy 3-D underwater motion capture into a physically valid joint-angle model that a hydrodynamic engine will accept — and quantify exactly how much of the remaining error is fixable.',
    angle: {
      research:
        'A cross-faculty project bridging computer vision and control theory. The contribution is not only the reconstruction pipeline but the error budget that separates modeling error from the definitional limits of the marker set.',
      fullstack:
        'A research problem engineered like production software: a four-layer Python package with an I/O-free numerical core, a pluggable stroke-dispatch layer, and a golden-file regression gate standing between any refactor and the claim that it changed nothing.',
      pm:
        'The measurement discipline behind SwimEdge: I learned to split code error from data error on this project before applying the same instinct to federation ingestion.',
      data:
        'A measurement pipeline whose real output is an attribution table: nine distinct error causes, each classified as code, data, or irreducible, with live millimetre figures regenerated from the run artifacts.',
    },
    emphasis: {
      research: 'full',
      fullstack: 'compact',
      pm: 'hidden',
      data: 'compact',
    },
    compactHighlights: [
      `Reconstructed ${facts.research.frames} underwater frames into simulator-ready joint angles with a staged error budget — best full-body fit ${facts.research.bestFrameMm} mm, honest cross-check ${facts.research.honestFrame60Mm} mm.`,
      `${totalResearchTests} tests across two suites, including a golden-file gate that blocks any refactor which cannot prove zero output drift.`,
    ],
    compactSections: ['Key results', 'Engineering rigor'],
    sections: [
      {
        heading: 'Research problem',
        body: [
          'Competitive swimming is coached almost entirely by eye. Drag and propulsion — the two forces that decide whether a stroke is fast — are invisible from the deck, and the equipment that measures them directly does not survive contact with a real training session.',
          'Simulation offers a way around this. The SWUM hydrodynamic engine can compute those forces from a swimmer’s body geometry and joint motion, but it demands a specific and unforgiving input: a complete Euler joint-angle time series over a full stroke cycle, anatomically consistent frame to frame.',
          'What we actually have is the opposite: sparse 3-D marker positions from underwater video, captured on skin rather than joint centres, with the above-water portion of the stroke missing entirely. The research question is how faithfully that gap can be bridged, and — just as importantly — where the honest floor lies.',
        ],
      },
      {
        heading: 'Methodological approach',
        body: [
          'The core question is how closely a 21-segment rigid-body model, forced into the exact Euler-angle convention the simulation engine accepts, can match the captured swimmer’s underwater markers — scored in millimetres per joint, per frame. The pipeline reconstructs the skeleton in stages, each constrained by the last. Body geometry is fitted from the pose rather than taken from the engine’s default template, which removes an entire class of systematic error before any angle is solved.',
          'Joint angles are recovered by nonlinear least-squares fitting. Rather than inverting the kinematic chain analytically — which is degenerate for the shoulder — the solver poses forward kinematics as an optimization: choose the four Euler angles the engine expects such that the resulting bone directions best match the observed pose. A Tikhonov regularisation term (λ = 1e-4) keeps the solution stable where the pose under-determines the joint.',
          'The diagnostic strategy is the part I would defend most. Rather than reporting a single number, the pipeline reruns the fit stage by stage and records what each lever buys — pelvis, hips, legs, trunk, shoulders, arms — with a live cause table that classifies each residual as code, data, or irreducible.',
        ],
      },
      {
        heading: 'Key results',
        body: [
          `Across ${facts.research.frames} fully-underwater frames, staged fitting drives trunk error to exactly ${facts.research.trunkMm} mm on every frame once segment lengths are measured from the pose rather than inherited from the engine template. Whole-body error ranges from ${facts.research.bestFrameMm} mm on the best frame to ${facts.research.worstFrameMm} mm at high torso roll.`,
          `Two numbers are published for the same frame, and the distinction is the point. The ${facts.research.honestFrame60Mm} mm figure uses only measured rotations, with nothing fitted at the shoulder; the ${facts.research.bestFrameMm} mm figure is the best achievable recipe, which buys one fitted clavicle-depth parameter per frame. Reporting only the second would be a quiet over-claim.`,
          `Five systematic modeling defects were found by probing rather than guessing, and ${facts.research.errorCausesFixed} are fixed — including degenerate ±15° solver bounds that silently clamped legs and shoulders at roll. The result I consider most valuable is negative: zero error on every joint is not achievable with this marker set, and the error budget proves why — skin markers sit ${facts.research.markerFloorMm} mm from the joint centres they stand in for, and the above-water half of the stroke is absent from the capture entirely.`,
        ],
      },
      {
        heading: 'Engineering rigor',
        body: [
          'The numerical core is I/O-free by rule — no file reads, no subprocess calls, no printing — which is what makes it testable in about a second. Anything that touches the filesystem lives in dedicated I/O and pipeline layers.',
          'Refactors are not allowed to claim behaviour preservation on trust. Any structural change must byte-diff its generated engine input files against a frozen pre-restructure baseline; the initial 4,832-line restructure into the layered package passed with zero difference. A template-arms mode is retained purely as the diagnostic anchor for that comparison.',
          'Strokes are a dispatch layer rather than a branch. Crawl is fully implemented; butterfly, backstroke, and breaststroke exist as registered stubs, so adding one means writing a stroke module — never adding conditionals to the numerical core.',
        ],
      },
    ],
    architecture: {
      title: 'Pipeline architecture',
      note: 'Four layers, strict dependency direction. The numerical core never touches I/O.',
      stages: [
        {
          step: '01',
          title: 'Pose ingestion',
          body: 'Frozen ground-truth 3-D marker recordings are loaded without reshaping — the source arrays are treated as immutable evidence.',
          tech: ['NumPy', '.npy'],
        },
        {
          step: '02',
          title: 'Cycle segmentation',
          body: 'Stroke cycles are detected and indexed so that every downstream fit operates on a well-defined periodic window.',
          tech: ['core/cycle'],
        },
        {
          step: '03',
          title: 'Body geometry fitting',
          body: 'Segment lengths and hip geometry are measured from the pose rather than inherited from the engine template, eliminating a systematic error class up front.',
          tech: ['core/kinematics'],
        },
        {
          step: '04',
          title: 'Regularised FK inversion',
          body: 'Four-angle Euler joint states are recovered per frame by nonlinear least-squares against observed bone directions, λ-regularised and temporally warm-started.',
          tech: ['SciPy least_squares', 'λ = 1e-4'],
        },
        {
          step: '05',
          title: 'Cycle closure',
          body: 'Per-axis closure forces the reconstructed cycle to be periodic, preventing discontinuities the solver would otherwise read as physical impulses.',
          tech: ['core/ik'],
        },
        {
          step: '06',
          title: 'Engine project assembly',
          body: 'Joint motion and body geometry are serialised into the exact fixed-format files the third-party hydrodynamic engine expects.',
          tech: ['io/', 'joint_motion.dat'],
        },
        {
          step: '07',
          title: 'QA & error budget',
          body: 'Automated per-run reports regenerate the staged waterfall and the code-vs-data cause table directly from run artifacts — no hand-maintained numbers.',
          tech: ['qa/report', 'pytest'],
        },
      ],
    },
    metrics: {
      title: 'Error budget — whole-body reconstruction (mm)',
      note: 'Regenerated from the run artifacts, never hand-maintained. Each figure is the mean error across the scored joints.',
      rows: [
        { label: 'Best frame, lower bound (62)', value: '2.4 mm', hint: 'full recipe with clavicle fit', tone: 'improve' },
        { label: 'Best frame, recipe (60)', value: '2.1 mm', hint: 'showcase stroke window', tone: 'improve' },
        {
          label: 'Honest frame (60, no extra fit)',
          value: `${facts.research.honestFrame60Mm} mm`,
          hint: 'measured rotations only',
          tone: 'neutral',
        },
        { label: 'Trunk after geometry fit', value: '0.0 mm', hint: 'all 43 underwater frames', tone: 'improve' },
        { label: 'Worst frame, high roll (146)', value: '9.5 mm', hint: 'hips + shoulder asymmetry', tone: 'warn' },
        { label: 'Underwater frame bank', value: '43 frames', hint: 'fully submerged captures', tone: 'neutral' },
        { label: 'Skin-marker vs. joint-centre', value: '2–6 mm', hint: 'irreducible — data, not code', tone: 'neutral' },
        {
          label: 'Error causes catalogued',
          value: String(facts.research.errorCauses),
          hint: `each bucketed code, data, or irreducible; ${facts.research.errorCausesFixed} fixed by probing`,
          tone: 'improve',
        },
        {
          label: 'Regression suites',
          value: `${totalResearchTests} tests`,
          hint: 'pipeline + underwater lab, golden-file gated',
          tone: 'improve',
        },
      ],
    },
    stack: [
      { group: 'Language', items: ['Python 3'] },
      { group: 'Numerical', items: ['NumPy', 'SciPy (least_squares)', 'Tikhonov regularisation'] },
      { group: 'Domain', items: ['Forward kinematics', 'Inverse kinematics', 'Euler angle conventions', 'Rigid-body modeling'] },
      { group: 'Simulation', items: ['SWUM hydrodynamic engine (third-party, GPL-2)'] },
      { group: 'Quality', items: ['pytest', 'Golden-file byte-diff', 'Automated QA reporting'] },
      { group: 'Workflow', items: ['Git', 'Cross-platform Mac / Windows split', 'Matplotlib'] },
    ],
    highlights: [
      `Reconstructed ${facts.research.frames} underwater frames into simulator-ready joint angles, driving trunk error to ${facts.research.trunkMm} mm on every frame — best whole-body fit ${facts.research.bestFrameMm} mm.`,
      `Proved a negative result rather than hiding it: zero error per joint is unreachable with this capture, and a ${facts.research.errorCauses}-cause budget separates what code can still fix from what the data forbids.`,
      `Diagnosed and fixed ${facts.research.errorCausesFixed} systematic modeling defects — including degenerate solver bounds that silently clamped legs and shoulders at high roll.`,
      `Published both an honest and a best-achievable figure for the same frame, so the headline number cannot quietly outrun the method.`,
    ],
    media: [
      {
        file: 'research-body-frame62.png',
        caption: 'Fitted stick model vs. motion capture',
        hint: 'Frame 62 — profile and lean views, 2.4 mm full-body REALITY (lower bound)',
        aspect: 'auto',
        lenses: ['research'],
      },
      {
        file: 'research-spine-frame62.png',
        caption: 'Spine alignment at frame 62',
        hint: 'Lower-back de-kink diagnostic — body kinematics only',
        aspect: 'auto',
        lenses: ['research'],
      },
    ],
    status:
      'Active research. Underwater Euler floor documented (~2–10 mm); open work is hip residual at roll extremes (frames 116/146) and spine/clavicle depth at high torso roll.',
  },

  /* ======================================================================
     PROJECT 2 — SWIMEDGE
     ====================================================================== */
  {
    id: 'swimedge',
    eyebrow: 'Flagship System · Founder & Sole Engineer',
    name: 'SwimEdge',
    subtitle: 'End-to-end competition management and analytics platform for Israeli competitive swimming',
    period: '2025 – Present',
    role: 'Architecture, backend, frontend, data ingestion, design system, infrastructure',
    premise:
      'A production platform that takes a national swimming federation from spreadsheets and PDFs to a governed system of record — registration, seeding, live results, scoring, and swimmer career analytics.',
    angle: {
      research:
        'The applied counterpart to my research: the same insistence on traceable data. Every imported result carries its lineage, and nothing that cannot be attributed with confidence is allowed to silently become a fact.',
      fullstack:
        'A complete client–server system designed and built alone — 30 REST controllers over 40 service classes and a 23-migration Postgres schema, fronted by a bilingual RTL React application with six distinct role-based workflows.',
      pm:
        'A solo product bet on federation trust: six stakeholder workflows, public archive, identity claims, and held-result resolution — shaped by years inside the sport as swimmer and coach.',
      data:
        'A federation-scale ingestion problem: Arena XLSX exports and PDF-derived regulation books turned into attributed relational records, with a three-tier matching strategy and an explicit quarantine for everything that does not resolve cleanly.',
    },
    emphasis: {
      research: 'hidden',
      fullstack: 'full',
      pm: 'product',
      data: 'full',
    },
    productHighlights: [
      'Six role-based workflows — federation, club, coach, official, swimmer, and public archive — each seeing the data they own.',
      'Shipped public competition archive and identity claim / held-result resolution (V22–V23).',
      'Direct federation engagement with ISA and Ministry of Culture and Sport on modernising national sport technology.',
      'Solo founder: vision, stakeholder conversations, and production UI — not a slide deck.',
    ],
    productSections: ['Product surface', 'Beyond the code'],
    productMetricsMax: 3,
    sections: [
      {
        heading: 'The problem',
        body: [
          'Israeli competitive swimming runs on documents. Meet entries arrive as spreadsheets, results come back as exported files and PDFs, qualifying standards live in regulation booklets, and swimmer histories are scattered across whichever club happened to hold them at the time.',
          'The cost lands on everyone: clubs re-key entries by hand, officials reconcile results across incompatible exports, and a swimmer who changes clubs can effectively lose their competitive history. I saw this from inside — as a competitive swimmer at BGU and a coach at Wingate — long before I could build anything about it.',
          'SwimEdge treats the whole competition lifecycle as one governed system rather than a chain of file handoffs, while accepting that the federation’s existing documents are the input it must live with.',
        ],
      },
      {
        heading: 'System architecture',
        body: [
          'The backend is a service-oriented Spring Boot application on Java 21, organised by domain rather than by technical layer: registration, membership, competition, seeding, results, payments, documents, and swimmer identity each own their services and repositories. Thirty REST controllers sit over roughly forty service classes, with JWT authentication and a role hierarchy enforced at the boundary.',
          'Persistence is PostgreSQL under Flyway, evolved through twenty-three versioned migrations. The schema is treated as append-forward: migrations add and backfill, never rewrite history, so a production database can always be reconstructed from V1.',
          'The frontend is React 18 with Vite and TypeScript — 64 pages and over 100 components — built on the design system whose tokens this portfolio also uses. It is fully bilingual with right-to-left support, because a Hebrew-first federation product that treats RTL as an afterthought is unusable in practice.',
          'The two halves are kept honest by generation rather than discipline: frontend API types are regenerated from the live OpenAPI specification, so a backend DTO change that breaks the client fails at compile time instead of in front of a user.',
        ],
      },
      {
        heading: 'Federation data ingestion',
        body: [
          'The hardest engineering in the system is getting federation documents in without corrupting the record. Start lists and results arrive as Arena XLSX exports, parsed with Apache POI into an intermediate representation before anything touches the database.',
          'Attributing a result to a swimmer is the crux. Names appear transliterated inconsistently between Hebrew and Latin, clubs rename themselves, and the same human being appears under several identities across seasons. Matching runs in three tiers — exact identity, then heuristic association, then explicit hold — and anything that fails all three becomes an unattributed result with a placeholder rather than a bad row or a silent drop. A human resolves it later, and the resolution is recorded.',
          'Every ingested row carries lineage: which batch imported it, from which source document, under which matching tier. That trail is what lets an official answer “where did this time come from?” — the question that decides whether a federation trusts the system at all.',
          'Regulation books get the same treatment. A dedicated format registry converts a season’s rules into structured intermediate JSON, which then materialises a draft competition complete with events, age cohorts, and qualifying minimums — instead of an administrator retyping a booklet.',
        ],
      },
      {
        heading: 'Product surface',
        body: [
          'Six roles see six different systems. Federation administrators run ingestion, competition import, swimmer-claim review, and held-result resolution. Club managers handle membership, rosters, and claim queues for their clubs. Coaches work with their assigned swimmers. Officials enter results for the days they are assigned. Swimmers see their own career hub — personal bests, progression, and history that follows them across club changes.',
          'A public competition archive lets anyone browse historical meet results without logging in. Identity claim flows let swimmers and managers reconcile placeholder records against archived federation data — with federation admins resolving held results that cannot auto-match.',
          'On top of that sits the competition machinery: heat seeding, format progression, a versioned scoring engine, and analytics that render performance deltas with semantic meaning — improvement, regression, personal best — rather than as undifferentiated numbers.',
          'Testing is split by cost. 232 Vitest tests cover components and hooks with no server. The backend runs 579 JUnit tests; repository and ingestion E2E tests use real PostgreSQL through Testcontainers.',
        ],
      },
      {
        heading: 'Beyond the code',
        body: [
          'I have taken SwimEdge into direct conversations with the Israel Swimming Association and engaged the Ministry of Culture and Sport on the broader opportunity to modernise technology across national sport federations, alongside a competitor analysis of the incumbent platform and a formal demo-readiness audit.',
          'That part has been as instructive as the engineering. A federation platform is only partly a software problem; the rest is understanding who owns which data, who is accountable for a disputed result, and what a governing body needs to see before it will trust a system with its records.',
        ],
      },
    ],
    architecture: {
      title: 'System architecture',
      note: 'Document-in, governed-record-out. Every arrow preserves lineage.',
      stages: [
        {
          step: '01',
          title: 'Federation sources',
          body: 'Arena XLSX start lists and results, plus PDF-derived regulation books, enter as immutable source documents.',
          tech: ['Apache POI', 'XLSX', 'PDF'],
        },
        {
          step: '02',
          title: 'Parse to intermediate',
          body: 'Documents are parsed into a validated intermediate JSON representation before any database write occurs.',
          tech: ['Format registry'],
        },
        {
          step: '03',
          title: 'Three-tier attribution',
          body: 'Results resolve by exact match, then heuristic association, then explicit hold. Unresolved rows are quarantined with a placeholder, never dropped.',
          tech: ['Identity resolution', 'Lineage'],
        },
        {
          step: '04',
          title: 'Domain services',
          body: 'Forty service classes across registration, membership, competition, seeding, results, payments, and documents enforce the business rules.',
          tech: ['Spring Boot', 'Java 21'],
        },
        {
          step: '05',
          title: 'Governed schema',
          body: 'PostgreSQL under Flyway — 23 append-forward migrations, so any environment rebuilds deterministically from V1.',
          tech: ['PostgreSQL', 'Flyway'],
        },
        {
          step: '06',
          title: 'Typed API boundary',
          body: '30 REST controllers behind JWT auth and a role hierarchy; frontend types are regenerated from the live OpenAPI spec.',
          tech: ['REST', 'JWT', 'OpenAPI'],
        },
        {
          step: '07',
          title: 'Role-aware interface',
          body: '64 React pages and 100+ components, bilingual with full RTL, rendering competition operation and swimmer career analytics.',
          tech: ['React 18', 'Vite', 'TypeScript', 'Tailwind'],
        },
      ],
    },
    metrics: {
      title: 'System scale',
      note: 'Counted directly from the repository, not estimated.',
      rows: [
        { label: 'Backend', value: '18,145 LOC', hint: '330 Java files', tone: 'neutral' },
        { label: 'Frontend', value: '27,533 LOC', hint: 'TypeScript / TSX', tone: 'neutral' },
        { label: 'REST controllers', value: '30', hint: 'JWT-secured, role-gated', tone: 'neutral' },
        { label: 'Service classes', value: '40', hint: 'organised by domain', tone: 'neutral' },
        { label: 'JPA entities', value: '31', hint: 'competition + identity model', tone: 'neutral' },
        { label: 'Flyway migrations', value: '23', hint: 'V1 → V23, append-forward', tone: 'neutral' },
        { label: 'React pages / components', value: '64 / 102', hint: 'bilingual, RTL-ready', tone: 'neutral' },
        { label: 'Backend test suite', value: '579 tests', hint: 'JUnit + Testcontainers', tone: 'improve' },
        { label: 'Frontend test suite', value: '232 tests', hint: 'Vitest + Testing Library', tone: 'improve' },
      ],
    },
    stack: [
      { group: 'Backend', items: ['Java 21', 'Spring Boot 3.3.5', 'Spring Security', 'JWT', 'REST', 'Maven'] },
      { group: 'Data', items: ['PostgreSQL', 'Flyway', 'JPA / Hibernate', 'Apache POI'] },
      { group: 'Frontend', items: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'i18n + RTL'] },
      { group: 'Quality', items: ['JUnit', 'Testcontainers', 'Vitest', 'Testing Library', 'Playwright'] },
      { group: 'Platform', items: ['Docker', 'OpenAPI / Swagger', 'Render', 'Git'] },
    ],
    highlights: [
      'Imported 20k+ archived federation results with expectations-gated regulation matching and a held-result queue — nothing unattributed becomes a fact.',
      'Shipped public competition archive and identity claim / held-result resolution UI (V22–V23).',
      'Designed a three-tier result attribution strategy that quarantines ambiguous records instead of silently corrupting swimmer histories.',
      'Architected a solo full-stack platform — 30 REST controllers, 40 domain services, 23 Flyway migrations, bilingual RTL React UI.',
    ],
    media: [
      {
        file: 'swimedge-archive.png',
        caption: 'Public competition archive',
        hint: 'Browse historical meet results without logging in',
        aspect: 'auto',
        lenses: ['fullstack', 'pm', 'data'],
      },
      {
        file: 'swimedge-dashboard.png',
        caption: 'Competition dashboard',
        hint: 'Manager competition detail — start lists, results, progression',
        aspect: 'auto',
        lenses: ['fullstack', 'pm'],
      },
      {
        file: 'swimedge-claims.png',
        caption: 'Held-result resolution',
        hint: 'Federation queue for unattributed archived results',
        aspect: 'auto',
        lenses: ['fullstack', 'data'],
      },
      {
        file: 'swimedge-approvals.png',
        caption: 'Federation approvals queue',
        hint: 'Swimmer claim review for federation admins',
        aspect: 'auto',
        lenses: ['pm'],
      },
      {
        file: 'swimedge-held-results.png',
        caption: 'Held-results operations',
        hint: 'Federation ops — unattributed results awaiting resolution',
        aspect: 'auto',
        lenses: ['data'],
      },
      {
        file: 'swimedge-career-hub.png',
        caption: 'Swimmer career hub',
        hint: 'Personal bests and progression across club changes',
        aspect: 'auto',
        lenses: ['fullstack'],
      },
    ],
    status:
      'In active development. Public competition archive and identity claim / held-result resolution shipped (V22–V23); federation ingestion and rules-engine hardening ongoing.',
  },
]

export function getProjectEmphasis(project: Project, lens: LensId): ProjectEmphasis {
  return project.emphasis[lens]
}

export function sectionsForLens(project: Project, lens: LensId): Project['sections'] {
  return project.sections.filter((s) => !s.lenses || s.lenses.includes(lens))
}

export function linksForLens(project: Project, lens: LensId): NonNullable<Project['links']> {
  return (project.links ?? []).filter((l) => !l.lenses || l.lenses.includes(lens))
}

export function mediaForLens(project: Project, lens: LensId): Project['media'] {
  return project.media.filter((m) => {
    if (!m.file) return false
    if (!m.lenses) return true
    return m.lenses.includes(lens)
  })
}

export function visibleProjectsForLens(lensId: LensId) {
  const lens = lenses.find((l) => l.id === lensId)
  if (!lens) return []
  return lens.projectVisibility
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p))
    .filter((p) => getProjectEmphasis(p, lensId) !== 'hidden')
}
