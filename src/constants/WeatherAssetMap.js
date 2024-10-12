// will call WeatherAssetMap in either WeatherAssetMap(condition, 'background') or WeatherAssetMap(condition, 'icon')
function WeatherAssetMap(condition, assetType) {
  const formattedCondition = condition.replace(/\s+/g, '_');

  return (
    {
      Sunny: { background: '/images/Sunny_day_background.png', icon: '/images/Sunny.png' },
      Partly_cloudy: { background: '/images/Cloudy_day_background.png', icon: '/images/Cloudy_day.png' },
      Overcast: { background: '/images/Cloudy_day_background.png', icon: '/images/Cloudy.png' },
      Cloudy: { background: '/images/Cloudy_day_background.png', icon: '/images/Cloudy.png' },
      Light_drizzle: { background: '/images/Rain_background.png', icon: '/images/Rain.png' },
      Patchy_light_drizzle: { background: '/images/Rain_background.png', icon: '/images/Rain.png' },
      Light_freezing_rain: { background: '/images/Rain_background.png', icon: '/images/Rain.png' },
      Light_rain: { background: '/images/Rain_background.png', icon: '/images/Rain.png' },
      Moderate_rain: { background: '/images/Rain_background.png', icon: '/images/Rain.png' },
      Heavy_rain: { background: '/images/Rain_background.png', icon: '/images/Rain.png' },
      Patchy_rain_nearby: { background: '/images/Rain_background.png', icon: '/images/Rain.png' },
      Light_rain_shower: { background: '/images/Rain_background.png', icon: '/images/Rain.png' },
      Light_sleet_showers: { background: '/images/Snow_background.png', icon: '/images/Snow.png' },
      Light_sleet: { background: '/images/Snow_background.png', icon: '/images/Snow.png' },
      Light_snow: { background: '/images/Snow_background.png', icon: '/images/Snow.png' },
      Moderate_snow: { background: '/images/Snow_background.png', icon: '/images/Snow.png' },
      Heavy_snow: { background: '/images/Snow_background.png', icon: '/images/Snow.png' },
      Ice_pellets: { background: '/images/Hail_background.png', icon: '/images/Hail.png' },
    }[formattedCondition]?.[assetType] ||
    (assetType === 'background' ? '/images/Sunny_day_background.png' : '/images/Sunny.png')
  ); //'?.'(optional chaining) used to safely access deeply nested object properties without causing an error if a property along the chain is null or undefined
}
export default WeatherAssetMap;
