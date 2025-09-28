import * as React from 'react';
import CentraleImg from '../../assets/places/centrale.jpg';
import StadioImg from '../../assets/places/stadio.jpg';
import OspedaleImg from '../../assets/places/hospital.jpg';
import MunicipioImg from '../../assets/places/municipio.jpg';
import StatuaImg from '../../assets/places/statua.jpg';
import StazioneImg from '../../assets/places/stazione.jpg';
import { isExtraTile, isPowerPlantTile } from './createDefaultTiles';

const TileNumber: React.FC<{ cellIndex: number }> = ({ cellIndex }) => {
  return (
    <span
      style={{
        borderRadius: '50%',
        backgroundColor: '#00000075',
        width: 20,
        height: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 13,
        color: 'white',
      }}
    >
      {cellIndex}
    </span>
  );
};

export const DefaultTile: React.FC<{ value: string | null; cellIndex: number }> = ({ value, cellIndex }) => {
  if (value === null || (!isExtraTile(value) && !isPowerPlantTile(value))) {
    return (
      <div style={{ background: value || 'gray', height: '100%', aspectRatio: '1/1' }}>
        <TileNumber cellIndex={cellIndex} />
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
      <TileNumber cellIndex={cellIndex} />
    </div>
  );
};
