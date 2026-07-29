# asaf-portfolio

Four **separate** recruiter-facing portfolio sites (Research, Full-Stack, PM, Data) from
one codebase. Each production deploy is locked to a single lens — no tab switcher, no way
to browse the other profiles on that URL.

```bash
npm install
npm run dev:pm         # preview PM-only site → http://localhost:5174
npm run dev            # local hub with all four lenses + switcher
```

## Share links (after four Vercel projects are set up)

See [`deploy/DEPLOY.md`](deploy/DEPLOY.md) for one-time Vercel setup. Target URLs:

```
https://asaf-portfolio-research.vercel.app
https://asaf-portfolio-fullstack.vercel.app
https://asaf-portfolio-pm.vercel.app
https://asaf-portfolio-data.vercel.app
```

## Build per site

```bash
npm run build:research
npm run build:fullstack
npm run build:pm
npm run build:data
```

Set `VITE_PORTFOLIO_LENS` on Vercel (see deploy guide). The per-lens build scripts set it
automatically.

## Where to edit things

| File | Contains |
|---|---|
| `src/content/profile.ts` | Name, contact, four lenses, education |
| `src/content/lensLayout.ts` | Section order per lens |
| `src/content/projects.ts` | Case studies, per-lens emphasis and media |
| `src/content/agents-story.ts` | Agent orchestration copy (fullstack + PM) |
| `src/lib/portfolioMode.ts` | Single-lens lock (`VITE_PORTFOLIO_LENS`) |
| `public/media/` | Screenshots — see README in that folder |
| `public/resume/` | CV PDFs per lens |

## Local development

- **`npm run dev`** — all lenses, switcher visible (hub mode for editing)
- **`npm run dev:<lens>`** — matches production for that lens

## Design system

Tokens are ported from SwimEdge (Deep Water cyan, IBM Plex, portal cards). See
`src/index.css`.
