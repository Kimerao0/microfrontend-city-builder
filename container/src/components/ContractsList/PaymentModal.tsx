import React, { useState, type ChangeEvent } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import type { TeamValues } from '../../App';

interface PaymentModalProps {
  paymentVal: number;
  setPaymentVal: React.Dispatch<React.SetStateAction<number>>;
  teams: TeamValues;
  setTeams: React.Dispatch<React.SetStateAction<TeamValues>>;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ paymentVal, setPaymentVal, teams, setTeams }) => {
  const [blueVal, setBlueVal] = useState<number>(0);
  const [redVal, setRedVal] = useState<number>(0);
  const [greenVal, setGreenVal] = useState<number>(0);
  const [purpleVal, setPurpleVal] = useState<number>(0);

  const handleChangeBlue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBlueVal(value === '' ? 0 : Number(value));
  };
  const handleChangeRed = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRedVal(value === '' ? 0 : Number(value));
  };
  const handleChangeGreen = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGreenVal(value === '' ? 0 : Number(value));
  };
  const handleChangePurple = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPurpleVal(value === '' ? 0 : Number(value));
  };

  const handleTeamPayment = () => {
    const newTeams: TeamValues = {
      blue: teams['blue'] + blueVal,
      red: teams['red'] + redVal,
      green: teams['green'] + greenVal,
      purple: teams['purple'] + purpleVal,
    };
    setTeams(newTeams);
    setPaymentVal(0);
  };
  const sumVal = blueVal + redVal + greenVal + purpleVal;
  return (
    <Dialog open={paymentVal !== 0} onClose={() => setPaymentVal(0)} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: 'black' }}>Divisione della ricompensa ({paymentVal})</DialogTitle>
      <DialogContent dividers>
        <TextField sx={{ mt: 2 }} fullWidth label={`Team Blue`} value={blueVal} type="number" onChange={handleChangeBlue} variant="outlined" />
        <TextField sx={{ mt: 2 }} fullWidth label={`Team Red`} value={redVal} type="number" onChange={handleChangeRed} variant="outlined" />
        <TextField sx={{ mt: 2 }} fullWidth label={`Team Green`} value={greenVal} type="number" onChange={handleChangeGreen} variant="outlined" />
        <TextField sx={{ mt: 2 }} fullWidth label={`Team Purple`} value={purpleVal} type="number" onChange={handleChangePurple} variant="outlined" />
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <div>Totale da distribuire: {paymentVal - sumVal}</div>
          <div>Totale distribuito: {sumVal}</div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPaymentVal(0)} color="primary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleTeamPayment} color="primary" variant="contained" disabled={sumVal !== paymentVal}>
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;
