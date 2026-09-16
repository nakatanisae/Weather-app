document.addEventListener("DOMContentLoaded", () => {
  main();
  getLocation();
});

const searchBtn = document.getElementById("searchBtn");
const selectLocation = document.getElementById("selectLocation");
const inputLocation = document.getElementById("searchLocation");
const apiResults = document.getElementById("apiResult");
const actualLocation = document.getElementById("actualLocation");
const city = document.getElementById("cityName");
const cityDetail = document.getElementById("cityDetail");
const coords = document.getElementById("cityCoords");
const tempCelsius = document.getElementById("temperatureCelsius");
const starOutlined = document.getElementById("starOutlined");
const starFilled = document.getElementById("starFilled");
const selectFavLocal = document.getElementById("favoriteLocation");
const title = document.getElementById("cityTitle");

let dropDownResults;
let favorites = [];

let updatedPlace = {
  city: "Vancouver",
  region: "British Columbia - Canada.",
  latitude: 49.2608724,
  longitude: -123.1139529,
};

// -------- Event listener

searchBtn.addEventListener("click", () => {
  selectLocation.classList.toggle("hidden");
});

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

  actualLocation.textContent = dropDownResults[index].city;

  updatedPlace = updateLocation(dropDownResults, index);
  selectLocation.classList.add("hidden");
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

// -------- Functions

async function main() {
  console.log("main thread running");
}

async function getLocation() {
  console.log("Getting location from API");
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
    console.log("Location retrieved successfully");

    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      apiResults.innerHTML = `Error: ${error.message}`;
    }
  }
}

function updateLocation(place, index) {
  console.log("Updating location information");

  city.textContent = place[index].city;
  cityDetail.textContent = `${place[index].name}, ${place[index].administrativecode} - ${place[index].country}.`;
  coords.textContent = `Latitude: ${place[index].lat}, Longitude: ${place[index].lng}`;

  console.log("Location information updated");
  return {
    city: place[index].city,
    region: `${place[index].name}, ${place[index].administrativecode} - ${place[index].country}.`,
    latitude: place[index].lat,
    longitude: place[index].lng,
  };
}

function addFavoriteLocationToLocalStorage() {
  console.log(
    "Adding favorite location to local storage and updating favorite location selector",
  );

  // change star icon
  starOutlined?.classList.toggle("hidden");
  starFilled?.classList.toggle("hidden");

  //clicked on favorite star
  if (starOutlined.classList.contains("hidden")) {
    if (!updatedPlace.city || !updatedPlace.region) {
      console.error("could not add this city to favorites");
    } else {
      favorites.push(updatedPlace);
    }

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

  console.log(
    "Favorite location added to local storage and favorite location selector updated",
  );
}

function removeFavoriteLocationFromLocalStorage() {
  console.log(
    "Removing favorite location from local storage and from favorite location selector ",
  );

  // favorite star not selected
  if (starFilled.classList.contains("hidden")) {
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
  console.log(
    "Favorite location removed from local storage and favorite location selector",
  );
}

function updateFromFavorite(selectedCity) {
  console.log("Updating location from Favorites");

  const favoriteCity = favorites.filter(
    (favorite) => favorite.city === selectedCity,
  );

  city.textContent = favoriteCity[0].city;
  cityDetail.textContent = favoriteCity[0].region;
  coords.textContent = `Latitude: ${favoriteCity[0].latitude}, Longitude: ${favoriteCity[0].longitude}`;

  console.log("New location updated successfully");
}
