import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  // 🏆 FIX: Tell Vercel to look for assets starting from the root URL.
  base: '/', 
  plugins: [solid()],
});