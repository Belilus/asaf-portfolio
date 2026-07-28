import type { Lens } from '../content/profile'
import { alsoDoing, profile } from '../content/profile'
import { Button, IconDownload, IconGitHub, IconLinkedIn, IconMail, SectionHeading } from './primitives'

export function Contact({ lens }: { lens: Lens }) {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s talk"
          lead="I’m looking for research and engineering roles where measurement rigor matters. The fastest way to reach me is email — I reply to everything."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
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
              <Button href={`${import.meta.env.BASE_URL}resume/${lens.resume.file}`} download>
                <IconDownload />
                {lens.resume.label}
              </Button>
            </div>

            <dl className="mt-8 space-y-3 text-base">
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-muted-foreground">Phone</dt>
                <dd className="font-data">{profile.phone}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-muted-foreground">Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-muted-foreground">Research</dt>
                <dd>{profile.researchLocation}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-muted-foreground">Languages</dt>
                <dd>Hebrew (native) · English (fluent)</dd>
              </div>
            </dl>
          </div>

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
