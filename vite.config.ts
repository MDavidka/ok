import { defineConfig } from 'vite';

/**
 * Vite Configuration for Verdant Aura
 * 
 * This configuration ensures the project builds to the 'dist' directory,
 * which is the standard requirement for Cloudflare Pages and other 
 * modern static hosting providers.
 */
export default defineConfig({
  build: {
    // The output directory for the production build
    outDir: 'dist',
    
    // Ensure assets are handled correctly
    assetsDir: 'assets',
    
    // Generate sourcemaps for easier debugging in production if needed
    sourcemap: true,

    // Minification settings for optimal performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    // Rollup specific options
    rollupOptions: {
      output: {
        manualChunks: {
          // Separating vendor logic can help with caching
          vendor: [],
        },
      },
    },
  },
  
  // Server configuration for local development
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },

  // Preview configuration for testing the production build locally
  preview: {
    port: 8080,
    strictPort: true,
  },
});