import React from 'react';
import Flex from '../utilities/Flex';

function WeatherInfos({ windSpeed, humidity, uv, pm25 }) {
  return (
    <Flex>
      {/* {Object.entries(infos).map(([key, value]) => (
        <div>{value}</div>
      ))} */}

      <div>{windSpeed}</div>
      <div>{humidity}</div>
      <div>{uv}</div>
      <div>{pm25}</div>
    </Flex>
  );
}
export default WeatherInfos;
