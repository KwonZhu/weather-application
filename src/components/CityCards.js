import React, { useState, useEffect } from 'react';

const API_KEY = '00aa3e4aa3f4496da4194153242209';
const citiesNames = ['London', 'Shanghai', 'New York', 'Melbourne'];

// const cities = [
//   {
//     name: 'Sydney',
//     temp: '22',
//   },
//   {
//     name: 'Shanghai',
//     temp: '22',
//   },
//   {
//     name: 'New York',
//     temp: '22',
//   },
//   {
//     name: 'London',
//     temp: '22',
//   },
// ];

function CityCards() {
  const [citiesWeather, setCitiesWeather] = useState([]);

  const handleCitiesWeatherChange = (data, city) => {
    const {
      forecast: { forecastday },
    } = data;
    const {
      day: { maxtemp_c, mintemp_c },
    } = forecastday[0];
    const tempRange = `${mintemp_c}°C - ${maxtemp_c}°C`;
    setCitiesWeather((prevCitiesWeather) => [...prevCitiesWeather, { city, tempRange }]);
  };

  // Fetch weather data for all cities
  const fetchCitiesWeather = async () => {
    const promises = citiesNames.map(async (city) => {
      const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no`;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Fail to fetch weather data`);
        }
        const data = await response.json();
        handleCitiesWeatherChange(data, city);
      } catch (error) {
        console.error('Error:', error.message);
      }
    });
    await Promise.all(promises);
  };

  useEffect(() => {
    fetchCitiesWeather();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {/* {cities.map((city) => (
        <div style={{ margin: '10px' }}>
          <div>{city.name}</div>
          <div>{city.temp}</div>
        </div>
      ))} */}

      {citiesWeather.map((city) => (
        <div style={{ margin: '10px' }}>
          <div>{city.city}</div>
          <div>{city.tempRange}</div>
        </div>
      ))}
    </div>
  );
}
export default CityCards;
