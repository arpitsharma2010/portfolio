# Portfolio

Personal portfolio for Arpit Dilip Sharma. It is a Minecraft-inspired, recruiter-friendly single
page built with React 19, TypeScript, Vite and original CSS voxel art. All content remains semantic
HTML and works without WebGL.

Live: https://arpitsharma2010.github.io/portfolio/

## Scripts

| Script | Purpose |
| --- | --- |
| `npm start` | Dev server |
| `npm run lint` | ESLint with TypeScript and React Hooks rules |
| `npm run typecheck` | Strict TypeScript validation with `tsc --noEmit` |
| `npm test` | Vitest, single run |
| `npm run test:watch` | Vitest in watch mode |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build at `/portfolio/` |

## Deployment

The workflow in `.github/workflows/deploy-pages.yml` validates and builds every update to `main`,
uploads `dist/` as the official Pages artifact, and deploys it through GitHub Pages. Repository
Pages settings must use **GitHub Actions** as the source.

The base path is `/portfolio/` and must stay consistent in three places:

- `vite.config.mts` → `base`
- `package.json` → `homepage`
- `src/utils/constants.ts` → `SITE_URL`

`public/` assets are referenced through `ASSET_BASE` (`import.meta.env.BASE_URL`) so they resolve
under the base path without hardcoding the production origin.

## Environment variables

- `VITE_GA_MEASUREMENT_ID` — Google Analytics 4 measurement ID. Read only by
  `src/utils/analytics.ts`, which is the single GA loader. Absent, analytics silently no-ops.
