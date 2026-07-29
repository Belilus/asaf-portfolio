/**
 * Capture SwimEdge UI screenshots for the portfolio (demo DB only).
 *
 * Prereq:
 *   cd SwimEdge && bash scripts/demo/reset-all-demo.sh
 *   backend :8080, frontend :5173
 *
 * Usage:
 *   node scripts/capture-swimedge-media.mjs           # all lenses
 *   LENS=pm node scripts/capture-swimedge-media.mjs     # one lens profile
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
    { name: 'swimedge-held-results.png', fn: captureHeldResults },
    { name: 'swimedge-claims.png', fn: captureHeldResults },
  ],
}

async function login(page, { email, password }) {
  await page.goto(`${BASE}/login`)
  await page.evaluate(() => localStorage.clear())
  await page.addInitScript(() => localStorage.setItem('swimedge-language', 'en'))
  await page.reload()
  await page.locator('#email').fill(email)
  await page.locator('#password').fill(password)
  await page.locator('#password').press('Enter')
  await page.waitForURL((u) => !u.pathname.endsWith('/login'), { timeout: 20000 })
}

async function shot(page, name) {
  await page.waitForTimeout(1200)
  const path = join(OUT_DIR, name)
  await page.screenshot({ path, fullPage: false })
  console.log('saved', path)
}

async function captureArchive(page) {
  await page.goto(`${BASE}/competitions/archive`, { waitUntil: 'networkidle', timeout: 30000 })
  await shot(page, 'swimedge-archive.png')
}

async function openFirstCompetition(page) {
  await page.goto(`${BASE}/competitions`, { waitUntil: 'networkidle' })
  const link = page.locator('a[href*="/competitions/"]').filter({ hasNotText: 'archive' }).first()
  if ((await link.count()) > 0) {
    await link.click()
    await page.waitForURL(/\/competitions\/\d+/, { timeout: 15000 })
    return true
  }
  const winter = page.getByText(/winter|sprint/i).first()
  if ((await winter.count()) > 0) {
    await winter.click()
    await page.waitForURL(/\/competitions\//, { timeout: 15000 })
    return true
  }
  return false
}

async function captureDashboard(page) {
  await login(page, CREDENTIALS.manager)
  const opened = await openFirstCompetition(page)
  if (opened) await shot(page, 'swimedge-dashboard.png')
  else console.warn('no competition found — dashboard screenshot skipped')
}

async function captureHeldResults(page) {
  await login(page, CREDENTIALS.federation)
  await page.goto(`${BASE}/federation/ops?tab=heldResults`, { waitUntil: 'networkidle' })
  await shot(page, 'swimedge-held-results.png')
  await shot(page, 'swimedge-claims.png')
}

async function captureApprovals(page) {
  await login(page, CREDENTIALS.federation)
  await page.goto(`${BASE}/federation/ops?tab=approvals`, { waitUntil: 'networkidle' })
  await shot(page, 'swimedge-approvals.png')
}

async function captureCareerHub(page) {
  await login(page, CREDENTIALS.swimmer)
  await page.goto(`${BASE}/me/results`, { waitUntil: 'networkidle' })
  await shot(page, 'swimedge-career-hub.png')
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

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
