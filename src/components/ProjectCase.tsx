import { useState } from 'react'
import type { LensId } from '../content/profile'
import type { Project } from '../content/projects'
import { getProjectEmphasis } from '../content/projects'
import { IconChevron, MediaPlaceholder } from './primitives'

function toneClass(tone?: string) {
  if (tone === 'improve') return 'text-perf-improve'
  if (tone === 'warn') return 'text-warning'
  return 'text-foreground'
}

function MetricTable({ metrics }: { metrics: Project['metrics'] }) {
  return (
    <div className="portal-card overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <h4 className="text-sm font-semibold">{metrics.title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{metrics.note}</p>
      </div>
      <dl className="divide-y divide-border">
        {metrics.rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-4 px-5 py-3">
            <div className="min-w-0">
              <dt className="truncate text-sm text-foreground/90">{r.label}</dt>
              {r.hint && <p className="mt-0.5 text-sm text-muted-foreground">{r.hint}</p>}
            </div>
            <dd className={`font-data shrink-0 text-sm font-semibold ${toneClass(r.tone)}`}>
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function ArchitectureFlow({
  architecture,
  maxStages,
}: {
  architecture: Project['architecture']
  maxStages?: number
}) {
  const stages = maxStages ? architecture.stages.slice(0, maxStages) : architecture.stages

  return (
    <div className="portal-card p-5 sm:p-6">
      <h4 className="text-sm font-semibold">{architecture.title}</h4>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{architecture.note}</p>

      <ol className="mt-6 space-y-0">
        {stages.map((s, i) => (
          <li key={s.step} className="relative flex gap-4 pb-6 last:pb-0">
            {i < stages.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[13px] top-8 bottom-0 w-px bg-border"
              />
            )}
            <span className="font-data relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-primary">
              {s.step}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              {s.tech && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {s.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function InlineSections({
  project,
  headings,
}: {
  project: Project
  headings: string[]
}) {
  const sections = project.sections.filter((s) => headings.includes(s.heading))
  if (sections.length === 0) return null

  return (
    <div className="portal-card space-y-8 p-5 sm:p-6">
      {sections.map((s) => (
        <section key={s.heading}>
          <h4 className="mb-3 text-base font-semibold text-primary">{s.heading}</h4>
          <div className="space-y-3">
            {s.body.map((p) => (
              <p key={p.slice(0, 32)} className="text-sm leading-[1.75] text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export function ProjectCase({
  project,
  lens,
  index,
}: {
  project: Project
  lens: LensId
  index: number
}) {
  const emphasis = getProjectEmphasis(project, lens)
  const isFull = emphasis === 'full'
  const isCompact = emphasis === 'compact'

  const [open, setOpen] = useState(isFull)

  const highlights =
    isCompact && project.compactHighlights
      ? project.compactHighlights
      : isCompact
        ? project.highlights.slice(0, 2)
        : project.highlights

  const mediaSlots = project.media.filter((m) => m.file)
  const visibleMedia = isFull ? mediaSlots : mediaSlots.slice(0, 1)

  const compactHeadings =
    project.compactSections ?? [project.sections[0]?.heading, project.sections[2]?.heading].filter(
      Boolean,
    ) as string[]

  return (
    <article id={project.id} className="scroll-mt-20 py-16 sm:py-24">
      <div className="section-shell">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="font-data text-sm font-semibold text-primary">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="portal-eyebrow">{project.eyebrow}</span>
            {isCompact && (
              <span className="chip border-primary/30 text-primary">Supporting project</span>
            )}
          </div>

          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.name}</h3>
          <p className="mt-3 text-lg leading-relaxed text-foreground/80">{project.subtitle}</p>

          <p className="mt-5 border-l-2 border-primary pl-4 text-base leading-relaxed text-muted-foreground">
            {project.premise}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
            <span className="font-data">{project.period}</span>
            <span>{project.role}</span>
          </div>

          <div
            key={lens}
            className="mt-6 animate-fade-in-up rounded-lg border border-primary/25 bg-primary/[0.06] p-4"
          >
            <p className="mb-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Why this matters for this role
            </p>
            <p className="text-base leading-relaxed text-foreground/85">{project.angle[lens]}</p>
          </div>
        </div>

        <ul className={`mb-12 grid gap-3 ${isFull ? 'sm:grid-cols-2' : ''}`}>
          {highlights.map((h) => (
            <li key={h} className="portal-card flex gap-3 p-4">
              <span
                aria-hidden="true"
                className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              />
              <span className="text-base leading-relaxed text-foreground/85">{h}</span>
            </li>
          ))}
        </ul>

        {isFull && (
          <div className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            <ArchitectureFlow architecture={project.architecture} />
            <MetricTable metrics={project.metrics} />
          </div>
        )}

        {isCompact && (
          <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-start">
            <MetricTable metrics={project.metrics} />
            <InlineSections project={project} headings={compactHeadings} />
          </div>
        )}

        {visibleMedia.length > 0 && (
          <div className="mb-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {project.id === 'research' ? 'Diagrams & result graphs' : 'Screenshots & demo'}
            </p>
            <div className={`grid gap-4 ${isFull && visibleMedia.length > 1 ? 'sm:grid-cols-2' : ''}`}>
              {visibleMedia.map((m, i) => (
                <div
                  key={m.caption}
                  className={m.aspect === 'wide' && i === 0 ? 'sm:col-span-2' : ''}
                >
                  <MediaPlaceholder {...m} />
                </div>
              ))}
            </div>
          </div>
        )}

        {isFull && (
          <div className="portal-card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-fast hover:bg-accent sm:px-6"
            >
              <span>
                <span className="block text-sm font-semibold">
                  {open ? 'Hide' : 'Read'} the full case study
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {project.sections.map((s) => s.heading).join(' · ')}
                </span>
              </span>
              <IconChevron
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-base ease-out-expo ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>

            {open && (
              <div className="animate-fade-in-up border-t border-border px-5 py-8 sm:px-6">
                <div className="max-w-3xl space-y-10">
                  {project.sections.map((s) => (
                    <section key={s.heading}>
                      <h4 className="mb-3 text-base font-semibold text-primary">{s.heading}</h4>
                      <div className="space-y-4">
                        {s.body.map((p) => (
                          <p
                            key={p.slice(0, 32)}
                            className="text-sm leading-[1.75] text-muted-foreground"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {isFull && (
          <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Frameworks & tools
              </p>
              <div className="space-y-4">
                {project.stack.map((g) => (
                  <div key={g.group} className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                    <p className="w-32 shrink-0 pt-1 text-sm font-medium text-foreground/70">
                      {g.group}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="portal-card p-5">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Current status
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">{project.status}</p>
            </aside>
          </div>
        )}

        {isCompact && (
          <aside className="portal-card p-5">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Current status
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">{project.status}</p>
          </aside>
        )}
      </div>
    </article>
  )
}
