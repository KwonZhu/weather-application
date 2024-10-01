import React from 'react';
import Flex from '../utilities/Flex';

function WeatherForecast({ date, dayOfWeek, tempRange }) {
  return (
    <Flex>
      <div>{date}</div>
      <div>{dayOfWeek}</div>
      <div>{tempRange}</div>
    </Flex>
  );
}
export default WeatherForecast;
