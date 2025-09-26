import React, { Suspense } from 'react';
import registry from 'team_blue/registry';

function LazyFrom(loader: () => Promise<{ default: React.ComponentType<any> }>) {
  return React.lazy(loader);
}

export const App = () => {
  return (
    <main>
      <h2>Container Host</h2>
      {registry.map(({ id, label, load }) => {
        const Cmp = LazyFrom(load);
        return (
          <section key={id} style={{ marginBottom: 16 }}>
            <h3>{label}</h3>
            <Suspense fallback={<div>Caricamento {label}…</div>}>
              <Cmp />
            </Suspense>
          </section>
        );
      })}
    </main>
  );
};
