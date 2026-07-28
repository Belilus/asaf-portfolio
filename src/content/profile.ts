/**
 * Identity, contact, and the role-lens model.
 *
 * The "lens" is the mechanism that replaces maintaining six separate portfolios:
 * one site, one URL, and a switcher that reframes the headline, the bio, the
 * order in which projects appear, and which resume the download button serves.
 */

export const profile = {
  name: 'Asaf Belilus',
  title: 'M.Sc. Student · Software & Computer Vision Developer',
  location: 'Be’er Sheva, Israel',
  email: 'asafb1998@gmail.com',
  phone: '+972-54-436-6866',
  github: 'https://github.com/Belilus',
  linkedin: 'https://www.linkedin.com/in/asaf-belilus',
} as const

export type LensId = 'research' | 'fullstack' | 'data'

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
  /** Which project leads the Featured section. */
  projectOrder: ('research' | 'swimedge')[]
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
      { value: '2.1 mm', label: 'best-frame reconstruction', note: 'down from an 84.7 mm open-loop baseline' },
      { value: '65', label: 'regression tests', note: 'golden-file byte-diff, ~1 s to run' },
      { value: '95', label: 'current M.Sc. GPA', note: 'Ben-Gurion University of the Negev' },
    ],
    projectOrder: ['research', 'swimedge'],
    resume: { label: 'Researcher CV', file: 'Asaf-Belilus-Researcher.pdf' },
  },
  {
    id: 'fullstack',
    label: 'Full-Stack',
    blurb: 'For product engineering and full-stack software roles.',
    headline: 'Full-Stack Software Engineer · Java / Spring Boot · React / TypeScript',
    bio: [
      'I design and ship production client–server systems end to end — data model, migrations, secure APIs, and the interface people actually use. SwimEdge is the clearest example: a competition management platform for Israeli swimming that I architected and built alone, from the Postgres schema up through a bilingual RTL React application.',
      'I came to it as a competitive swimmer and coach who kept watching clubs run national meets on spreadsheets. That domain knowledge is why the data model holds up: I knew what a heat sheet, a qualifying minimum, and a disputed result actually are before I wrote a line of it.',
    ],
    stats: [
      { value: '45.7k', label: 'lines shipped solo', note: '18.1k Java · 27.5k TypeScript' },
      { value: '6', label: 'role-based workflows', note: 'admin, federation, club, coach, official, swimmer' },
      { value: '23', label: 'versioned migrations', note: 'Flyway, zero destructive edits' },
    ],
    projectOrder: ['swimedge', 'research'],
    resume: { label: 'Full-Stack CV', file: 'Asaf-Belilus-Fullstack.pdf' },
  },
  {
    id: 'data',
    label: 'Data & Analytics',
    blurb: 'For data engineering, analytics, and pipeline roles.',
    headline: 'Data & Pipeline Engineer · Ingestion, Modeling, Analytics',
    bio: [
      'Most of my work is a pipeline problem wearing different clothes. On one side, messy federation documents — Arena XLSX exports, PDF-derived regulation books — that have to become clean, attributed relational rows. On the other, raw motion-capture arrays that have to become a physically valid skeleton.',
      'Both taught me the same lesson: the interesting engineering is in the records that do not match. Unattributed results, duplicate swimmers across clubs, markers that disagree with anatomy. I build the reconciliation layer and the evidence trail that says why each row landed where it did.',
    ],
    stats: [
      { value: '3-tier', label: 'result attribution', note: 'exact, fuzzy, and held-for-review matching' },
      { value: '9-cause', label: 'error attribution table', note: 'each split into code vs. data vs. irreducible' },
      { value: '0', label: 'silent drops', note: 'unmatched rows are quarantined, never discarded' },
    ],
    projectOrder: ['swimedge', 'research'],
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
