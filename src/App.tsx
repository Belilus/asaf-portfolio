import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Contact, Footer } from './components/Contact'
import { Hero } from './components/Hero'
import { HowIWork } from './components/HowIWork'
import { Nav } from './components/Nav'
import { ProjectCase } from './components/ProjectCase'
import { SectionReveal } from './components/SectionReveal'
import { Skills } from './components/Skills'
import { SectionHeading } from './components/primitives'
import { applyLensPageMeta } from './content/lensMeta'
import { layoutForLens } from './content/lensLayout'
import type { LensId } from './content/profile'
import { lenses } from './content/profile'
import { projects } from './content/projects'
import { isSingleLensSite, pathForLens, resolveLensId } from './lib/lensFromUrl'

const LENS_KEY = 'ab-portfolio-lens'
const THEME_KEY = 'ab-portfolio-theme-v2'

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <SectionReveal delay={delay}>{children}</SectionReveal>
}

export default function App() {
  const singleLens = isSingleLensSite()

  const [lensId, setLensId] = useState<LensId>(() =>
    resolveLensId(window.location.pathname, window.location.search),
  )

  const lens = useMemo(() => lenses.find((l) => l.id === lensId) ?? lenses[0], [lensId])
  const layout = useMemo(() => layoutForLens(lensId), [lensId])

  const handleLensChange = (id: LensId) => {
    if (singleLens) return
    setLensId(id)
    window.history.pushState(null, '', pathForLens(id))
  }

  useEffect(() => {
    if (singleLens) return
    const onPopState = () => {
      setLensId(resolveLensId(window.location.pathname, window.location.search))
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [singleLens])

  useEffect(() => {
    if (singleLens) return
    localStorage.setItem(LENS_KEY, lensId)
  }, [lensId, singleLens])

  useEffect(() => {
    if (!singleLens) return
    const { pathname, search } = window.location
    const onRoot = pathname === '/' || pathname === ''
    const hasLensQuery = new URLSearchParams(search).has('lens')
    const onLegacyPath = /^\/(research|fullstack|pm|data|backend|frontend)\/?$/.test(pathname)
    if (!onRoot || hasLensQuery || onLegacyPath) {
      window.history.replaceState(null, '', '/')
    }
  }, [singleLens])

  useEffect(() => {
    applyLensPageMeta(lensId)
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

  let revealIndex = 0
  const nextDelay = () => {
    const d = revealIndex * 60
    revealIndex += 1
    return d
  }

  // Case studies are numbered by the order this lens actually renders them.
  let projectIndex = 0
  const nextProjectIndex = () => projectIndex++

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
                  showLensSwitcher={!singleLens}
                  onLensChange={handleLensChange}
                />
              )
            case 'featured':
              return (
                <Reveal key="featured" delay={nextDelay()}>
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
                </Reveal>
              )
            case 'project-research':
              return researchProject ? (
                <Reveal key="project-research" delay={nextDelay()}>
                  <ProjectCase project={researchProject} lens={lensId} index={nextProjectIndex()} />
                </Reveal>
              ) : null
            case 'project-swimedge':
              return swimedgeProject ? (
                <Reveal key="project-swimedge" delay={nextDelay()}>
                  <ProjectCase project={swimedgeProject} lens={lensId} index={nextProjectIndex()} />
                </Reveal>
              ) : null
            case 'how-i-work':
              return (
                <Reveal key="how-i-work" delay={nextDelay()}>
                  <HowIWork lens={lensId} />
                </Reveal>
              )
            case 'skills':
              return (
                <Reveal key="skills" delay={nextDelay()}>
                  <Skills skillGroupTitles={layout.skillGroups} showPrinciples={lensId !== 'pm'} />
                </Reveal>
              )
            case 'contact':
              return (
                <Reveal key="contact" delay={nextDelay()}>
                  <Contact lens={lens} layout={layout.contact} />
                </Reveal>
              )
            default:
              return null
          }
        })}
      </main>

      <Footer />
    </div>
  )
}
