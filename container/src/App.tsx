import React, { Suspense } from 'react';

const TeamBlueWidget = React.lazy(() => import('team_blue/MainExport'));

export default function App() {
  return (
    <main>
      <h2>Container Host</h2>
      <Suspense fallback={<div>Caricamento widget Team Blue…</div>}>
        <TeamBlueWidget />
      </Suspense>
    </main>
  );
}
