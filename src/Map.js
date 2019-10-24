import React, { useMemo, useState } from 'react';
import mapImage from './assets/background-map.jpg';
import markerImage from './assets/marker.png';
import selectedMarkerImage from './assets/marker-selected.png';
import './Map.css';

/**
 * Map consists of 3 layers:
 * 1. Tiles
 * 2. Markers
 * 3. Popup
 */
export const MyMap = ({ cities, dimensions }) => {
  if (!cities) {
    throw new Error('You need to pass cities to MyMap');
  }
  if (!dimensions) {
    throw new Error('You need to pass dimensions to MyMap');
  }

  const [selectedCity, setSelectedCity] = useState();

  const validCities = useMemo(() => {
    const [width, height] = dimensions;
    return cities.filter(city => {
      const [x, y] = city.position;
      return x >= 0 && x <= width && y >= 0 && y <= height;
    });
  }, [cities, dimensions]);

  const selectCity = city => {
    setSelectedCity(city === selectedCity ? undefined : city);
  };

  const deselectCity = () => {
    setSelectedCity(undefined);
  };

  return (
    <div className='map' onClick={deselectCity}>
      <img alt='map' src={mapImage} />
      {validCities.map((city, i) => (
        <Marker
            key={i}
            city={city}
            isSelected={city === selectedCity}
            selectCity={selectCity}/>
      ))}
      {selectedCity && <Popup city={selectedCity}/>}
    </div>
  );
};

const Marker = ({ city, isSelected, selectCity }) => {
  const select = e => {
    e.stopPropagation();
    selectCity(city);
  };
  const [x, y] = city.position;
  return (
    <img
        alt='city'
        src={isSelected ? selectedMarkerImage : markerImage}
        onClick={select}
        className='marker'
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}/>
  );
};

const Popup = ({ city }) => {
  return (
    <div className='popup'>
      <h1>{city.name}</h1>
      <p>{city.type}</p>
      <p><Emoji symbol='👪' label='population'/> Population: {city.population}</p>
      <p><Emoji symbol='💰' label='wealth'/> Wealth: {city.wealth}</p>
      <p><Emoji symbol='👮' label='authority'/> Authority: {city.authority}</p>
      <p><Emoji symbol='🛡️' label='guards'/> Guards: {city.numGuards}</p>
    </div>
  );
};

const Emoji = ({ symbol, label }) => (
  <span role='img' aria-label={label}>{symbol}</span>
);
