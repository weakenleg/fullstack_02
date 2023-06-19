import React from 'react';

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.alpha3Code}>{country.name}</div>
      ))}
    </div>
  );
};

export default CountryList;
