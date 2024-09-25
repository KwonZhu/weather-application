import React from 'react';

function WeatherDetails({ city, temp, tempRange }) {
  return (
    <div>
      <div>{city}</div>
      <div>{temp}</div>
      <div>{tempRange}</div>
    </div>
  );
}

export default WeatherDetails;
