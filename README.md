# TrailGuide

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![Live demo](https://img.shields.io/website?url=https%3A%2F%2Ftrailguide.pages.dev&label=demo)](https://trailguide.pages.dev)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

**[Live demo →](https://trailguide.pages.dev)** (sample Aztalan State Park content)

A free, open-source, self-guided digital trail app for small historic
sites, state parks, and museums that can't afford a custom mobile app.

Visitors get a mobile-friendly map with numbered stops, text/photo/audio
content per stop, one-tap turn-by-turn directions to each stop, optional
geolocation ("how far am I from each stop"), and offline support once a
page has loaded (useful at sites with poor cell coverage). Staff get a
simple, git-backed content editor — no code, no database, no hosting bill
in most cases.

This instance ships with **sample placeholder content** for
[Aztalan State Park](https://aztalan.us) (Friends of Aztalan State Park,
Inc.) as a proof of concept. **All copy, coordinates, and stop ordering in
`content/stops/*.md` are illustrative and unverified** — see the notice in
the running app and replace everything via `/admin` (or by editing the
Markdown files directly) before using this for real visitors.

## Why this exists

Large museums use polished apps like Bloomberg Connects; small nonprofit
"Friends of ___" groups and historical societies generally have neither the
budget nor the staff for that. TrailGuide is meant to be small, boring, and
reusable: any similar organization can fork this repo, swap in their own
stops, and deploy it for free.

## Screenshots

_TODO: add screenshots of the map view and a stop page once real (non-placeholder)
content is in place._

## Stack

- [Next.js](https://nextjs.org) (App Router, static generation)
- [MapLibre GL](https://maplibre.org) + OpenStreetMap tiles (no API key)
- Content as Markdown + frontmatter in `content/stops/`
- [Decap CMS](https://decapcms.org) at `/admin` — a git-backed visual editor
- PWA support (`@ducanh2912/next-pwa`) for offline use on the trail

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The homepage lists every stop in
`content/stops/`, ordered by the `order` field in each file's frontmatter,
plotted on the map defined in `content/tour.json`.

### Editing content

Each stop is a Markdown file:

```markdown
---
title: "Stop name"
order: 1
lat: 43.0628
lng: -88.8589
summary: "One-line teaser shown in the list."
image: "" # optional, path under /media
audio: "" # optional, path under /media
---

Full description shown on the stop's page. Supports Markdown.
```

Add, remove, or reorder files in `content/stops/` to change the trail.
Site-wide settings (name, tagline, map center/zoom) live in
`content/tour.json`.

Non-technical staff can instead use the visual editor:

```bash
npx decap-server   # in one terminal — local git bridge, no OAuth needed
npm run dev         # in another terminal
```

Then open `http://localhost:3000/admin`. Edits made there write straight to
the local files so you can review them with `git diff` before committing.

For a deployed site, follow the setup notes at the top of
`public/admin/config.yml` to connect Decap CMS to GitHub so staff can edit
content from anywhere, no local setup required.

### Before going live

- [ ] Replace every stop in `content/stops/` with verified content
- [ ] Replace the sample photos in `public/media/photos/` with your own —
      see [CREDITS.md](./CREDITS.md) for what's there now and why (real,
      public-record photos of the park, but under share-alike licenses
      that require attribution if you keep them)
- [ ] Update `content/tour.json` (drop the `note` field once content is verified)
- [ ] Set `logo` in `content/tour.json` to your own org's logo (this demo
      uses the real Friends of Aztalan logo from aztalan.us) and update
      `public/manifest.json` to match (add real PNG icons alongside the
      SVG for best home-screen support on older devices)
- [ ] Set `repo:` in `public/admin/config.yml` to your own fork and wire up
      GitHub OAuth so `/admin` works for logged-in staff, not just locally
- [ ] Set `siteUrl` in `content/tour.json` to your deployed domain (used
      for Open Graph / social share previews)

## Deploying

The app builds to plain static HTML (`output: "export"` in
`next.config.mjs` — there are no API routes or middleware, so a Node
server or edge-function adapter is unneeded complexity). Any static host
works; the live demo runs on Cloudflare Pages:

- **Build command**: `npm run build`
- **Output directory**: `out`
- Connect the Cloudflare Pages dashboard directly to your GitHub repo and
  it redeploys automatically on every push — no CLI or API token needed
  for ongoing use.

Netlify and Vercel work the same way with the same build command/output
directory.

## Contributing

Bug reports, feature requests, and PRs from other small heritage sites
adapting this for their own trail are welcome — see
[CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE). Use this for your own park, museum, or
historic site.
