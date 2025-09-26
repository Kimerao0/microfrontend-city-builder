import * as React from 'react';
import { extraTiles } from './helpers';
import CentraleImg from '../../assets/places/centrale.jpg';
import StadioImg from '../../assets/places/stadio.jpg';
import OspedaleImg from '../../assets/places/hospital.jpg';
import MunicipioImg from '../../assets/places/municipio.jpg';
import StatuaImg from '../../assets/places/statua.jpg';
import StazioneImg from '../../assets/places/stazione.jpg';

export const DefaultTile: React.FC<{ value: string | null; cellIndex: number }> = ({ value, cellIndex }) => {
  console.log('Rendering DefaultTile with value:', value);
  if (!extraTiles.includes(value || '')) {
    return (
      <div style={{ background: value || 'gray', height: '100%', aspectRatio: '1/1' }}>
        <span>{cellIndex}</span>
      </div>
    );
  }

  const getTileImage = () => {
    switch (value) {
      case 'centrale':
        return CentraleImg;
      case 'stadio':
        return StadioImg;
      case 'ospedale':
        return OspedaleImg;
      case 'municipio':
        return MunicipioImg;
      case 'statua':
        return StatuaImg;
      case 'stazione':
        return StazioneImg;
      default:
        return null;
    }
  };

  return (
    <div style={{ height: '100%', aspectRatio: '1/1', backgroundImage: `url(${getTileImage()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <span>{cellIndex}</span>
    </div>
  );
};
