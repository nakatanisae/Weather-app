export async function fetchFiveDayForecast(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
    );

    if (!response.ok) {
      throw new Error(
        `Forecast fetch failed: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Unable to fetch five-day forecast:", error);
    return null;
  }
}


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