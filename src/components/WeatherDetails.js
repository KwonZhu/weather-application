import React from 'react';

const weather = {
  city: 'Sydney',
  temp: '22',
  tempRange: '15 ~ 25 ',
};

function WeatherDetails() {
  return (
    <div>
      <div>{weather.city}</div>
      <div>{weather.city}</div>
      <div>{weather.tempRange}</div>
    </div>
  );
}

export default WeatherDetails;
