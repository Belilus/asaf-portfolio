/**
 * Generate PWA PNG icons from public/icons/icon.svg via Playwright.
 * Usage: node scripts/generate-pwa-icons.mjs
 */

import { chromium } from 'playwright'
import { mkdir, readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../public/icons')
const SVG = join(OUT, 'icon.svg')

async function render(size, name) {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: size, height: size } })
  const svg = await readFile(SVG, 'utf8')
  await page.setContent(
    `<!doctype html><style>html,body{margin:0;background:#081e45}svg{width:100%;height:100%}</style>${svg}`,
  )
  await page.screenshot({ path: join(OUT, name) })
  await browser.close()
  console.log('wrote', name)
}

await mkdir(OUT, { recursive: true })
await render(192, 'icon-192.png')
await render(512, 'icon-512.png')
await render(512, 'icon-maskable-512.png')
await render(180, 'apple-touch-icon.png')
