import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'container',
      remotes: {
        team_blue: {
          type: 'module',
          name: 'team_blue',
          entry: 'http://localhost:5174/remoteEntry.js',
          shareScope: 'default',
        },
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: {
    port: 5173,
    origin: 'http://localhost:5173',
  },
  base: 'http://localhost:5173/',
  build: {
    target: 'chrome89',
  },
});
