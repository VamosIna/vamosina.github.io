# Yoppie Raditya Wicaksono — Portfolio

A dark, modern Next.js portfolio for a Senior Flutter Mobile Developer.
Static export, deployable to **Vercel** or **GitHub Pages**.

Sections: Hero · Clients marquee · About · Skills · Experience · Projects (lightbox gallery) · AI Chat (demo) · FAQ · Contact.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build (static export)

```bash
npm run build        # outputs static site to ./out
```

## Deploy — Vercel (easiest)

1. Push this repo to GitHub.
2. Go to https://vercel.com/new and import the repo.
3. Vercel auto-detects Next.js. Leave everything default and deploy.
   - `NEXT_PUBLIC_BASE_PATH` should be **empty** (the site is served from the root).

## Deploy — GitHub Pages

**Live now: https://vamosina.github.io/**

The site is a **user site** — repo `VamosIna/vamosina.github.io`, served from the domain
root, so the build uses an **empty basePath** (`NEXT_PUBLIC_BASE_PATH=""`, the default).

The GitHub repo contains the **built output only** (the contents of `out/` at the repo
root), not this source tree. Pages publishes from `main` / root, with a required
`.nojekyll` file so GitHub does not strip the `_next/` folder.

### Updating the live site

```bash
NEXT_PUBLIC_BASE_PATH="" npm run build   # or just: npm run build
```

Then in the GitHub repo either re-upload the changed files from `out/`, or push with git:

```bash
git remote add origin git@github.com:VamosIna/vamosina.github.io.git   # once
./deploy.sh
```

`deploy.sh` builds, adds `.nojekyll`, and force-pushes `out/` to a `gh-pages` branch —
only use that if you switch the Pages source to the `gh-pages` branch.

### Publishing a project repo instead (e.g. `/portoweb`)

Project sites live at `https://<user>.github.io/<repo>/`, so they need a matching
basePath:

```bash
NEXT_PUBLIC_BASE_PATH="/portoweb" npm run build
```

## Editing content

Almost everything lives in **`src/data/portfolio.ts`** — profile, stats, clients,
skills, experience, projects, FAQ, nav links. Update that file and the whole site updates.

- **Add / change a project:** edit the `projects` array. `cover` and `gallery` are paths under
  `public/` (e.g. `/assets/projects/my-app.jpg`). A project with an empty `gallery` renders a
  gradient placeholder (used for MyCTE, whose screenshots are internal).
- **Project images:** drop files in `public/assets/projects/`.
- **CV:** replace `public/cv.pdf` with your latest PDF.
- **AI chat answers:** edit the `knowledge` array in `src/components/AiChat.tsx`.
- **Colors / fonts:** `src/app/globals.css` (`@theme` block) and `src/app/layout.tsx`.

## Tech

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript · static export.
