/**
 * How I build — and how I run AI.
 *
 * Every card here is a documented practice from one of the two projects, not a
 * claim about attitude. The through-line: I use agents and skills heavily, and
 * every consequential change passes a gate I designed or a decision I signed.
 *
 * Deliberately NOT featured (owner's call): the claims-queue PII review
 * incident, and the mechanics of running two AI harnesses in parallel lanes.
 */

import type { LensId } from './profile'

export interface EvidenceCard {
  title: string
  body: string
}

export interface AgentRole {
  name: string
  scope: string
}

interface HowIWorkContent {
  eyebrow: string
  title: string
  lead: string
  cards: EvidenceCard[]
  /** Concrete agent + skill names, shown where the audience wants specifics. */
  showRoster: boolean
}

/** The four dispatchable agents on SwimEdge, each owning a source tree. */
export const agents: AgentRole[] = [
  { name: 'system-supervisor', scope: 'Orchestration, cross-layer sync, council gates' },
  { name: 'db-architect', scope: 'Schema integrity, Flyway migrations, JPA entities' },
  { name: 'logic-expert', scope: 'Services, DTOs, API contracts, business rules' },
  { name: 'ui-stylist', scope: 'Design system, components, i18n/RTL, pages' },
]

/** Shared procedure playbooks the agents invoke instead of improvising. */
export const skills = [
  'flyway-migration — append-forward schema changes',
  'pdf-meet-ingestion — federation meet PDFs to canonical ingest artifacts',
  'contract-sync — a backend contract change propagated to regenerated frontend types',
  'council — architectural decision gates before merge',
]

const councilFullstack: EvidenceCard = {
  title: 'Decisions pass a gate, not a vibe',
  body: 'Schema-level and architectural changes go through a five-advisor council review, and every epic starts from a written spec whose open questions I resolve and sign before implementation begins. The identity-claims epic shipped only after its five decisions were recorded — by me, not by a model.',
}

const councilPm: EvidenceCard = {
  title: 'Recorded decisions before code',
  body: 'Every epic opens with a spec whose open product questions are resolved and signed before a line is written; the claims release began as five recorded decisions. Architecture-level changes additionally pass a five-advisor review gate.',
}

const verificationFullstack: EvidenceCard = {
  title: 'Nothing merges on an agent’s word',
  body: 'New behaviour starts from a failing test. Interface work must pass build, lint, tests, and an i18n completeness check before it counts as done; backend changes run the full JUnit and Testcontainers suite against real PostgreSQL first.',
}

const verificationPm: EvidenceCard = {
  title: 'Release quality is a gate, not a hope',
  body: 'Every change clears the automated suites and a translation-completeness check before it ships. Speed comes from AI leverage; safety comes from the gates that leverage cannot skip.',
}

const verificationData: EvidenceCard = {
  title: 'Test-first at the pipeline boundary',
  body: 'Ingestion logic is written test-first: the failing test that defines correct behaviour exists before the code that satisfies it. Repository and end-to-end tests run against real PostgreSQL rather than mocks, because the bugs that matter here are data bugs.',
}

const byteDiffGate: EvidenceCard = {
  title: 'A refactor is not “safe” because an agent says so',
  body: 'Structural changes to the research pipeline have to regenerate the simulation input files and prove them byte-identical to a frozen baseline before the change counts as behaviour-preserving. It is the cheapest available check on confident-sounding output, and it is not optional.',
}

const supervisorAuthority: EvidenceCard = {
  title: 'Agents operate under written authority',
  body: 'The supervisor agent runs on an explicit authorisation model I wrote before the work: mass moves, deletions, and pushes require per-item human approval, and edits to the third-party simulation engine, the ground-truth capture data, or the append-only decision log are refused unconditionally.',
}

const humanSignoffResearch: EvidenceCard = {
  title: 'A good number is not yet a result',
  body: 'A fit is not physically valid because the millimetres look good. When the pipeline creates new joint structures, I inspect the pose in the engine’s animation view before any floor is claimed — one of those checks is why a numerically perfect frame was rejected for an unphysical lower-back kink.',
}

const humanSignoffPm: EvidenceCard = {
  title: 'Sign-off is human, and it is recorded',
  body: 'AI accelerates the build; accountability never delegates. An append-only decision log and per-epic decision gates sit between a model’s output and anything a federation would rely on.',
}

const quarantineLineage: EvidenceCard = {
  title: 'No silent facts',
  body: 'A row that cannot be attributed with confidence is quarantined with a placeholder and its full lineage — batch, source document, matching tier — and the human resolution is recorded. The same rule binds the tooling that builds the system: nothing becomes a fact quietly.',
}

const agentRosterData: EvidenceCard = {
  title: 'Specialists, not one long conversation',
  body: 'Work is dispatched to accountable owners — schema, services, interface — each carrying a memory ledger read at session start and updated at session end, with shared skill playbooks holding the procedures so prompts do not drift between sessions.',
}

const content: Record<LensId, HowIWorkContent> = {
  research: {
    eyebrow: 'Method',
    title: 'Research tooling under written rules',
    lead: 'I run this research with AI agents as heavy tooling — under constraints written down before the work started. The rules, the gates, and the claims are mine.',
    cards: [supervisorAuthority, humanSignoffResearch],
    showRoster: false,
  },
  fullstack: {
    eyebrow: 'How I work',
    title: 'How I build — and how I run AI',
    lead: 'SwimEdge is solo engineering at federation scale, and I get there by operating AI agents and skill playbooks aggressively — inside gates I designed. AI accelerates implementation; the gates and the sign-offs decide what merges.',
    cards: [councilFullstack, verificationFullstack, byteDiffGate],
    showRoster: true,
  },
  pm: {
    eyebrow: 'How I work',
    title: 'I own what ships',
    lead: 'I move fast because I use AI leverage everywhere, and I stay trustworthy because every consequential decision is mine, recorded, and gated.',
    cards: [councilPm, verificationPm, humanSignoffPm],
    showRoster: false,
  },
  data: {
    eyebrow: 'How I work',
    title: 'Governed automation',
    lead: 'The pipelines and the AI tooling that builds them run under one rule: provenance, quarantine, and proof before anything is treated as true.',
    cards: [quarantineLineage, verificationData, byteDiffGate, agentRosterData],
    showRoster: false,
  },
}

export function howIWorkForLens(lens: LensId): HowIWorkContent {
  return content[lens]
}
