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
      'Computer Vision & Biomechanics Researcher (M.Sc.) · Kinematic Reconstruction & Physics-Constrained Optimization',
    bio: [
      'I specialize in modeling human joint motion from complex 3D pose data, translating noisy underwater visual inputs into deterministic, physics-compliant joint angles. My M.Sc. research at Ben-Gurion University bridges computer vision and hydrodynamic simulation by enforcing strict Euler kinematic constraints on raw biomechanical streams.',
      'Rather than treating models as black boxes, my focus is on measurement rigor: isolating system-level code artifacts from inherent data limits. I design end-to-end evaluation pipelines with golden-file regression testing to guarantee mathematical reproducibility.',
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
      'Full-Stack Software Engineer · Java (Spring Boot) & TypeScript (React) · Scalable System Architecture',
    bio: [
      'I design and engineer production-grade client-server systems built for data integrity and high availability. As the sole architect of SwimEdge, a national sports management engine, I built a multi-tenant platform handling core operational workflows across thousands of concurrent users.',
      'My approach emphasizes strict backend authorization boundaries, append-forward database evolution (Flyway), and type-safe API contracts (OpenAPI). I prioritize long-term maintainability using modular service design, comprehensive test suites (JUnit, Testcontainers, Vitest), and clean UI architecture.',
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
    headline: 'Product Founder & PM · SwimEdge · Systems of Record & Enterprise B2B Solutions',
    bio: [
      'I build systems by first mapping the operational realities of the domain. Before writing a line of code for SwimEdge, I conducted extensive competitive teardowns of legacy federation tools, converting regulatory rulebooks into structured system requirements.',
      'I focus on building software that users trust with their primary system of record. By designing transparent role hierarchies, seamless lifecycle workflows, and automated compliance pipelines, I bridge technical capability with executive strategy—taking products from discovery to national governing body presentations.',
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
      { value: 'Jul 2026', label: 'ISA leadership demo', note: 'national deployment track' },
    ],
    projectVisibility: ['swimedge'],
    resume: { label: 'Product CV', file: 'Asaf-Belilus-PM.pdf' },
  },
  {
    id: 'data',
    label: 'Data & Analytics',
    blurb: 'For data engineering, analytics, and pipeline roles.',
    headline: 'Data Engineer · High-Throughput Ingestion, Entity Resolution & Governed Pipelines',
    bio: [
      'I build data pipelines designed for raw, unstructured input formats—turning legacy documents, PDFs, and spreadsheets into fully attributed, queryable relational databases.',
      'My core specialization lies in entity resolution and record lineage under zero-silent-drop constraints. Whether handling multilingual identity variations across sports archives or calibrating motion-capture data streams, I build self-healing pipelines with transparent quarantine queues and verifiable data lineage.',
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
        note: 'zero silent record drops',
      },
    ],
    projectVisibility: ['swimedge', 'research'],
    resume: { label: 'Data CV', file: 'Asaf-Belilus-Data.pdf' },
  },
  {
    id: 'backend',
    label: 'Backend',
    blurb: 'For backend engineering, API, and platform roles.',
    headline: 'Backend Software Engineer · Java (Spring Boot) & PostgreSQL · API Architecture',
    bio: [
      'I design and build robust, scalable backend systems and APIs. My primary stack is Java and Spring Boot, focusing heavily on domain-driven design, secure data models, and strict API contracts.',
      'In SwimEdge, I built a production-grade multi-tenant architecture entirely from scratch. I emphasize append-forward database evolution (Flyway), deterministic testing (JUnit & Testcontainers), and enforcing strict role-based access control (RBAC) at the server boundary.',
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
        note: 'over 40 domain services',
      },
    ],
    projectVisibility: ['swimedge', 'research'],
    resume: { label: 'Backend CV', file: 'Asaf-Belilus-Backend.pdf' },
  },
  {
    id: 'frontend',
    label: 'Frontend',
    blurb: 'For frontend engineering and UI architecture roles.',
    headline: 'Frontend Software Engineer · React 18 & TypeScript · Complex UI Architecture',
    bio: [
      'I build complex, data-rich user interfaces with React, TypeScript, and Vite. I specialize in developing scalable frontend architectures that handle demanding state management and dynamic role-based workflows.',
      'For SwimEdge, I engineered a bilingual, right-to-left (RTL) platform serving 6 distinct user roles. I prioritize type safety by regenerating API client contracts directly from backend OpenAPI specs, ensuring UI stability and seamless UX for thousands of historical data points.',
    ],
    stats: [
      {
        value: `${facts.swimedge.pages} pages`,
        label: 'React architecture',
        note: `with ${facts.swimedge.components} components`,
      },
      {
        value: 'Bilingual RTL',
        label: 'i18n infrastructure',
        note: 'native Hebrew/English support',
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
    label: 'SWE Intern',
    blurb: 'For software engineering internships on AI and platform teams.',
    headline:
      'Software Engineering Intern · M.Sc. Computer Science · AI Systems & Production Engineering',
    bio: [
      'I build production software and I measure what it actually does. My M.Sc. research at Ben-Gurion University turns noisy 3-D underwater pose data into physics-valid joint kinematics — work where the real discipline is not the model but the error budget: separating what my code got wrong from what the data can never tell me.',
      'I apply the same standard to shipping systems. I designed and built SwimEdge alone, from schema to UI — a multi-tenant platform with server-enforced role boundaries, append-forward migrations, and comprehensive automated test suites. I like ambiguous, zero-to-one problems, and I work across faculties, with external stakeholders, and as a teaching assistant.',
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
        label: 'sole architect, SwimEdge',
        note: 'concept to production',
      },
    ],
    projectVisibility: ['swimedge', 'research'],
    resume: { label: 'CV', file: 'Asaf-Belilus-Software-Engineering-Intern.pdf' },
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
