// will call WeatherAssetMap in either WeatherAssetMap(condition, 'background') or WeatherAssetMap(condition, 'icon')
function WeatherAssetMap(condition, assetType) {
  const formattedCondition = condition.replace(/\s+/g, "_");

  return (
    {
      // Before was  background: `${process.env.PUBLIC_URL}/images/Sunny_day_background.png', icon: `${process.env.PUBLIC_URL}/images/Sunny.png', now it works in both development (/) and production
      Sunny: {
        background: `${process.env.PUBLIC_URL}/images/Sunny_day_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Sunny.png`,
      },
      Partly_cloudy: {
        background: `${process.env.PUBLIC_URL}/images/Cloudy_day_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Cloudy_day.png`,
      },
      Overcast: {
        background: `${process.env.PUBLIC_URL}/images/Cloudy_day_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Cloudy.png`,
      },
      Cloudy: {
        background: `${process.env.PUBLIC_URL}/images/Cloudy_day_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Cloudy.png`,
      },
      Light_drizzle: {
        background: `${process.env.PUBLIC_URL}/images/Rain_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Rain.png`,
      },
      Patchy_light_drizzle: {
        background: `${process.env.PUBLIC_URL}/images/Rain_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Rain.png`,
      },
      Light_freezing_rain: {
        background: `${process.env.PUBLIC_URL}/images/Rain_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Rain.png`,
      },
      Light_rain: {
        background: `${process.env.PUBLIC_URL}/images/Rain_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Rain.png`,
      },
      Moderate_rain: {
        background: `${process.env.PUBLIC_URL}/images/Rain_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Rain.png`,
      },
      Heavy_rain: {
        background: `${process.env.PUBLIC_URL}/images/Rain_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Rain.png`,
      },
      Patchy_rain_nearby: {
        background: `${process.env.PUBLIC_URL}/images/Rain_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Rain.png`,
      },
      Light_rain_shower: {
        background: `${process.env.PUBLIC_URL}/images/Rain_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Rain.png`,
      },
      Light_sleet_showers: {
        background: `${process.env.PUBLIC_URL}/images/Snow_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Snow.png`,
      },
      Light_sleet: {
        background: `${process.env.PUBLIC_URL}/images/Snow_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Snow.png`,
      },
      Light_snow: {
        background: `${process.env.PUBLIC_URL}/images/Snow_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Snow.png`,
      },
      Moderate_snow: {
        background: `${process.env.PUBLIC_URL}/images/Snow_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Snow.png`,
      },
      Heavy_snow: {
        background: `${process.env.PUBLIC_URL}/images/Snow_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Snow.png`,
      },
      Ice_pellets: {
        background: `${process.env.PUBLIC_URL}/images/Hail_background.png`,
        icon: `${process.env.PUBLIC_URL}/images/Hail.png`,
      },
    }[formattedCondition]?.[assetType] ||
    (assetType === "background"
      ? `${process.env.PUBLIC_URL}/images/Sunny_day_background.png`
      : `${process.env.PUBLIC_URL}/images/Sunny.png`)
  ); //'?.'(optional chaining) used to safely access deeply nested object properties without causing an error if a property along the chain is null or undefined
}
export default WeatherAssetMap;
