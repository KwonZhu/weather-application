import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';
import CityCards from './components/CityCards';
import WeatherDetails from './components/WeatherDetails';
import WeatherInfos from './components/WeatherInfos';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Flex from './utilities/Flex';
import BackgroundImagesMap from './constants/BackgroundImagesMap';

const Container = styled.div`
  height: 100vh;
  background: url('/images/bg.png') no-repeat center center fixed;
  background-size: cover;
`;

const Wrapper = styled(Flex)`
  width: 70%;
  align-items: center;
  justify-content: center;
  column-gap: 4rem;
  border-radius: 2rem;
  background-color: rgb(243, 243, 243);
  padding: 1.5rem;
`;

const Left = styled(Flex)`
  position: relative;
  flex-direction: column;
  width: 300px;
  height: 400px;
  border-radius: 2rem;
  padding: 1rem;
  // background: ${(props) => `linear-gradient(rgb(131, 154, 239) 30%, rgb(95, 76, 219)), url(${props.$url})`};
  background: linear-gradient(rgb(131, 154, 239) 30%, rgb(95, 76, 219));
  background-size: cover;
  background-position: center;
`;

const Right = styled(Flex)`
  flex-direction: column;
  // flex-grow: 1;
  // flex-shrink: 1;
  // flex-basis: 0%;
`;

// const API_KEY = '00aa3e4aa3f4496da4194153242209';
// const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const city = 'Melbourne';
const weather = {
  today: {
    realTime: '01 October, Tuesday 23:31',
    temp: '9.1°',
    tempRange: '9.1 ~ 15.7°',
    condition: 'Moderate rain',
    details: {
      windSpeed: '7.6 kph',
      humidity: '93%',
      somatosensoryTemp: '8.4°',
      pm25: '7.585',
    },
  },
  fourDaysForecast: [
    { date: '2024-10-02', dayOfWeek: 'Wednesday', tempRange: '6.9°C - 17.1°C' },
    { date: '2024-10-03', dayOfWeek: 'Thursday', tempRange: '8.5°C - 23.9°C' },
    { date: '2024-10-04', dayOfWeek: 'Friday', tempRange: '13.6°C - 21.2°C' },
    { date: '2024-10-05', dayOfWeek: 'Saturday', tempRange: '10.9°C - 19.9°C' },
  ],
};

function App() {
  // const [weather, setWeather] = useState({
  //   today: {
  //     realTime: '',
  //     temp: '',
  //     tempRange: '',
  //     condition: '',
  //     details: {
  //       windSpeed: '',
  //       humidity: '',
  //       somatosensoryTemp: '',
  //       pm25: '',
  //     },
  //   },
  //   fourDaysForecast: [],
  // });
  // const [city, setCity] = useState('Melbourne');
  // const [inputValue, setInputValue] = useState('');

  // const getDayFromDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return weekday[date.getDay()]; //getDay() return 0 - 6
  // };

  // function formatRealTime(localTime, dayOfToday) {
  //   const date = new Date(localTime);
  //   const options = { day: '2-digit', month: 'long' };
  //   const formattedDate = date.toLocaleDateString('en-US', options);
  //   const time = localTime.split(' ')[1]; // Extract time from 'YYYY-MM-DD HH:MM'
  //   return `${formattedDate}, ${dayOfToday} ${time}`;
  // }

  // const handleWeatherChange = (data) => {
  //   // Destructuring the weather API data
  //   const {
  //     location: { localtime: localTime },
  //     current: {
  //       temp_c: temp,
  //       condition: { text: condition },
  //       wind_kph: windSpeed,
  //       humidity,
  //       feelslike_c: somatosensoryTemp,
  //       air_quality: { pm2_5: pm25 },
  //     },
  //     forecast: { forecastday },
  //   } = data;
  //   // Extracting date, maxtemp_c and mintemp_c from today (forecastday[0])
  //   const {
  //     date: todayDate,
  //     day: { maxtemp_c, mintemp_c },
  //   } = forecastday[0];

  //   const realTime = formatRealTime(localTime, getDayFromDate(todayDate));

  //   // transforms subarray(from index 1 to 4) data (date, day, tempRange) for each forecasted day
  //   // fourDaysForecast[{date:"...", dayOfWeek:"...", tempRange:"..."}, {...}, ...]
  //   const fourDaysForecast = forecastday.slice(1, 5).map(({ date, day }) => ({
  //     date,
  //     dayOfWeek: getDayFromDate(date), //preserve day object (which contains mintemp_c, maxtemp_c), store the day of the week in dayOfWeek separately
  //     tempRange: `${day.mintemp_c}°C - ${day.maxtemp_c}°C`,
  //   }));
  //   setWeather({
  //     today: {
  //       realTime,
  //       temp: `${temp}°`,
  //       tempRange: `${mintemp_c} ~ ${maxtemp_c}°C`,
  //       condition,
  //       details: {
  //         windSpeed,
  //         humidity,
  //         somatosensoryTemp: `${somatosensoryTemp}°`,
  //         pm25,
  //       },
  //     },
  //     fourDaysForecast,
  //   });
  // };

  // const handleSetInputValueChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  // // When click event occurs in SearchBar, selectedCity set as default value null
  // const handleSetCityChange = (selectedCity = null) => {
  //   if (selectedCity) {
  //     // Update city from CityCards when one of the CityCards is clicked
  //     setCity(selectedCity);
  //   } else if (inputValue) {
  //     // Update city from SearchBar when Search button been is clicked
  //     setCity(inputValue);
  //   }
  // };

  // useEffect(() => {
  //   const fetchWeather = async () => {
  //     const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=yes`;
  //     try {
  //       const response = await fetch(API_URL);
  //       if (!response.ok) {
  //         throw new Error(`Fail to fetch weather data`);
  //       }
  //       const data = await response.json();
  //       handleWeatherChange(data);
  //     } catch (error) {
  //       console.error('Error:', error.message);
  //     }
  //   };
  //   fetchWeather();
  // }, [city]); //fetch weather on initial render and when city changes

  return (
    <Container>
      {/* <div>
        <p>Real Time: {weather.today.realTime}</p>
        <p>Temperature: {weather.today.temp}°C</p>
        <p>Temperature Range: {weather.today.tempRange}</p>
        <p>Condition: {weather.today.condition}</p>
        <p>Wind Speed: {weather.today.details.windSpeed} kph</p>
        <p>Humidity: {weather.today.details.humidity}%</p>
        <p>somatosensory Temperature: {weather.today.details.somatosensoryTemp}</p>
        <p>PM25: {weather.today.details.pm25}</p>
      </div> */}

      <Wrapper>
        {/* avoid passing the url prop directly to the DOM by using transient props */}
        {/* <Left $url={BackgroundImagesMap(weather.today.condition)}> */}
        <Left>
          <img
            src={BackgroundImagesMap(weather.today.condition)}
            alt="Weather background"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div>
            <WeatherInfos
              realTime={weather.today.realTime}
              city={city}
              temp={weather.today.temp}
              tempRange={weather.today.tempRange}
            />
          </div>
          <div>
            <WeatherDetails details={weather.today.details} />
          </div>
        </Left>
        <Right>
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
            <SearchBar />
          </div>
          <div>
            <CityCards />
          </div>
          {/* <div>
              <SearchBar
                inputValue={inputValue}
                handleSetInputValueChange={handleSetInputValueChange}
                handleSetCityChange={handleSetCityChange}
              />
            </div>
            <div>
              <CityCards handleSetCityChange={handleSetCityChange} />
            </div> */}
        </Right>
      </Wrapper>
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
//         "somatosensoryTemp": 8.4,
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
