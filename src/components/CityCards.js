import React, { useState, useEffect } from "react";
import WeatherAssetMap from "../constants/WeatherAssetMap";
import Flex from "../utilities/Flex";
import styled from "styled-components";

const Wrapper = styled(Flex)`
  align-items: stretch; // Ensures all CityCards are the same height
  justify-content: space-between;
  column-gap: 1rem;

  @media (max-width: 650px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 1rem;
  }
`;

const CityCard = styled(Flex)`
  position: relative;
  flex-direction: column; // Ensures Content takes up the full height
  flex: 1; ////equals to flex-grow: 1; flex-shrink: 1; flex-basis: 0;
  background: linear-gradient(rgb(145, 182, 253) 30%, rgb(63, 126, 245));
  border-radius: 1.5rem;
  overflow: hidden;
  cursor: pointer;
`;

const Content = styled(Flex)`
  flex-direction: column;
  flex-grow: 1; // Ensures Content grows to fill the card height
  position: relative;
  align-items: center;
  justify-content: center;
  row-gap: 0.25rem;
  color: white;
  padding: 0.5rem;
  z-index: 2;
`;

const Icon = styled.img`
  width: 3rem;
`;

const City = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  white-space: nowrap;
  line-height: 1.25rem; // Ensure consistent height
`;

const TempRange = styled.div`
  font-size: 0.75rem;
  white-space: nowrap;
  line-height: 0.75rem; //Ensure consistent height
  margin-top: 0.25rem;
`;

const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.5rem;
  opacity: 0.2;
  z-index: 1;
`;

const API_KEY = "00aa3e4aa3f4496da4194153242209";
const citiesNames = ["London", "Shanghai", "New York", "Sydney"];

function CityCards({ handleSetCityChange }) {
  const [citiesWeather, setCitiesWeather] = useState([]);

  const handleCitiesWeatherChange = (city, data) => {
    const {
      current: {
        condition: { text: condition },
      },
      forecast: { forecastday },
    } = data;
    const {
      day: { maxtemp_c, mintemp_c },
    } = forecastday[0];
    const tempRange = `${mintemp_c} ~ ${maxtemp_c}°`;
    // setCitiesWeather((prevCitiesWeather) => [...prevCitiesWeather, { city, tempRange, condition }]);
    // instead of immediately updating the state, accumulating the results in an array (citiesData)
    return { city, tempRange, condition };
  };

  // Fetch weather data for all cities
  const fetchCitiesWeather = async () => {
    //await Promise.all() waits until all promises are resolved before continuing
    //citiesData contains return result of each city, which is {city: 'xxx', tempRange: 'xxx', condition: 'xxx'}
    const citiesData = await Promise.all(
      citiesNames.map(async (city) => {
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no`;
        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error(`Fail to fetch weather data`);
          }
          const data = await response.json();
          return handleCitiesWeatherChange(city, data);
        } catch (error) {
          console.error("Error:", error.message);
        }
      })
    );
    // citiesWeather only update once when all cities get their data
    setCitiesWeather(citiesData);
  };

  useEffect(() => {
    // fetchCitiesWeather is an async function, which should not be placed directly inside useEffect().
    // Instead, wrap it inside another function
    const getWeatherData = async () => {
      await fetchCitiesWeather();
    };
    getWeatherData();
  }, []);

  return (
    <Wrapper>
      {citiesWeather.map((cityWeather) => (
        <CityCard
          key={cityWeather.city}
          onClick={() => handleSetCityChange(cityWeather.city)}>
          <Content>
            <Icon
              src={WeatherAssetMap(cityWeather.condition, "icon")}
              alt="Weather icon"
            />
            <City>{cityWeather.city}</City>
            <TempRange>{cityWeather.tempRange}</TempRange>
          </Content>
          <Background
            src={`/images/${cityWeather.city}.png`}
            alt={`${cityWeather.city} weather`}
          />
        </CityCard>
      ))}
    </Wrapper>
  );
}
export default CityCards;

// mock data
// const citiesWeather = [
//   { city: 'London', tempRange: '11.5 ~ 13.4°', condition: 'Partly cloudy' },
//   { city: 'Shanghai', tempRange: '11.5 ~ 13.4°', condition: 'Sunny' },
//   { city: 'New York', tempRange: '11.5 ~ 13.4°', condition: 'Moderate rain' },
//   { city: 'Sydney', tempRange: '11.5 ~ 13.4°', condition: 'Cloudy' },
// ];
