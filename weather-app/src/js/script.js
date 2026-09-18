import { loadFiveDayForecast, setupForecastCardClicks } from "./forecast.js";

const latitude = 49.2827;
const longitude = -123.1207;

const params = {
  latitude: String(latitude),
  longitude: String(longitude),
  daily: "sunrise,sunset",
  hourly: "temperature_2m,weather_code",
  timezone: "auto",
};

const searchParams = new URLSearchParams(params);

const url = `https://api.open-meteo.com/v1/forecast?${searchParams}`;

async function fetchWeatherData(selectedDate = null) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Get data:", data);

    const times = data.hourly.time;
    const temp = data.hourly.temperature_2m;
    const weatherCode = data.hourly.weather_code;

    //Get current date(YYYY-MM-DD)
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    const currentDate = String(now.getDate()).padStart(2, "0");

    const todayString = `${currentYear}-${currentMonth}-${currentDate}`;

    // separate data for each 3 hours
    const hourly3HData = [];
    for (let i = 0; i < times.length; i = i + 3) {
      hourly3HData.push({
        time: times[i],
        temp: temp[i].toFixed(1),
        code: weatherCode[i],
      });
    }

    ////Compare current date and the clicked date
    let searchTimeThreshold;
    const targetDate = selectedDate || todayString;

    if (targetDate === todayString) {
      const currentHour = String(now.getHours()).padStart(2, "0");
      searchTimeThreshold = `${todayString}T${currentHour}:00`;
    } else {
      searchTimeThreshold = `${targetDate}T00:00`;
    }

    // let startIndex = times.findIndex(
    //   (timeStr) => timeStr >= searchTimeThreshold,
    // );

    // if (startIndex === -1) {
    //   startIndex = 0;
    // }

    //Loop for each 3 hours
    // const hourly3HoursData = [];
    // const maxCards = 8;

    // for (
    //   let i = startIndex;
    //   i < times.length && hourly3HoursData.length < maxCards;
    //   i += 3
    // ) {
    //   hourly3HoursData.push({
    //     time: times[i],
    //     temp: temp[i].toFixed(1),
    //     code: weatherCode[i],
    //   });
    // }

    // console.log("Data for 3 hours:", hourly3HoursData);

    //Show weather icon depending on the weather code
    function showWeatherIcon(code) {
      switch (true) {
        case code === 0:
          return "☀️";

        case code === 101:
          return "🌙";

        case code >= 1 && code <= 3:
          return "⛅";

        case (code >= 51 && code <= 67) || (code >= 80 && code <= 82):
          return "🌧️";

        case (code >= 71 && code <= 77) || (code >= 85 && code <= 86):
          return "❄️";

        default:
          return "☁️";
      }
    }

    const selectedData = hourly3HData.filter((timestamp) =>
      timestamp.time.includes(targetDate),
    );

    const sunrise = data.daily.sunrise;
    const sunset = data.daily.sunset;
    let sunriseTimestamp = "";
    let sunsetTimestamp = "";

    const target = selectedDate ?? todayString;
    sunriseTimestamp = sunrise.find((time) => time.split("T")[0] === target);
    sunsetTimestamp = sunset.find((time) => time.split("T")[0] === target);

    for (let item of selectedData) {
      if (item.time < sunriseTimestamp || item.time > sunsetTimestamp) {
        item.code = 101;
      }
    }

    //DOM manipulation
    const container = document.getElementById("hourly-container");

    container.innerHTML = "";

    selectedData.forEach((item) => {
      const [datePart, timeString] = item.time.split("T");
      const [year, month, day] = datePart.split("-");
      const formattedDate = `${parseInt(month)}/${parseInt(day)}`;
      const icon = showWeatherIcon(item.code);
      const hour = Number(timeString.slice(0, 2)) + 3;
      const hourStr = hour < 10 ? "0" + String(hour) : String(hour);
      const minuteStr = timeString.slice(2);

      //show remaining hours
      if (todayString && item.time >= searchTimeThreshold) {
        const card = document.createElement("div");
        card.className = "hourlyCard";
        card.innerHTML = `
                <p class="hourlyDate">${formattedDate}</p>
                <p class="hourlyTime">${timeString}-${hourStr}${minuteStr}</p>
                <p class="icon3Hour">${icon}</p>
                <p>${item.temp}°C</p>`;

        container.appendChild(card);
        return;
      }

      //show all 3 hour range
      if (selectedDate !== null && selectedDate !== todayString) {
        const card = document.createElement("div");
        card.className = "hourlyCard";
        card.innerHTML = `
                <p class="hourlyDate">${formattedDate}</p>
                <p class="hourlyTime">${timeString}-${hourStr}${minuteStr}</p>
                <p class="icon3Hour">${icon}</p>
                <p>${item.temp}°C</p>`;

        container.appendChild(card);
      }
    });
  } catch (error) {
    console.log("Error", error);
  }
}

export function changeTemperatureColor(code) {
  switch (true) {
    //sunny
    case code === 0:
      return "#ffa62b";

    // cloudy
    case code > 0 && code <= 3:
      return "#aaaaaa";

    // rain
    case (code >= 51 && code <= 67) || (code >= 80 && code <= 82):
      return "#16697a";

    default:
      return "#6c757d";
  }
}

async function initApp() {
  await loadFiveDayForecast(latitude, longitude);

  await fetchWeatherData();

  setupForecastCardClicks((selectedDate) => {
    console.log("Selected Date:", selectedDate);
    fetchWeatherData(selectedDate);
  });
}

initApp();
