# Cursor prompt — deploy the 7th portfolio lens (`swe-intern`)

Copy everything below the line into Cursor.

---

## Task

Deploy a new, seventh single-lens portfolio site from this repo. The lens code is
**already written, typechecked, and building clean** — do not rewrite it. Your job is
provisioning, committing, and deploying.

**Repo:** `Belilus/asaf-portfolio` (branch `main`)
**New lens id:** `swe-intern`
**Target URL:** `https://asaf-portfolio-swe-intern.vercel.app`
**Vercel project name:** `asaf-portfolio-swe-intern`

This site is the portfolio link on my Microsoft Software Engineering Intern application,
so the URL must resolve to the correct lens before I submit.

## Context — what already exists (verify, don't recreate)

The `swe-intern` lens was added across these files. Confirm each is present, then leave
it alone:

| File | What was added |
|------|----------------|
| `src/content/profile.ts` | `'swe-intern'` in the `LensId` union + a full lens entry (headline, 2-para bio, 3 stats, `projectVisibility: ['swimedge','research']`, `resume: { label: 'CV', file: 'Asaf-Belilus-Software-Engineering-Intern.pdf' }`) |
| `src/content/lensLayout.ts` | `'swe-intern'` layout — SwimEdge first, then research, with skills + how-i-work |
| `src/content/lensMeta.ts` | share URL, page title, description, ogTitle |
| `src/content/projects.ts` | `angle['swe-intern']` and `emphasis['swe-intern']` for **both** projects |
| `src/content/ai-evidence.ts` | `'swe-intern'` entry in the `HowIWorkContent` record |
| `src/components/Contact.tsx` | `'swe-intern'` entry in `contactLeads` |
| `src/lib/portfolioMode.ts` | `'swe-intern'` in `VALID_LENS` **and** in the `pathMap` |
| `package.json` | `dev:swe-intern` and `build:swe-intern` scripts |
| `public/resume/` | `Asaf-Belilus-Software-Engineering-Intern.pdf` |
| `deploy/DEPLOY.md` | updated to seven sites |

`VITE_PORTFOLIO_LENS=swe-intern` locks the build to a single lens: no switcher, root URL
only. That mechanism already works for the other six sites — reuse it exactly.

## Steps

### 1. Verify locally first

```bash
npm run build:swe-intern
```

Must complete with no TypeScript errors. If `tsc` complains that `"swe-intern"` is
missing from some `Record<LensId, …>`, add an entry for it in that record, matching the
tone of the neighbouring `fullstack` / `backend` entries — do not change the `LensId`
type or loosen any type to `Partial<…>`.

Then sanity-check the output:

```bash
npm run preview
```

Confirm at `localhost`: **no lens switcher is visible**, SwimEdge appears **before** the
research project, the tab title reads "Asaf Belilus — Software Engineering Intern", and
the CV download button says just "CV" and resolves to
`/resume/Asaf-Belilus-Software-Engineering-Intern.pdf`.

### 2. Commit and push

```bash
git add -A
git commit -m "Add swe-intern lens: seventh single-lens portfolio site"
git push origin main
```

### 3. Create the Vercel project

Create a **new** Vercel project — do not reconfigure any of the six existing ones.

- **Project name:** `asaf-portfolio-swe-intern`
- **Import from:** `Belilus/asaf-portfolio`, branch `main`
- **Framework preset:** Vite
- **Build command:** `npm run build:swe-intern`
- **Output directory:** `dist`
- **Environment variable** (Production **and** Preview): `VITE_PORTFOLIO_LENS` = `swe-intern`

CLI equivalent:

```bash
npx vercel --prod \
  --project asaf-portfolio-swe-intern \
  --yes \
  --build-env VITE_PORTFOLIO_LENS=swe-intern
```

### 4. Confirm the domain actually attaches

This is the step that has bitten this repo before: a Vercel project rename does **not**
retroactively attach the new `.vercel.app` alias to existing deployments.

After deploying, open **Settings → Domains** and confirm
`asaf-portfolio-swe-intern.vercel.app` is listed and assigned to the production
deployment. If it is missing, add it, then trigger a fresh production redeploy.

### 5. Verify live

```bash
curl -sI https://asaf-portfolio-swe-intern.vercel.app | head -1
```

Expect `HTTP/2 200` — **not** 404 / `DEPLOYMENT_NOT_FOUND`.

Then open the URL in a browser and confirm the same four things from step 1 (no
switcher, SwimEdge first, correct tab title, CV button works).

## Acceptance criteria

- [ ] `https://asaf-portfolio-swe-intern.vercel.app` returns 200 and renders the SWE-intern lens
- [ ] No lens switcher anywhere on the page
- [ ] SwimEdge case study appears before the research case study
- [ ] Tab title: "Asaf Belilus — Software Engineering Intern"
- [ ] CV button downloads `Asaf-Belilus-Software-Engineering-Intern.pdf`
- [ ] The other six sites still work and still serve their own lens (regression check)

## Do not

- Do not create an eighth lens, rename existing lenses, or touch the other six projects.
- Do not change the copy, stats, headline, or bio in the `swe-intern` lens — the numbers
  are sourced from `src/content/facts.ts` and are verified against the source repos.
- Do not add analytics, tracking, or new dependencies.
- Do not modify `src/content/facts.ts`.
