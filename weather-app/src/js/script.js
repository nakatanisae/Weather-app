// example function name:
// function getFetchA(){}

// async function getPosts(){
//     const response = await fetch{}
//     return response.json();
// }

const testURL = "https://api.open-meteo.com/v1/forecast?latitude=49.2827&longitude=-123.1207&hourly=temperature_2m&timezone=auto";

async function fetchWeatherData() {
    try {
        const response = await fetch(testURL);
        const data = await response.json();

        console.log("Get data:", data);

        const times = data.hourly.time;
        const temp = data.hourly.temperature_2m;
        const hourly3HoursData = [];

        for (let i = 0; i < times.length; i += 3) {
            hourly3HoursData.push({
                time: times[i],
                temp: temp[i]
            });
        }

        console.log("Data for 3 hours:", hourly3HoursData);


        //DOM manipulation
        const container = document.getElementById("hourly-container");

        hourly3HoursData.forEach((item) => {
            const timeString = item.time.split("T")[1];

            const card = document.createElement("div");
            card.className = "hourly-card";
            card.innerHTML = `
                <p>${timeString}</p>
                <p>${item.temp}°C</p>`;

            container.appendChild(card);
        })

    } catch (error) {
        console.log("Error", error)
    }
}

fetchWeatherData()

