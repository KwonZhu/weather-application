import React from 'react';
import WeatherAssetMap from '../constants/WeatherAssetMap';
import Flex from '../utilities/Flex';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
  flex: 1; //equals to flex-grow: 1; flex-shrink: 1; flex-basis: 0;
  row-gap: 0.3rem;
  font-size: 0.8rem;

  @media (max-width: 650px) {
    font-size: 0.7rem;
    margin-bottom: 1.8rem;
  }

  @media (min-width: 651px) and (max-width: 900px) {
    font-size: 0.75rem;
  }
`;

const Day = styled.div`
  font-size: 1.25rem;
  font-weight: 700;

  @media (max-width: 650px) {
    font-size: 1rem;
  }

  @media (min-width: 651px) and (max-width: 900px) {
    font-size: 1.1rem;
  }
`;

const Icon = styled.img`
  width: 6rem;

  @media (max-width: 650px) {
    width: 4rem;
  }

  @media (min-width: 651px) and (max-width: 900px) {
    width: 5rem;
  }
`;

function WeatherForecast({ dayOfWeek, date, condition, tempRange }) {
  return (
    <Wrapper>
      <Day>{dayOfWeek}</Day>
      <div>{date}</div>
      <Icon src={WeatherAssetMap(condition, 'icon')} alt="Weather icon" />
      <div>{tempRange}</div>
    </Wrapper>
  );
}
export default WeatherForecast;
