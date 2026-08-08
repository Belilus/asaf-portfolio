/**
 * Identity, contact, and the role-lens model.
 *
 * The "lens" is the mechanism that replaces maintaining separate portfolios:
 * one site, four shareable URLs, and a switcher that reframes headline, bio,
 * section order, and which resume the download button serves.
 */

import { facts, totalResearchTests } from './facts'

export const profile = {
  name: 'Asaf Belilus',
  title: 'M.Sc. Student · Software & Computer Vision Developer',
  location: 'Tel Aviv, Israel',
  researchLocation: 'Ben-Gurion University, Be’er Sheva',
  email: 'asafb1998@gmail.com',
  phone: '+972-54-436-6866',
  github: 'https://github.com/Belilus',
  linkedin: 'https://www.linkedin.com/in/asaf-belilus',
} as const

export type LensId =
  | 'research'
  | 'fullstack'
  | 'pm'
  | 'data'
  | 'backend'
  | 'frontend'
  | 'swe-intern'

export interface Lens {
  id: LensId
  label: string
  /** Shown under the switcher — one line on who this framing is for. */
  blurb: string
  /** Replaces the hero role line. */
  headline: string
  /** Two-paragraph hero bio, tuned to the audience. */
  bio: string[]
  /** Three proof points rendered as the hero stat strip. */
  stats: { value: string; label: string; note: string }[]
  /** Which projects appear on this lens, in display order. */
  projectVisibility: ('research' | 'swimedge')[]
  /** Resume served by the download button for this lens. */
  resume: { label: string; file: string }
}

export const lenses: Lens[] = [
  {
    id: 'research',
    label: 'Research',
    blurb: 'For research groups, labs, and CV/ML positions.',
    headline:
      'M.Sc. Researcher · Underwater Pose, Joint Kinematics & Hydrodynamic Simulation',
    bio: [
      'My M.Sc. research at Ben-Gurion University reconstructs swimmer joint motion from underwater 3-D pose data for hydrodynamic simulation. I use constrained optimization, staged error attribution, and regression-tested Python pipelines to report both the best fit and the limits imposed by the measurements.',
    ],
    stats: [
      {
        value: `${facts.research.bestFrameMm} mm`,
        label: 'best-frame fit (lower bound)',
        note: `honest baseline ${facts.research.honestFrame60Mm} mm`,
      },
      {
        value: String(totalResearchTests),
        label: 'regression tests',
        note: 'golden-file byte-diff gated',
      },
      { value: '95', label: 'M.Sc. GPA', note: 'Ben-Gurion University' },
    ],
    projectVisibility: ['research', 'swimedge'],
    resume: { label: 'Researcher CV', file: 'Asaf-Belilus-Researcher.pdf' },
  },
  {
    id: 'fullstack',
    label: 'Full-Stack',
    blurb: 'For product engineering and full-stack software roles.',
    headline:
      'Full-Stack Software Engineer · Spring Boot, React & PostgreSQL · End-to-End Ownership',
    bio: [
      'I designed and built SwimEdge end to end: Spring Boot services, a PostgreSQL schema evolved through 23 Flyway migrations, and a 64-page React interface with generated OpenAPI types. Its six roles are enforced server-side, and 811 automated tests cover the backend and frontend.',
    ],
    stats: [
      {
        value: facts.swimedge.migrations,
        label: 'append-forward migrations',
        note: 'deterministic DB reconstruction',
      },
      {
        value: `${facts.swimedge.backendTests} + ${facts.swimedge.frontendTests}`,
        label: 'automated tests',
        note: 'JUnit, Testcontainers, Vitest',
      },
      {
        value: `${facts.swimedge.roles} roles`,
        label: 'server-side RBAC',
        note: 'enforced at API boundary',
      },
    ],
    projectVisibility: ['swimedge', 'research'],
    resume: { label: 'Full-Stack CV', file: 'Asaf-Belilus-Fullstack.pdf' },
  },
  {
    id: 'pm',
    label: 'PM / Founder',
    blurb: 'For product management and founder-track roles.',
    headline: 'Product Founder & PM · SwimEdge · System of Record for Competitive Swimming',
    bio: [
      'I began SwimEdge with a teardown of the incumbent federation tools, mapped regulations and competition workflows into requirements, and shaped a staged rollout for clubs, coaches, swimmers, officials, and the federation. As founder and sole engineer, I own discovery, prioritization, implementation, and stakeholder validation, including a July 2026 demo to Israel Swimming Association leadership.',
    ],
    stats: [
      {
        value: `${facts.swimedge.roles} domains`,
        label: 'governed hierarchy',
        note: 'federation down to swimmer',
      },
      {
        value: 'Full Lifecycle',
        label: 'operational core',
        note: 'registration to historical analytics',
      },
      { value: 'Jul 2026', label: 'ISA leadership demo', note: 'stakeholder validation' },
    ],
    projectVisibility: ['swimedge'],
    resume: { label: 'Product CV', file: 'Asaf-Belilus-PM.pdf' },
  },
  {
    id: 'data',
    label: 'Data Engineering',
    blurb: 'For data engineering, ingestion, and data-quality roles.',
    headline: 'Data Engineer · Federation Ingestion, Entity Resolution & Record Lineage',
    bio: [
      'I turn PDFs, spreadsheets, and multilingual identities into traceable relational data. SwimEdge imported 47,509 archived results across 17 meets with source lineage on every row and a held-result queue reduced from 278 to zero; the public swimdata-il project demonstrates the matching and normalization method on a smaller reproducible dataset.',
    ],
    stats: [
      {
        value: `${facts.swimedge.importedResults.toLocaleString()}`,
        label: 'archived records imported',
        note: `${facts.swimedge.importedMeets} championship meets reconciled`,
      },
      {
        value: '3-Tier',
        label: 'attribution strategy',
        note: 'exact, heuristic, quarantine',
      },
      {
        value: facts.swimdata.matchRate,
        label: 'bilingual record match',
        note: 'public swimdata-il project',
      },
    ],
    projectVisibility: ['swimedge', 'research'],
    resume: { label: 'Data CV', file: 'Asaf-Belilus-Data.pdf' },
  },
  {
    id: 'backend',
    label: 'Backend',
    blurb: 'For backend engineering, API, and platform roles.',
    headline: 'Backend Software Engineer · Java, Spring Boot & PostgreSQL · APIs, Schema & RBAC',
    bio: [
      'I built SwimEdge’s backend as 40 domain services behind 31 REST controllers, with six-role authorization enforced at the API boundary. PostgreSQL evolves through 23 append-forward Flyway migrations, and 579 JUnit and Testcontainers tests verify business rules against a real database.',
    ],
    stats: [
      {
        value: facts.swimedge.migrations,
        label: 'Flyway migrations',
        note: 'append-forward DB evolution',
      },
      {
        value: `${facts.swimedge.backendTests} tests`,
        label: 'backend test suite',
        note: 'JUnit + Testcontainers',
      },
      {
        value: String(facts.swimedge.controllers),
        label: 'REST controllers',
        note: `${facts.swimedge.services} domain services`,
      },
    ],
    projectVisibility: ['swimedge', 'research'],
    resume: { label: 'Backend CV', file: 'Asaf-Belilus-Backend.pdf' },
  },
  {
    id: 'frontend',
    label: 'Frontend',
    blurb: 'For frontend engineering and UI architecture roles.',
    headline: 'Frontend Software Engineer · React & TypeScript · RTL, Design Systems & Role-Based UI',
    bio: [
      'I built SwimEdge’s 64-page React and TypeScript interface across 107 components for six distinct user roles. The UI supports Hebrew, English, and Russian with RTL layouts, follows a token-driven design system, regenerates client types from OpenAPI, and is covered by 232 frontend tests.',
    ],
    stats: [
      {
        value: `${facts.swimedge.pages} pages`,
        label: 'React architecture',
        note: `with ${facts.swimedge.components} components`,
      },
      {
        value: '3 languages',
        label: 'i18n infrastructure',
        note: 'Hebrew · English · Russian, RTL-ready',
      },
      {
        value: `${facts.swimedge.frontendTests} tests`,
        label: 'frontend suite',
        note: 'Vitest + Testing Library',
      },
    ],
    projectVisibility: ['swimedge'],
    resume: { label: 'Frontend CV', file: 'Asaf-Belilus-Frontend.pdf' },
  },
  {
    id: 'swe-intern',
    label: 'SWE',
    blurb: 'For software engineering roles across product, platform, and applied AI teams.',
    headline:
      'Software Engineer · M.Sc. Computer Science · Full-Stack Systems & Computer Vision',
    bio: [
      'I build reliable software from backend services and data models to user-facing applications. I am the sole engineer behind SwimEdge, a multi-role swimming platform, and an M.Sc. researcher developing tested Python pipelines for underwater motion analysis. Both projects reflect how I work: learn the domain, collaborate with the people around it, and verify the result.',
    ],
    stats: [
      {
        value: `${facts.swimedge.backendTests} + ${facts.swimedge.frontendTests}`,
        label: 'automated tests',
        note: 'JUnit, Testcontainers, Vitest',
      },
      {
        value: String(totalResearchTests),
        label: 'research regression tests',
        note: 'golden-file byte-diff gated',
      },
      {
        value: '0 → 1',
        label: 'SwimEdge',
        note: 'designed and built end to end',
      },
    ],
    projectVisibility: ['swimedge', 'research'],
    resume: { label: 'CV', file: 'Asaf-Belilus-Software-Engineer.pdf' },
  },
]

export const education = [
  {
    degree: 'M.Sc. Computer Science',
    org: 'Ben-Gurion University of the Negev',
    detail: 'Researcher in Prof. Gera Weiss’s lab · GPA 95',
    period: '2026 – Present (expected Oct 2027)',
  },
  {
    degree: 'B.Sc. Computer Science',
    org: 'Ben-Gurion University of the Negev',
    detail: 'GPA 84.2 · BGU ASA competitive swim team',
    period: '2022 – 2025',
  },
]

export const alsoDoing = [
  { role: 'Teaching Assistant', org: 'Ben-Gurion University', detail: 'Practicum supervision, grading, examination' },
  { role: 'Swimming Instructor', org: 'Wingate Institute', detail: 'Technique coaching, all ages · since 2014' },
  { role: 'Volunteer Tutor', org: 'Ben-Gurion University', detail: 'Math & CS for returning reservist students' },
  { role: 'Combat Commander (res.)', org: 'IDF Paratrooper Brigade', detail: 'Led and trained soldiers · 2016 – 2019' },
]
