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

export function renderFiveDayForecast(dailyForecastList) {
  const forecastCards = document.querySelectorAll(".forecastCard");

  if (!dailyForecastList || dailyForecastList.length === 0) {
    console.error("Five-day forecast list is missing.");
    return;
  }

  forecastCards.forEach((card, index) => {
    const dayForecast = dailyForecastList[index];

    if (!dayForecast) {
      return;
    }

    card.textContent = dayForecast.date;
    card.dataset.date = dayForecast.date;
  });
}