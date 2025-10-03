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
        },
        team_red: {
          type: 'module',
          name: 'team_red',
          entry: 'http://localhost:5177/remoteEntry.js',
        },
        team_green: {
          type: 'module',
          name: 'team_green',
          entry: 'http://localhost:5175/remoteEntry.js',
        },
        team_purple: {
          type: 'module',
          name: 'team_purple',
          entry: 'http://localhost:5176/remoteEntry.js',
        },
      },
      shared: {
        // Consigliato per evitare doppie istanze
        react: { singleton: true, requiredVersion: '^19' },
        'react-dom': { singleton: true, requiredVersion: '^19' },
        '@mui/material': { singleton: true },
        '@emotion/react': { singleton: true },
        '@emotion/styled': { singleton: true },
      },
    }),
  ],
  server: { port: 5173 },
  base: '/',
  build: { target: 'esnext' },
});
