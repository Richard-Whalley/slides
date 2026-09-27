import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                epl: resolve(__dirname, 'decks/private/epl/index.html'),
                'claude-skills-101': resolve(__dirname, 'decks/public/claude-skills-101/index.html'),
                'aws-comsum-2026': resolve(__dirname, 'decks/public/aws-comsum-2026/index.html'),
            },
        },
    },
});
