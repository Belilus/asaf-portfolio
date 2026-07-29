import { useEffect, useMemo, useState } from 'react'
import { AgentOrchestration } from './components/AgentOrchestration'
import { Contact, Footer } from './components/Contact'
import { Hero } from './components/Hero'
import { HowIBuild } from './components/HowIBuild'
import { Nav } from './components/Nav'
import { ProjectCase } from './components/ProjectCase'
import { Skills } from './components/Skills'
import { SectionHeading } from './components/primitives'
import { layoutForLens } from './content/lensLayout'
import type { LensId } from './content/profile'
import { lenses } from './content/profile'
import { projects } from './content/projects'
import { lensFromUrl, pathForLens } from './lib/lensFromUrl'

const LENS_KEY = 'ab-portfolio-lens'
const THEME_KEY = 'ab-portfolio-theme-v2'

export default function App() {
  const [lensId, setLensId] = useState<LensId>(() =>
    lensFromUrl(window.location.pathname, window.location.search),
  )

  const lens = useMemo(() => lenses.find((l) => l.id === lensId) ?? lenses[0], [lensId])
  const layout = useMemo(() => layoutForLens(lensId), [lensId])

  const handleLensChange = (id: LensId) => {
    setLensId(id)
    const path = pathForLens(id)
    window.history.pushState(null, '', path)
  }

  useEffect(() => {
    const onPopState = () => {
      setLensId(lensFromUrl(window.location.pathname, window.location.search))
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    localStorage.setItem(LENS_KEY, lensId)
  }, [lensId])

  const [deepWater, setDeepWater] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored) return stored === 'deep'
    return false
  })

  useEffect(() => {
    localStorage.setItem(THEME_KEY, deepWater ? 'deep' : 'light')
    document.documentElement.classList.toggle('dark', !deepWater)
  }, [deepWater])

  const researchProject = projects.find((p) => p.id === 'research')
  const swimedgeProject = projects.find((p) => p.id === 'swimedge')

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

      <Nav deepWater={deepWater} lensId={lensId} layout={layout} onToggle={() => setDeepWater((v) => !v)} />

      <main>
        {layout.sections.map((section) => {
          switch (section) {
            case 'hero':
              return (
                <Hero
                  key="hero"
                  lens={lens}
                  showEducation={layout.hero.showEducation}
                  onLensChange={handleLensChange}
                />
              )
            case 'featured':
              return (
                <div key="featured">
                  <div className="lane-rule" />
                  <section className="pt-16 sm:pt-24">
                    <div className="section-shell">
                      <SectionHeading
                        eyebrow={layout.featured.eyebrow}
                        title={layout.featured.title}
                        lead={layout.featured.lead}
                      />
                    </div>
                  </section>
                </div>
              )
            case 'project-research':
              return researchProject ? (
                <ProjectCase key="project-research" project={researchProject} lens={lensId} index={0} />
              ) : null
            case 'project-swimedge':
              return swimedgeProject ? (
                <ProjectCase key="project-swimedge" project={swimedgeProject} lens={lensId} index={0} />
              ) : null
            case 'agents':
              return lensId === 'fullstack' || lensId === 'pm' ? (
                <AgentOrchestration key="agents" lensId={lensId} />
              ) : null
            case 'how-i-build':
              return <HowIBuild key="how-i-build" depth={layout.howIBuildDepth} />
            case 'skills':
              return (
                <Skills
                  key="skills"
                  skillGroupTitles={layout.skillGroups}
                  showPrinciples={lensId !== 'pm'}
                />
              )
            case 'contact':
              return <Contact key="contact" lens={lens} layout={layout.contact} />
            default:
              return null
          }
        })}
      </main>

      <Footer />
    </div>
  )
}
