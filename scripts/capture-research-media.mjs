/**
 * Capture portfolio-safe research body visuals.
 *
 * 1. Copies clean lab thumbnail (profile + lean, no charts) from build_presentation.py
 * 2. Optionally screenshots Plotly scene from frame_62_interactive.html
 *
 * Prereq: run in misha_underwater_lab:
 *   python tools/build_error_budget.py
 *   python tools/build_presentation.py
 *
 * Usage: node scripts/capture-research-media.mjs
 */

import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORTFOLIO_ROOT = resolve(__dirname, '..')
const OUT_DIR = join(PORTFOLIO_ROOT, 'public', 'media')
const LAB_ROOT = resolve(PORTFOLIO_ROOT, '../asaf-reaserch/misha_underwater_lab')
const LAB_DOCS = join(LAB_ROOT, 'docs')
const FRAME62_PNG = join(LAB_DOCS, 'presentation', 'frames', 'frame_62.png')
const INTERACTIVE_HTML = join(LAB_DOCS, 'visuals', 'single_frame', 'frame_62_interactive.html')

function mime(path) {
  if (path.endsWith('.html')) return 'text/html'
  if (path.endsWith('.png')) return 'image/png'
  if (path.endsWith('.js')) return 'application/javascript'
  return 'application/octet-stream'
}

function startStaticServer(root) {
  return new Promise((resolvePromise) => {
    const server = createServer(async (req, res) => {
      const url = new URL(req.url ?? '/', 'http://localhost')
      let rel = decodeURIComponent(url.pathname)
      if (rel === '/') rel = '/presentation/README.md'
      const file = join(root, rel.replace(/^\//, ''))
      try {
        const data = await readFile(file)
        res.writeHead(200, { 'Content-Type': mime(file) })
        res.end(data)
      } catch {
        res.writeHead(404)
        res.end('not found')
      }
    })
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address()
      resolvePromise({ server, port })
    })
  })
}

async function copyLabThumbnail() {
  await mkdir(OUT_DIR, { recursive: true })
  const dest = join(OUT_DIR, 'research-body-frame62.png')
  await copyFile(FRAME62_PNG, dest)
  console.log('copied lab thumbnail →', dest)
  return dest
}

async function captureInteractive(port) {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  const url = `http://127.0.0.1:${port}/visuals/single_frame/frame_62_interactive.html`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForSelector('.plotly', { timeout: 60000 })
  await page.waitForTimeout(1500)

  const scene = page.locator('.plotly .gl-container').first()
  const dest = join(OUT_DIR, 'research-body-interactive.png')
  if ((await scene.count()) > 0) {
    await scene.screenshot({ path: dest })
    console.log('screenshot Plotly scene →', dest)
  } else {
    await page.locator('.plotly').first().screenshot({ path: dest })
    console.log('screenshot Plotly root →', dest)
  }
  await browser.close()
}

async function main() {
  await copyLabThumbnail()

  try {
    const { server, port } = await startStaticServer(LAB_DOCS)
    try {
      await captureInteractive(port)
    } finally {
      server.close()
    }
  } catch (err) {
    console.warn('interactive capture skipped (using lab thumbnail only):', err.message)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
