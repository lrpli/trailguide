# Contributing

TrailGuide is meant to be forked and adapted, not just extended — most
"contributions" will be a heritage site's own content in their own fork.
That said, improvements to the template itself are welcome here.

## Reporting bugs / requesting features

Open a GitHub issue. Include:

- What you expected vs. what happened
- Node version (`node -v`) and OS
- Steps to reproduce, if it's a bug

## Submitting a change

1. Fork the repo and create a branch off `master`
2. `npm install`
3. Make your change
4. `npm run build` — must succeed with no errors
5. Open a PR describing what changed and why

## Scope

Good PRs: fixes, accessibility improvements, better offline handling,
clearer docs, support for additional CMS backends.

Out of scope for this repo: site-specific content changes (those belong in
your own fork's `content/` directory, not here).
