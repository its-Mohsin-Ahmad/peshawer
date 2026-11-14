import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animations': ['gsap', 'lenis'],
          'icons': ['lucide-react'],
          'charts': ['recharts'],
          'supabase': ['@supabase/supabase-js'],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
});
