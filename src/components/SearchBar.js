import React from 'react';

function SearchBar({ inputValue, handleSetInputValueChange, handleSetCityChange }) {
  return (
    <div>
      {/* user input */}
      <input type="text" placeholder="Search City" value={inputValue} onChange={handleSetInputValueChange} />
      {/* trigger new API call when click*/}
      <button onClick={handleSetCityChange}>Search</button>
    </div>
  );
}
export default SearchBar;
