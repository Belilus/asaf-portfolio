import type { LensId } from '../content/profile'
import { isSingleLensSite, lockedLens, resolveLensId } from './portfolioMode'

/** @deprecated Use resolveLensId from portfolioMode */
export function lensFromUrl(pathname: string, search: string): LensId {
  return resolveLensId(pathname, search)
}

export function pathForLens(lensId: LensId): string {
  if (isSingleLensSite()) return '/'
  return `/${lensId}`
}

export { lockedLens, isSingleLensSite, resolveLensId }
