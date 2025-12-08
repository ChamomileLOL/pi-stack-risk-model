import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
    // 🏆 FINAL FIX: Change from absolute ('/') to relative ('./') path.
    // This tells the browser to look for assets in the SAME folder as the HTML file.
    base: './',
    plugins: [solid()],
});