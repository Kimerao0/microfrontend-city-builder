import { Button, styled } from '@mui/material';
import React, { useState } from 'react';
import { useCity } from '../../context/CityContext';
import type { SpecialTileType } from '../../../../shared/src/types';
import { shuffle } from '../../utils/arrayMethods';
import { basicContractsList } from './basics';
import { minGridDistance, randomBetween } from '../../../../shared/src/fn';
import safeJsonParse from '../../utils/safeDecode';

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
  const storedContracts = localStorage.getItem('contracts');
  const parsedContracts = safeJsonParse<ContractType[] | null>(storedContracts);
  const [contracts, setContracts] = useState<ContractType[]>(parsedContracts || []);
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
      const isCorrente = contract.title.includes('corrente');
      return {
        title: contract.title,
        description: contract.description,
        rewardSimple:
          contract.location1 && contract.location2
            ? getRewardForLocation(contract.location1, contract.location2)
            : contract.value
              ? contract.value * randomBetween(1.25, 1.75)
              : 15,
        rewardAdvanced:
          contract.location1 && contract.location2 && !isCorrente
            ? getRewardForLocation(contract.location1, contract.location2) * randomBetween(2, 3)
            : undefined,
      };
    });
    localStorage.setItem('contracts', JSON.stringify(finalContracts));
    setContracts(finalContracts);
  };

  const handleContractsCancellation = () => {
    localStorage.removeItem('contracts');
    setContracts([]);
  };

  return (
    <ContractsListWrapper>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
        <Button variant="contained" color="primary" sx={{ width: 'fit-content' }} onClick={handleContractsCreation} disabled={!hasTiles}>
          Crea contratti
        </Button>
        <Button variant="contained" color="primary" sx={{ width: 'fit-content' }} onClick={handleContractsCancellation} disabled={!hasTiles}>
          Cancella contratti
        </Button>
      </div>

      {contracts.map((contract, index) => (
        <div key={index} style={{ border: '1px solid gray', borderRadius: 8, padding: 8, width: '100%', backgroundColor: '#ffffd6' }}>
          <h3 style={{ margin: '4px 0' }}>{contract.title}</h3>
          <p style={{ margin: '4px 0' }}>{contract.description}</p>
          <p style={{ margin: '4px 0' }}>
            {contract.rewardAdvanced ? `Ricompensa collegamento con strada: ` : `Ricompensa: `} <strong>{Math.floor(contract.rewardSimple)} $</strong>
          </p>
          {contract.rewardAdvanced && (
            <p style={{ margin: '4px 0' }}>
              Ricompensa collegamento con tram: <strong>{Math.floor(contract.rewardAdvanced)} $</strong>
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
