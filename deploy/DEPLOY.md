# Six separate portfolio sites

Each profile is a **standalone Vercel project** from this repo. The build env var
`VITE_PORTFOLIO_LENS` locks the deploy to one lens: no tab switcher, no path to other
profiles, root URL only.

## Sites

| Lens | Build command | Vercel project name |
|------|---------------|---------------------|
| Research | `npm run build:research` | `asaf-portfolio-research` |
| Full-Stack | `npm run build:fullstack` | `asaf-portfolio-fullstack` |
| PM / Founder | `npm run build:pm` | `asaf-portfolio-pm` |
| Data | `npm run build:data` | `asaf-portfolio-data` |
| Backend | `npm run build:backend` | `asaf-portfolio-backend` |
| Frontend | `npm run build:frontend` | `asaf-portfolio-frontend` |

Each site also needs this **environment variable** (Production + Preview):

```
VITE_PORTFOLIO_LENS=research   # or fullstack | pm | data | backend | frontend
```

The build scripts set it automatically; the Vercel env var is a belt-and-suspenders
backup if you ever change the build command to plain `npm run build`.

## Live URLs (belilus1 team)

| Lens | URL |
|------|-----|
| Research | https://asaf-portfolio-research.vercel.app |
| Full-Stack | https://asaf-portfolio-fullstack.vercel.app |
| PM / Founder | https://asaf-portfolio-pm.vercel.app |
| Data | https://asaf-portfolio-data.vercel.app |
| Backend | https://asaf-portfolio-backend.vercel.app |
| Frontend | https://asaf-portfolio-frontend.vercel.app |

Re-run provisioning after cloning:

```bash
bash scripts/vercel-setup-six-sites.sh
```

Or deploy all six from your machine (CLI must be logged in):

```bash
for p in asaf-portfolio-research asaf-portfolio-fullstack asaf-portfolio-pm asaf-portfolio-data asaf-portfolio-backend asaf-portfolio-frontend; do
  npx vercel deploy --prod --project "$p" --yes
done
```

## One-time Vercel setup (dashboard)

For **each** of the six projects:

1. [vercel.com/new](https://vercel.com/new) → Import `Belilus/asaf-portfolio`
2. **Project name** — use the name from the table above
3. **Framework** — Vite
4. **Build command** — e.g. `npm run build:research` (match the lens)
5. **Environment variables** — `VITE_PORTFOLIO_LENS` = that lens id
6. Deploy

## Local dev

```bash
npm run dev              # all six lenses + switcher (hub mode)
npm run dev:backend      # backend-only site preview
npm run dev:frontend     # frontend-only site preview
npm run dev:pm           # PM-only site preview
npm run dev:fullstack    # full-stack-only preview
```

## CLI deploy (optional)

```bash
npx vercel link          # once per project directory / .vercel project
npm run build:backend
npx vercel --prod --project asaf-portfolio-backend --yes --build-env VITE_PORTFOLIO_LENS=backend
```

Use a separate `.vercel` link (or `--cwd` + project) for each of the six Vercel projects.

## Resume PDFs

Drop role-specific CVs in `public/resume/`:

- `Asaf-Belilus-Backend.pdf`
- `Asaf-Belilus-Frontend.pdf`

(and the existing four lens PDFs). Download buttons 404 until the file is present.
