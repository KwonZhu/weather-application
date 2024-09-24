import React from 'react';

const infos = {
  windSpeed: '10km/h',
  temp: '22',
  humidity: '50%',
  pm25: '20',
};

function WeatherInfo() {
  return (
    <div style={{ display: 'flex' }}>
      {Object.entries(infos).map(([key, value]) => (
        <div>{value}</div>
      ))}
    </div>
  );
}
export default WeatherInfo;
