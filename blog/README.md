# SvelteKit app

This directory is the SvelteKit app for the repository. The repository README at the root describes the site, routes, and post format.

Run these commands from this directory:

```bash
npm ci
npm run dev
npm run dev -- --open
npm run build
npm run preview
```

`npm run dev` starts Vite on port 5173. `npm run preview` serves the production build on port 4173.

`package.json` defines `dev`, `build`, and `preview` only. There is no test script, so `npm test` fails with `Missing script: "test"`.
