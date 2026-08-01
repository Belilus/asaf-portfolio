/**
 * Copy dedupe gate.
 *
 * Renders each lens and flags any 8-word phrase that appears more than once on
 * the same page. The editorial rule this enforces: one fact, one home per page.
 * A hit is a real bug — fix the copy in the content module, do not widen the
 * allowlist unless the phrase is genuinely repeated UI chrome.
 *
 * Usage: npm run check:dedupe
 */
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const LENSES = ['research', 'fullstack', 'pm', 'data']
const WINDOW = 8
const PORT = 5199

/** Repeated interface chrome, not body copy. Exact lowercased phrases. */
const KNOWN_UI = ['current status', 'why this matters for this role']

function normalise(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

async function waitForServer(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch {
      // server not up yet
    }
    await new Promise((r) => setTimeout(r, 300))
  }
  throw new Error(`Dev server did not start on ${url}`)
}

const server = spawn('npx', ['vite', '--port', String(PORT), '--strictPort'], {
  stdio: 'ignore',
  detached: false,
})

let failed = false
let browser

try {
  await waitForServer(`http://localhost:${PORT}/`)
  browser = await chromium.launch()

  for (const lens of LENSES) {
    const page = await browser.newPage()
    await page.goto(`http://localhost:${PORT}/?lens=${lens}`, { waitUntil: 'networkidle' })

    // Expand any accordion so the full case study is included in the check.
    for (const button of await page.getByRole('button', { expanded: false }).all()) {
      const label = (await button.textContent()) ?? ''
      if (/full case study/i.test(label)) await button.click()
    }

    const text = await page.evaluate(() => document.body.innerText)
    await page.close()

    const words = normalise(text)
    const firstSeen = new Map()
    const dupes = new Set()

    for (let i = 0; i + WINDOW <= words.length; i++) {
      const phrase = words.slice(i, i + WINDOW).join(' ')
      if (firstSeen.has(phrase)) {
        if (i - firstSeen.get(phrase) >= WINDOW) dupes.add(phrase)
      } else {
        firstSeen.set(phrase, i)
      }
    }

    // Collapse overlapping windows into their longest form for readable output.
    const report = [...dupes]
      .filter((p) => !KNOWN_UI.some((ui) => p.includes(ui)))
      .filter((p, _, all) => !all.some((q) => q !== p && q.includes(p)))

    if (report.length) {
      failed = true
      console.error(`\n[${lens}] ${report.length} repeated phrase(s):`)
      for (const p of report) console.error(`  · "${p}"`)
    } else {
      console.log(`[${lens}] clean`)
    }
  }
} finally {
  if (browser) await browser.close()
  server.kill()
}

if (failed) {
  console.error('\nDedupe gate FAILED — each fact should have exactly one home per page.')
}
process.exit(failed ? 1 : 0)
