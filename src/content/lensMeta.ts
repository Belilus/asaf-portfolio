import type { LensId } from './profile'

export const lensShareUrls: Record<LensId, string> = {
  research: 'https://asaf-portfolio-research.vercel.app',
  fullstack: 'https://asaf-portfolio-fullstack.vercel.app',
  pm: 'https://asaf-portfolio-pm.vercel.app',
  data: 'https://asaf-portfolio-data.vercel.app',
}

export const lensPageMeta: Record<
  LensId,
  { title: string; description: string; ogTitle: string }
> = {
  research: {
    title: 'Asaf Belilus — Computer Vision & Biomechanics Research',
    description:
      'M.Sc. research reconstructing swimmer joint kinematics from underwater pose data — with an honest, regenerated error budget.',
    ogTitle: 'Asaf Belilus — Research Portfolio',
  },
  fullstack: {
    title: 'Asaf Belilus — Full-Stack Software Engineer',
    description:
      'SwimEdge: a solo-built federation platform — Spring Boot, React/TypeScript, Postgres, bilingual RTL — verified by test gates before every merge.',
    ogTitle: 'Asaf Belilus — Full-Stack Portfolio',
  },
  pm: {
    title: 'Asaf Belilus — Product Founder · SwimEdge',
    description:
      'SwimEdge: replacing spreadsheet-era federation software. Discovery on the incumbent first; demoed to ISA leadership, July 2026.',
    ogTitle: 'Asaf Belilus — Product / Founder Portfolio',
  },
  data: {
    title: 'Asaf Belilus — Data Engineer',
    description:
      'Federation-scale ingestion: three-tier attribution, lineage on every row, zero silent drops — with a public, verifiable proof of method.',
    ogTitle: 'Asaf Belilus — Data Portfolio',
  },
}

export function applyLensPageMeta(lensId: LensId) {
  const meta = lensPageMeta[lensId]
  document.title = meta.title

  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', meta.description)

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', meta.ogTitle)

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', meta.description)
}
