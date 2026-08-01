import { useEffect, useState } from 'react'
import type { LensLayout } from '../content/lensLayout'
import type { LensId } from '../content/profile'
import { IconMoon, IconSun } from './primitives'
import { profile } from '../content/profile'
import { getProjectEmphasis, projects } from '../content/projects'

function navLinksForLens(lensId: LensId, layout: LensLayout) {
  const links: { href: string; label: string }[] = []

  if (layout.sections.includes('project-research')) {
    links.push({ href: '#research', label: 'Research' })
  }
  if (layout.sections.includes('project-swimedge')) {
    links.push({ href: '#swimedge', label: 'SwimEdge' })
  }
  if (layout.sections.includes('how-i-work')) {
    links.push({ href: '#how-i-work', label: 'How I work' })
  }
  if (layout.sections.includes('skills')) {
    links.push({ href: '#skills', label: 'Skills' })
  }
  links.push({ href: '#contact', label: 'Contact' })

  // Fallback if layout is empty
  if (links.length === 1) {
    return projects
      .filter((p) => getProjectEmphasis(p, lensId) !== 'hidden')
      .map((p) => ({
        href: `#${p.id}`,
        label: p.id === 'research' ? 'Research' : 'SwimEdge',
      }))
      .concat([{ href: '#contact', label: 'Contact' }])
  }

  return links
}

export function Nav({
  deepWater,
  lensId,
  layout,
  onToggle,
}: {
  deepWater: boolean
  lensId: LensId
  layout: LensLayout
  onToggle: () => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const links = navLinksForLens(lensId, layout)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-base ease-out-expo ${
        scrolled ? 'portal-glass border-b border-border' : 'border-b border-transparent'
      }`}
    >
      <div className="section-shell flex h-16 items-center justify-between">
        <a
          href="#top"
          className="focus-ring rounded-md font-mono text-sm font-semibold tracking-tight"
        >
          <span className="text-primary">AB</span>
          <span className="ml-2 hidden text-muted-foreground sm:inline">{profile.name}</span>
        </a>

        <div className="flex items-center gap-1">
          <ul className="mr-1 hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="focus-ring rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onToggle}
            aria-label={deepWater ? 'Switch to light mode' : 'Switch to Deep Water theme'}
            className="focus-ring rounded-md p-2.5 text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground"
          >
            {deepWater ? <IconSun /> : <IconMoon />}
          </button>
        </div>
      </div>
    </nav>
  )
}
