import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                epl: resolve(__dirname, 'decks/epl/index.html'),
                'claude-skills-101': resolve(__dirname, 'decks/claude-skills-101/index.html'),
            },
        },
    },
});
