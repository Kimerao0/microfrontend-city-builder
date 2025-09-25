# 🏙️ Microfrontend City Builder

**Microfrontend City Builder** è un progetto creato da **Alessandro Ceruti** per un workshop interno dedicato al tema dei **Microfrontend**.  
L’obiettivo è mostrare come più applicazioni indipendenti possano collaborare per costruire un unico sistema, utilizzando **React**, **TypeScript**, **Vite** e **Module Federation**.

---

## 🎯 Obiettivo del workshop

Ogni team (Red, Blue, Purple, Green…) costruirà un proprio microfrontend che rappresenta un **blocco della città**.  
Questi blocchi verranno esposti e consumati da **city-container**, che fungerà da host/orchestratore.

I partecipanti otterranno **punti** creando precise combinazioni di blocchi, imparando così a:

- Creare un microfrontend in React
- Esportarlo con Module Federation
- Integrarlo in un container host
- Collaborare in più team indipendenti su un unico progetto

---

## 🗂️ Struttura del repository

microfrontend-city-builder/
│── city-container/ # Host app che orchestra i microfrontend
│── team-red/ # Microfrontend del Team Red
│── (team-blue/) # In arrivo
│── (team-green/) # In arrivo
│── (team-purple/) # In arrivo

---

## ⚙️ Tecnologie utilizzate

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)

---

## 🚀 Setup & Avvio

Clona il repository:

```bash
git clone https://github.com/<tuo-username>/microfrontend-city-builder.git
cd microfrontend-city-builder

# dentro city-container
cd city-container
yarn install
yarn dev

# dentro un team (es. team-red)
cd ../team-red
yarn install
yarn dev


# come configurare un servizio
1- Installa il plugin Module Federation - yarn add -D @module-federation/vite
2- Configura il file vite.config.ts:

`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@module-federation/vite'

export default defineConfig({
  server: { port: 5174, cors: true },
  plugins: [
    react(),
    federation({
      name: 'team_****',
      filename: 'remoteEntry.js',
      exposes: {
        './Block': './src/index.tsx', // il componente che esponi
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
  },
})`
```
