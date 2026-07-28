import { useEffect, useState } from 'react'
import { IconMoon, IconSun } from './primitives'
import { profile } from '../content/profile'

const links = [
  { href: '#research', label: 'Research' },
  { href: '#swimedge', label: 'SwimEdge' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export function Nav({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-base ease-out-expo ${
        scrolled ? 'border-b border-border bg-background/85 backdrop-blur-md' : 'border-b border-transparent'
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
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="focus-ring rounded-md p-2.5 text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground"
          >
            {dark ? <IconSun /> : <IconMoon />}
          </button>
        </div>
      </div>
    </nav>
  )
}
