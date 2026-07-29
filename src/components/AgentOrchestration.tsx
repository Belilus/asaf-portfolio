import type { LensId } from '../content/profile'
import { agentBlocksForLens, agents, agentsMeta, skills } from '../content/agents-story'
import { SectionHeading } from './primitives'

export function AgentOrchestration({ lensId }: { lensId: Extract<LensId, 'fullstack' | 'pm'> }) {
  const meta = agentsMeta[lensId]
  const blocks = agentBlocksForLens(lensId)
  const isEngineering = meta.angle === 'engineering'

  return (
    <section id="agents" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="Agent orchestration" title={meta.title} lead={meta.lead} />

        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {blocks.map((b) => (
            <div key={b.title} className="portal-card p-5 sm:p-6">
              <h3 className="text-base font-semibold text-primary">{b.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>

        {isEngineering ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="portal-card p-5 sm:p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Agent network
              </p>
              <ul className="space-y-3">
                {agents.map((a) => (
                  <li key={a.name} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <div>
                      <p className="font-mono text-sm font-medium">{a.name}</p>
                      <p className="text-sm text-muted-foreground">{a.scope}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="portal-card p-5 sm:p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Shared skills
              </p>
              <ul className="space-y-2">
                {skills.map((s) => (
                  <li key={s} className="text-sm leading-relaxed text-muted-foreground">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="portal-card border-primary/25 bg-primary/[0.04] p-5 sm:p-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              Supervisor → specialists → shared playbooks. Parallel AI sessions coordinate through a
              lane log; council gates catch architectural drift before it ships. I own product
              decisions and federation trust — the agent network is how I execute solo at production
              depth.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
