import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './CountryList';
import CountryInfo from './CountryInfo';
import CountryDetails from './CountryDetails';


const api_key = process.env.REACT_APP_API_KEY
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`https://restcountries.com/v2/name/${searchTerm}`)
        .then((response) => {
          const data = response.data;
          if (data.length > 10) {
            setCountries([]);
            setSelectedCountry(null);
          } else if (data.length === 1) {
            setCountries([]);
            setSelectedCountry(data[0]);
          } else {
            setCountries(data);
            setSelectedCountry(null);
          }
        })
        .catch((error) => {
          console.log(error);
          setCountries([]);
          setSelectedCountry(null);
        });
    } else {
      setCountries([]);
      setSelectedCountry(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (selectedCountry) {
      // const apiKey = process.env.REACT_APP_API_KEY;
      console.log(api_key);
      const capital = selectedCountry.capital;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`;
      
      axios
        .get(apiUrl)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.log(error);
          setWeather(null);
        });
    }
  }, [selectedCountry]);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Country Info App</h2>
      
      <div>
        Search: <input value={searchTerm} onChange={handleSearchChange} />
      </div>
      <div>
        {selectedCountry ? (
          <CountryInfo country={selectedCountry} weather={weather} />
        ) : (
          <CountryList countries={countries} />
        )}
      </div>
      <div>
        <CountryDetails country={selectedCountry} />
      </div>
    </div>
  );
};

export default App;

