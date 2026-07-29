import type { LensId } from './profile'

export interface AgentBlock {
  title: string
  body: string
}

export interface AgentRole {
  name: string
  scope: string
}

const agents: AgentRole[] = [
  { name: 'system-supervisor', scope: 'Orchestration, cross-layer sync, lane log, council gates' },
  { name: 'db-architect', scope: 'Schema integrity, Flyway migrations, JPA entities' },
  { name: 'logic-expert', scope: 'Services, DTOs, API contracts, business rules' },
  { name: 'ui-stylist', scope: 'Design system, components, i18n/RTL, pages' },
]

const skills = [
  'flyway-migration — append-forward schema changes',
  'csv-ingestion — Arena XLSX → validated intermediate JSON',
  'lane-coordination — parallel Claude Code ↔ Cursor sessions',
  'council — architectural decision gates before merge',
]

export const agentsMeta: Record<
  Extract<LensId, 'fullstack' | 'pm'>,
  { title: string; lead: string; angle: 'engineering' | 'product' }
> = {
  fullstack: {
    title: 'How I ship with a synchronized agent network',
    lead: 'SwimEdge is solo engineering at federation scale. A small hierarchy of specialised agents owns source trees and memory ledgers; shared skills hold the procedures so prompts do not drift.',
    angle: 'engineering',
  },
  pm: {
    title: 'How I ship solo with AI',
    lead: 'As a solo founder I cannot afford contradictory parallel work. A supervisor agent, lane log, and shared playbooks let me move fast without losing architectural coherence.',
    angle: 'product',
  },
}

export function agentBlocksForLens(lensId: Extract<LensId, 'fullstack' | 'pm'>): AgentBlock[] {
  const angle = agentsMeta[lensId].angle

  if (angle === 'product') {
    return [
      {
        title: 'Who owns what',
        body: 'Four accountable owners — supervisor, database, business logic, interface — each with a memory ledger updated every session. I dispatch work to the right owner instead of one undifferentiated chat thread.',
      },
      {
        title: 'Skills as playbooks',
        body: 'Repeatable procedures (migrations, ingestion, lane coordination, council reviews) live in a shared catalog. Agents invoke playbooks; they do not re-invent them each session. That is how solo shipping stays consistent.',
      },
      {
        title: 'Memory & lane log',
        body: 'Every session starts by reading memory and the lane log — a coordination file between Claude Code and Cursor so parallel work does not contradict. I own what ships; AI accelerates implementation.',
      },
      {
        title: 'Verification before trust',
        body: '579 backend tests, council gates, and explicit held-result queues. Federation software fails on trust, not syntax — the agent system exists so I can move fast without silently corrupting records.',
      },
    ]
  }

  return [
    {
      title: 'Who owns what',
      body: 'system-supervisor orchestrates; db-architect owns schema and Flyway; logic-expert owns services and API contracts; ui-stylist owns the React surface. Each agent carries a MEMORY.md ledger and a protector binding on its source tree.',
    },
    {
      title: 'Skills vs agents',
      body: 'Skills answer how — flyway-migration, csv-ingestion, lane-coordination, council. Agents answer who is accountable. A procedure repeated in two agent specs becomes a shared skill; agents invoke skills instead of duplicating prompts.',
    },
    {
      title: 'Memory & future development',
      body: 'Session start loads MEMORY.md; session end appends new patterns and blockers. Cross-harness work is logged in cli-local/coordination/LANE-LOG.md so Claude Code and Cursor lanes do not silently diverge.',
    },
    {
      title: 'Verification',
      body: '579 backend JUnit tests (Testcontainers), 232 frontend Vitest tests, lane log discipline, and council gates for architectural decisions. AI accelerates scaffolding and implementation — I own architecture and merge.',
    },
  ]
}

export { agents, skills }
