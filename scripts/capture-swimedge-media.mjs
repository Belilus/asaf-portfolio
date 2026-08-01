/**
 * Capture SwimEdge UI screenshots for the portfolio (demo DB only).
 * Forces English UI and captures the main content region (no viewport crop).
 */

import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(__dirname, '../public/media')
const BASE = process.env.SWIMEDGE_URL ?? 'http://localhost:5173'
const LENS = process.env.LENS ?? 'all'

const CREDENTIALS = {
  manager: { email: 'demo-manager@swimedge.test', password: 'Manager2026!' },
  federation: { email: 'demo-fed@swimedge.test', password: 'Fed2026!' },
  swimmer: { email: 'demo-yael@swimedge.test', password: 'Yael2026!' },
}

const PROFILES = {
  fullstack: [
    { name: 'swimedge-archive.png', fn: captureArchive },
    { name: 'swimedge-dashboard.png', fn: captureDashboard },
    { name: 'swimedge-career-hub.png', fn: captureCareerHub },
  ],
  pm: [
    { name: 'swimedge-archive.png', fn: captureArchive },
    { name: 'swimedge-dashboard.png', fn: captureDashboard },
    { name: 'swimedge-approvals.png', fn: captureApprovals },
  ],
  data: [
    { name: 'swimedge-archive.png', fn: captureArchive },
    { name: 'swimedge-results.png', fn: captureArchiveResults },
    { name: 'swimedge-claims.png', fn: captureClaims },
  ],
}

const EN_SCRIPT = () => {
  localStorage.setItem('swimedge-language', 'en')
  document.documentElement.lang = 'en'
  document.documentElement.dir = 'ltr'
}

async function forceEnglish(page) {
  await page.evaluate(() => {
    localStorage.setItem('swimedge-language', 'en')
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
    const w = window
    if (w.i18n?.changeLanguage) w.i18n.changeLanguage('en')
  })
  await page.waitForTimeout(400)
}

const API = process.env.SWIMEDGE_API ?? 'http://localhost:8080'

/**
 * Authenticate through the API and seed the persisted store directly, instead
 * of driving the login form. The form path is timing-sensitive and was the
 * reason earlier capture runs stalled; this also lets us set the language
 * before the app's first render so no Hebrew frame is ever painted.
 *
 * Shapes mirrored from SwimEdge:
 *   POST /api/v1/auth/login -> { data: { accessToken, user } }
 *   authStore persist name 'swimedge-auth', partialize -> { token, user }
 */
async function login(page, { email, password }) {
  const res = await page.request.post(`${API}/api/v1/auth/login`, {
    data: { email, password },
  })
  if (!res.ok()) throw new Error(`API login failed for ${email}: ${res.status()}`)

  const body = await res.json()
  const { accessToken, user } = body.data ?? {}
  if (!accessToken) throw new Error(`No accessToken in login response for ${email}`)

  // Seed storage on the app origin, then reload so the store hydrates from it.
  // Deliberately not addInitScript: this runs once per login rather than
  // stacking a new script on the shared page for every role we authenticate as.
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded' })
  await page.evaluate(
    ([storageKey, payload]) => {
      localStorage.setItem(storageKey, payload)
      localStorage.setItem('swimedge-language', 'en')
    },
    ['swimedge-auth', JSON.stringify({ state: { token: accessToken, user }, version: 0 })],
  )

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await forceEnglish(page)
}

/**
 * `maxHeight` caps very long pages so the result reads as a screenshot rather
 * than a full-page dump — the archive list is thousands of pixels tall and
 * renders as an unusable strip in the portfolio's media grid otherwise.
 */
async function shotMain(page, name, { maxHeight } = {}) {
  await forceEnglish(page)
  await page.waitForTimeout(800)

  const selectors = ['main', '[role="main"]', '#root > div', '#root']
  let target = page.locator('body')
  for (const sel of selectors) {
    const loc = page.locator(sel).first()
    if ((await loc.count()) > 0) {
      target = loc
      break
    }
  }

  const path = join(OUT_DIR, name)
  try {
    const box = maxHeight ? await target.boundingBox() : null
    if (box && box.height > maxHeight) {
      await page.screenshot({
        path,
        animations: 'disabled',
        clip: { x: box.x, y: box.y, width: box.width, height: maxHeight },
      })
    } else {
      await target.screenshot({ path, animations: 'disabled' })
    }
  } catch {
    await page.screenshot({ path, fullPage: true, animations: 'disabled' })
  }
  console.log('saved', path)
}

async function captureArchive(page) {
  await page.goto(`${BASE}/competitions/archive`, { waitUntil: 'networkidle', timeout: 30000 })
  await shotMain(page, 'swimedge-archive.png', { maxHeight: 900 })
}

/**
 * Competitions chosen because they hold real content. Picking "the first
 * competition in the list" landed on a future PLANNED meet with zero events
 * and zero entries, which photographs as an empty product.
 *   COMPLETED_DEMO_ID — seeded winter championship with events, entries, relays
 *   ARCHIVE_MEET_ID   — a real ISA meet imported from federation documents
 */
const COMPLETED_DEMO_ID = process.env.SWIMEDGE_DEMO_COMP ?? '393'
const ARCHIVE_MEET_ID = process.env.SWIMEDGE_ARCHIVE_COMP ?? '403'

async function captureDashboard(page) {
  await login(page, CREDENTIALS.manager)
  await page.goto(`${BASE}/competitions/${COMPLETED_DEMO_ID}`, { waitUntil: 'networkidle' })
  await shotMain(page, 'swimedge-dashboard.png', { maxHeight: 1000 })
}

async function captureArchiveResults(page) {
  await page.goto(`${BASE}/competitions/archive/${ARCHIVE_MEET_ID}`, {
    waitUntil: 'networkidle',
    timeout: 30000,
  })
  await shotMain(page, 'swimedge-results.png', { maxHeight: 1000 })
}

async function captureHeldResults(page) {
  await login(page, CREDENTIALS.federation)
  await page.goto(`${BASE}/federation/ops?tab=heldResults`, { waitUntil: 'networkidle' })
  await shotMain(page, 'swimedge-held-results.png')
}

async function captureClaims(page) {
  await login(page, CREDENTIALS.federation)
  await page.goto(`${BASE}/federation/ops?tab=claims`, { waitUntil: 'networkidle' })
  await shotMain(page, 'swimedge-claims.png')
}

async function captureApprovals(page) {
  await login(page, CREDENTIALS.federation)
  await page.goto(`${BASE}/federation/ops?tab=approvals`, { waitUntil: 'networkidle' })
  await shotMain(page, 'swimedge-approvals.png')
}

async function captureCareerHub(page) {
  await login(page, CREDENTIALS.swimmer)
  await page.goto(`${BASE}/me/results`, { waitUntil: 'networkidle' })
  await shotMain(page, 'swimedge-career-hub.png')
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' })
  await context.addInitScript(EN_SCRIPT)
  const page = await context.newPage()

  const lenses = LENS === 'all' ? Object.keys(PROFILES) : [LENS]
  const seen = new Set()

  try {
    for (const lens of lenses) {
      const profile = PROFILES[lens]
      if (!profile) {
        console.warn('unknown lens', lens)
        continue
      }
      for (const { name, fn } of profile) {
        if (seen.has(name)) continue
        seen.add(name)
        await fn(page)
      }
    }
  } catch (err) {
    console.error('SwimEdge capture failed — is demo running on :5173 / :8080?', err.message)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

main()
