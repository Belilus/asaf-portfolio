import type { LensId } from './profile'

export const lensPageMeta: Record<
  LensId,
  { title: string; description: string; ogTitle: string }
> = {
  research: {
    title: 'Asaf Belilus — M.Sc. Researcher · Computer Vision & Biomechanics',
    description:
      'M.Sc. research at Ben-Gurion University: underwater pose reconstruction, SWUM kinematics, and an honest error budget.',
    ogTitle: 'Asaf Belilus — Research Portfolio',
  },
  fullstack: {
    title: 'Asaf Belilus — Full-Stack Software Engineer',
    description:
      'Solo full-stack engineer behind SwimEdge: Java/Spring Boot, React/TypeScript, Postgres, and a synchronized agent network.',
    ogTitle: 'Asaf Belilus — Full-Stack Portfolio',
  },
  pm: {
    title: 'Asaf Belilus — Product Founder · SwimEdge',
    description:
      'Solo product founder building SwimEdge — a federation platform for Israeli competitive swimming, from vision to production.',
    ogTitle: 'Asaf Belilus — Product / Founder Portfolio',
  },
  data: {
    title: 'Asaf Belilus — Data & Pipeline Engineer',
    description:
      'Federation-scale ingestion, three-tier result attribution, and governed data pipelines — SwimEdge and research error budgets.',
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
