import React from 'react';
import WeatherIconMap from '../constants/WeatherIconMap';
import Flex from '../utilities/Flex';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
  flex: 1; //equals to flex-grow: 1; flex-shrink: 1; flex-basis: 0;
  row-gap: 0.5rem;
`;

const Day = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`;

const Img = styled.img`
  width: 8rem;
`;

function WeatherForecast({ dayOfWeek, date, condition, tempRange }) {
  return (
    <Wrapper>
      <Day>{dayOfWeek}</Day>
      <div>{date}</div>
      <Img src={WeatherIconMap(condition)} alt="Weather icon" />
      <div>{tempRange}</div>
    </Wrapper>
  );
}
export default WeatherForecast;
