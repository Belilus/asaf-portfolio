import type { HowIBuildDepth } from './how-i-build'
import type { LensId } from './profile'

export type SectionId =
  | 'hero'
  | 'featured'
  | 'project-research'
  | 'project-swimedge'
  | 'agents'
  | 'how-i-build'
  | 'skills'
  | 'contact'

export interface LensLayout {
  sections: SectionId[]
  /** Skill group titles to show; undefined = all groups */
  skillGroups?: string[]
  /** How I build depth */
  howIBuildDepth: HowIBuildDepth
  /** Agent section framing */
  agentsAngle?: 'engineering' | 'product'
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
    sections: ['hero', 'featured', 'project-research', 'how-i-build', 'contact'],
    howIBuildDepth: 'brief',
    contact: { showAlso: true, showEducation: true, resumeAsTextLink: true },
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
      'agents',
      'how-i-build',
      'skills',
      'contact',
    ],
    skillGroups: [
      'Programming Languages',
      'Web & System Development',
      'Databases & Storage',
      'Tools, Testing & Infrastructure',
    ],
    howIBuildDepth: 'full',
    agentsAngle: 'engineering',
    contact: { showAlso: false, showEducation: false, resumeAsTextLink: true },
    hero: { showEducation: false },
    featured: {
      eyebrow: 'Featured work',
      title: 'SwimEdge — solo full-stack platform',
      lead: 'End-to-end competition management for Israeli swimming: ingestion, attribution, bilingual RTL UI, and a synchronized agent network.',
    },
  },
  pm: {
    sections: ['hero', 'featured', 'project-swimedge', 'agents', 'contact'],
    howIBuildDepth: 'brief',
    agentsAngle: 'product',
    contact: { showAlso: true, showEducation: false, resumeAsTextLink: true },
    hero: { showEducation: false },
    featured: {
      eyebrow: 'Product',
      title: 'A federation platform built from the pool deck',
      lead: 'SwimEdge is the product I would have wanted as a swimmer and coach — governed records, identity that follows athletes, and workflows for every stakeholder.',
    },
  },
  data: {
    sections: [
      'hero',
      'featured',
      'project-swimedge',
      'project-research',
      'how-i-build',
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
    howIBuildDepth: 'medium',
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
