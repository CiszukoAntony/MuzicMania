import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'index.html',
                about: 'about.html',
                play: 'play.html',
                leaderboard: 'leaderboard.html',
                stats: 'stats.html',
                changelog: 'changelog.html',
                faq: 'faq.html',
                rules: 'rules.html',
                support: 'support.html',
            },
        },
    },
});
