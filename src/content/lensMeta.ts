import type { LensId } from './profile'

export const lensShareUrls: Record<LensId, string> = {
  research: 'https://asaf-portfolio-research.vercel.app',
  fullstack: 'https://asaf-portfolio-fullstack.vercel.app',
  pm: 'https://asaf-portfolio-pm.vercel.app',
  data: 'https://asaf-portfolio-data.vercel.app',
  backend: 'https://asaf-portfolio-backend.vercel.app',
  frontend: 'https://asaf-portfolio-frontend.vercel.app',
  'swe-intern': 'https://asaf-portfolio-swe.vercel.app',
}

export const lensPageMeta: Record<
  LensId,
  { title: string; description: string; ogTitle: string }
> = {
  research: {
    title: 'Asaf Belilus — Computer Vision & Biomechanics Research',
    description:
      'M.Sc. research reconstructing swimmer joint motion from underwater 3-D pose data for hydrodynamic simulation.',
    ogTitle: 'Asaf Belilus — Computer Vision Research',
  },
  fullstack: {
    title: 'Asaf Belilus — Full-Stack Software Engineer',
    description:
      'Full-stack engineer behind SwimEdge: Spring Boot, React, PostgreSQL, role-based access, and 811 automated tests.',
    ogTitle: 'Asaf Belilus — Full-Stack Engineer',
  },
  pm: {
    title: 'Asaf Belilus — Product Founder · SwimEdge',
    description:
      'SwimEdge: replacing spreadsheet-era federation software. Discovery on the incumbent first; demoed to ISA leadership, July 2026.',
    ogTitle: 'Asaf Belilus — Product Founder',
  },
  data: {
    title: 'Asaf Belilus — Data Engineer',
    description:
      'Data engineering for federation records: document ingestion, entity resolution, source lineage, and explicit review of ambiguity.',
    ogTitle: 'Asaf Belilus — Data Engineer',
  },
  backend: {
    title: 'Asaf Belilus — Backend Software Engineer',
    description:
      'Backend engineer building Spring Boot APIs, PostgreSQL schemas, club-scoped authorization, and database-backed tests.',
    ogTitle: 'Asaf Belilus — Backend Engineer',
  },
  frontend: {
    title: 'Asaf Belilus — Frontend Software Engineer',
    description:
      'Frontend engineer building React and TypeScript interfaces across six roles, three languages, and RTL layouts.',
    ogTitle: 'Asaf Belilus — Frontend Engineer',
  },
  'swe-intern': {
    title: 'Asaf Belilus — Software Engineer',
    description:
      'Software engineer and M.Sc. Computer Science student building full-stack systems and computer-vision research pipelines.',
    ogTitle: 'Asaf Belilus — Software Engineer',
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
