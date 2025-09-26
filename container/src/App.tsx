import Grid from '@mui/material/Grid';
import { CityGrid, type TileProps } from './components/CityGrid';

const Grass: React.FC<TileProps> = ({ row, col }) => (
  <div style={{ background: 'green', height: '100%', aspectRatio: '1/1' }}>
    {row},{col}
  </div>
);

const Road: React.FC<TileProps> = () => <div style={{ background: 'gray', height: '100%', aspectRatio: '1/1' }} />;

export const App = () => {
  const tiles = Array.from({ length: 0 }, (_, i) => (i % 2 === 0 ? Grass : Road));
  return (
    <>
      <h3 style={{ marginTop: 6, width: '100%', textAlign: 'center', marginBottom: 10 }}>Microfrontend city builder</h3>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: 'calc(100vh - 44px)', width: '100vw' }}>
        <Grid size={3.5} />
        <Grid size={5}>
          <CityGrid tiles={tiles} />
        </Grid>
        <Grid size={3.5} />
      </Grid>
    </>
  );
};
