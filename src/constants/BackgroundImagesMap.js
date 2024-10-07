function BackgroundImagesMap(condition) {
  console.log('condition', condition);
  const formattedCondition = condition.replace(/\s+/g, '_');
  console.log('formattedCondition', formattedCondition);

  return (
    {
      Sunny: '/images/Sunny_day_background.png',
      Partly_Cloudy: '/images/Cloudy_day_background.png',
      Overcast: '/images/Cloudy_day_background.png',
      Cloudy: '/images/Cloudy_day_background.png',
      Light_drizzle: '/images/Rain_background.png',
      Patchy_light_drizzle: '/images/Rain_background.png',
      Light_freezing_rain: '/images/Rain_background.png',
      Light_rain: '/images/Rain_background.png',
      Moderate_rain: '/images/Rain_background.png',
      Heavy_rain: '/images/Rain_background.png',
      Patchy_rain_nearby: './images/Rain_background.png',
      Light_rain_shower: '/images/Rain_background.png',
      Light_sleet_showers: '/images/Snow_background.png',
      Light_sleet: '/images/Snow_background.png',
      Light_snow: '/images/Snow_background.png',
      Moderate_snow: '/images/Snow_background.png',
      Heavy_snow: '/images/Snow_background.png',
      Ice_pellets: '/images/Hail_background.png',
    }[formattedCondition] || '/images/Sunny_day_background.png'
  );
}
export default BackgroundImagesMap;

// console.log(
//   'return url',
//   {
//     Sunny: '/images/Sunny_day_background.png',
//     Partly_Cloudy: '/images/Cloudy_day_background.png',
//     Overcast: '/images/Cloudy_day_background.png',
//     Cloudy: '/images/Cloudy_day_background.png',
//     Light_drizzle: '/images/Rain_background.png',
//     Patchy_light_drizzle: '/images/Rain_background.png',
//     Light_freezing_rain: '/images/Rain_background.png',
//     Light_rain: '/images/Rain_background.png',
//     Moderate_rain: '/images/Rain_background.png',
//     Heavy_rain: '/images/Rain_background.png',
//     Patchy_rain_nearby: '/images/Rain_background.png',
//     Light_rain_shower: '/images/Rain_background.png',
//     Light_sleet_showers: '/images/Snow_background.png',
//     Light_sleet: '/images/Snow_background.png',
//     Light_snow: '/images/Snow_background.png',
//     Moderate_snow: '/images/Snow_background.png',
//     Heavy_snow: '/images/Snow_background.png',
//     Ice_pellets: '/images/Hail_background.png',
//   }[formattedCondition] || '/images/Sunny_day_background.png'
// );
