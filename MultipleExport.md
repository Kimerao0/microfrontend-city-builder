# Microfrontend con Vite e Module Federation — “Manifest lazy”

## 🎯 Obiettivo

Collegare due applicazioni React create con Vite (`container` e `team-****`) usando **Module Federation**.  
L’app `container` (host) deve caricare componenti esportati da `team-****` (remote), ma **solo quando servono** grazie all’approccio **Manifest lazy**.

---

## 📚 Concetti di base

- **Host / Container** → l’app principale che visualizza i componenti remoti.
- **Remote** → l’app che espone componenti riutilizzabili.
- **Module Federation** → tecnologia che consente di importare moduli (componenti) da altre app a runtime.
- **Manifest lazy** → il remote non esporta direttamente i componenti, ma un **elenco di loader** che li scaricano solo quando servono.

---

## ✅ Prerequisiti

- Due progetti Vite React TypeScript già creati:
  - `container/`
  - `team-****/`
- Yarn installato.

---

## Scrivere il file registry

`team-****/src/registry.tsx`

```tsx
import type { ComponentType } from "react";

export type WidgetLoader = () => Promise<{ default: ComponentType<any> }>;

export type WidgetMeta = {
  id: string;
  label: string;
  load: WidgetLoader;
};

export const registry: WidgetMeta[] = [
  {
    id: "team-****:widget",
    label: "Team ****",
    load: () => import("./components/Team****Wirdget"),
  },
  {
    id: "team-****:another",
    label: "Another",
    load: () => import("./components/AnotherWidget"),
  },
];

export default registry;
```

## Dichiarazione del module

```tsx
declare module "team_****/registry" {
  import type { ComponentType } from "react";
  export type WidgetLoader = () => Promise<{ default: ComponentType<any> }>;
  export type WidgetMeta = { id: string; label: string; load: WidgetLoader };
  export const registry: WidgetMeta[];
  const _default: WidgetMeta[];
  export default _default;
}
```

## Uso del manifest

container/src/App.tsx

```tsx
import React, { Suspense } from "react";
import registry from "team_****/registry";

function LazyFrom(
  loader: () => Promise<{ default: React.ComponentType<any> }>
) {
  return React.lazy(loader);
}

export default function App() {
  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <h2>Container Host</h2>

      {registry.map(({ id, label, load }) => {
        const RemoteWidget = LazyFrom(load);
        return (
          <section key={id} style={{ marginBottom: 16 }}>
            <h3>{label}</h3>
            <Suspense fallback={<div>Caricamento {label}…</div>}>
              <RemoteWidget />
            </Suspense>
          </section>
        );
      })}
    </main>
  );
}
```
