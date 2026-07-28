# Media drop folder

Every placeholder in the portfolio becomes a real image the moment you drop a
file here and reference it. Nothing else to change beyond one line.

## How to fill a slot

1. Save the image into this folder, e.g. `swimedge-dashboard.png`.
2. Open `src/content/projects.ts`.
3. Find the matching entry in that project's `media` array and add `file`:

```ts
{
  file: 'swimedge-dashboard.png',   // <-- add this line
  caption: 'Competition dashboard',
  hint: 'Admin competition detail — start lists, results, progression, scoring tabs',
  aspect: 'wide',
},
```

The placeholder is replaced by the image automatically, with lazy loading and
the caption rendered underneath.

## Slots waiting to be filled

### Research — `asaf-reaserch`
| Slot | Suggested source |
|---|---|
| Pipeline architecture diagram | Draw from the 7-stage flow already described in the case study |
| Staged error waterfall | Chart the waterfall table in `misha_underwater_lab/docs/ERROR_BUDGET.md` |
| Reconstructed vs. observed skeleton | Stick-figure overlay from the SWUM lab preview, best (frame 60) and worst (frame 146) |

### SwimEdge — `newSwimEdge`
| Slot | Suggested source |
|---|---|
| Competition dashboard | Screenshot of Admin Competition Detail with the tab bar visible |
| Swimmer career hub | Personal bests + progression chart view |
| Ingestion & attribution flow | The unattributed-result resolution queue |
| Demo walkthrough | A short GIF or an image still linking to a video |

## Recommendations

- Capture screenshots in **dark mode** at roughly **2560×1440**, then downscale — text stays crisp on retina displays.
- Keep each file under ~400 KB. `pngquant` or `squoosh` handle this well.
- Scrub anything sensitive before publishing: real swimmer names, national ID numbers, emails, club rosters. Reseed with demo data first if in doubt.
- Wide slots render at 16:9; square slots at 4:3.
