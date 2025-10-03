import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { CityGrid } from './components/CityGrid';
import { ContractsList } from './components/ContractsList';
import { CityProvider } from './context/CityContext';
import { Typography } from '@mui/material';
import type { BoardTile } from '../../shared/src/types';
import MaterialWrapper from '../../shared/src/components/MaterialWrapper';
import { TeamSection } from './components/TeamSection';

interface TeamValues {
  name: string;
  money: number;
}

export const App = () => {
  const [teams, setTeams] = useState<TeamValues[]>([
    { name: 'Blue Team', money: 100 },
    { name: 'Red Team', money: 100 },
    { name: 'Green Team', money: 100 },
    { name: 'Purple Team', money: 100 },
  ]);
  const [tiles, setTiles] = useState<BoardTile[]>([]);

  useEffect(() => {
    (async () => {
      // Named export o default, a seconda di come esporti in team-blue
      const moduleBlue = await import('team_blue/registry');
      // Se in team-blue hai "export const Registry = [...]; export default Registry;"
      const remoteTilesBlue: BoardTile[] = moduleBlue.Registry as BoardTile[];
      const moduleRed = await import('team_red/registry');
      const remoteTilesRed: BoardTile[] = moduleRed.Registry as BoardTile[];
      const moduleGreen = await import('team_green/registry');
      const remoteTilesGreen: BoardTile[] = moduleGreen.Registry as BoardTile[];
      const modulePurple = await import('team_purple/registry');
      const remoteTilesPurple: BoardTile[] = modulePurple.Registry as BoardTile[];
      const remoteTiles = [...remoteTilesBlue, ...remoteTilesRed, ...remoteTilesGreen, ...remoteTilesPurple];
      setTiles(remoteTiles);
    })();
  }, []);

  return (
    <MaterialWrapper>
      <CityProvider>
        <Typography variant="h3" style={{ marginTop: 20, width: '100%', textAlign: 'center', marginBottom: 0, fontSize: 20, textTransform: 'uppercase' }}>
          Microfrontend city builder
        </Typography>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: 'calc(100vh - 52px)', width: '100vw' }} spacing={2}>
          <Grid size={3.5}>
            <TeamSection />
          </Grid>
          <Grid size={5}>
            <CityGrid tiles={tiles} />
          </Grid>
          <Grid size={3.5} style={{ height: '100%' }}>
            <ContractsList />
          </Grid>
        </Grid>
      </CityProvider>
    </MaterialWrapper>
  );
};
