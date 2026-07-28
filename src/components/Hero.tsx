import type { Lens } from '../content/profile'
import { education, lenses, profile } from '../content/profile'
import { Button, IconDownload, IconGitHub, IconLinkedIn, IconMail } from './primitives'

/** Decorative lane-rope field — echoes the SwimEdge Deep Water identity. */
function LaneBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(70%_60%_at_50%_-10%,var(--primary),transparent_70%)] opacity-[0.10]" />
      <div className="absolute inset-0 opacity-[0.35]">
        {[18, 34, 50, 66, 82].map((top, i) => (
          <div
            key={top}
            className="absolute inset-x-0 h-px"
            style={{
              top: `${top}%`,
              background:
                'linear-gradient(90deg, transparent, var(--border) 15%, var(--border) 85%, transparent)',
              opacity: 1 - i * 0.14,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function Hero({
  lens,
  onLensChange,
}: {
  lens: Lens
  onLensChange: (id: Lens['id']) => void
}) {
  return (
    <header id="top" className="relative overflow-hidden pb-20 pt-28 sm:pt-36">
      <LaneBackdrop />

      <div className="section-shell relative">
        {/* ---- role lens switcher ---- */}
        <div className="mb-10 animate-fade-in-up">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Viewing as
          </p>
          <div
            role="tablist"
            aria-label="Choose the role framing for this portfolio"
            className="inline-flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1 shadow-xs portal-card"
          >
            {lenses.map((l) => {
              const active = l.id === lens.id
              return (
                <button
                  key={l.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => onLensChange(l.id)}
                  className={`focus-ring rounded-md px-4 py-2.5 text-base font-medium transition-all duration-base ease-out-expo ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {l.label}
                </button>
              )
            })}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{lens.blurb}</p>
        </div>

        {/* ---- identity ---- */}
        <div key={lens.id} className="animate-fade-in-up">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-4 max-w-2xl text-lg font-medium text-primary sm:text-xl">
            {lens.headline}
          </p>

          <div className="mt-7 max-w-2xl space-y-4">
            {lens.bio.map((p) => (
              <p key={p.slice(0, 32)} className="text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>

          {/* ---- actions ---- */}
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={`mailto:${profile.email}`} variant="primary">
              <IconMail />
              Email me
            </Button>
            <Button href={profile.linkedin}>
              <IconLinkedIn />
              LinkedIn
            </Button>
            <Button href={profile.github}>
              <IconGitHub />
              GitHub
            </Button>
            <Button
              href={`${import.meta.env.BASE_URL}resume/${lens.resume.file}`}
              download
              ariaLabel={`Download ${lens.resume.label}`}
            >
              <IconDownload />
              {lens.resume.label}
            </Button>
          </div>

          {/* ---- proof strip ---- */}
          <dl className="portal-card mt-14 grid gap-px overflow-hidden sm:grid-cols-3">
            {lens.stats.map((s) => (
              <div key={s.label} className="bg-card p-5">
                <dt className="font-data text-2xl font-semibold text-foreground">{s.value}</dt>
                <dd className="mt-1.5 text-base font-medium text-foreground/90">{s.label}</dd>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.note}</dd>
              </div>
            ))}
          </dl>

          {/* ---- education ---- */}
          <div className="mt-8 flex flex-col gap-3 text-base sm:flex-row sm:flex-wrap sm:gap-8">
            {education.map((e) => (
              <div key={e.degree} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="font-medium">{e.degree}</p>
                  <p className="text-muted-foreground">{e.detail}</p>
                  <p className="font-data text-sm text-muted-foreground/80">{e.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
