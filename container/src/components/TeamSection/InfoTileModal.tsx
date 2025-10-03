import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { poweredNeededTileList, tileTypesList } from '../../../../shared/src/types';
import { getTileCost } from '../../../../shared/src/fn';
import { RemoteTile } from '../../../../shared/src/components/RemoteTile';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const InfoTileModal: React.FC<{ isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: 'black' }}>Informazioni</DialogTitle>
      <DialogContent dividers>
        {tileTypesList.map((type, index) => (
          <div key={type} style={{ marginBottom: 4, width: '100%', height: 100, display: 'flex' }}>
            <div style={{ width: 100, height: 100 }}>
              <RemoteTile cellIndex={index} team={'blue'} cellType={type} isPowered={poweredNeededTileList.includes(type)} />
            </div>
            <Typography variant="h5" sx={{ marginLeft: 8, display: 'flex', alignItems: 'center', color: 'black' }}>
              {type} ({getTileCost(type)} <AttachMoneyIcon sx={{ verticalAlign: 'middle', fontSize: 20 }} />)
            </Typography>
          </div>
        ))}
        <div style={{ marginBottom: 0, width: '100%', height: 100, display: 'flex' }}>
          <div style={{ width: 100, height: 100 }}>
            <RemoteTile cellIndex={tileTypesList.length} team={'blue'} cellType="prato" hasPowerStation />
          </div>
          <Typography variant="h5" sx={{ marginLeft: 8, display: 'flex', alignItems: 'center', color: 'black' }}>
            power station (2 <AttachMoneyIcon sx={{ verticalAlign: 'middle', fontSize: 20 }} />)
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
