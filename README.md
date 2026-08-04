# TrailGuide

A free, open-source, self-guided digital trail app for small historic
sites, state parks, and museums that can't afford a custom mobile app.

Visitors get a mobile-friendly map with numbered stops, text/photo/audio
content per stop, and offline support once a page has loaded (useful at
sites with poor cell coverage). Staff get a simple, git-backed content
editor — no code, no database, no hosting bill in most cases.

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
- [ ] Update `content/tour.json` (drop the `note` field once content is verified)
- [ ] Replace `public/icons/icon.svg` and `public/manifest.json` with your
      own branding (add real PNG icons for best home-screen support)
- [ ] Set `repo:` in `public/admin/config.yml` and wire up GitHub OAuth
- [ ] Deploy (Cloudflare Pages, Netlify, and Vercel all have free tiers
      sufficient for a small nonprofit's traffic)

## Deploying

This is a standard Next.js app — deploy it anywhere Next.js runs. For a
fully static export instead, drop the PWA runtime caching that depends on
the Node server, or use a host with Next.js support (Vercel, Netlify,
Cloudflare Pages via their Next.js adapter).

## License

MIT — see [LICENSE](./LICENSE). Use this for your own park, museum, or
historic site.
