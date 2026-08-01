/**
 * Single source of truth for every load-bearing number on the four sites.
 *
 * Each value was verified against the source repositories on 2026-07-30 —
 * the verification commands live in the design spec (§7) and the plan (Task 1).
 * Update numbers HERE and nowhere else; copy interpolates from this module so a
 * stale figure cannot survive in one lens while being corrected in another.
 */

export const facts = {
  swimedge: {
    /** find src/main/java -name "*Controller.java" | wc -l */
    controllers: 31,
    /** find src/main/java -name "*Service.java" -o -name "*ServiceImpl.java" */
    services: 40,
    /** grep -rl "@Entity" src/main/java */
    entities: 31,
    migrations: 'V1–V23',
    migrationCount: 23,
    /** ./mvnw test → 579/0/0/1 (LANE-LOG 2026-07-28, tsk_116 Task 8) */
    backendTests: 579,
    /** npx vitest run → 232 passed in 59 files (verified live 2026-07-30) */
    frontendTests: 232,
    frontendTestFiles: 59,
    pages: 64,
    /** find frontend/src/components -name "*.tsx" | wc -l */
    components: 107,
    roles: 6,
    /** competitions/manifest.json → summary.totalMeets */
    archiveMeets: 39,
    archiveYears: '2020–2025',
    /** tsk_114 local-DB restore: 17 meets re-imported, dry↔live identical */
    importedMeets: 17,
    /** Results rows imported in that restore (LANE-LOG 2026-07-29) */
    importedResults: 47509,
    /** Held-result queue worked to zero (commit d0b8cdeb) */
    heldQueueFrom: 278,
    languagesNote: 'Hebrew · English · Russian, RTL-ready',
  },
  research: {
    /** docs/error_budget/frame_60.json → regions_mm.full (lower-bound recipe) */
    bestFrameMm: '2.1',
    /** docs/error_budget/frame_62.json → regions_mm.full */
    lowerBoundMm: '2.4',
    /** docs/presentation/leaderboard.md (regenerated 2026-07-28): honest ≈ 6.6 */
    honestFrame60Mm: '6.6',
    /** docs/error_budget/frame_146.json → regions_mm.full */
    worstFrameMm: '9.5',
    trunkMm: '0.0',
    frames: 43,
    markerFloorMm: '2–6',
    /** pytest --collect-only in DataToSwumsuit → 65 collected */
    pipelineTests: 65,
    /** pytest --collect-only in misha_underwater_lab → 46 collected */
    labTests: 46,
    /** ERROR_BUDGET.md cause table → 9 rows, each bucketed code/data/irreducible */
    errorCauses: 9,
    /** Of the 9 causes, 4 were diagnosed and fixed in code */
    errorCausesFixed: 4,
    restructureLines: 4832,
  },
  swimdata: {
    swims: 4770,
    swimmers: 1311,
    /** Canonical clubs in the loaded database (both meets) */
    clubs: 72,
    /** Distinct observed spellings recorded in the club_name_variant audit table */
    nameVariants: 105,
    events: 340,
    championships: 2,
    /** Hebrew start list → English results, bridged on (event, heat, lane) */
    matchRate: '98.3%',
    orphanForeignKeys: 0,
    repo: 'https://github.com/Belilus/swimdata-il',
  },
} as const

/** Both research suites together — the number quoted as "tests" on the sites. */
export const totalResearchTests = facts.research.pipelineTests + facts.research.labTests
