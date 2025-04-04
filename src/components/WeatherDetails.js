import React from "react";
import Flex from "../utilities/Flex";
import styled from "styled-components";

const Wrapper = styled(Flex)`
  align-items: center;
  justify-content: space-around;
  border-radius: 1rem;
  background: white;
  padding: 1.5rem;

  @media (max-width: 320px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 0.5rem;
    font-size: 0.8rem;
  }
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
          {/* Before was src={`/images/${key}.svg`}, now it works in both development (/) and production */}
          <img src={`${process.env.PUBLIC_URL}/images/${key}.svg`} alt={key} />
          {value}
        </Detail>
      ))}
    </Wrapper>
  );
}
export default WeatherDetails;
