import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';
import CityCards from './components/CityCards';
import WeatherDetails from './components/WeatherDetails';
import WeatherInfos from './components/WeatherInfos';
import { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import Flex from './utilities/Flex';
import WeatherAssetMap from './constants/WeatherAssetMap';

const Container = styled(Flex)`
  min-height: 100vh;
  background: url('/images/bg.png') no-repeat center center fixed;
  background-size: cover;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(Flex)`
  width: 85%;
  column-gap: 2rem;
  border-radius: 2rem;
  background-color: rgb(243, 243, 243);
  padding: 1.5rem;

  @media (max-width: 650px) {
    flex-direction: column;
    width: 90%;
    padding: 1rem;
    column-gap: 1rem;
  }

  @media (min-width: 651px) and (max-width: 900px) {
    flex-direction: column;
    width: 90%;
    padding: 1.25rem;
    column-gap: 2rem;
  }
`;

const Left = styled(Flex)`
  width: 45%;
  position: relative;
  flex-direction: column;
  border-radius: 2rem;
  padding: 1rem;
  // background: ${(props) => `linear-gradient(rgb(131, 154, 239) 30%, rgb(95, 76, 219)), url(${props.$url})`};
  background: linear-gradient(rgb(131, 154, 239) 30%, rgb(95, 76, 219));
  background-size: cover;
  background-position: center;
  overflow: hidden;
  & > div {
    z-index: 2;
  }

  @media (max-width: 650px) {
    width: 90%;
    margin: 0 auto;
    padding: 0.5rem;
  }

  @media (min-width: 651px) and (max-width: 900px) {
    width: 90%;
    margin: 0 auto;
    padding: 1rem;
  }
`;

const Img = styled.img`
  z-index: 1;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  object-fit: cover;
`;

const Right = styled(Flex)`
  flex-direction: column;
  flex-grow: 1;
`;

const WeatherForecastContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 3rem;
  column-gap: 1rem;

  @media (max-width: 650px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const API_KEY = '00aa3e4aa3f4496da4194153242209';
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function App() {
  const [weather, setWeather] = useState({
    today: {
      currentTime: '',
      temp: '',
      tempRange: '',
      condition: '',
      details: {
        windSpeed: '',
        humidity: '',
        somatosensoryTemp: '',
        pm25: '',
      },
    },
    fourDaysForecast: [],
  });
  const [city, setCity] = useState('Melbourne');
  const [inputValue, setInputValue] = useState('');

  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    return weekday[date.getDay()]; //getDay() return 0 - 6
  };

  function formatRealTime(localTime, dayOfToday) {
    const date = new Date(localTime);
    const options = { day: '2-digit', month: 'long' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const time = localTime.split(' ')[1]; // Extract time from 'YYYY-MM-DD HH:MM'
    return `${formattedDate}, ${dayOfToday} ${time}`;
  }

  const handleWeatherChange = (data) => {
    // Destructuring the weather API data
    const {
      location: { localtime: localTime },
      current: {
        temp_c: temp,
        condition: { text: condition },
        wind_kph: windSpeed,
        humidity,
        feelslike_c: somatosensoryTemp,
        air_quality: { pm2_5: pm25 },
      },
      forecast: { forecastday },
    } = data;

    // Extracting date, maxtemp_c and mintemp_c from today (forecastday[0])
    const {
      date: todayDate,
      day: { maxtemp_c, mintemp_c },
    } = forecastday[0];

    const currentTime = formatRealTime(localTime, getDayFromDate(todayDate));

    // transforms subarray(from index 1 to 4) data (date, day, condition, tempRange) for each forecasted day
    // fourDaysForecast[{date:"...", dayOfWeek:"...", condition: "...", tempRange:"..."}, {...}, ...]
    const fourDaysForecast = forecastday.slice(1, 5).map(({ date, day }) => ({
      date,
      dayOfWeek: getDayFromDate(date), //preserve day object (which contains mintemp_c, maxtemp_c), store the day of the week in dayOfWeek separately
      tempRange: `${day.mintemp_c}°C - ${day.maxtemp_c}°C`,
      condition: day.condition.text,
    }));
    setWeather({
      today: {
        currentTime,
        temp: `${temp}°`,
        tempRange: `${mintemp_c} ~ ${maxtemp_c}°C`,
        condition,
        details: {
          windSpeed,
          humidity,
          somatosensoryTemp: `${somatosensoryTemp}°`,
          pm25,
        },
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
      <Wrapper>
        {/* avoid passing the url prop directly to the DOM by using transient props */}
        {/* <Left $url={WeatherAssetMap(weather.today.condition, 'background')}> */}
        <Left>
          <Img src={WeatherAssetMap(weather.today.condition, 'background')} alt="Weather background" />
          <div>
            <WeatherInfos
              currentTime={weather.today.currentTime}
              city={city}
              temp={weather.today.temp}
              tempRange={weather.today.tempRange}
              condition={weather.today.condition}
            />
          </div>
          <div>
            <WeatherDetails details={weather.today.details} />
          </div>
        </Left>
        <Right>
          <WeatherForecastContainer>
            {weather.fourDaysForecast.map((dayForecast) => (
              <WeatherForecast
                key={dayForecast.date}
                dayOfWeek={dayForecast.dayOfWeek}
                date={dayForecast.date}
                condition={dayForecast.condition}
                tempRange={dayForecast.tempRange}
              />
            ))}
          </WeatherForecastContainer>
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
        </Right>
      </Wrapper>
    </Container>
  );
}

export default App;

// mock data
// const city = 'Melbourne';
// const weather = {
//   today: {
//     currentTime: '01 October, Tuesday 23:31',
//     temp: '9.1°',
//     tempRange: '9.1 ~ 15.7°',
//     condition: 'Sunny',
//     details: {
//       windSpeed: '7.6 kph',
//       humidity: '93%',
//       somatosensoryTemp: '8.4°',
//       pm25: '7.585',
//     },
//   },
//   fourDaysForecast: [
//     { date: '2024-10-02', dayOfWeek: 'Wednesday', condition: 'Sunny', tempRange: '6.9 ~ 17.1°' },
//     { date: '2024-10-03', dayOfWeek: 'Thursday', condition: 'Moderate rain', tempRange: '8.5 ~ 23.9°' },
//     { date: '2024-10-04', dayOfWeek: 'Friday', condition: 'Sunny', tempRange: '13.6 ~ 21.2°' },
//     { date: '2024-10-05', dayOfWeek: 'Saturday', condition: 'Ice pellets', tempRange: '10.9 ~ 19.9°' },
//   ],
// };
