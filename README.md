# SvelteKit markdown blog

This repository is a SvelteKit site for a blog about hacking, cybersecurity, and software development. The app lives in `blog/`. Markdown files are compiled with mdsvex and served as pages. `GET /api/posts` reads those files, and the blog index renders them.

The site footer says the app is developed with SvelteKit and deployed on Vercel. `blog/svelte.config.js` uses `@sveltejs/adapter-auto`.

## Prerequisites

- Node.js `^16.14 || >=18`. That range is the `engines` field of `@sveltejs/kit` 1.30.3 in `blog/package-lock.json`. Vite 4.5.2 in the same lockfile allows `^14.18.0 || >=16.0.0`. `@sveltejs/kit` is the tighter requirement.
- npm. Dependencies are locked in `blog/package-lock.json` (lockfileVersion 3). The repo has no `pnpm-lock.yaml` and no `yarn.lock`.
- `blog/.npmrc` sets `engine-strict=true` and `resolution-mode=highest`. `blog/package.json` does not set an `engines` field.

## Install, build, run, and test

Run these from the repository root.

Install from the lockfile:

```bash
cd blog
npm ci
```

Start the development server. Vite 4 listens on port 5173:

```bash
cd blog
npm run dev
```

Pass `--open` through to Vite to open a browser tab:

```bash
cd blog
npm run dev -- --open
```

Build:

```bash
cd blog
npm run build
```

`npm run build` runs `vite build`. When the machine is not a supported adapter-auto host, the command can still exit 0 and print that it could not detect a supported production environment.

Preview the production build. Vite preview listens on port 4173:

```bash
cd blog
npm run preview
```

There is no test script. `package.json` defines `dev`, `build`, and `preview` only. `npm test` fails with `Missing script: "test"`.

## Usage

With `npm run dev` or `npm run preview` running:

| URL | What it does |
| --- | --- |
| `/` | Renders the home page and fetches `GET /foo`, then prints that JSON. |
| `/blog` | Loads `GET /api/posts` and lists each post title, description, date, and hero image. |
| `/blog/<slug>` | Renders `blog/src/routes/blog/<slug>.md`. |
| `/about` | Static about page. |
| `/contact` | Static contact page. The profile links are hardcoded in `blog/src/routes/contact/+page.svelte`. |
| `/example` | Markdown route that embeds the `Counter` component from `blog/src/lib/components/Counter.svelte`. |
| `GET /api/posts` | JSON for every `blog/src/routes/blog/*.md` file, sorted by `meta.date` descending. Each item has `meta` (frontmatter) and `path`. |
| `GET /foo` | JSON object of the incoming request headers. |

The header links to `/blog`, `/about`, `/contact`, and `/`.

To add a post, create a `.md` file directly in `blog/src/routes/blog/` (the loader glob does not include subdirectories). The filename without `.md` is the slug. Frontmatter fields read by the index and the post page are:

- `title`
- `description`
- `date` (used for sort order)
- `hero` (a site path served from `blog/static/`, for example `/ipv4-deepdive/ipv4-deepdive-hero.jpg`)

Some existing posts also set `author` and `published`. The loaders do not filter on `published`, and the post page does not render `author`.

`blog/vite.config.js` allows the dev server to read `./files/` and `./files/nmap.exe`. That `files` directory is not in the repository.

## Layout

```text
.gitattributes
.gitignore
blog/
  package.json
  package-lock.json
  .npmrc
  svelte.config.js
  vite.config.js
  src/app.html
  src/lib/components/     Header, Footer, Counter
  src/lib/styles/style.css
  src/lib/utils/index.js  fetchMarkdownPosts
  src/routes/             pages, /api/posts, and /foo
  src/routes/blog/*.md    post sources
  static/                 files served from the site root
```

`blog/svelte.config.js` treats `.svelte` and `.md` as component extensions. Preprocessing is `vitePreprocess()` plus mdsvex for `.md`.

## License

This repository does not include a license file.
