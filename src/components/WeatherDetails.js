import React from 'react';

function WeatherDetails({ city, localTime, temp, tempRange }) {
  return (
    <div>
      <div>{localTime}</div>
      <div>{city}</div>
      <div>{temp}°C</div>
      <div>{tempRange}</div>
    </div>
  );
}

export default WeatherDetails;
