document.addEventListener("DOMContentLoaded", () => {
  main();
});

const searchBtn = document.getElementById("searchBtn");
const selectLocation = document.getElementById("selectLocation");
const inputLocation = document.getElementById("searchLocation");
const apiResults = document.getElementById("apiResult");
const city = document.getElementById("cityName");
const cityDetail = document.getElementById("cityDetail");
const coords = document.getElementById("cityCoords");
const tempCelsius = document.getElementById("temperatureCelsius");
const starOutlined = document.getElementById("starOutlined");
const starFilled = document.getElementById("starFilled");
const selectFavLocal = document.getElementById("favoriteLocation");
const title = document.getElementById("cityTitle");
const alertFavoriteBox = document.getElementById("customAlertBox");
const alertMessageFavorite = document.getElementById("alertMessage");
const closeAlertFavorite = document.getElementById("closeAlert");

let dropDownResults;
let favorites = [];

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
  const selectedCity =
    e.target.value[0].toUpperCase() + e.target.value.slice(1);

  updateFromFavorite(selectedCity);
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
  const API_KEY = "pk_MQu55RAWJ5QJHyqt8phhWF/u5icKNPaYhNLMGXC8Ts4=";

  try {
    const payload = {
      query: inputLocation.value,
      types: ["city", "street"],
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
      apiResults.innerHTML = `Error: ${error.message}`;
    }
  }
}

function updateLocation(place, index) {
  city.textContent = place[index].city;
  cityDetail.textContent = `${place[index].name}, ${place[index].administrativecode} - ${place[index].country}.`;
  coords.textContent = `Latitude: ${place[index].lat}, Longitude: ${place[index].lng}`;

  return {
    city: place[index].city,
    region: `${place[index].name}, ${place[index].administrativecode} - ${place[index].country}.`,
    latitude: place[index].lat,
    longitude: place[index].lng,
  };
}

function addFavoriteLocationToLocalStorage() {
  // change star icon
  starOutlined?.classList.toggle("hidden");
  starFilled?.classList.toggle("hidden");

  //clicked on favorite star
  if (starOutlined.classList.contains("hidden")) {
    if (!city.textContent || !cityDetail.textContent) {
      alertFavoriteBox.classList.remove("hidden");
      alertMessageFavorite.innerHTML = "You can't add this city to favorites!";
      alertFavoriteBox.style.display = "block";

      starFilled.classList.add("hidden");
      starOutlined.classList.remove("hidden");
    } else {
      console.log("entrei aqui");
      let newFavorite = {
        city: city.textContent,
        region: cityDetail.textContent,
        coords: coords.textContent,
      };
      favorites.push(newFavorite);

      localStorage.setItem("favLocal", JSON.stringify(favorites));

      //returns all HTML code from first element child
      const defaultOption = selectFavLocal.firstElementChild.outerHTML;
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
}

function removeFavoriteLocationFromLocalStorage() {
  // favorite star not selected
  if (starFilled.classList.contains("hidden")) {
    if (!city.textContent) {
      return;
    }
    const dataLocalStorage = localStorage.getItem("favLocal");

    if (dataLocalStorage) {
      const places = JSON.parse(dataLocalStorage);
      const remainingPlaces = places.filter(
        (place) => place.city !== city.textContent,
      );

      favorites = remainingPlaces;
      localStorage.setItem("favLocal", JSON.stringify(remainingPlaces));

      //update favorite location selector
      const removedCity = document.querySelector(
        `#favoriteLocation option[value="${city.textContent.toLowerCase()}"]`,
      );
      removedCity.remove();
    }
  }
}

function updateFromFavorite(selectedCity) {
  const favoriteCity = favorites.filter(
    (favorite) => favorite.city === selectedCity,
  );

  city.textContent = favoriteCity[0].city;
  cityDetail.textContent = favoriteCity[0].region;
  coords.textContent = `Latitude: ${favoriteCity[0].latitude}, Longitude: ${favoriteCity[0].longitude}`;
}
