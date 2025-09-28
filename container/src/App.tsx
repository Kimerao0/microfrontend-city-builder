import Grid from '@mui/material/Grid';
import { CityGrid} from './components/CityGrid';
import { ContractsList } from './components/ContractsList';
import { CityProvider } from './context/CityContext';
import { ThemeProvider, CssBaseline, Typography } from '@mui/material';
import theme from './theme';
import type { BoardTile } from './types';



export const App = () => {
  const tiles:BoardTile[] = [];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CityProvider>
        <Typography variant="h3" style={{ marginTop: 20, width: '100%', textAlign: 'center', marginBottom: 0, fontSize: 20, textTransform: 'uppercase' }}>
          Microfrontend city builder
        </Typography>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: 'calc(100vh - 52px)', width: '100vw' }} spacing={2}>
          <Grid size={3.5} />
          <Grid size={5}>
            <CityGrid tiles={tiles} />
          </Grid>
          <Grid size={3.5} style={{ height: '100%' }}>
            <ContractsList />
          </Grid>
        </Grid>
      </CityProvider>
    </ThemeProvider>
  );
};
