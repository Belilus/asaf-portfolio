import { useEffect, useMemo, useState } from 'react'
import { Contact, Footer } from './components/Contact'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { ProjectCase } from './components/ProjectCase'
import { Skills } from './components/Skills'
import { SectionHeading } from './components/primitives'
import type { LensId } from './content/profile'
import { lenses } from './content/profile'
import { projects } from './content/projects'

const LENS_KEY = 'ab-portfolio-lens'
const THEME_KEY = 'ab-portfolio-theme'

export default function App() {
  /* ---- role lens ---- */
  const [lensId, setLensId] = useState<LensId>(() => {
    const stored = localStorage.getItem(LENS_KEY) as LensId | null
    // Allow deep-linking a framing: /?lens=fullstack
    const fromUrl = new URLSearchParams(window.location.search).get('lens') as LensId | null
    const candidate = fromUrl ?? stored
    return lenses.some((l) => l.id === candidate) ? (candidate as LensId) : 'research'
  })

  const lens = useMemo(() => lenses.find((l) => l.id === lensId) ?? lenses[0], [lensId])

  useEffect(() => {
    localStorage.setItem(LENS_KEY, lensId)
  }, [lensId])

  /* ---- theme ---- */
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
  }, [dark])

  /* ---- project order follows the lens ---- */
  const ordered = useMemo(
    () =>
      lens.projectOrder
        .map((id) => projects.find((p) => p.id === id))
        .filter((p): p is (typeof projects)[number] => Boolean(p)),
    [lens],
  )

  return (
    <>
      <a
        href="#top"
        className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Nav dark={dark} onToggle={() => setDark((v) => !v)} />

      <main>
        <Hero lens={lens} onLensChange={setLensId} />

        <div className="lane-rule" />

        <section className="pt-16 sm:pt-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Featured Work"
              title="Two systems, built end to end"
              lead="One research pipeline that measures what coaches can only estimate, and one production platform that runs a federation. Both repositories are private, so each case study below carries the full technical detail."
            />
          </div>
        </section>

        {ordered.map((p, i) => (
          <ProjectCase key={p.id} project={p} lens={lensId} index={i} />
        ))}

        <Skills />
        <Contact lens={lens} />
      </main>

      <Footer />
    </>
  )
}
