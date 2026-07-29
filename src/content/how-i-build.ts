/** Lens-specific depth for the "How I build" section. */
export type HowIBuildDepth = 'brief' | 'medium' | 'full'

export interface HowIBuildBlock {
  title: string
  body: string
}

const shared: HowIBuildBlock[] = [
  {
    title: 'Agents own domains',
    body: 'On SwimEdge I run a small hierarchy of specialised agents — system-supervisor for orchestration, db-architect for schema, logic-expert for services, ui-stylist for the interface. Each owns a source tree and a memory ledger; I dispatch work to the right owner instead of one undifferentiated prompt.',
  },
  {
    title: 'Skills are procedures, not prompts',
    body: 'Reusable recipes live in a shared skills catalog: Flyway migrations, PDF meet ingestion, lane coordination between Claude Code and Cursor, council gates for architectural decisions. A skill answers how to do X correctly; an agent answers who is accountable for X.',
  },
  {
    title: 'Verification is non-negotiable',
    body: 'The research pipeline byte-diffs engine output on every refactor. SwimEdge runs 579 backend tests before merge. Cross-harness work is logged in a lane file so parallel sessions do not silently contradict each other.',
  },
  {
    title: 'What I own vs. what AI accelerates',
    body: 'Domain modeling, federation trust rules, error-budget methodology, and what ships are mine. AI accelerates implementation, test scaffolding, and documentation sync — never the decision of whether an unattributed result becomes a fact.',
  },
]

const researchBrief: HowIBuildBlock[] = [
  {
    title: 'Research pipeline discipline',
    body: 'The numerical core is I/O-free and covered by 46 pytest cases with golden-file byte-diff. Any refactor that cannot prove zero output drift does not land — the same verification instinct I apply at federation scale on SwimEdge.',
  },
]

export const howIBuildMeta = {
  brief: {
    title: 'How I build',
    lead: 'Research is solo engineering with the same verification bar I use on production systems.',
  },
  medium: {
    title: 'How I build data systems',
    lead: 'Ingestion pipelines, reconciliation queues, and error attribution — with agents and skills keeping multi-session work honest.',
  },
  full: {
    title: 'How I build with AI',
    lead: 'I designed the agent hierarchy and shared skills that let me ship a federation platform solo — AI as orchestrated tooling, not autopilot.',
  },
}

export function blocksForDepth(depth: HowIBuildDepth): HowIBuildBlock[] {
  if (depth === 'brief') return researchBrief
  if (depth === 'medium') return shared.slice(0, 3)
  return shared
}
