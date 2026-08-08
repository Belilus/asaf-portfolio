import type { LensId } from '../content/profile'

const VALID_LENS = new Set<LensId>([
  'research',
  'fullstack',
  'pm',
  'data',
  'backend',
  'frontend',
  'swe-intern',
])

/** When set at build time, this deploy is a single-lens site with no switcher. */
export function lockedLens(): LensId | null {
  const raw = import.meta.env.VITE_PORTFOLIO_LENS
  if (!raw) return null
  if (VALID_LENS.has(raw as LensId)) return raw as LensId
  console.warn(`Unknown VITE_PORTFOLIO_LENS="${raw}" — ignoring`)
  return null
}

export function isSingleLensSite(): boolean {
  return lockedLens() !== null
}

export function resolveLensId(pathname: string, search: string): LensId {
  const locked = lockedLens()
  if (locked) return locked

  const segments = pathname.replace(/\/+$/, '').split('/').filter(Boolean)
  const last = segments[segments.length - 1]
  const pathMap: Record<string, LensId> = {
    research: 'research',
    fullstack: 'fullstack',
    pm: 'pm',
    data: 'data',
    backend: 'backend',
    frontend: 'frontend',
    'swe-intern': 'swe-intern',
  }
  if (last && pathMap[last]) return pathMap[last]

  const params = new URLSearchParams(search)
  const query = params.get('lens')
  if (query && VALID_LENS.has(query as LensId)) return query as LensId

  return 'research'
}
