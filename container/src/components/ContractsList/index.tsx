import { Button, styled } from '@mui/material';
import React, { useState } from 'react';
import { useCity } from '../../context/CityContext';
import type { SpecialTileType } from '../../../../shared/src/types';
import { shuffle } from '../../utils/arrayMethods';
import { basicContractsList } from './basics';
import { minGridDistance } from '../../../../shared/src/fn';

export interface BasicContractType {
  title: string;
  description: string;
  location1?: SpecialTileType;
  location2?: SpecialTileType;
  value?: number;
}

interface ContractType extends BasicContractType {
  rewardSimple: number;
  rewardAdvanced?: number;
}

export const ContractsList: React.FC = () => {
  const [contracts, setContracts] = useState<ContractType[]>([]);
  const { hasTiles, defaultTilesTypes } = useCity();

  const handleContractsCreation = () => {
    if (!defaultTilesTypes) return;
    const shuffledContracts: BasicContractType[] = shuffle(basicContractsList);
    const sixcontracts = shuffledContracts.splice(0, 6);
    const finalContracts: ContractType[] = sixcontracts.map((contract) => {
      const getRewardForLocation = (loc1: SpecialTileType, loc2: SpecialTileType): number => {
        const distance = minGridDistance(defaultTilesTypes, loc1, loc2);
        return distance ? distance * 10 : 15;
      };
      return {
        title: contract.title,
        description: contract.description,
        rewardSimple:
          contract.location1 && contract.location2 ? getRewardForLocation(contract.location1, contract.location2) : contract.value ? contract.value * 1.5 : 15,
        rewardAdvanced: contract.location1 && contract.location2 ? getRewardForLocation(contract.location1, contract.location2) * 2.5 : undefined,
      };
    });
    setContracts(finalContracts);
  };

  return (
    <ContractsListWrapper>
      <Button variant="contained" color="primary" sx={{ width: 'fit-content' }} onClick={handleContractsCreation} disabled={!hasTiles}>
        Crea contratti
      </Button>
      {contracts.map((contract, index) => (
        <div key={index} style={{ border: '1px solid gray', borderRadius: 8, padding: 8, width: '100%', backgroundColor: '#ffffd6' }}>
          <h3 style={{ margin: '4px 0' }}>{contract.title}</h3>
          <p style={{ margin: '4px 0' }}>{contract.description}</p>
          <p style={{ margin: '4px 0' }}>
            Ricompensa base: <strong>{contract.rewardSimple} $</strong>
          </p>
          {contract.rewardAdvanced && (
            <p style={{ margin: '4px 0' }}>
              Ricompensa avanzata: <strong>{contract.rewardAdvanced} $</strong>
            </p>
          )}
        </div>
      ))}
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
