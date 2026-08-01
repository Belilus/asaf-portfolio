import { agents, howIWorkForLens, skills } from '../content/ai-evidence'
import type { LensId } from '../content/profile'
import { SectionHeading } from './primitives'

export function HowIWork({ lens }: { lens: LensId }) {
  const { eyebrow, title, lead, cards, showRoster } = howIWorkForLens(lens)

  return (
    <section id="how-i-work" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />

        <div className={`grid gap-4 sm:grid-cols-2 ${showRoster ? 'mb-12' : ''}`}>
          {cards.map((c) => (
            <div key={c.title} className="portal-card p-5 sm:p-6">
              <h3 className="text-base font-semibold text-primary">{c.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>

        {showRoster ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="portal-card p-5 sm:p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Who is accountable
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
                Procedures they follow
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
        ) : null}
      </div>
    </section>
  )
}
