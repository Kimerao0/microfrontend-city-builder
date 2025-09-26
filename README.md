# 🏙️ Microfrontend City Builder

**Microfrontend City Builder** è un progetto creato per un workshop interno dedicato al tema dei **Microfrontend**.  
L’obiettivo è mostrare come più applicazioni indipendenti possano collaborare per costruire un unico sistema, utilizzando **React**, **TypeScript**, **Vite** e **Module Federation**.

---

## 🎯 Obiettivo del workshop

Ogni team (Red, Blue, Purple, Green) costruirà un proprio microfrontend che rappresenta uno o più **blocchi della città**.  
Questi blocchi verranno esposti e consumati da **container**, che fungerà da host/orchestratore.

I partecipanti otterranno **punti** creando precise combinazioni di blocchi, imparando così a:

- Creare un microfrontend in React
- Esportarlo con Module Federation
- Integrarlo in un container host
- Collaborare in più team indipendenti su un unico progetto

---

## 🗂️ Struttura del repository

microfrontend-city-builder/
│── container/ # Host app che orchestra i microfrontend
│── team-red/ # Microfrontend del Team Red
│── team-blue/ # Microfrontend del Team Blue
│── team-green/ # Microfrontend del Team Green
│── team-purple/ # Microfrontend del Team Purple

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

# dentro container
cd container
yarn install
yarn dev

# dentro un team (es. team-red)
cd ../team-red
yarn install
yarn dev

## 🔧 Guida alla configurazione:

1. Installa il plugin Module Federation
Nel tuo microfrontend (es. team-red):
yarn add -D @module-federation/vite

2. Crea un componente da esportare
Ad esempio in src/ExportContent.tsx.

3. Configura vite.config.ts del microfrontend
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "team_****", // nome del microfrontend
      filename: "remoteEntry.js", // manifest del remote standard
      exposes: {
        "./Team****Main": "./src/ExportContent.tsx",
        // key: nome del modulo esposto da riportare come remote nel container
        // value: percorso del componente da esportare
      },
      shared: {
        react: { singleton: true },      // condiviso per evitare più copie di React
        "react-dom": { singleton: true } // stessa logica di React, evita errori di hook
      },
    }),
  ],
  server: {
    port: 5174,                       // porta del dev server del microfrontend
    origin: "http://localhost:5174",  // URL base per i chunk in sviluppo
  },
  base: "http://localhost:5174/",      // base URL anche in fase di build
  build: {
    target: "chrome89",                // livello di compatibilità JS
  },
});


4. Dichiarare il module remote nell’host

TypeScript non conosce i moduli federati (non esistono in node_modules o nel filesystem).
Per evitare errori (Cannot find module ...), aggiungi un file di dichiarazione:

// container/src/remotes.d.ts
declare module "team_****/Team****Main";

5. Configura vite.config.ts dell’host
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "container",
      remotes: {
        team_****: {
          type: "module",
          name: "team_****",
          entry: "http://localhost:5174/remoteEntry.js",
          shareScope: "default",
        },
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
  server: {
    port: 5173,
    origin: "http://localhost:5173",
  },
  base: "http://localhost:5173/",
  build: {
    target: "chrome89",
  },
});

6. Usa il componente remoto nell’host

import React, { Suspense } from "react";

// Import del modulo esposto dal remote tramite Module Federation
// React.lazy carica il componente in modo asincrono
const TeamBlueWidget = React.lazy(() => import("team_blue/TeamBlueWidget"));

export default function App() {
  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <h2>Container Host</h2>

      {/* Suspense mostra un fallback finché il componente remoto non è pronto */}
      <Suspense fallback={<div>Caricamento widget Team Blue…</div>}>
        {/* Rendering del componente federato proveniente dal remote */}
        <TeamBlueWidget />
      </Suspense>
    </main>
  );
}

Checklist veloce:

Installato @module-federation/vite
Creato ExportContent.tsx nel microfrontend
Configurato vite.config.ts del microfrontend con exposes
Dichiarato il modulo remoto in remotes.d.ts nell’host
Configurato vite.config.ts dell’host con remotes
Importato il componente remoto con React.lazy + Suspense
```
