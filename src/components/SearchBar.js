import React from 'react';
import Flex from '../utilities/Flex';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  position: relative;
  width: 60%;
`;

const Input = styled.input`
  outline: none;
  border: none;
  height: 2.5rem;
  border-radius: 0.8rem;
  padding: 0.1rem 6rem 0.1rem 1rem; //Add padding to the right for the button
  width: 100%;
  box-sizing: border-box;
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
`;

function SearchBar() {
  return (
    <Wrapper>
      <Input type="text" placeholder="Search for a city" value="" />
      <Button>Search</Button>
    </Wrapper>
  );
}
export default SearchBar;

// function SearchBar({ inputValue, handleSetInputValueChange, handleSetCityChange }) {
//   return (
//     <div>
//       {/* user input */}
//       <input type="text" placeholder="Search for a city" value={inputValue} onChange={handleSetInputValueChange} />
//       {/* trigger new API call when click*/}
//       <button onClick={handleSetCityChange}>Search</button>
//     </div>
//   );
// }
// export default SearchBar;
