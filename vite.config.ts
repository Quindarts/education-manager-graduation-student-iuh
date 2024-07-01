import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(),
    //   nodePolyfills({
    //   exclude: [],
    //   globals: {
    //     Buffer: false,
    //   },
    //   protocolImports: true,
    // })
    ,],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src'), }],
  },
});
