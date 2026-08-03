# Four separate portfolio sites

Each profile is a **standalone Vercel project** from this repo. The build env var
`VITE_PORTFOLIO_LENS` locks the deploy to one lens: no tab switcher, no path to other
profiles, root URL only.

## Sites

| Lens | Build command | Suggested Vercel project name |
|------|---------------|-------------------------------|
| Research | `npm run build:research` | `asaf-portfolio-research` |
| Full-Stack | `npm run build:fullstack` | `asaf-portfolio-fullstack` |
| PM / Founder | `npm run build:pm` | `asaf-portfolio-pm` |
| Data | `npm run build:data` | `asaf-portfolio-data` |

Each site also needs this **environment variable** (Production + Preview):

```
VITE_PORTFOLIO_LENS=research   # or fullstack | pm | data
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

Re-run provisioning after cloning:

```bash
bash scripts/vercel-setup-four-sites.sh
```

Or deploy all four from your machine (CLI must be logged in):

```bash
for p in asaf-portfolio asaf-portfolio-fullstack asaf-portfolio-pm asaf-portfolio-data; do
  npx vercel deploy --prod --project "$p" --yes
done
```

## One-time Vercel setup (dashboard)

For **each** of the four projects:

1. [vercel.com/new](https://vercel.com/new) → Import `Belilus/asaf-portfolio`
2. **Project name** — use the name from the table above
3. **Framework** — Vite
4. **Build command** — e.g. `npm run build:research` (match the lens)
5. **Environment variables** — `VITE_PORTFOLIO_LENS` = that lens id
6. Deploy

Repeat four times. You get four URLs, e.g.:

```
https://asaf-portfolio-research.vercel.app
https://asaf-portfolio-fullstack.vercel.app
https://asaf-portfolio-pm.vercel.app
https://asaf-portfolio-data.vercel.app
```

Optional: add custom domains per role (`research.asaf.dev`, etc.) in each project’s
**Settings → Domains**.

## Local dev

```bash
npm run dev              # all four lenses + switcher (hub mode)
npm run dev:pm           # PM-only site preview
npm run dev:fullstack    # full-stack-only preview
```

## CLI deploy (optional)

```bash
npx vercel link          # once per project directory / .vercel project
npm run build:research
npx vercel --prod
```

Use a separate `.vercel` link (or `--cwd` + project) for each of the four Vercel projects.
