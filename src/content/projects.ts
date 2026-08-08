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

/** `brief` is a name-check: header, two highlights, status — no metrics or prose. */
export type ProjectEmphasis = 'full' | 'compact' | 'product' | 'brief' | 'hidden'

export interface MetricRow {
  label: string
  value: string
  hint?: string
  tone?: 'improve' | 'neutral' | 'warn'
  /** `lenses` restricts a row to specific sites; omitted = shown everywhere. */
  lenses?: LensId[]
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
  /** Optional override for brief mode (defaults to compactHighlights). */
  briefHighlights?: string[]
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
        'A cross-faculty research pipeline bridging computer vision and rigid-body mechanics. Formulates non-linear least-squares optimization using Tikhonov regularization (λ = 1e-4) to transform underwater marker frames into simulator-ready joint kinematics—delivering an isolated trunk error of 0.0 mm and an honest whole-body baseline.',
      fullstack:
        'A numerical Python core built with production software rigor: strict I/O isolation, modular stroke dispatchers, and automated golden-file byte-diff testing that blocks any refactor causing non-zero output drift.',
      pm:
        'The measurement discipline behind my software engineering: developed an error attribution framework to separate system code defects from external data limitations.',
      data:
        'Data quality and error attribution engine: categorizes experimental residuals into code artifacts, input noise, and irreducible physical constraints.',
      backend:
        'A headless, I/O-isolated numerical Python core built with backend rigor. Emphasizes automated QA reporting and golden-file byte-diff testing that blocks regression.',
      frontend:
        'Data visualization and diagnostic tooling: transforming complex 3D arrays into clear, interpretable visual models using Matplotlib.',
      'swe-intern':
        'A Python, NumPy, and SciPy pipeline that turns noisy 3-D pose data into simulator-ready joint motion.',
    },
    emphasis: {
      research: 'full',
      fullstack: 'compact',
      pm: 'hidden',
      data: 'brief',
      backend: 'brief',
      frontend: 'hidden',
      'swe-intern': 'brief',
    },
    compactHighlights: [
      `Reconstructed ${facts.research.frames} underwater frames into simulator-ready joint angles with a staged error budget — best full-body fit ${facts.research.bestFrameMm} mm, honest cross-check ${facts.research.honestFrame60Mm} mm.`,
      `${totalResearchTests} tests across two suites, including a golden-file gate that blocks any refactor which cannot prove zero output drift.`,
    ],
    briefHighlights: [
      'Built the error-attribution table that separates error I could still fix in code from error the capture itself imposes — the habit behind quarantining a record rather than guessing at it.',
      'Published an honest figure alongside the best achievable one for the same measurement, so the headline number could never outrun the method.',
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
          body: 'Segment lengths and hip geometry are solved per pose, so the skeleton carries this swimmer’s real proportions rather than a generic template’s.',
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
      `Diagnosed and fixed ${facts.research.errorCausesFixed} systematic modeling defects that only targeted probing exposed — from template-inherited limb geometry to an optimiser fenced into the wrong solution basin.`,
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
      'An active platform giving swimming clubs one governed place to run their swimmers — membership, registration, seeding, live results, scoring, and career history — engineered as a system of record rather than another reporting tool.',
    angle: {
      research:
        'The applied system counterpart: rigorous data provenance and immutable record lineage applied to nationwide competition management.',
      fullstack:
        'A multi-role federation platform built solo with Spring Boot 3 and React 18: 31 REST controllers, 40 domain services, 23 Flyway migrations, and strict JWT role authorization.',
      pm:
        'A system of record replacing fragmented legacy software. Defined a 6-role operating model, mapped competition lifecycles, and presented the product directly to national governing body leadership.',
      data:
        'Imported 47,509 historical results across 17 championships with source lineage and explicit holds for ambiguity. A separate public course project proves the matching method at smaller scale, including 98.3% bilingual row matching.',
      backend:
        'A Spring Boot 3, Java 21, and PostgreSQL backend with 31 JWT-secured REST controllers, 40 domain services, and club-scoped authorization enforced server-side.',
      frontend:
        'A massive React 18 / TypeScript single-page application. Features a robust Tailwind design system, seamless RTL support, and API types synced via OpenAPI generation.',
      'swe-intern':
        'Spring Boot services, a React interface, and a PostgreSQL data model joined by role-based access and automated tests.',
    },
    emphasis: {
      research: 'compact',
      fullstack: 'full',
      pm: 'product',
      data: 'full',
      backend: 'full',
      frontend: 'full',
      'swe-intern': 'brief',
    },
    compactHighlights: [
      'Six server-enforced roles keep federation, club, coach, official, swimmer, and public workflows within their authorization boundaries.',
      'Every imported record preserves its source, while ambiguous matches are held for review instead of silently assigned.',
    ],
    compactSections: ['The problem'],
    productHighlights: [
      'A governed role hierarchy is the product: every club runs its own swimmers, coaches see only theirs, swimmers own their history, and the federation oversees — with the boundaries enforced server-side.',
      'Covers the lifecycle a club actually lives — membership and registration through seeding, live results, scoring, and career history that follows a swimmer between clubs.',
      'Engineered for durability rather than for demos: Java and Spring Boot over an append-forward Postgres schema, because a decade of a club’s times is only as safe as the way it is stored and recovered.',
      'Discovery came first — a formal analysis of the incumbent and a limitation inventory shaped the product, and took months on purpose.',
      'Route to market through the governing body: readiness audit, then federation leadership, then the Ministry of Culture and Sport.',
    ],
    productSections: [
      'Discovery before code',
      'The product',
      'Absorbing the sport’s history',
      'Taking it to the federation',
    ],
    productMetricsMax: 3,
    sections: [
      {
        heading: 'Discovery before code',
        lenses: ['pm'],
        body: [
          'The first product artifact was not a feature. It was a study of the incumbent: I analysed Loglig, the platform Israeli swimming actually runs on, and built a limitation inventory — where entries get re-keyed by hand, where results diverge between exports, where a swimmer’s history breaks at a club change, and which of those the existing product had structurally chosen not to solve.',
          'Regulation booklets became requirements documents. A season’s rulebook defines the events, the age cohorts, and the qualifying standards a competition must enforce, so the product treats a printed booklet as structured input rather than something an administrator retypes — a discovery finding that later became the regulations-ingestion pipeline.',
          'The data model was the product argument, not an implementation detail. I designed the entity relationships around identity, lineage, and accountability — who owns a record, who may change it, and what evidence stands behind it — using the industrial-engineering toolbox of entity-relationship modelling and process mapping, with a computer scientist’s view of what the schema would have to guarantee later.',
          'That work is why the build could be opinionated. By the time I wrote code I knew which problems were worth solving, which were incumbent design choices rather than laws of the domain, and what a replacement would have to prove before anyone would switch.',
        ],
      },
      {
        heading: 'The problem',
        body: [
          'Israeli competitive swimming runs on documents. Meet entries arrive as spreadsheets, results come back as exported files and PDFs, qualifying standards live in regulation booklets, and swimmer histories are scattered across whichever club happened to hold them at the time.',
          'The cost lands on everyone: clubs re-key entries by hand, officials reconcile results across incompatible exports, and a swimmer who changes clubs can effectively lose their competitive history.',
          'SwimEdge treats the whole competition lifecycle as one governed system rather than a chain of file handoffs, while accepting that the federation’s existing documents are the input it must live with.',
        ],
      },
      {
        heading: 'System architecture',
        body: [
          `The backend is a service-oriented Spring Boot application on Java 21, organised by domain rather than by technical layer: registration, membership, competition, seeding, results, payments, documents, and swimmer identity each own their services and repositories. ${facts.swimedge.controllers} REST controllers sit over ${facts.swimedge.services} domain services, with JWT authentication and a role hierarchy enforced at the boundary.`,
          `Persistence is PostgreSQL under Flyway, evolved through ${facts.swimedge.migrationCount} versioned migrations. The schema is treated as append-forward: migrations add and backfill, never rewrite history, so a production database can always be reconstructed from the first migration onward.`,
          `The frontend is React 18 with Vite and TypeScript — ${facts.swimedge.pages} pages and ${facts.swimedge.components} components — built on the design system whose tokens this portfolio also uses. It is fully bilingual with right-to-left support, because a Hebrew-first federation product that treats text direction as an afterthought is unusable in practice.`,
          'The two halves are kept honest by generation rather than discipline: frontend API types are regenerated from the live OpenAPI specification, so a backend DTO change that breaks the client fails at compile time instead of in front of a user.',
        ],
      },
      {
        heading: 'Federation data ingestion',
        body: [
          'The hardest engineering in the system is getting federation documents in without corrupting the record. Start lists and results arrive as Arena XLSX exports, parsed with Apache POI into an intermediate representation before anything touches the database.',
          'Attributing a result to a swimmer is the crux. Names appear transliterated inconsistently between Hebrew and Latin, clubs rename themselves, and the same human being appears under several identities across seasons. Matching runs in three tiers — exact identity, then heuristic association, then explicit hold — and anything that fails all three becomes an unattributed result with a placeholder rather than a bad row or a silent drop. A human resolves it later, and the resolution is recorded.',
          'Every ingested row carries lineage: which batch imported it, from which source document, under which matching tier. That trail is what lets an official answer “where did this time come from?” — the question that decides whether a federation trusts the system at all.',
          `This is not a theoretical capability. The national archive import has put ${facts.swimedge.importedResults.toLocaleString()} historical results through this machinery across ${facts.swimedge.importedMeets} championship meets, with the dry run and the live run producing identical output, and the held-result queue worked from ${facts.swimedge.heldQueueFrom} unresolved rows down to zero.`,
          'Regulation books get the same treatment. A dedicated format registry converts a season’s rules into structured intermediate JSON, which then materialises a draft competition complete with events, age cohorts, and qualifying minimums — instead of an administrator retyping a booklet.',
        ],
      },
      {
        heading: 'The method, in public — swimdata-il',
        lenses: ['data'],
        body: [
          'The ingestion approach has a standalone, public proof. Before scaling it inside SwimEdge, I built swimdata-il as a Data Management course final at Ben-Gurion University: it turns the federation’s PDF-only competition results into a normalised relational database anyone can query.',
          'The parser reads PDFs by geometry — word coordinates become column bands — rather than by text order, which is what breaks the moment a layout shifts. Identity resolution then does the hard part: the same club appears as Maccabi, Macabbi, Maccabbi and Macabi across two languages and two scripts, so the loader keys on the numeric federation code and picks the canonical name by statistical mode, recording every observed spelling in an audit table.',
          `That collapses ${facts.swimdata.nameVariants} observed spellings into ${facts.swimdata.clubs} real clubs, and it self-heals a genuine data defect along the way: a status token that had leaked into a club cell produced a bogus spelling, which simply lost to the correct one on frequency. The Hebrew start list is then bridged to the English results sheet on the shared event, heat, and lane tuple, matching ${facts.swimdata.matchRate} of rows one-to-one with zero ambiguity.`,
          `Across ${facts.swimdata.championships} real championships that yields ${facts.swimdata.swims.toLocaleString()} swims and ${facts.swimdata.swimmers.toLocaleString()} swimmers over ${facts.swimdata.events} events, normalised to BCNF with ${facts.swimdata.orphanForeignKeys} orphan foreign keys, plus a self-contained dashboard generated from the loaded database. It is the one part of this work anyone can open and check for themselves.`,
        ],
      },
      {
        heading: 'The product',
        body: [
          'The centre of the system is the hierarchy, because that is how the sport is actually organised. A club manager runs their own club: members, rosters, coach assignments, registrations, and payments. Coaches see the swimmers assigned to them and nobody else’s. Officials enter results for the days they are given. Swimmers hold a career hub of their own — personal bests, progression, and a history that survives changing clubs. The federation sits above all of it with oversight that stops at the boundary of what a federation is actually accountable for.',
          'That hierarchy is enforced in the backend, not drawn in the interface. Each role’s scope is a rule the API applies on every request, so a club manager cannot reach another club’s swimmers even if they go looking. Getting that boundary right is what makes the system safe to hand to every club in the country at once.',
          'Around the hierarchy sits the competition lifecycle a club actually lives: build the meet, open registration, take entries, seed the heats, run the day, enter results, and score them — with format progression and a versioned scoring engine behind it, and analytics that read a swim as improvement, regression, or a personal best rather than as an undifferentiated number.',
          'Underneath, the engineering is deliberately conservative, because this is a system of record. Java and Spring Boot on the server, PostgreSQL under append-forward migrations that add and backfill but never rewrite history, and a schema any environment can rebuild deterministically from the first migration. A club trusting the platform with a decade of its swimmers’ times is really trusting how that data is stored, versioned, and recovered.',
        ],
      },
      {
        heading: 'Absorbing the sport’s history',
        lenses: ['fullstack', 'pm', 'data'],
        body: [
          'Once the platform existed, the remaining obstacle to a club actually switching was everything that came before it. A swimmer’s times live in the incumbent system and in years of published federation documents, and a product that starts everyone from an empty history is not a replacement — it is a second place to type things.',
          'So the ingestion layer was built on top of the platform, not underneath it: federation exports and published meet documents become attributed records inside the same governed model, which is how a club can arrive with its history intact. It is the capability that turns a better system into a switchable one.',
        ],
      },
      {
        heading: 'Taking it to the federation',
        lenses: ['pm'],
        body: [
          'A federation platform is bought on trust, not on features. Before approaching the association I ran a formal demo-readiness audit against the live system and wrote a scripted executive walkthrough of the flows a governing body actually cares about: where a result came from, who approved it, and what happens when someone disputes it.',
          'In July 2026 I presented SwimEdge to Israel Swimming Association leadership, and those discussions are ongoing. In parallel I have engaged the Ministry of Culture and Sport on the wider opportunity — modernising record-keeping across national sport federations — informed by the same competitor analysis that started the project.',
          'A governing body asks three questions: who is accountable for a record, what happens to a swimmer’s history when they move, and how hard would it be to leave this system later. Most of the product decisions above trace back to one of those three.',
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
          body: '31 REST controllers behind JWT auth and a role hierarchy; frontend types are regenerated from the live OpenAPI spec.',
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
        {
          label: 'Role-based workflows',
          value: String(facts.swimedge.roles),
          hint: 'federation, club, coach, official, swimmer, public',
          tone: 'neutral',
        },
        {
          label: 'Governed schema',
          value: facts.swimedge.migrations,
          hint: 'append-forward; any environment rebuilds deterministically',
          tone: 'improve',
        },
        {
          label: 'Backend test suite',
          value: `${facts.swimedge.backendTests} tests`,
          hint: 'JUnit + Testcontainers against real PostgreSQL',
          tone: 'improve',
        },
        {
          label: 'Archived results imported',
          value: facts.swimedge.importedResults.toLocaleString(),
          hint: `${facts.swimedge.importedMeets} meets; dry run and live run identical`,
          tone: 'improve',
          lenses: ['fullstack', 'data', 'backend'],
        },
        {
          label: 'Held-result queue',
          value: `${facts.swimedge.heldQueueFrom} → 0`,
          hint: 'every ambiguous row resolved, none dropped',
          tone: 'improve',
          lenses: ['data'],
        },
        {
          label: 'REST controllers',
          value: String(facts.swimedge.controllers),
          hint: 'JWT-secured, role-gated',
          tone: 'neutral',
          lenses: ['fullstack', 'data', 'backend'],
        },
        {
          label: 'Domain service classes',
          value: String(facts.swimedge.services),
          hint: 'organised by domain, not by layer',
          tone: 'neutral',
          lenses: ['fullstack', 'data', 'backend'],
        },
        {
          label: 'JPA entities',
          value: String(facts.swimedge.entities),
          hint: 'competition + identity model',
          tone: 'neutral',
          lenses: ['fullstack', 'data', 'backend'],
        },
        {
          label: 'React pages / components',
          value: `${facts.swimedge.pages} / ${facts.swimedge.components}`,
          hint: facts.swimedge.languagesNote,
          tone: 'neutral',
          lenses: ['fullstack', 'data', 'research', 'frontend'],
        },
        {
          label: 'Frontend test suite',
          value: `${facts.swimedge.frontendTests} tests`,
          hint: `Vitest + Testing Library, ${facts.swimedge.frontendTestFiles} files`,
          tone: 'improve',
          lenses: ['fullstack', 'data', 'research', 'frontend'],
        },
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
      `Architected the whole system solo — ${facts.swimedge.controllers} REST controllers over ${facts.swimedge.services} domain services, ${facts.swimedge.migrationCount} append-forward migrations, and a bilingual right-to-left interface.`,
      `Enforced a ${facts.swimedge.roles}-role hierarchy server-side, so a club reaches its own swimmers and no one else’s no matter what the client asks for.`,
      `Extended the platform to absorb the sport’s history: ${facts.swimedge.importedResults.toLocaleString()} archived results ingested across ${facts.swimedge.importedMeets} meets so a club can arrive without losing its past.`,
      'Designed a three-tier attribution strategy that quarantines ambiguous records instead of silently corrupting a swimmer’s history.',
    ],
    media: [
      {
        file: 'swimedge-archive.png',
        caption: 'Public competition archive',
        hint: 'Browse historical meet results without logging in',
        aspect: 'auto',
        lenses: ['fullstack', 'pm', 'data', 'research', 'backend', 'frontend'],
      },
      {
        file: 'swimedge-dashboard.png',
        caption: 'Competition dashboard',
        hint: 'Manager competition detail — start lists, results, progression',
        aspect: 'auto',
        lenses: ['fullstack', 'pm', 'backend', 'frontend'],
      },
      {
        file: 'swimedge-claims.png',
        caption: 'Held-result resolution',
        hint: 'Federation queue for unattributed archived results',
        aspect: 'auto',
        lenses: ['fullstack', 'data', 'backend'],
      },
      {
        file: 'swimedge-approvals.png',
        caption: 'Federation approvals queue',
        hint: 'Document verification and payment clearing for federation admins',
        aspect: 'auto',
        // Held back until the approvals queue renders club names in the active
        // UI language — it still shows the raw Hebrew name (SwimEdge tsk_118).
        lenses: [],
      },
      {
        file: 'swimedge-results.png',
        caption: 'An imported championship, in the archive',
        hint: 'A real federation meet ingested from source documents — full event catalogue, publicly browsable',
        aspect: 'auto',
        lenses: ['data', 'pm'],
      },
      {
        file: 'swimedge-career-hub.png',
        caption: 'Swimmer career hub',
        hint: 'Personal bests and progression across club changes',
        aspect: 'auto',
        lenses: ['fullstack', 'frontend'],
      },
      {
        file: 'swimdata-challenge.png',
        caption: 'swimdata-il — entity resolution, live from the database',
        hint: 'The public dashboard’s resolution panel, generated from the loaded database',
        aspect: 'auto',
        lenses: ['data'],
      },
    ],
    links: [
      {
        label: 'swimdata-il on GitHub',
        href: facts.swimdata.repo,
        note: 'Public repository — the parsing and entity-resolution method as a standalone, runnable project',
        lenses: ['data'],
      },
    ],
    status:
      'In active development, running on real federation data. The club-facing platform and its role hierarchy are the core and are in place; the public archive, identity claims, and the archive import campaign extend it, and rules-engine hardening is ongoing.',
  },
]

export function getProjectEmphasis(project: Project, lens: LensId): ProjectEmphasis {
  return project.emphasis[lens]
}

export function sectionsForLens(project: Project, lens: LensId): Project['sections'] {
  return project.sections.filter((s) => !s.lenses || s.lenses.includes(lens))
}

export function metricsForLens(project: Project, lens: LensId): Project['metrics'] {
  return {
    ...project.metrics,
    rows: project.metrics.rows.filter((r) => !r.lenses || r.lenses.includes(lens)),
  }
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
