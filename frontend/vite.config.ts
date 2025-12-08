import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
    // Canonical Fix: Use the standard absolute path for Vercel/CDN
    base: '/',
    plugins: [solid()],
});