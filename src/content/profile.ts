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

export type LensId = 'research' | 'fullstack' | 'pm' | 'data'

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
    headline: 'M.Sc. Computer Science Researcher · Computer Vision & Biomechanics',
    bio: [
      'I build measurement systems for human motion. My M.Sc. research at Ben-Gurion University reconstructs competitive swimmers’ joint kinematics from 3-D underwater pose data and drives a hydrodynamic simulation engine with it, so that drag and propulsion become quantities you can measure rather than estimate by eye.',
      'The work sits between two faculties and two disciplines — computer vision on the input side, rigid-body kinematics and nonlinear optimization on the modeling side. What I care about most is knowing which part of an error is my code and which part is the data, and being able to prove the difference.',
    ],
    stats: [
      {
        value: `${facts.research.bestFrameMm} mm`,
        label: 'best-frame reconstruction',
        note: `lower-bound recipe; honest cross-check ${facts.research.honestFrame60Mm} mm`,
      },
      {
        value: String(totalResearchTests),
        label: 'tests across two suites',
        note: `${facts.research.pipelineTests} pipeline + ${facts.research.labTests} underwater lab`,
      },
      { value: '95', label: 'current M.Sc. GPA', note: 'Ben-Gurion University of the Negev' },
    ],
    projectVisibility: ['research', 'swimedge'],
    resume: { label: 'Researcher CV', file: 'Asaf-Belilus-Researcher.pdf' },
  },
  {
    id: 'fullstack',
    label: 'Full-Stack',
    blurb: 'For product engineering and full-stack software roles.',
    headline: 'Full-Stack Software Engineer · Java / Spring Boot · React / TypeScript',
    bio: [
      'I design and ship production client–server systems end to end — data model, migrations, secure APIs, and the interface people actually use. SwimEdge is the clearest example: a competition management platform for Israeli swimming, built solo from the Postgres schema up through a bilingual right-to-left React application.',
      'I came to it as a competitive swimmer and coach who kept watching clubs run national meets on spreadsheets. That domain knowledge is why the data model holds up: I knew what a heat sheet, a qualifying minimum, and a disputed result actually are before I wrote a line of it.',
    ],
    stats: [
      {
        value: facts.swimedge.migrations,
        label: 'append-forward migrations',
        note: 'every environment rebuilds deterministically from V1',
      },
      {
        value: `${facts.swimedge.backendTests} + ${facts.swimedge.frontendTests}`,
        label: 'tests green before merge',
        note: 'JUnit with Testcontainers · Vitest',
      },
      {
        value: `${facts.swimedge.roles} roles`,
        label: `across ${facts.swimedge.pages} pages`,
        note: 'admin, federation, club, coach, official, swimmer',
      },
    ],
    projectVisibility: ['swimedge', 'research'],
    resume: { label: 'Full-Stack CV', file: 'Asaf-Belilus-Fullstack.pdf' },
  },
  {
    id: 'pm',
    label: 'PM / Founder',
    blurb: 'For product management and founder-track roles.',
    headline: 'Product Founder · SwimEdge — Replacing Spreadsheet-Era Federation Software',
    bio: [
      'SwimEdge did not start with code. It started with a limitation inventory: as a competitive swimmer at BGU and a coach at Wingate I lived the spreadsheet-and-PDF reality of Israeli swimming, and before building anything I spent months studying the incumbent platform the sport actually runs on — mapping where it fails clubs, officials, and swimmers, and reading federation regulation booklets as requirements documents.',
      'What came out of that is a governed system of record for the whole competition lifecycle — registration, seeding, live results, identity, and career analytics that follow an athlete across club changes. I designed it, built it, and took it to the federation myself. I am also an M.Sc. computer-science researcher at Ben-Gurion University; the same evidence discipline runs through both.',
    ],
    stats: [
      { value: 'Jul 2026', label: 'demoed to ISA leadership', note: 'discussions ongoing' },
      {
        value: 'V22–V23',
        label: 'shipped release',
        note: 'public archive · identity claims · held-result resolution',
      },
      {
        value: `${facts.swimedge.archiveMeets} meets`,
        label: 'national archive under management',
        note: `ISA championships, ${facts.swimedge.archiveYears}`,
      },
    ],
    projectVisibility: ['swimedge'],
    resume: { label: 'Product CV', file: 'Asaf-Belilus-PM.pdf' },
  },
  {
    id: 'data',
    label: 'Data & Analytics',
    blurb: 'For data engineering, analytics, and pipeline roles.',
    headline: 'Data Engineer · Ingestion, Entity Resolution, Governed Pipelines',
    bio: [
      'Most of my work is a pipeline problem wearing different clothes. On one side, messy federation documents — Arena XLSX exports, PDF-derived regulation books — that have to become clean, attributed relational rows. On the other, raw motion-capture arrays that have to become a physically valid skeleton.',
      'Both taught me the same lesson: the interesting engineering is in the records that do not match. Unattributed results, duplicate swimmers across clubs, markers that disagree with anatomy. I build the reconciliation layer and the evidence trail that says why each row landed where it did.',
    ],
    stats: [
      {
        value: `${facts.swimedge.importedResults.toLocaleString()}`,
        label: 'archived results imported',
        note: `${facts.swimedge.importedMeets} championship meets, reconciled row by row`,
      },
      {
        value: '3-tier',
        label: 'result attribution',
        note: 'exact, heuristic, held for review — never silently dropped',
      },
      {
        value: `${facts.research.errorCauses}-cause`,
        label: 'error attribution table',
        note: 'each split into code vs. data vs. irreducible',
      },
    ],
    projectVisibility: ['swimedge', 'research'],
    resume: { label: 'Data CV', file: 'Asaf-Belilus-Data.pdf' },
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
