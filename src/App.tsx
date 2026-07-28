import { useEffect, useMemo, useState } from 'react'
import { Contact, Footer } from './components/Contact'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { ProjectCase } from './components/ProjectCase'
import { Skills } from './components/Skills'
import { SectionHeading } from './components/primitives'
import type { LensId } from './content/profile'
import { lenses } from './content/profile'
import { visibleProjectsForLens } from './content/projects'

const LENS_KEY = 'ab-portfolio-lens'
const THEME_KEY = 'ab-portfolio-theme'

const featuredCopy: Record<LensId, { title: string; lead: string }> = {
  research: {
    title: 'M.Sc. research — measurement, not guesswork',
    lead: 'A cross-faculty pipeline reconstructing underwater pose into hydrodynamic simulation input — with an error budget that proves what is fixable and what is not.',
  },
  fullstack: {
    title: 'Two systems, built end to end',
    lead: 'A federation platform I architected solo, and a research pipeline engineered with the same verification discipline. Both repositories are private — the case studies carry the technical detail.',
  },
  data: {
    title: 'Governed data at federation scale',
    lead: 'SwimEdge ingestion and attribution are the headline; the research pipeline applies the same reconciliation instinct to motion-capture error.',
  },
}

export default function App() {
  const [lensId, setLensId] = useState<LensId>(() => {
    const stored = localStorage.getItem(LENS_KEY) as LensId | null
    const fromUrl = new URLSearchParams(window.location.search).get('lens') as LensId | null
    const candidate = fromUrl ?? stored
    return lenses.some((l) => l.id === candidate) ? (candidate as LensId) : 'research'
  })

  const lens = useMemo(() => lenses.find((l) => l.id === lensId) ?? lenses[0], [lensId])

  useEffect(() => {
    localStorage.setItem(LENS_KEY, lensId)
  }, [lensId])

  const [deepWater, setDeepWater] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored) return stored !== 'light'
    return true
  })

  useEffect(() => {
    localStorage.setItem(THEME_KEY, deepWater ? 'deep' : 'light')
    document.documentElement.classList.toggle('dark', !deepWater)
  }, [deepWater])

  const ordered = useMemo(() => visibleProjectsForLens(lensId), [lensId])
  const featured = featuredCopy[lensId]

  return (
    <div
      className={`min-h-screen antialiased ${deepWater ? 'track-deep bg-background text-foreground' : 'bg-background text-foreground'}`}
    >
      <a
        href="#top"
        className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Nav deepWater={deepWater} lensId={lensId} onToggle={() => setDeepWater((v) => !v)} />

      <main>
        <Hero lens={lens} onLensChange={setLensId} />

        <div className="lane-rule" />

        <section className="pt-16 sm:pt-24">
          <div className="section-shell">
            <SectionHeading eyebrow="Featured Work" title={featured.title} lead={featured.lead} />
          </div>
        </section>

        {ordered.map((p, i) => (
          <ProjectCase key={p.id} project={p} lens={lensId} index={i} />
        ))}

        <Skills lensId={lensId} />
        <Contact lens={lens} />
      </main>

      <Footer />
    </div>
  )
}
