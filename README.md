# asaf-portfolio

Single-page developer portfolio for Asaf Belilus. React 18 + Vite + TypeScript + Tailwind,
built on the SwimEdge design system so the portfolio and the product read as one brand.

```bash
npm install
npm run dev      # http://localhost:5174  (SwimEdge uses 5173)
npm run build    # → dist/
```

## The role-lens model

Rather than maintaining six portfolios for six CV tracks, this site has one URL and a
switcher in the hero. Changing the lens changes four things at once:

| Lens | Headline & bio | Project order | Resume served |
|---|---|---|---|
| **Research** | CV / biomechanics framing | Research first | `Asaf-Belilus-Researcher.pdf` |
| **Full-Stack** | Product engineering framing | SwimEdge first | `Asaf-Belilus-Fullstack.pdf` |
| **Data & Analytics** | Pipeline / ingestion framing | SwimEdge first | `Asaf-Belilus-Data.pdf` |

Each project also carries a per-lens paragraph ("Why this matters for this role") so the
same work is argued differently to a lab than to a product team.

The choice persists in `localStorage` and can be deep-linked, which is the useful part:

```
https://your-domain/?lens=fullstack     # send this in a full-stack application
https://your-domain/?lens=research      # send this to a lab
https://your-domain/?lens=data          # send this for a data role
```

The recipient lands on the framing you chose without ever touching the switcher.

## Where to edit things

| File | Contains |
|---|---|
| `src/content/profile.ts` | Name, contact, the three lenses, education |
| `src/content/projects.ts` | Both case studies — problem, method, architecture, metrics, stack |
| `src/content/skills.ts` | Skills taxonomy and the "how I work" principles |
| `src/index.css` | Design tokens, ported from `newSwimEdge/frontend/src/index.css` |
| `public/media/` | Screenshots and diagrams — see the README in that folder |
| `public/resume/` | The three PDFs, generated from `CV'S/*/Full-Time.docx` |

All copy lives in the three content files. No prose is hard-coded in components, so
rewording never means touching JSX.

## Deployment

**Vercel** — import the repo, framework preset Vite, done. Keep `base: '/'` in
`vite.config.ts`.

**GitHub Pages** at `Belilus.github.io/asaf-portfolio/`:

1. Set `base: '/asaf-portfolio/'` in `vite.config.ts`.
2. `npm i -D gh-pages`
3. `npm run deploy`

`import.meta.env.BASE_URL` is already used for every asset path, so both work unchanged.

## Design system

Tokens are copied from SwimEdge rather than re-invented: Deep Water cyan as primary, the
ISA navy `#081E45`, the oklch neutral ramp, the four-step shadow and motion scales, and
IBM Plex Sans / Mono. Dark mode is the default and respects `prefers-color-scheme` on
first visit.

If the SwimEdge tokens change, re-copy the `:root` and `.dark` blocks from
`newSwimEdge/frontend/src/index.css` — the variable names are intentionally identical.

## Accessibility

Skip link, semantic landmarks, `aria-selected` tablist for the lens switcher,
`aria-expanded` on the case-study disclosures, visible focus rings on every interactive
element, and a full `prefers-reduced-motion` bail-out.

## Content notes

- Both source repositories are private, so the case studies are written to stand alone —
  a reader who never sees the code should still be able to judge the engineering.
- Every metric on the site was counted from the repositories, not estimated. Where a
  source README disagreed with the actual file count, the counted value was used.
