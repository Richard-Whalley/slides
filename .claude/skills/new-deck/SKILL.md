---
name: new-deck
description: Use this skill whenever the user wants to create, add, scaffold, stub, or start a new Reveal.js slide deck in this repo. Triggers on phrases like "new deck", "add a deck", "create a presentation", "start slides for X", or any request to begin a new talk/pitch/presentation in this project. Handles all three wiring points (deck files, Vite config, landing page) so nothing is forgotten.
---

# Stub out a new Reveal.js deck

This repo hosts multiple Reveal.js decks as independent Vite entry points. Adding a deck touches **three** places; forgetting any one of them silently breaks the build or the landing page. This skill exists because that coordination is easy to get wrong when doing it from memory.

## Inputs to gather

Before writing files, make sure you know:

- **Slug** — the directory name under `decks/` (kebab-case, e.g. `epl`, `ai-adoption`). Use this as the Vite input key too.
- **Title** — human-readable title shown in the `<title>` tag, on the landing-page card, and as the first slide's `<h1>`.
- **Subtitle / author** (optional) — shown under the title on slide 1. Default to Rick Whalley if the user doesn't say.

If the user only gave a topic ("a deck about hiring"), pick a sensible slug and title and confirm in one line rather than blocking on questions.

## What to create

### 1. `decks/<slug>/index.html`

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><TITLE></title>
  <link rel="stylesheet" href="./style.css" />
</head>

<body>
  <div class="reveal">
    <div class="slides">
      <section>
        <h1><TITLE></h1>
        <p><SUBTITLE></p>
      </section>
    </div>
  </div>
  <script type="module" src="./main.js"></script>
</body>

</html>
```

### 2. `decks/<slug>/main.js`

Match the existing `decks/epl/main.js` exactly — it's the canonical init:

```js
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

const deck = new Reveal({
    plugins: [Markdown]
});

deck.initialize({
    hash: true,
    slideNumber: true,
});
```

### 3. `decks/<slug>/style.css`

Import Reveal's default theme so the deck is readable out of the box. Keep this file minimal — per-deck overrides go here later.

```css
/* Custom styles for the presentation */
@import 'reveal.js/dist/reveal.css';
@import 'reveal.js/dist/theme/dracula.css';

/* Add your custom CSS here */
.reveal section h1 {
  font-size: 2.5em;
  text-transform: none;
}
```

This mirrors `decks/epl/style.css` (dracula theme). If the user asks for a different theme, swap the second `@import` — common options: `black`, `white`, `league`, `moon`, `solarized`.

## What to wire up

### 4. `vite.config.js`

Add the new entry under `build.rollupOptions.input`. The key should be the slug; the value uses `resolve(__dirname, 'decks/<slug>/index.html')`. **Without this step the deck will not be in the production build** — the dev server will still work, which makes the omission easy to miss.

### 5. Root `index.html`

Add a new `<li class="deck-card">` inside `<ul class="deck-list">` linking to `/decks/<slug>/index.html` with the deck's title as the link text. Follow the existing EPL card as a template.

## After scaffolding

Tell the user, in one or two lines:

- The three file paths you created
- The two files you edited (`vite.config.js`, root `index.html`)
- That they can run `bun run dev` and open the landing page to see the new card

Do **not** run `bun run dev` yourself — it's a long-lived process and the user likely already has one running. Do **not** run `bun run build` unless the user asks; a production build isn't needed to verify the scaffold.

## Why these rules

- **All three wiring points, every time**: the dev server is forgiving (it will serve any file under `decks/`), so an unregistered deck appears to work locally but vanishes in production. Treating the three edits as a single atomic operation prevents that class of bug.
- **Copy `main.js` verbatim**: every deck in this repo shares the same Reveal init. Diverging here creates inconsistency with no upside — if the user later wants custom plugins, they'll ask.
- **Minimal style.css**: the goal of this skill is a *stub*, not a finished deck. Leave room for the user to style their own thing rather than pre-committing to a look.
