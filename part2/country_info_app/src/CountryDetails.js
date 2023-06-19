import React from 'react';
const CountryDetails = ({ country }) => {
    if (!country) {
      return null;
    }
  
    // Render the detailed information of the country
    return (
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        {/* Add more details as needed */}
      </div>
    );
  };
  export default CountryDetails;
  