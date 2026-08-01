import type { LensId } from './profile'

export type SectionId =
  | 'hero'
  | 'featured'
  | 'project-research'
  | 'project-swimedge'
  | 'how-i-work'
  | 'skills'
  | 'contact'

export interface LensLayout {
  sections: SectionId[]
  /** Skill group titles to show; undefined = all groups */
  skillGroups?: string[]
  /** Contact section options */
  contact: {
    showAlso: boolean
    showEducation: boolean
    resumeAsTextLink: boolean
  }
  /** Hero options */
  hero: {
    showEducation: boolean
  }
  featured: {
    eyebrow: string
    title: string
    lead: string
  }
}

export const lensLayouts: Record<LensId, LensLayout> = {
  research: {
    sections: ['hero', 'featured', 'project-research', 'project-swimedge', 'how-i-work', 'contact'],
    // Education lives in the hero on this lens; repeating it in contact was a duplicate.
    contact: { showAlso: true, showEducation: false, resumeAsTextLink: true },
    hero: { showEducation: true },
    featured: {
      eyebrow: 'Featured work',
      title: 'Underwater kinematics with an honest error budget',
      lead: 'M.Sc. research bridging computer vision and hydrodynamic simulation — measured, staged, and regression-tested.',
    },
  },
  fullstack: {
    sections: [
      'hero',
      'featured',
      'project-swimedge',
      'project-research',
      'how-i-work',
      'skills',
      'contact',
    ],
    skillGroups: [
      'Programming Languages',
      'Web & System Development',
      'Databases & Storage',
      'Tools, Testing & Infrastructure',
    ],
    contact: { showAlso: false, showEducation: false, resumeAsTextLink: true },
    hero: { showEducation: false },
    featured: {
      eyebrow: 'Featured work',
      title: 'SwimEdge — solo full-stack platform',
      lead: 'A production client–server system for a national sport federation, from Postgres schema to bilingual right-to-left interface — shipped and operated by one engineer.',
    },
  },
  pm: {
    sections: ['hero', 'featured', 'project-swimedge', 'how-i-work', 'contact'],
    contact: { showAlso: true, showEducation: false, resumeAsTextLink: true },
    hero: { showEducation: false },
    featured: {
      eyebrow: 'Product',
      title: 'A federation platform built from the pool deck',
      lead: 'The product case: give every club in the country one governed place to run its swimmers — and take it to the governing body directly.',
    },
  },
  data: {
    sections: [
      'hero',
      'featured',
      'project-swimedge',
      'project-research',
      'how-i-work',
      'skills',
      'contact',
    ],
    skillGroups: [
      'Programming Languages',
      'Data Engineering',
      'Databases & Storage',
      'AI / ML & Computer Vision',
      'Tools, Testing & Infrastructure',
    ],
    contact: { showAlso: false, showEducation: false, resumeAsTextLink: true },
    hero: { showEducation: false },
    featured: {
      eyebrow: 'Featured work',
      title: 'Governed data at federation scale',
      lead: 'Arena exports and regulation PDFs become attributed relational records — with lineage, quarantine, and semantic performance deltas.',
    },
  },
}

export function layoutForLens(lensId: LensId): LensLayout {
  return lensLayouts[lensId]
}
