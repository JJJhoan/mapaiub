import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: [
      'leaflet',
      'leaflet/dist/leaflet.css',
      'react-leaflet',
      '@react-leaflet/core'
    ],
    exclude: ['@react-leaflet/core']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /leaflet/, /react-leaflet/],
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/leaflet-fix.scss";`
      }
    }
  }
});