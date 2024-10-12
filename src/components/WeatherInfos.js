import React from 'react';
import styled from 'styled-components';
import Flex from '../utilities/Flex';
import WeatherAssetMap from '../constants/WeatherAssetMap';

const Wrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const RealTime = styled.div`
  margin-right: auto;
  margin-bottom: 0.5rem;
`;

const City = styled.div`
  font-size: 1.8rem;

  @media (max-width: 900px) {
    font-size: 1.5rem;
  }
`;

const Temp = styled.div`
  font-size: 4rem;
  font-weight: bold;

  @media (max-width: 650px) {
    font-size: 3rem;
  }

  @media (min-width: 651px) and (max-width: 900px) {
    font-size: 3.5rem;
  }
`;

const Icon = styled.img`
  width: 10rem;

  @media (max-width: 650px) {
    width: 8rem;
  }

  @media (min-width: 651px) and (max-width: 900px) {
    width: 9rem;
  }
`;

function WeatherInfos({ currentTime, city, temp, tempRange, condition }) {
  return (
    <Wrapper>
      <RealTime>{currentTime}</RealTime>
      <City>{city}</City>
      <Temp>{temp}</Temp>
      <div>{tempRange}</div>
      <Icon src={WeatherAssetMap(condition, 'icon')} alt="Weather icon" />
    </Wrapper>
  );
}

export default WeatherInfos;
