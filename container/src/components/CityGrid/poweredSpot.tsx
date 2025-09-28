import React from 'react';
import LightningImg from '../../../../shared/src/assets/fulmine.png';

export const PoweredSpot: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      right: 4,
      top: 4,
      width: 18,
      height: 18,
      backgroundColor: '#ffff008a',
      zIndex: 3,
      borderRadius: '50%',
    }}
  >
    <div
      style={{
        width: 18,
        height: 18,
        backgroundImage: `url(${LightningImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 3,
      }}
    />
  </div>
);
