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
    showShare?: boolean
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
    contact: { showAlso: true, showEducation: false, resumeAsTextLink: true },
    hero: { showEducation: true },
    featured: {
      eyebrow: 'Featured work',
      title: 'Measured underwater kinematics',
      lead: 'Turning underwater pose data into joint motion a hydrodynamic simulator can use.',
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
      title: 'SwimEdge — Solo full-stack platform',
      lead: 'A complete client–server system built by one engineer, from schema and APIs to a multilingual interface.',
    },
  },
  pm: {
    sections: ['hero', 'featured', 'project-swimedge', 'how-i-work', 'contact'],
    contact: { showAlso: true, showEducation: false, resumeAsTextLink: true },
    hero: { showEducation: false },
    featured: {
      eyebrow: 'Product',
      title: 'Built from the pool deck up',
      lead: 'Giving every swimming club one governed place to run operations—demoed directly to the governing body.',
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
      'Tools, Testing & Infrastructure',
    ],
    contact: { showAlso: false, showEducation: false, resumeAsTextLink: true },
    hero: { showEducation: false },
    featured: {
      eyebrow: 'Featured work',
      title: 'Governed federation data',
      lead: 'Converting messy PDFs and Excel exports into relational records with zero silent drops.',
    },
  },
  backend: {
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
      'Databases & Storage',
      'Web & System Development',
      'Tools, Testing & Infrastructure',
    ],
    contact: { showAlso: false, showEducation: false, resumeAsTextLink: true },
    hero: { showEducation: false },
    featured: {
      eyebrow: 'Featured work',
      title: 'Federation backend architecture',
      lead: 'Spring Boot services, club-scoped access, append-forward schema changes, and tests against PostgreSQL.',
    },
  },
  'swe-intern': {
    sections: ['hero', 'project-swimedge', 'project-research', 'contact'],
    contact: {
      showAlso: false,
      showEducation: false,
      resumeAsTextLink: true,
      showShare: false,
    },
    hero: { showEducation: true },
    featured: {
      eyebrow: 'Featured work',
      title: 'Software built across the stack',
      lead: 'Production engineering in SwimEdge, supported by disciplined Python research.',
    },
  },
  frontend: {
    sections: ['hero', 'featured', 'project-swimedge', 'how-i-work', 'skills', 'contact'],
    skillGroups: [
      'Programming Languages',
      'Web & System Development',
      'Tools, Testing & Infrastructure',
    ],
    contact: { showAlso: false, showEducation: false, resumeAsTextLink: true },
    hero: { showEducation: false },
    featured: {
      eyebrow: 'Featured work',
      title: 'Complex, data-rich interfaces',
      lead: 'A bilingual, RTL-native React application rendering deep career analytics and live competition dashboards.',
    },
  },
}

export function layoutForLens(lensId: LensId): LensLayout {
  return lensLayouts[lensId]
}
