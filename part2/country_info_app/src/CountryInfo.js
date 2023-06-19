import React from 'react';
import WeatherInfo from './WeatherInfo';

const CountryInfo = ({ country, weather }) => {
  if (!country) {
    return null;
  }

  const { name, capital, population, languages, flag } = country;

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h3>Languages:</h3>
      <ul>
        {languages.map((language) => (
          <li key={language.iso639_2}>{language.name}</li>
        ))}
      </ul>
      <img src={flag} alt={`Flag of ${name}`} style={{ width: '200px' }} />
      {weather && <WeatherInfo capital={capital} />}
    </div>
  );
};

export default CountryInfo;


