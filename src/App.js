import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';
import CityCards from './components/CityCards';
import WeatherDetails from './components/WeatherDetails';
import WeatherInfos from './components/WeatherInfos';
import { useState, useEffect } from 'react';

const API_KEY = '00aa3e4aa3f4496da4194153242209';
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function App() {
  const [weather, setWeather] = useState({
    today: {
      localTime: '',
      day: '',
      temp: '',
      tempRange: '',
      windSpeed: '',
      humidity: '',
      uv: '',
      pm25: '',
    },
    fourDaysForecast: [],
  });
  const [city, setCity] = useState('Sydney');
  const [inputValue, setInputValue] = useState('');

  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    return weekday[date.getDay()]; //getDay() return 0 - 6
  };

  const handleWeatherChange = (data) => {
    // Destructuring the weather API data
    const {
      location: { localtime: localTime },
      current: {
        temp_c: temp,
        wind_kph: windSpeed,
        humidity,
        uv,
        air_quality: { pm2_5: pm25 },
      },
      forecast: { forecastday },
    } = data;
    const {
      date: todayDate,
      day: { maxtemp_c, mintemp_c },
    } = forecastday[0];

    const today = {
      localTime,
      day: getDayFromDate(todayDate),
      temp,
      tempRange: `${mintemp_c}°C - ${maxtemp_c}°C`,
      windSpeed,
      humidity,
      uv,
      pm25,
    };
    // transforms subarray(from index 1 to 4) data (date, day, tempRange) for each forecasted day
    // fourDaysForecast[{date:"...", day:"...", tempRange:"..."}, {date, day, tempRange},...]
    const fourDaysForecast = forecastday.slice(1, 5).map(({ date, day }) => ({
      date,
      day: getDayFromDate(date),
      tempRange: `${day.mintemp_c}°C - ${day.maxtemp_c}°C`,
    }));
    setWeather((prevWeather) => ({
      ...prevWeather,
      today,
      fourDaysForecast,
    }));
  };

  const handleSetInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  // search button triggers useEffect to do new API call
  const handleSetCityChange = () => {
    if (inputValue) {
      setCity(inputValue);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=yes`;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Fail to fetch weather data`);
        }
        const data = await response.json();
        handleWeatherChange(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchWeather();
  }, [city]); //fetch weather on initial render and when city changes

  return (
    <div className="App">
      <div>
        today
        <p>Local Time: {weather.today.localTime}</p>
        <p>Day: {weather.today.day}</p>
        <p>Temperature: {weather.today.temp}°C</p>
        <p>Wind Speed: {weather.today.windSpeed} kph</p>
        <p>Humidity: {weather.today.humidity}%</p>
        <p>UV Index: {weather.today.uv}</p>
        <p>Temperature Range: {weather.today.tempRange}</p>
        <p>PM25: {weather.today.pm25}</p>
      </div>

      <div style={{ display: 'flex' }}>
        <div>
          <div>
            <WeatherDetails
              city={city}
              localTime={weather.today.localTime}
              day={weather.today.day}
              temp={weather.today.temp}
              tempRange={weather.today.tempRange}
            />
          </div>
          <div>
            <WeatherInfos
              windSpeed={weather.today.windSpeed}
              humidity={weather.today.humidity}
              uv={weather.today.uv}
              pm25={weather.today.pm25}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            {weather.fourDaysForecast.map((dayForecast) => (
              <WeatherForecast date={dayForecast.date} day={dayForecast.day} tempRange={dayForecast.tempRange} />
            ))}
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

// {
//   "location": {
//       "localtime": "2024-09-26 22:52"
//   },
//   "current": {
//         "temp_c": 14.4,
//         "wind_kph": 34.6,
//         "humidity": 77,
//         "uv": 1.0,
//         "air_quality": {
//             "pm2_5": 15.355,
//         }
//   },
//   "forecast": {
//         "forecastday": [
//           {
//             "date": "2024-09-26",
//             "day": {
//                 "maxtemp_c": 17.9,
//                 "mintemp_c": 15.3,
//               }
//         },
//             {
//                 "date": "2024-09-27",
//                 "day": {
//                     "maxtemp_c": 13.9,
//                     "mintemp_c": 12.3,
//                   }
//             },
//             {
//               "date": "2024-09-28",
//               "day": {
//                   "maxtemp_c": 15.3,
//                   "mintemp_c": 13.8,
//               }
//             },
//             {
//               "date": "2024-09-29",
//               "day": {
//                   "maxtemp_c": 17.2,
//                   "mintemp_c": 14.3,
//               }
//             },
//             {
//               "date": "2024-09-30",
//               "day": {
//                   "maxtemp_c": 12.3,
//                   "mintemp_c": 10.8,
//               }
//             },
//         ]
//   }
// }
