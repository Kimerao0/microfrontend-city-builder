# 🏙️ Microfrontend City Builder

**Microfrontend City Builder** è un progetto creato da **Alessandro Ceruti** per un workshop interno dedicato al tema dei **Microfrontend**.  
L’obiettivo è mostrare come più applicazioni indipendenti possano collaborare per costruire un unico sistema, utilizzando **React**, **TypeScript**, **Vite** e **Module Federation**.

---

## 🎯 Obiettivo del workshop

Ogni team (Red, Blue, Purple, Green) costruirà un proprio microfrontend che rappresenta un **blocco della città**.  
Questi blocchi verranno esposti e consumati da **container**, che fungerà da host/orchestratore.

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
1- Installa il plugin Module Federation - yarn add -D @module-federation/vite nel tuo microfrontend
2- Crea un componente React nella folder src e chiamalo ExportContent.tsx
3- Configura il file vite.config.ts del tuo microfrontend:

`export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'team_****', // nome del microfrontend
      filename: 'remoteEntry.js', // manifest del remote standard
      exposes: {
        './Team****Main': './src/ExportContent.tsx', // key: nome del modulo esposto da riportare come remote nel container assieme al name, value: percorso del componente che si vuole esportare
      },
     shared: {
      react: { singleton: true }, // condiviso per evitare più copie di React; singleton = una sola istanza in tutta l’app
      "react-dom": { singleton: true }, // stessa logica di React, garantisce coerenza ed evita errori di hook
    },
    }),
  ],
  server: {
  port: 5174, // porta su cui gira il dev server di questo microfrontend
  origin: 'http://localhost:5174', // URL base usato per risolvere i chunk in fase di sviluppo
},
base: 'http://localhost:5174/', // base URL per caricare asset/chunk (utile anche in build)
build: {
  target: 'chrome89', // target di build: definisce il livello di compatibilità JS
},
});`

4- Dichiarare il module remote all'interno del file remotes.d.ts dell'host
// TypeScript non conosce di default l’esistenza di "team_****/Team****Main", perché non è un modulo fisico presente nel node_modules o nel filesystem.
// Per evitare errori di compilazione (Cannot find module 'team_****/Team****Main'), si dichiara il modulo manualmente in un file .d.ts, ad esempio:
// container/src/remotes.d.ts
// declare module "team_****/Team****Main";

5- Configurazione del file vite dell\'host:
container/vite.config.ts
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

6- Usa il componente remoto nell’host
  import React, { Suspense } from "react";

  // import del modulo esposto dal remote tramite Module Federation
  // React.lazy permette di caricare il componente in modo dinamico/asyncrono
  const TeamBlueWidget = React.lazy(() => import("team_blue/TeamBlueWidget"));

  export default function App() {
    return (
      <main style={{ fontFamily: "system-ui", padding: 24 }}>
        <h2>Container Host</h2>

        {/* Suspense mostra un fallback finché il componente remoto non è stato caricato */}
        <Suspense fallback={<div>Caricamento widget Team Blue…</div>}>
          {/* qui viene renderizzato il componente federato proveniente dal remote */}
          <TeamBlueWidget />
        </Suspense>
      </main>
    );
  }



```
