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
    contact: { showAlso: true, showEducation: false, resumeAsTextLink: true },
    hero: { showEducation: true },
    featured: {
      eyebrow: 'Featured work',
      title: 'Measured underwater kinematics',
      lead: 'Bridging computer vision and hydrodynamic simulation with an honest, regression-tested error budget.',
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
      lead: 'A production client–server system shipped and operated by one engineer, from schema to UI.',
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
      title: 'Governed data at scale',
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
      title: 'Scalable federation architecture',
      lead: 'A secure, service-oriented Spring Boot backend handling complex multi-tenant hierarchies and data integrity.',
    },
  },
  'swe-intern': {
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
      'AI / ML & Computer Vision',
      'Web & System Development',
      'Databases & Storage',
      'Tools, Testing & Infrastructure',
    ],
    contact: { showAlso: true, showEducation: true, resumeAsTextLink: true },
    hero: { showEducation: true },
    featured: {
      eyebrow: 'Featured work',
      title: 'Shipped systems, measured honestly',
      lead: 'A production platform built end to end by one engineer, and research whose headline number cannot outrun its own error budget.',
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
