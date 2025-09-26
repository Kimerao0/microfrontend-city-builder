import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'team_blue', // nome del remote
      filename: 'remoteEntry.js', // manifest del remote
      exposes: {
        './MainExport': './src/ExportContent.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: {
    port: 5174,
    origin: 'http://localhost:5174',
  },
  base: 'http://localhost:5174/',
  build: {
    target: 'chrome89',
  },
});
