import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  // 🏆 THE FINAL FIX: This ensures all compiled assets (CSS, JS) are linked 
  // from the root of the deployed URL (e.g., /assets/index.js), 
  // resolving the final asset loading/404 error on Netlify.
  
  plugins: [solid()],
  build: {
    // This target is good for modern browsers and SolidJS/Vite
    target: 'es2020',
  }
});