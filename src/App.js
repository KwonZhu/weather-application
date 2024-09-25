import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';
import CityCards from './components/CityCards';
import WeatherDetails from './components/WeatherDetails';
import WeatherInfo from './components/WeatherInfo';
import { useState, useEffect } from 'react';

const API_KEY = '00aa3e4aa3f4496da4194153242209';

function App() {
  const [weather, setWeather] = useState({
    temp: '',
    tempRange: '',
    windSpeed: '',
    humidity: '',
    uv: '',
    pm25: '',
  });
  const [city, setCity] = useState('Sydney');
  const [inputValue, setInputValue] = useState('');

  const handleSetInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  // search button triggers useEffect to do new API call
  const handleSetCityChange = () => {
    if (inputValue) {
      setCity(inputValue);
    }
  };

  // fetch weather from the weather API on initial render and when city changes
  useEffect(() => {
    const fetchWeather = async () => {
      const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes&alerts=yes`;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Fail to fetch weather data`);
        }
        const data = await response.json();
        // Destructuring the weather data
        const {
          current: { temp_c: temp, wind_kph: windSpeed, humidity, uv },
          forecast: { forecastday },
        } = data;
        const {
          day: { maxtemp_c, mintemp_c },
        } = forecastday[0];
        setWeather((prevWeather) => ({
          ...prevWeather,
          temp,
          tempRange: `${mintemp_c}°C - ${maxtemp_c}°C`,
          windSpeed,
          humidity,
          uv,
        }));
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchWeather();
  }, [city]); //fetch weather on initial render and when city changes

  return (
    <div className="App">
      <div>
        <p>Temperature: {weather.temp}°C</p>
        <p>Wind Speed: {weather.windSpeed} kph</p>
        <p>Humidity: {weather.humidity}%</p>
        <p>UV Index: {weather.uv}</p>
        <p>Temperature Range (Day 2): {weather.tempRange}</p>
      </div>

      <div style={{ display: 'flex' }}>
        <div>
          <div>
            <WeatherDetails city={city} temp={weather.temp} tempRange={weather.tempRange} />
          </div>
          <div>
            <WeatherInfo />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <WeatherForecast />
          </div>
          <div>
            <SearchBar
              inputValue={inputValue}
              handleSetInputValueChange={handleSetInputValueChange}
              handleSetCityChange={handleSetCityChange}
            />
          </div>
          <div>
            <CityCards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
