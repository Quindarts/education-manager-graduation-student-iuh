import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import removeConsole from 'vite-plugin-remove-console';
import sitemap from 'vite-plugin-sitemap'
import imagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    removeConsole(),
    sitemap({
      hostname: "https://lec.iuh.io.vn:5000",
    }),
    imagemin({
      pngquant: {
        quality: [0.6, 0.8],
      },
      webp: {
        quality: 75,
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src'), }],
  },
  define: {
    'process.env': {}
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 5173,
  },
  build: {
    minify: "esbuild",
    sourcemap: false,
    cssCodeSplit: true,
  },
});
