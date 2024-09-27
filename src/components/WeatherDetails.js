import React from 'react';

function WeatherDetails({ city, localTime, day, temp, tempRange }) {
  return (
    <div>
      <div>{localTime}</div>
      <div>{city}</div>
      <div>{day}</div>
      <div>{temp}°C</div>
      <div>{tempRange}</div>
    </div>
  );
}

export default WeatherDetails;
