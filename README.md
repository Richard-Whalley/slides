# Reveal Deck

A [Reveal.js](https://revealjs.com/) presentation project, built with [Vite](https://vitejs.dev/) and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## Project Structure

- `decks/`: Contains the individual slide decks.
- `index.html`: The landing page listing available decks.

## Getting Started

1.  **Install dependencies:**

    ```bash
    bun install
    ```

2.  **Start the development server:**

    ```bash
    bun run dev
    ```

    Navigate to `http://localhost:5173` (or the port shown in your terminal) to view the slides.

## Building for Production

To create a production build in the `dist` directory:

```bash
bun run build
```

## Deployment

This project is deployed to Cloudflare Pages.

**To deploy the latest changes:**

1.  Ensure you have the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) installed (or use `bunx`).
2.  Run the build and deploy command:

    ```bash
    bun run build && bunx wrangler pages deploy dist
    ```

    This command will:
    - Build the project using Vite.
    - Upload the contents of the `dist` folder to Cloudflare Pages.
