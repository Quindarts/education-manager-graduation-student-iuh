import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src'), }],
  },
  define: {
    'process.env': {}
  },
  server: {
    port: 5173,
    host: true
  },
  build: {
    minify: "esbuild",
    cssCodeSplit: true,
  },
  esbuild: {
    // drop: ['console', 'debugger']
  },

});
