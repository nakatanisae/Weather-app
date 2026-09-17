import {loadFiveDayForecast, setupForecastCardClicks} from './forecast.js';

const latitude = 49.2827;
const longitude = -123.1207;

const params = {
  latitude: String(latitude),
  longitude: String(longitude),
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

    //Get current time(YYYY-MM-DD)
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    const currentDate = String(now.getDate()).padStart(2, "0");
  

    const todayString = `${currentYear}-${currentMonth}-${currentDate}`;
    
    ////Compare current date and the clicked date
    let searchTimeThreshold;
    const targetDate = selectedDate || todayString;

    if(targetDate === todayString){
      const currentHour = String(now.getHours()).padStart(2, "0");
      searchTimeThreshold = `${todayString}T${currentHour}:00`;
    } else {
      searchTimeThreshold = `${targetDate}T00:00`;
    }

    // const currentFormatTime = `${currentYear}-${currentMonth}-${currentDate}T${currentHour}:00`;
    let startIndex = times.findIndex((timeStr) => timeStr >= searchTimeThreshold);

    if (startIndex === -1) {
      startIndex = 0;
    }

    


    //Loop for each 3 hours
    const hourly3HoursData = [];

    for (let i = startIndex; i < times.length; i += 3) {

      if(!times[i].startsWith(targetDate)){
        break;
      }

      hourly3HoursData.push({
        time: times[i],
        temp: temp[i].toFixed(1),
        code: weatherCode[i],
      });
    }

    console.log("Data for 3 hours:", hourly3HoursData);

    //Show weather icon depending on the weather code
    function showWeatherIcon(code) {
      switch (true) {
        case code === 0:
          return "☀️";

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

    //DOM manipulation
    const container = document.getElementById("hourly-container");

    hourly3HoursData.forEach((item) => {
      const timeString = item.time.split("T")[1];

      const icon = showWeatherIcon(item.code);

      const card = document.createElement("div");
      card.className = "hourlyCard";
      card.innerHTML = `
                <p>${timeString}</p>
                <p>${icon}</p>
                <p>${item.temp}°C</p>`;

      container.appendChild(card);
    });
  } catch (error) {
    console.log("Error", error);
  }
}

async function initApp() {
  await loadFiveDayForecast(latitude, longitude);

  await fetchWeatherData();

  setupForecastCardClicks((selectedDate) => {
    console.log("Selected Date:", selectedDate);
    fetchWeatherData(selectedDate);
  })
}

initApp();
