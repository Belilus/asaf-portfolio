import type { LensId } from '../content/profile'

const PATH_LENS: Record<string, LensId> = {
  research: 'research',
  fullstack: 'fullstack',
  pm: 'pm',
  data: 'data',
}

const VALID_LENS = new Set<LensId>(['research', 'fullstack', 'pm', 'data'])

export function lensFromUrl(pathname: string, search: string): LensId {
  const segments = pathname.replace(/\/+$/, '').split('/').filter(Boolean)
  const last = segments[segments.length - 1]
  if (last && PATH_LENS[last]) return PATH_LENS[last]

  const params = new URLSearchParams(search)
  const query = params.get('lens')
  if (query && VALID_LENS.has(query as LensId)) return query as LensId

  return 'research'
}

export function pathForLens(lensId: LensId): string {
  return `/${lensId}`
}
