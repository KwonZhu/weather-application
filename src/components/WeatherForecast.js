import React from 'react';

const futureWeather = [
  {
    week: 'Sunday',
    date: '22 September',
    temp: '22',
  },
  {
    week: 'Monday',
    date: '23 September',
    temp: '22',
  },
  {
    week: 'Tuesday',
    date: '24 September',
    temp: '22',
  },
  {
    week: 'Wednesday',
    date: '25 September',
    temp: '22',
  },
];

function WeatherForecast() {
  return (
    <div style={{ display: 'flex' }}>
      {futureWeather.map((weather) => (
        <div style={{ margin: '10px' }}>
          <h3>{weather.week}</h3>
          <p>{weather.data}</p>
          <p>{weather.temp}</p>
        </div>
      ))}
    </div>
  );
}
export default WeatherForecast;
