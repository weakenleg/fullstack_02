import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [capital]);

  if (!weather) {
    return null;
  }

  const temperature = Math.round(weather.main.temp - 273.15);
  const weatherDescription = weather.weather[0].description;
  const weatherIconCode = weather.weather[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {weatherDescription}</p>
      <img src={weatherIconUrl} alt="Weather Icon" />
    </div>
  );
};

export default WeatherInfo;

