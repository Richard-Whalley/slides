# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun install` — install dependencies
- `bun run dev` — start Vite dev server (default http://localhost:5173). Does NOT run Cloudflare Pages Functions, so the Basic Auth gate on private decks is bypassed locally.
- `bun run build` — production build to `dist/`
- `bun run preview` — preview the production build
- `bun run build && bunx wrangler pages dev dist` — local preview that runs Pages Functions (use this to test the Basic Auth middleware)
- `bun run build && bunx wrangler pages deploy dist` — deploy to Cloudflare Pages

## Architecture

Multi-page Vite site hosting multiple Reveal.js decks. Decks live under `decks/public/<name>/` (open access) or `decks/private/<name>/` (Basic Auth gated). Each deck is an independent HTML entry point, and adding a new deck requires updating **three** places:

1. Create `decks/public/<name>/` (or `decks/private/<name>/`) with `index.html`, `main.js` (imports `reveal.js` and initializes), and `style.css`.
2. Register the new entry in `vite.config.js` under `build.rollupOptions.input` with the full `decks/public/<name>/index.html` path — otherwise it will not be included in the production build.
3. Add a card/link to the root `index.html`, which is the landing page listing available decks.

The root `index.html` is a plain static landing page (no framework, inline styles). Decks use Reveal.js 5.x with the Markdown plugin; initialization lives in each deck's `main.js`.

## Auth on private decks

Any deck under `decks/private/` is gated by `functions/decks/private/_middleware.ts` — a Cloudflare Pages Function that enforces HTTP Basic Auth using `BASIC_AUTH_USER` / `BASIC_AUTH_PASS` env vars.

- **Production:** set the env vars in the Cloudflare Pages dashboard → Settings → Environment variables (encrypted).
- **Local:** copy `.dev.vars.example` → `.dev.vars` and fill in values. `.dev.vars` is gitignored. Wrangler picks them up automatically when running `wrangler pages dev`.
- **Vite dev caveat:** `bun run dev` does not run Functions, so `decks/private/*` is reachable without auth in local Vite. Use the Wrangler dev command above to test the gate.

Deployment target is Cloudflare Pages via `wrangler.toml`; the `dist/` folder is the upload root.
