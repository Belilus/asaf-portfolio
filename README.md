# asaf-portfolio

Six **separate** recruiter-facing portfolio sites (Research, Full-Stack, PM, Data, Backend,
Frontend) from one codebase. Each production deploy is locked to a single lens — no tab
switcher, no way to browse the other profiles on that URL.

```bash
npm install
npm run dev:backend    # preview backend-only site
npm run dev:frontend   # preview frontend-only site
npm run dev            # local hub with all six lenses + switcher
```

## Share links

See [`deploy/DEPLOY.md`](deploy/DEPLOY.md) for Vercel setup. Live URLs:

```
https://asaf-portfolio-research.vercel.app
https://asaf-portfolio-fullstack.vercel.app
https://asaf-portfolio-pm.vercel.app
https://asaf-portfolio-data.vercel.app
https://asaf-portfolio-backend.vercel.app
https://asaf-portfolio-frontend.vercel.app
```

## Build per site

```bash
npm run build:research
npm run build:fullstack
npm run build:pm
npm run build:data
npm run build:backend
npm run build:frontend
```

Set `VITE_PORTFOLIO_LENS` on Vercel (see deploy guide). The per-lens build scripts set it
automatically.

## Where to edit things

| File | Contains |
|---|---|
| `src/content/profile.ts` | Name, contact, six lenses, education |
| `src/content/lensLayout.ts` | Section order per lens |
| `src/content/projects.ts` | Case studies, per-lens emphasis and media |
| `src/content/ai-evidence.ts` | How I work / AI orchestration copy |
| `src/lib/portfolioMode.ts` | Single-lens lock (`VITE_PORTFOLIO_LENS`) |
| `public/media/` | Screenshots — see README in that folder |
| `public/resume/` | CV PDFs per lens |

## Local development

- **`npm run dev`** — all lenses, switcher visible (hub mode for editing)
- **`npm run dev:<lens>`** — matches production for that lens

## Design system

Tokens are ported from SwimEdge (Deep Water cyan, IBM Plex, portal cards). See
`src/index.css`.
