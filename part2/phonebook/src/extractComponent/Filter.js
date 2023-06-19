import React from 'react';

const Filter = ({ searchTerm, handleSearchChange, clearSearch }) => {
  return (
    <div>
      Search:
      <input value={searchTerm} onChange={handleSearchChange} />
      <button onClick={clearSearch}>Clear</button>
    </div>
  );
};

export default Filter;