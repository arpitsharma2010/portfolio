# Portfolio

Personal portfolio for Arpit Dilip Sharma — React 19 + TypeScript, built with Vite and styled with
Tailwind CSS. Single page, hash-anchored sections, light/dark theme.

Live: https://arpitsharma2010.github.io/portfolio/

## Scripts

| Script | Purpose |
| --- | --- |
| `npm start` | Dev server |
| `npm run typecheck` | `tsc --noEmit` (the project has no ESLint config; strict TS is the gate) |
| `npm test` | Vitest, single run |
| `npm run test:watch` | Vitest in watch mode |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build at `/portfolio/` |
| `npm run deploy` | Build, then publish `dist/` to the `gh-pages` branch |

## Deployment

GitHub Pages serves the **`gh-pages`** branch, which `npm run deploy` (`gh-pages -d dist`) writes.
There is no GitHub Actions workflow for the site build — adding one would compete with this.

The base path is `/portfolio/` and must stay consistent in three places:

- `vite.config.mts` → `base`
- `package.json` → `homepage`
- `src/utils/constants.ts` → `SITE_URL`

`public/` assets are referenced through `ASSET_BASE` (`import.meta.env.BASE_URL`) so they resolve
under the base path without hardcoding the production origin.

## Environment variables

- `VITE_GA_MEASUREMENT_ID` — Google Analytics 4 measurement ID. Read only by
  `src/utils/analytics.ts`, which is the single GA loader. Absent, analytics silently no-ops.
