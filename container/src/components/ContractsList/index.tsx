import { Button } from '@mui/material';
import React from 'react';
import { useCity } from '../../context/CityContext';

export const ContractsList: React.FC = () => {
  const { hasTiles, defaultTilesTypes } = useCity();

  const handleContractsCreation = () => {
    console.log(defaultTilesTypes);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        gap: 12,
        justifyContent: 'center',
      }}
    >
      <Button variant="contained" color="primary" sx={{ width: 'fit-content' }} onClick={handleContractsCreation} disabled={!hasTiles}>
        Crea contratti
      </Button>
    </div>
  );
};
