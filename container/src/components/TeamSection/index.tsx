import { Button, styled } from '@mui/material';
import React from 'react';
import { InfoTileModal } from './InfoTileModal';

export const TeamSection: React.FC = () => {
  const [isInfoTileModalOpen, setIsInfoTileModalOpen] = React.useState(false);

  return (
    <ContractsListWrapper>
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
