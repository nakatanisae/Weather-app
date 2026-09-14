export async function fetchFiveDayForecast(latitude, longitude) {
  try {
    const params = {
      latitude: String(latitude),
      longitude: String(longitude),
      daily: "weather_code,temperature_2m_max,temperature_2m_min",
      timezone: "auto",
      forecast_days: "5",
    };

    const searchParams = new URLSearchParams(params);

    const url = `https://api.open-meteo.com/v1/forecast?${searchParams}`;

    const response = await fetch(url);

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

function getWeatherIcon(weatherCode) {
  if (weatherCode === 0) {
    return "☀️";
  }

  if (weatherCode === 1 || weatherCode === 2) {
    return "🌤️";
  }

  if (weatherCode === 3) {
    return "☁️";
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return "🌫️";
  }

  if (
    weatherCode === 51 ||
    weatherCode === 53 ||
    weatherCode === 55 ||
    weatherCode === 56 ||
    weatherCode === 57
  ) {
    return "🌦️";
  }

  if (
    weatherCode === 61 ||
    weatherCode === 63 ||
    weatherCode === 65 ||
    weatherCode === 66 ||
    weatherCode === 67
  ) {
    return "🌧️";
  }

  if (
    weatherCode === 71 ||
    weatherCode === 73 ||
    weatherCode === 75 ||
    weatherCode === 77
  ) {
    return "🌨️";
  }

  if (
    weatherCode === 80 ||
    weatherCode === 81 ||
    weatherCode === 82
  ) {
    return "🌦️";
  }

  if (weatherCode === 85 || weatherCode === 86) {
    return "🌨️";
  }

  if (
    weatherCode === 95 ||
    weatherCode === 96 ||
    weatherCode === 99
  ) {
    return "⛈️";
  }

  return "☁️";
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

    const date = new Date(`${dayForecast.date}T00:00:00`);

    const weekday = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const monthDay = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const weatherIcon = getWeatherIcon(dayForecast.weather_code);

    card.innerHTML = `
      <span class="forecastWeekday">${weekday}</span>
      <span class="forecastDate">${monthDay}</span>
      <span class="forecastIcon">${weatherIcon}</span>
      <span class="forecastTemperature">
        ${dayForecast.temperature_2m_max}°C /
        ${dayForecast.temperature_2m_min}°C
      </span>
    `;

    card.dataset.date = dayForecast.date;
  });
}

export function setupForecastCardClicks(onDaySelected) {
  const forecastCards = document.querySelectorAll(".forecastCard");

  forecastCards.forEach((card) => {
    card.addEventListener("click", () => {
      const selectedDate = card.dataset.date;

      if (!selectedDate) {
        console.error("Selected forecast date is missing.");
        return;
      }

      onDaySelected(selectedDate);
    });
  });
}