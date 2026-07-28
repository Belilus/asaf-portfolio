/**
 * Skills taxonomy — derived strictly from what is actually used in the two
 * flagship projects, so every entry has evidence behind it.
 *
 * `level` drives visual weight only:
 *   core     — used daily, load-bearing in a shipped system
 *   working  — used substantially in a project
 *   familiar — used, but not a primary tool
 */

export type SkillLevel = 'core' | 'working' | 'familiar'

export interface SkillGroup {
  title: string
  note: string
  skills: { name: string; level: SkillLevel; from?: string }[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming Languages',
    note: 'Ranked by how much production code I have written in each.',
    skills: [
      { name: 'Java', level: 'core', from: 'SwimEdge backend' },
      { name: 'Python', level: 'core', from: 'Research pipeline' },
      { name: 'TypeScript', level: 'core', from: 'SwimEdge frontend' },
      { name: 'SQL', level: 'core', from: 'Postgres schema' },
      { name: 'C / C++', level: 'working', from: 'Systems coursework' },
    ],
  },
  {
    title: 'AI / ML & Computer Vision',
    note: 'Applied to human motion reconstruction from underwater video.',
    skills: [
      { name: '3-D Pose Estimation Data', level: 'core', from: 'Research' },
      { name: 'Forward & Inverse Kinematics', level: 'core', from: 'Research' },
      { name: 'Nonlinear Least-Squares Optimisation', level: 'core', from: 'SciPy' },
      { name: 'Regularisation (Tikhonov / λ)', level: 'working', from: 'FK inversion' },
      { name: 'Rigid-Body & Biomechanical Modeling', level: 'working', from: 'Research' },
      { name: 'Hydrodynamic Simulation', level: 'working', from: 'SWUM engine' },
      { name: 'NumPy / SciPy', level: 'core' },
      { name: 'Matplotlib', level: 'working' },
    ],
  },
  {
    title: 'Data Engineering',
    note: 'Turning documents nobody designed for machines into governed records.',
    skills: [
      { name: 'ETL Pipeline Design', level: 'core', from: 'Both projects' },
      { name: 'XLSX / PDF Parsing', level: 'core', from: 'Apache POI' },
      { name: 'Entity Resolution & Fuzzy Matching', level: 'core', from: 'Result attribution' },
      { name: 'Schema Migration & Versioning', level: 'core', from: '23 Flyway migrations' },
      { name: 'Data Lineage & Provenance', level: 'working', from: 'Ingestion batches' },
      { name: 'Data Validation & QA Reporting', level: 'working', from: 'Research QA layer' },
    ],
  },
  {
    title: 'Web & System Development',
    note: 'Full client–server ownership, from migration to markup.',
    skills: [
      { name: 'Spring Boot', level: 'core' },
      { name: 'REST API Design', level: 'core' },
      { name: 'React 18', level: 'core' },
      { name: 'Vite', level: 'core' },
      { name: 'Tailwind CSS', level: 'core' },
      { name: 'JWT / Role-Based Auth', level: 'core' },
      { name: 'Service-Oriented Architecture', level: 'working' },
      { name: 'OpenAPI Type Generation', level: 'working' },
      { name: 'i18n & RTL Interfaces', level: 'working', from: 'Hebrew-first product' },
      { name: 'Design Systems & Tokens', level: 'working' },
    ],
  },
  {
    title: 'Databases & Storage',
    note: '',
    skills: [
      { name: 'PostgreSQL', level: 'core' },
      { name: 'Flyway', level: 'core' },
      { name: 'JPA / Hibernate', level: 'working' },
      { name: 'Relational Data Modeling', level: 'core' },
    ],
  },
  {
    title: 'Tools, Testing & Infrastructure',
    note: 'Testing is where I spend disproportionate effort, on purpose.',
    skills: [
      { name: 'Git', level: 'core' },
      { name: 'pytest', level: 'core' },
      { name: 'JUnit', level: 'working' },
      { name: 'Vitest / Testing Library', level: 'working' },
      { name: 'Testcontainers', level: 'working' },
      { name: 'Playwright', level: 'familiar' },
      { name: 'Docker', level: 'working' },
      { name: 'Maven', level: 'working' },
      { name: 'Golden-File Regression Testing', level: 'core', from: 'Research pipeline' },
    ],
  },
]

/** Short statements of how I work — the part a skills list cannot express. */
export const principles = [
  {
    title: 'Measure before claiming',
    body: 'A refactor that claims to preserve behaviour must prove it. In the research pipeline that means byte-diffing generated output against a frozen baseline — a 4,832-line restructure passed at zero drift.',
  },
  {
    title: 'Separate my error from the world’s',
    body: 'The most useful artifact I built this year is a table splitting nine error causes into code, data, and irreducible. Knowing which bucket a problem lives in decides whether it is worth another week.',
  },
  {
    title: 'Never drop a record silently',
    body: 'Ingestion that cannot attribute a row quarantines it with a placeholder and a lineage trail. A wrong swimmer history is far more expensive than an unresolved one.',
  },
  {
    title: 'Domain knowledge is a design input',
    body: 'I have swum competitively and coached since 2014. Knowing what a heat sheet and a qualifying minimum actually are is why the data model survived contact with real federation documents.',
  },
]
