import { principles, skillGroups } from '../content/skills'
import { SectionHeading } from './primitives'

const levelStyles: Record<string, string> = {
  core: 'border-primary/45 bg-primary/[0.10] text-foreground',
  working: 'border-border bg-card text-foreground/85',
  familiar: 'border-border bg-transparent text-muted-foreground',
}

export function Skills({
  skillGroupTitles,
  showPrinciples = true,
}: {
  skillGroupTitles?: string[]
  showPrinciples?: boolean
}) {
  const groups = skillGroupTitles
    ? skillGroups.filter((g) => skillGroupTitles.includes(g.title))
    : skillGroups

  return (
    <section id="skills" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Skills & Technologies"
          title="What I actually build with"
          lead="Every entry is drawn from the projects above — nothing listed for coverage."
        />

        <div className="mb-10 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {(['core', 'working', 'familiar'] as const).map((l) => (
            <span key={l} className="flex items-center gap-2">
              <span className={`h-3 w-3 rounded-sm border ${levelStyles[l]}`} />
              <span className="capitalize">{l}</span>
            </span>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.title} className="portal-card p-5 sm:p-6">
              <h3 className="text-base font-semibold">{g.title}</h3>
              {g.note && (
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.note}</p>
              )}
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li
                    key={s.name}
                    title={s.from ? `Used in: ${s.from}` : undefined}
                    className={`rounded-md border px-2.5 py-1.5 text-sm font-medium transition-colors duration-fast ${
                      levelStyles[s.level]
                    }`}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {showPrinciples && (
          <div className="mt-16">
            <p className="portal-eyebrow mb-6">Engineering principles</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="border-l-2 border-border pl-5 transition-colors duration-base hover:border-primary"
                >
                  <h3 className="text-base font-semibold">{p.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
