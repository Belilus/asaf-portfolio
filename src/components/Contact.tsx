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

            <dl className="mt-8 space-y-2 text-sm">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-muted-foreground">Phone</dt>
                <dd className="font-data">{profile.phone}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-muted-foreground">Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-muted-foreground">Languages</dt>
                <dd>Hebrew (native) · English (fluent)</dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
              Also
            </p>
            <ul className="space-y-4">
              {alsoDoing.map((a) => (
                <li key={a.role} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {a.role} <span className="text-muted-foreground">· {a.org}</span>
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{a.detail}</p>
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
      <div className="section-shell flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>
          Built with React, Vite &amp; Tailwind — on the SwimEdge design system.
        </p>
      </div>
    </footer>
  )
}
