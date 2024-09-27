import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    console.log('Search button clicked!'); // Debugging line
    if (city !== '') {
      onSearch(city);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => {
          console.log(`City entered: ${e.target.value}`); // Debugging line
          setCity(e.target.value);
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;