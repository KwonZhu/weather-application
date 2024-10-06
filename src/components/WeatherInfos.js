import React from 'react';
import styled from 'styled-components';
import Flex from '../utilities/Flex';
import WeatherIconMap from '../constants/WeatherIconMap';

const Wrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1.5rem;
  color: white;
`;

const RealTime = styled.div`
  margin-right: auto;
`;

const City = styled.div`
  font-size: 1.8rem;
`;

const Temp = styled.div`
  font-size: 5rem;
  font-weight: bold;
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
`;

function WeatherInfos({ realTime, city, temp, tempRange, condition }) {
  return (
    <Wrapper>
      <RealTime>{realTime}</RealTime>
      <City>{city}</City>
      <Temp>{temp}</Temp>
      <div>{tempRange}</div>
      <Img src={WeatherIconMap(condition)} alt="Weather icon" />
    </Wrapper>
  );
}

export default WeatherInfos;
