import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { tileTypesList } from '../../../../shared/src/types';
import { RemoteTile } from '../../../../shared/src/components/RemoteTile';

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
              <RemoteTile cellIndex={index} team={'blue'} cellType={type} />
            </div>
            <Typography variant="h4" sx={{ marginLeft: 8, alignSelf: 'center', color: 'black' }}>
              {type}
            </Typography>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
