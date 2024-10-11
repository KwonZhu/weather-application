import React from 'react';
import Flex from '../utilities/Flex';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  position: relative;
  margin: 1.5rem 0 3.5rem 0;
  width: 80%;

  @media (max-width: 650px) {
    width: 90%;
    margin-top: -1.8rem;
  }

  @media (min-width: 651px) and (max-width: 900px) {
    width: 60%;
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  height: 2.5rem;
  border-radius: 0.8rem;
  padding: 0.1rem 6rem 0.1rem 1rem; //Add padding to the right for the button
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 650px) {
    height: 2rem;
    padding: 0.1rem 4rem 0.1rem 0.8rem;
  }

  @media (min-width: 651px) and (max-width: 900px) {
    height: 2rem;
  }
`;

const Button = styled.button`
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 6rem;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: rgb(91, 72, 218);
  color: white;

  @media (max-width: 320px) {
    width: 3.5rem;
  }

  @media (min-width: 321px) and (max-width: 650px) {
    width: 5rem;
    height: 1.8rem;
  }

  @media (min-width: 651px) and (max-width: 900px) {
    width: 5rem;
    height: 1.8rem;
  }
`;

function SearchBar({ inputValue, handleSetInputValueChange, handleSetCityChange }) {
  return (
    <Wrapper>
      {/* user input */}
      <Input type="text" placeholder="Search for a city" value={inputValue} onChange={handleSetInputValueChange} />
      {/* trigger new API call when click*/}
      <Button onClick={handleSetCityChange}>Search</Button>
    </Wrapper>
  );
}
export default SearchBar;
