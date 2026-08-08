import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { lensPageMeta } from './src/content/lensMeta'
import type { LensId } from './src/content/profile'

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

const roleMeta = {
  name: 'role-specific-page-meta',
  transformIndexHtml(html: string) {
    const lens = process.env.VITE_PORTFOLIO_LENS as LensId | undefined
    if (!lens || !(lens in lensPageMeta)) return html

    const meta = lensPageMeta[lens]
    return html
      .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(meta.title)}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
        `<meta name="description" content="${escapeHtml(meta.description)}" />`,
      )
      .replace(
        /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/s,
        `<meta property="og:title" content="${escapeHtml(meta.ogTitle)}" />`,
      )
      .replace(
        /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/s,
        `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
      )
  },
}

export default defineConfig({
  plugins: [react(), roleMeta],
  // If you deploy to https://Belilus.github.io/asaf-portfolio/, set base to '/asaf-portfolio/'.
  // For a custom domain or a user-page root deploy, leave it as '/'.
  base: '/',
  server: {
    // SwimEdge frontend uses 5173 — keep the portfolio on a different port.
    port: 5174,
    strictPort: true,
  },
  preview: {
    port: 4174,
    strictPort: true,
  },
})
