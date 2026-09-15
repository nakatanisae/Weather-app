// document.addEventListener("DOMContentLoaded", () => {
//   main();
// });

// async function main() {
//   console.log("main thread running");
//   //organize your js file(s)
// }

// example function name:
// function getFetchA(){}

// async function getPosts(){
//     const response = await fetch{}
//     return response.json();
// }

const testURL = "https://api.open-meteo.com/v1/forecast?latitude=49.2827&longitude=-123.1207&hourly=temperature_2m&timezone=auto";

async function fetchWeatherData(){
    try{
        const response = await fetch(testURL);
        const data = await response.json();

        console.log("Get data:", data);

        const times = data.hourly.time;
        const temp = data.hourly.temperature_2m;
        const hourly3HoursData = [];

        for(let i = 0; i < times.length; i +=3){
            hourly3HoursData.push({
                time: times[i],
                temp: temp[i]
            });
        }

        console.log("Data for 3 hours:" ,hourly3HoursData);

    } catch(error){
        console.log("Error", error)
    }
}

fetchWeatherData()
