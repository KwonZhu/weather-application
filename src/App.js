import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';
import CityCards from './components/CityCards';
import WeatherDetails from './components/WeatherDetails';
import WeatherInfos from './components/WeatherInfos';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Flex from './utilities/Flex';

const Container = styled.div`
  background: url('../images/bg.png') no-repeat center center fixed;
  background-size: cover;
`;

const RightFlex = styled(Flex)`
  flex-direction: column;
`;

const API_KEY = '00aa3e4aa3f4496da4194153242209';
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const city = 'Melbourne'
// const weather = {
//   today: {
//     localTime: '2024-10-01 23:31',
//     day: 'Tuesday',
//     temp: '9.1',
//     tempRange: '9.1°C - 15.7°C',
//     windSpeed: '7.6 kph',
//     humidity: '93%',
//     uv: '1',
//     pm25: '7.585',
//   },
//   fourDaysForecast: [{date:"2024-10-02", dayOfWeek:"Wednesday", tempRange:"6.9°C - 17.1°C"},{date:"2024-10-03", dayOfWeek:"Thursday", tempRange:"8.5°C - 23.9°C"},{date:"2024-10-04", dayOfWeek:"Friday", tempRange:"13.6°C - 21.2°C"},{date:"2024-10-05", dayOfWeek:"Saturday", tempRange:"10.9°C - 19.9°C"}],
// };

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
  const [city, setCity] = useState('Melbourne');
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
    // Extracting date, maxtemp_c and mintemp_c from today (forecastday[0])
    const {
      date: todayDate,
      day: { maxtemp_c, mintemp_c },
    } = forecastday[0];

    // transforms subarray(from index 1 to 4) data (date, day, tempRange) for each forecasted day
    // fourDaysForecast[{date:"...", dayOfWeek:"...", tempRange:"..."}, {...}, ...]
    const fourDaysForecast = forecastday.slice(1, 5).map(({ date, day }) => ({
      date,
      dayOfWeek: getDayFromDate(date), //preserve day object (which contains mintemp_c, maxtemp_c), store the day of the week in dayOfWeek separately
      tempRange: `${day.mintemp_c}°C - ${day.maxtemp_c}°C`,
    }));
    setWeather({
      today: {
        localTime,
        day: getDayFromDate(todayDate),
        temp: `${temp}°C`,
        tempRange: `${mintemp_c}°C - ${maxtemp_c}°C`,
        windSpeed,
        humidity,
        uv,
        pm25,
      },
      fourDaysForecast,
    });
  };

  const handleSetInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  // When click event occurs in SearchBar, selectedCity set as default value null
  const handleSetCityChange = (selectedCity = null) => {
    if (selectedCity) {
      // Update city from CityCards when one of the CityCards is clicked
      setCity(selectedCity);
    } else if (inputValue) {
      // Update city from SearchBar when Search button been is clicked
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
    <Container>
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

      <Flex>
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
        <RightFlex>
          <div>
            {weather.fourDaysForecast.map((dayForecast) => (
              <WeatherForecast
                date={dayForecast.date}
                dayOfWeek={dayForecast.dayOfWeek}
                tempRange={dayForecast.tempRange}
              />
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
            <CityCards handleSetCityChange={handleSetCityChange} />
          </div>
        </RightFlex>
      </Flex>
    </Container>
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
