function WeatherIconMap(condition) {
  console.log('condition', condition);
  const formattedCondition = condition.replace(/\s+/g, '_');
  console.log('formattedCondition', formattedCondition);
  console.log(
    'return icon url',
    {
      Sunny: '/images/Sunny.png',
      Partly_Cloudy: '/images/Cloudy_day.png',
      Overcast: '/images/Cloudy.png',
      Cloudy: '/images/Cloudy.png',
      Light_drizzle: '/images/Rain.png',
      Patchy_light_drizzle: '/images/Rain.png',
      Light_freezing_rain: '/images/Rain.png',
      Light_rain: '/images/Rain.png',
      Moderate_rain: '/images/Rain.png',
      Heavy_rain: '/images/Rain.png',
      Patchy_rain_nearby: './images/Rain.png',
      Light_rain_shower: '/images/Rain.png',
      Light_sleet_showers: '/images/Snow.png',
      Light_sleet: '/images/Snow.png',
      Light_snow: '/images/Snow.png',
      Moderate_snow: '/images/Snow.png',
      Heavy_snow: '/images/Snow.png',
      Ice_pellets: '/images/Hail.png',
    }[formattedCondition] || '/images/Sunny.png'
  );
  return (
    {
      Sunny: '/images/Sunny.png',
      Partly_Cloudy: '/images/Cloudy_day.png',
      Overcast: '/images/Cloudy.png',
      Cloudy: '/images/Cloudy.png',
      Light_drizzle: '/images/Rain.png',
      Patchy_light_drizzle: '/images/Rain.png',
      Light_freezing_rain: '/images/Rain.png',
      Light_rain: '/images/Rain.png',
      Moderate_rain: '/images/Rain.png',
      Heavy_rain: '/images/Rain.png',
      Patchy_rain_nearby: './images/Rain.png',
      Light_rain_shower: '/images/Rain.png',
      Light_sleet_showers: '/images/Snow.png',
      Light_sleet: '/images/Snow.png',
      Light_snow: '/images/Snow.png',
      Moderate_snow: '/images/Snow.png',
      Heavy_snow: '/images/Snow.png',
      Ice_pellets: '/images/Hail.png',
    }[formattedCondition] || '/images/Sunny.png'
  );
}
export default WeatherIconMap;
