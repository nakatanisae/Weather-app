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

export function createDailyForecastList(fiveDayForecast) {
  if (!fiveDayForecast || !fiveDayForecast.time) {
    console.error("Five-day forecast data is missing.");
    return [];
  }

  return fiveDayForecast.time.map((date, index) => {
    const dayForecast = { date };

    for (const key in fiveDayForecast) {
      if (key !== "time" && Array.isArray(fiveDayForecast[key])) {
        dayForecast[key] = fiveDayForecast[key][index];
      }
    }

    return dayForecast;
  });
}