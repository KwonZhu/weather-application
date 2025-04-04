import SearchBar from "./components/SearchBar";
import WeatherForecast from "./components/WeatherForecast";
import CityCards from "./components/CityCards";
import WeatherDetails from "./components/WeatherDetails";
import WeatherInfos from "./components/WeatherInfos";
import { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import Flex from "./utilities/Flex";
import WeatherAssetMap from "./constants/WeatherAssetMap";

const Container = styled(Flex)`
  min-height: 100vh;
  // Before was background: url("/images/bg.png"), PUBLIC_URL is automatically set by Create React App (CRA) to match the homepage in package.json
  // It ensures assets resolve correctly in both development (/) and production
  background: url(${process.env.PUBLIC_URL}/images/bg.png) no-repeat center
    center fixed;
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

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDayFromDate = (dateString) => {
  const date = new Date(dateString);
  return weekday[date.getDay()]; //getDay() return 0 - 6
};

const formatRealTime = (localTime, dayOfWeek) => {
  const date = new Date(localTime);
  const options = { day: "2-digit", month: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const time = localTime.split(" ")[1]; // Extract time from 'YYYY-MM-DD HH:MM'
  return `${formattedDate}, ${dayOfWeek} ${time}`;
};

// for both today and four future days
// Extracting dayOfWeek, tempRange for today (forecastday[0])
// Extracting date, dayOfWeek, tempRange, condition for fourDaysForecast (forecastday[1-4])
const getDataFromForecastDay = ({ date, day }) => ({
  date,
  dayOfWeek: getDayFromDate(date), //preserve day object (which contains mintemp_c, maxtemp_c, condition.text), store the day of the week in dayOfWeek separately
  tempRange: `${day.mintemp_c} ~ ${day.maxtemp_c}°`,
  condition: day.condition.text,
});

function App() {
  const [weather, setWeather] = useState({
    today: {
      currentTime: "",
      temp: "",
      tempRange: "",
      condition: "",
      details: {
        windSpeed: "",
        humidity: "",
        somatosensoryTemp: "",
        pm25: "",
      },
    },
    fourDaysForecast: [],
  });
  const [city, setCity] = useState("Melbourne");
  const [inputValue, setInputValue] = useState("");

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
      forecast: { forecastday }, //forecast is an array contains today and four future days
    } = data;

    // get dayOfWeek, tempRange from forecastday[0]
    const todayWeather = getDataFromForecastDay(forecastday[0]);

    const currentTime = formatRealTime(localTime, todayWeather.dayOfWeek);

    // transforms subarray(from index 1 to 4) data (date, day) for each forecasted day
    const fourDaysForecast = forecastday
      .slice(1, 5)
      .map(getDataFromForecastDay);

    setWeather({
      today: {
        currentTime,
        temp: `${temp}°`,
        tempRange: todayWeather.tempRange,
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

  // Updates input value from SearchBar input field
  const handleSetInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handles city selection from either SearchBar or CityCards
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
      // We can only query the weather for 3 days now because the trial has expired
      const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=yes`;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Fail to fetch weather data`);
        }
        const data = await response.json();
        handleWeatherChange(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchWeather();
  }, [city]); //fetch weather on initial render and when city changes

  return (
    <Container>
      <Wrapper>
        <Left>
          {/* Weather background image changes based on current weather condition */}
          <Img
            src={WeatherAssetMap(weather.today.condition, "background")}
            alt="Weather background"
          />
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
            {/* Mapping forecast data to display WeatherForecast components */}
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
