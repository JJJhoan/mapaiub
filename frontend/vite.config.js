import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from "vite-plugin-svgr";
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: './netlify-build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          leaflet: ['leaflet', 'react-leaflet'],
          vendors: ['react', 'react-dom']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'leaflet',
      'leaflet/dist/leaflet.css',
      'react-leaflet',
      '@react-leaflet/core'
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/leaflet-fix.scss";`
      }
    }
  }
});