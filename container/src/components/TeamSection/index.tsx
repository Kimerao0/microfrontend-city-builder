import { Button, styled } from '@mui/material';
import React from 'react';
import { InfoTileModal } from './InfoTileModal';
import type { TeamValues } from '../../App';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const TeamSection: React.FC<{ teams: TeamValues }> = ({ teams }) => {
  const [isInfoTileModalOpen, setIsInfoTileModalOpen] = React.useState(false);

  return (
    <ContractsListWrapper>
      {Object.entries(teams).map(([key, value]) => (
        <div
          key={key}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: '4px 16px',
            background: '#f0f0f0',
            borderRadius: 4,
            alignItems: 'center',
            maxWidth: 300,
          }}
        >
          <span style={{ textTransform: 'capitalize' }}>Team {key}</span>
          <span style={{ color: value < 50 ? 'red' : 'black', display: 'flex', alignItems: 'center', gap: 1 }}>
            {value} <AttachMoneyIcon fontSize="small" />
          </span>
        </div>
      ))}
      <Button variant="contained" color="primary" sx={{ width: 'fit-content' }} onClick={() => setIsInfoTileModalOpen(true)}>
        Info Tiles
      </Button>
      <InfoTileModal isOpen={isInfoTileModalOpen} setIsOpen={setIsInfoTileModalOpen} />
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
