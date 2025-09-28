import Grid from '@mui/material/Grid';
import { CityGrid, type TileProps } from './components/CityGrid';
import { ContractsList } from './components/ContractsList';
import { CityProvider } from './context/CityContext';

const Grass: React.FC<TileProps> = ({ row, col }) => (
  <div style={{ background: 'green', height: '100%', aspectRatio: '1/1' }}>
    {row},{col}
  </div>
);

const Road: React.FC<TileProps> = () => (
  <div style={{ background: 'gray', height: '100%', aspectRatio: '1/1' }} />
);

export const App = () => {
  const tiles = Array.from({ length: 0 }, (_, i) => (i % 2 === 0 ? Grass : Road));

  return (
    <CityProvider>
      <h3 style={{ marginTop: 20, width: '100%', textAlign: 'center', marginBottom: 0 }}>
        Microfrontend city builder
      </h3>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 52px)', width: '100vw' }}
        spacing={2}
      >
        <Grid size={3.5} />
        <Grid size={5}>
          <CityGrid tiles={tiles} />
        </Grid>
        <Grid size={3.5} style={{ height: '100%' }}>
          <ContractsList />
        </Grid>
      </Grid>
    </CityProvider>
  );
};
