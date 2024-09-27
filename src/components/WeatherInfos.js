import React from 'react';

// const infos = {
//   windSpeed: '10km/h',
//   temp: '22',
//   humidity: '50%',
//   pm25: '20',
// };

function WeatherInfos({ windSpeed, humidity, uv, pm25 }) {
  return (
    <div style={{ display: 'flex' }}>
      {/* {Object.entries(infos).map(([key, value]) => (
        <div>{value}</div>
      ))} */}

      <div>{windSpeed}</div>
      <div>{humidity}</div>
      <div>{uv}</div>
      <div>{pm25}</div>
    </div>
  );
}
export default WeatherInfos;
