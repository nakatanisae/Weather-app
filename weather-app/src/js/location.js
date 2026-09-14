document.addEventListener("DOMContentLoaded", () => {
  main();
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
let dropDownResults;

// -------- Event listener

searchBtn.addEventListener("click", () => {
  selectLocation.classList.toggle("hidden");
});

inputLocation.addEventListener("input", async () => {
  const location = inputLocation.value.trim();
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

  //update button name
  actualLocation.textContent = dropDownResults[index].city;

  //update location info
  updateLocation(dropDownResults, index);
  selectLocation.classList.add("hidden");
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

    console.log("data results:", data.results);
    apiResults.innerHTML = addressAPI;

    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      apiResults.innerHTML = `Error: ${error.message}`;
    }
  }
}

async function updateLocation(place, index) {
  city.textContent = place[index].city;
  cityDetail.textContent = `${place[index].name}, ${place[index].administrativecode} - ${place[index].country}.`;
  coords.textContent = `Latitude: ${place[index].lat}, Longitude: ${place[index].lng}`;
}
