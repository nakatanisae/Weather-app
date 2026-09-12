export function getFiveDayForecast(forecastData) {
  if (!forecastData || !forecastData.daily || !forecastData.daily.time) {
    console.error("Daily forecast data is missing.");
    return;
  }

  const fiveDayForecast = {};

  for (const key in forecastData.daily) {
    const value = forecastData.daily[key];

    fiveDayForecast[key] = Array.isArray(value)
      ? value.slice(0, 5)
      : value;
  }

  return fiveDayForecast;
}