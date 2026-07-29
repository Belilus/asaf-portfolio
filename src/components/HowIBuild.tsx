import type { HowIBuildDepth } from '../content/how-i-build'
import { blocksForDepth, howIBuildMeta } from '../content/how-i-build'
import { SectionHeading } from './primitives'

export function HowIBuild({ depth }: { depth: HowIBuildDepth }) {
  const meta = howIBuildMeta[depth]
  const blocks = blocksForDepth(depth)

  return (
    <section id="how-i-build" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="How I work" title={meta.title} lead={meta.lead} />

        <div className="grid gap-4 sm:grid-cols-2">
          {blocks.map((b) => (
            <div key={b.title} className="portal-card p-5 sm:p-6">
              <h3 className="text-base font-semibold text-primary">{b.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
