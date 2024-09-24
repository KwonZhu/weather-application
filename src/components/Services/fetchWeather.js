function fetchWeather(city) {
    const API_KEY = '00aa3e4aa3f4496da4194153242209';
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes&alerts=yes`;
  
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching weather data');
        }
  
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }
  fetchWeather('sydney');
  