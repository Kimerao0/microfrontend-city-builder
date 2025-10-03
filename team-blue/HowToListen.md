# Mettersi in ascolto con un event listener:

Creiamo un customHook per asoltare l'evento:

```tsx
// 1- Definiamo un custom hook per ascoltare l'evento di posizione della stazione. Prendiamo come argomento una callback che viene chiamata quando riceviamo un evento valido.
export function useStationPositions(onPos: (p: StationPosition) => void) {}

// 2- Dentro il custom hook defininiamo un gestore di eventi chiamato handler
const handler = (e: Event) => {
  // Estraiamo detail, cioè il payload che chi emette l’evento ha passato (dovrebbe contenere i dati della posizione)
  const { detail } = e as CustomEvent<StationPosition>;
  // mini-validazione
  if (typeof detail?.positions === 'object' && Array.isArray(detail?.positions)) {
    onPos(detail);
  }
}

  // 3- Sempre dentro il custom hook usiamo useEffect dentro il custom hook per aggiungere e rimuovere l'event listener
  useEffect(() => {
    window.addEventListener(EVENT_STATION_POS, handler);
    return () => window.removeEventListener(EVENT_STATION_POS, handler);
    // l’effetto si riesegue solo quando cambia la reference di onPos
  }, [onPos]);

  // 4- Dentro il nostro componente BasicTile creiamo uno state per salvare l'array con le posizioni:
  const [pos, setPos] = useState<StationPosition | null>(null);

  // 5- Dentro il nostro componente BasicTile chiamiamo il custom hook useStationPositions e passamogli setPos come argomento:
  useStationPositions((p) => {
    setPos(p);
  });

  // 6- ora possiamo usare pos dentro il nostro componente BasicTile
};
```
