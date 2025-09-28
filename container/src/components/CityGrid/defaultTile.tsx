import * as React from 'react';
import CentraleImg from '../../assets/places/centrale.jpg';
import StadioImg from '../../assets/places/stadio.jpg';
import OspedaleImg from '../../assets/places/hospital.jpg';
import MunicipioImg from '../../assets/places/municipio.jpg';
import StatuaImg from '../../assets/places/statua.jpg';
import StazioneImg from '../../assets/places/stazione.jpg';
import { isExtraTile, isPowerPlantTile } from './createDefaultTiles';
import styled from '@emotion/styled';

export const DefaultTile: React.FC<{ value: string | null; cellIndex: number }> = ({ value, cellIndex }) => {
  if (value === null || (!isExtraTile(value) && !isPowerPlantTile(value))) {
    return (
      <div style={{ background: value || 'gray', height: '100%', aspectRatio: '1/1' }}>
        <TileNumber val={cellIndex}> {cellIndex}</TileNumber>
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
      <TileNumber val={cellIndex}> {cellIndex}</TileNumber>
    </div>
  );
};

const TileNumber = styled('span')<{ val: number }>(({ val }) => {
  const smallFs = val > 9 ? 11 : 13;
  const size = 18;
  return {
    borderRadius: '50%',
    backgroundColor: '#00000075',
    width: size,
    height: size,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: val > 99 ? 9 : smallFs,
    lineHeight: size,
    color: 'white',
  };
});
