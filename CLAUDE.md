# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun install` — install dependencies
- `bun run dev` — start Vite dev server (default http://localhost:5173)
- `bun run build` — production build to `dist/`
- `bun run preview` — preview the production build
- `bun run build && bunx wrangler pages deploy dist` — deploy to Cloudflare Pages

## Architecture

Multi-page Vite site hosting multiple Reveal.js decks. Each deck is an independent HTML entry point, and adding a new deck requires updating **three** places:

1. Create `decks/<name>/` with `index.html`, `main.js` (imports `reveal.js` and initializes), and `style.css`.
2. Register the new entry in `vite.config.js` under `build.rollupOptions.input` — otherwise it will not be included in the production build.
3. Add a card/link to the root `index.html`, which is the landing page listing available decks.

The root `index.html` is a plain static landing page (no framework, inline styles). Decks use Reveal.js 5.x with the Markdown plugin; initialization lives in each deck's `main.js`.

Deployment target is Cloudflare Pages via `wrangler.toml`; the `dist/` folder is the upload root.
