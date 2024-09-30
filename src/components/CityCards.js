import React, { useState, useEffect } from 'react';

const API_KEY = '00aa3e4aa3f4496da4194153242209';
const citiesNames = ['London', 'Shanghai', 'New York', 'Melbourne'];

function CityCards({ handleSetCityChange }) {
  const [citiesWeather, setCitiesWeather] = useState([]);

  const handleCitiesWeatherChange = (data, city) => {
    const {
      forecast: { forecastday },
    } = data;
    const {
      day: { maxtemp_c, mintemp_c },
    } = forecastday[0];
    const tempRange = `${mintemp_c}°C - ${maxtemp_c}°C`;
    // setCitiesWeather((prevCitiesWeather) => [...prevCitiesWeather, { city, tempRange }]);
    // instead of immediately updating the state, accumulating the results in an array (citiesData)
    return { city, tempRange };
  };

  // Fetch weather data for all cities
  const fetchCitiesWeather = async () => {
    //await Promise.all() waits until all promises are resolved before continuing
    //citiesData contains return result of each city
    const citiesData = await Promise.all(
      citiesNames.map(async (city) => {
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no`;
        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error(`Fail to fetch weather data`);
          }
          const data = await response.json();
          return handleCitiesWeatherChange(data, city);
        } catch (error) {
          console.error('Error:', error.message);
        }
      })
    );
    // citiesWeather only update once when all cities get their data
    setCitiesWeather(citiesData);
  };

  useEffect(() => {
    fetchCitiesWeather();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {citiesWeather.map((cityWeather) => (
        // Make cards clickable
        <div style={{ margin: '10px', cursor: 'pointer' }} onClick={() => handleSetCityChange(cityWeather.city)}>
          <div>{cityWeather.city}</div>
          <div>{cityWeather.tempRange}</div>
        </div>
      ))}
    </div>
  );
}
export default CityCards;
