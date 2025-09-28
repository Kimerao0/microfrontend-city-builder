import { Button, styled } from '@mui/material';
import React from 'react';
import { useCity } from '../../context/CityContext';

interface ContractType {
  id: string;
  description: string;
  visual: React.JSX.Element;
  reward: number;
}

export const ContractsList: React.FC = () => {
  const { hasTiles, defaultTilesTypes } = useCity();

  const handleContractsCreation = () => {
    console.log(defaultTilesTypes);
  };

  return (
    <ContractsListWrapper>
      <Button variant="contained" color="primary" sx={{ width: 'fit-content' }} onClick={handleContractsCreation} disabled={!hasTiles}>
        Crea contratti
      </Button>
    </ContractsListWrapper>
  );
};

const ContractsListWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  alignItems: 'center',
  gap: 12,
  justifyContent: 'center',
});
