import { fetchFiveDayForecast } from "./forecast.js";
import { changeTemperatureColor } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  main();

  // geolocation pop up
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      successGettingCoords,
      errorGettingCoords,
    );
  }

  // show favorite place after refresh page
  addFavoriteToSelector();
});

const inputLocation = document.getElementById("searchLocation");
const apiResults = document.getElementById("apiResult");
const city = document.getElementById("cityName");
const cityDetail = document.getElementById("cityDetail");
const coords = document.getElementById("cityCoords");
const starOutlined = document.getElementById("starOutlined");
const starFilled = document.getElementById("starFilled");
const selectFavLocal = document.getElementById("favoriteLocation");
const title = document.getElementById("cityTitle");
const alertFavoriteBox = document.getElementById("customAlertBox");
const alertMessageFavorite = document.getElementById("alertMessage");
const closeAlertFavorite = document.getElementById("closeAlert");
const temperatureC = document.getElementById("temperatureCelsius");
const apparentTemp = document.getElementById("apparentTemp");
const rain = document.getElementById("rain");
const windSpeed = document.getElementById("windSpeed");
const dayMessage = document.getElementById("dayMessage");

const API_KEY = "pk_MQu55RAWJ5QJHyqt8phhWF/u5icKNPaYhNLMGXC8Ts4=";
const dataLS = localStorage.getItem("favLocal");
let favorites = dataLS ? JSON.parse(dataLS) : [];

let dropDownResults;

// -------- Event listener

inputLocation.addEventListener("input", async () => {
  const location = inputLocation.value.trim();

  // clean result and hide apiResults element
  if (location.length < 3) {
    apiResults.innerHTML = "";
    apiResults.classList.add("hidden");
    return;
  }

  dropDownResults = await getLocation();
});

apiResults.addEventListener("click", (e) => {
  const target = e.target.closest("p[data-index]"); // look for the closest data-index inside <p> tag
  const index = target.dataset.index;

  updateLocation(dropDownResults, index);

  apiResults.classList.add("hidden");
  starOutlined.classList.remove("hidden");
  starFilled.classList.add("hidden");
});

title.addEventListener("click", () => {
  addFavoriteLocationToLocalStorage();
  removeFavoriteLocationFromLocalStorage();
});

selectFavLocal.addEventListener("change", (e) => {
  starFilled.classList.remove("hidden");
  starOutlined.classList.add("hidden");

  const selectedLocal = e.target.options[e.target.selectedIndex];
  const selectedPlace = createCityName(selectedLocal.value);
  updateFromFavorite(selectedPlace, favorites);
});

closeAlertFavorite.addEventListener("click", () => {
  alertFavoriteBox.style.display = "none";
});

// -------- Functions

async function main() {
  console.log("main thread running");
}

async function getLocation() {
  const BASE_URL = "https://api.placekit.co/search";

  try {
    const payload = {
      query: inputLocation.value,
      types: ["city", "street", "country"],
    };

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "x-placekit-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    apiResults.classList.remove("hidden");
    let index = 0;
    const addressAPI = data.results
      .map(
        (location) =>
          `<p data-index=${index++} class="bgResult">${location.name}, ${location.city} - ${location.administrative}</p>`,
      )
      .join("");

    apiResults.innerHTML = addressAPI;

    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      apiResults.innerHTML = `Error fetching location: ${error.message}`;
    }
  }
}

async function updateLocation(place, index) {
  city.textContent = place[index].city;
  cityDetail.textContent = `${place[index].name}, ${place[index].administrativecode} - ${place[index].country}.`;
  coords.textContent = `Latitude: ${place[index].lat.toFixed(7)}, Longitude: ${place[index].lng.toFixed(7)}`;

  const weatherResult = await fetchFiveDayForecast(
    place[index].lat,
    place[index].lng,
  );
  console.log("weather:", weatherResult);
  temperatureC.textContent = weatherResult.current.temperature_2m + "ºC";

  if (!weatherResult.current.is_day) {
    temperatureC.style.color = "#023047";
  } else {
    temperatureC.style.color = changeTemperatureColor(
      weatherResult.current.weather_code,
    );
  }

  apparentTemp.textContent = weatherResult.current.apparent_temperature;
  rain.textContent = weatherResult.current.rain;
  windSpeed.textContent = weatherResult.current.wind_speed_10m;
  dayMessage.textContent = showDayMessage(weatherResult.current.weather_code);
}

function addFavoriteLocationToLocalStorage() {
  // change star icon
  starOutlined?.classList.toggle("hidden");
  starFilled?.classList.toggle("hidden");

  //clicked on favorite star
  if (starOutlined.classList.contains("hidden")) {
    //show alert message
    if (!city.textContent || !cityDetail.textContent) {
      alertFavoriteBox.classList.remove("hidden");
      alertMessageFavorite.innerHTML = "You can't add this city to favorites!";
      alertFavoriteBox.style.display = "block";

      starFilled.classList.add("hidden");
      starOutlined.classList.remove("hidden");
    } else {
      let newFavorite = {
        city: city.textContent,
        region: cityDetail.textContent,
        coords: coords.textContent,
      };

      const cityExists = favorites.some((fav) => fav.city === newFavorite.city);
      if (!cityExists) {
        favorites.push(newFavorite);
        localStorage.setItem("favLocal", JSON.stringify(favorites));
      }

      addFavoriteToSelector();
    }
  }
}

function addFavoriteToSelector() {
  const defaultOption = selectFavLocal.firstElementChild.outerHTML;

  if (favorites.length > 0) {
    let index = 0;
    selectFavLocal.innerHTML =
      defaultOption +
      favorites
        .map(
          (place) =>
            `<option data-index=${index++} value="${place.city.toLowerCase()}">${place.city}</option>`,
        )
        .join("");
  }
}

function removeFavoriteLocationFromLocalStorage() {
  // favorite star not selected
  if (starFilled.classList.contains("hidden")) {
    favorites = favorites.filter((place) => place.city !== city.textContent);
    localStorage.setItem("favLocal", JSON.stringify(favorites));

    //update favorite location selector
    const removedCity = document.querySelector(
      `#favoriteLocation option[value="${city.textContent.toLowerCase()}"]`,
    );
    removedCity.remove();
  }
}

function updateFromFavorite(selectedCity) {
  const favoriteCity = favorites.filter(
    (favorite) => favorite.city === selectedCity,
  );

  city.textContent = favoriteCity[0].city;
  cityDetail.textContent = favoriteCity[0].region;
  coords.textContent = favoriteCity[0].coords;
}

function successGettingCoords(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;

  updateLocationFromCoords(lat, long);
}

async function updateLocationFromCoords(latitude, longitude) {
  const BASE_URL_COORDS = "https://api.placekit.co/reverse";
  try {
    const payloadCoords = {
      coordinates: `${latitude}, ${longitude}`,
      types: ["city", "street"],
    };

    const response = await fetch(BASE_URL_COORDS, {
      method: "POST",
      headers: {
        "x-placekit-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadCoords),
    });

    const data = await response.json();
    updateLocation(data.results, 0);
  } catch (error) {
    if (error instanceof Error) {
      apiResults.innerHTML = `Error trying to convert coordinates: ${error.message}`;
    }
  }
}

function errorGettingCoords(error) {
  if (error.code === error.PERMISSION_DENIED) {
    console.log("Localization permission denied by user");

    // add default location
    city.textContent = "Vancouver";
    cityDetail.textContent = "British Columbia - Canada.";
    coords.textContent = "Latitude: 49.2608724, Longitude: -123.1139529";
  } else {
    console.log("Not possible obtain localization");
  }
}

function createCityName(place) {
  let separator = place.includes("-") ? "-" : place.includes(" ") ? " " : "";

  if (separator === "") {
    return place[0].toUpperCase() + place.slice(1);
  } else {
    const splittedCity = place.split(separator);
    const selectedCity = splittedCity
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(separator);

    return selectedCity;
  }
}

function showDayMessage(code) {
  switch (true) {
    //sunny
    case code === 0:
      return "It's a beautiful day to appreciate flowers!";

    // cloudy
    case code > 0 && code <= 3:
      return "It's a perfect day to watch an orchestra presentation!";

    // rain
    case (code >= 51 && code <= 67) || (code >= 80 && code <= 82):
      return "Let's make popcorn and watch a movie today!";

    default:
      return "It's a beautiful day! Enjoy it!";
  }
}
