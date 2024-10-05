import React from 'react';
import Flex from '../utilities/Flex';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  background: white;
  padding: 1.5rem;
`;

const Detail = styled(Flex)`
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
  font-size: 0.9rem;
`;

function WeatherDetails({ details }) {
  return (
    <Wrapper>
      {Object.entries(details).map(([key, value]) => (
        <Detail key={key}>
          <img src={`/images/${key}.svg`} alt={key} />
          {value}
        </Detail>
      ))}
    </Wrapper>
  );
}
export default WeatherDetails;
