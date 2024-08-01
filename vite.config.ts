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
    port: 5000,
    host: true
  },
  build: {
    minify: "esbuild", // Sử dụng 'esbuild' để minify JavaScript
    cssCodeSplit: true, // Tách riêng CSS thành các tệp riêng
  },
});
