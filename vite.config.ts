import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    sourcemap: true,
    outDir: '../sample-veritone-server/public/assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',
        assetFileNames: (file) => {
          if (file.name.indexOf('css') > -1) {
            return 'app.css';
          }

          return file.name;
        },
      }
    }
  },
  server: {
    port: 4201,
    proxy: {
      "/api": {
        target: 'http://localhost:4200',
        changeOrigin: true,
      }
    }
  },
  plugins: [react()],
})
