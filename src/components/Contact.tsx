import type { LensLayout } from '../content/lensLayout'
import type { Lens } from '../content/profile'
import { alsoDoing, education, profile } from '../content/profile'
import { ShareCard } from './ShareCard'
import { Button, IconGitHub, IconLinkedIn, IconMail, SectionHeading } from './primitives'

const contactLeads: Record<Lens['id'], string> = {
  research:
    'I’m looking for research and engineering roles where measurement rigor matters. The fastest way to reach me is email — I reply to everything.',
  fullstack:
    'I’m looking for full-stack engineering roles where I can own systems end to end. Email is fastest — I reply to everything.',
  pm: 'I’m looking for product and founder-track roles where domain depth and shipping discipline matter. Email is fastest.',
  data: 'I’m looking for data engineering and analytics roles where governed ingestion matters. Email is fastest.',
}

export function Contact({ lens, layout }: { lens: Lens; layout: LensLayout['contact'] }) {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="Contact" title="Let’s talk" lead={contactLeads[lens.id]} />

        <div className="mb-10">
          <ShareCard lensId={lens.id} />
        </div>

        <div className={`grid gap-10 ${layout.showAlso ? 'lg:grid-cols-[1.1fr_1fr]' : ''}`}>
          <div>
            <div className="flex flex-wrap gap-3">
              <Button href={`mailto:${profile.email}`} variant="primary">
                <IconMail />
                {profile.email}
              </Button>
              <Button href={profile.linkedin}>
                <IconLinkedIn />
                LinkedIn
              </Button>
              <Button href={profile.github}>
                <IconGitHub />
                GitHub
              </Button>
            </div>

            {layout.resumeAsTextLink && (
              <p className="mt-4 text-sm text-muted-foreground">
                <a
                  href={`${import.meta.env.BASE_URL}resume/${lens.resume.file}`}
                  download
                  className="focus-ring rounded-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Download {lens.resume.label}
                </a>
              </p>
            )}

            <dl className="mt-8 space-y-3 text-base">
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-muted-foreground">Phone</dt>
                <dd className="font-data">{profile.phone}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-muted-foreground">Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              {layout.showEducation && (
                <>
                  <div className="flex gap-3">
                    <dt className="w-24 shrink-0 text-muted-foreground">Research</dt>
                    <dd>{profile.researchLocation}</dd>
                  </div>
                  {education.map((e) => (
                    <div key={e.degree} className="flex gap-3">
                      <dt className="w-24 shrink-0 text-muted-foreground">Education</dt>
                      <dd>
                        {e.degree} · {e.detail}
                      </dd>
                    </div>
                  ))}
                </>
              )}
              {!layout.showEducation && lens.id !== 'research' && (
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 text-muted-foreground">Research</dt>
                  <dd>{profile.researchLocation}</dd>
                </div>
              )}
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-muted-foreground">Languages</dt>
                <dd>Hebrew (native) · English (fluent)</dd>
              </div>
            </dl>
          </div>

          {layout.showAlso && (
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Also
              </p>
              <ul className="space-y-5">
                {alsoDoing.map((a) => (
                  <li key={a.role} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50"
                    />
                    <div>
                      <p className="text-base font-medium">
                        {a.role} <span className="text-muted-foreground">· {a.org}</span>
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="section-shell">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  )
}
