// Dummy data
export const dummyWeather = {
  current: { temperature: 15, feelsLike: 13, rain: 0, windSpeed: 8, weatherCode: 0, isDay: true },
  daily: [
    { date: "2026-10-27", weatherCode: 0, minTemp: 8, maxTemp: 14 },
    { date: "2026-10-28", weatherCode: 3, minTemp: 7, maxTemp: 12 },
    { date: "2026-10-29", weatherCode: 61, minTemp: 6, maxTemp: 10 },
    { date: "2026-10-30", weatherCode: 71, minTemp: -1, maxTemp: 3 },
    { date: "2026-10-31", weatherCode: 95, minTemp: 5, maxTemp: 9 },
  ],
  hourly: [
    { time: "2026-10-27T00:00", temp: 8.4, weatherCode: 101 },
    { time: "2026-10-27T03:00", temp: 8.0, weatherCode: 101 },
    { time: "2026-10-27T06:00", temp: 8.3, weatherCode: 101 },
    { time: "2026-10-27T09:00", temp: 10.2, weatherCode: 2 },
    { time: "2026-10-27T12:00", temp: 13.1, weatherCode: 0 },
    { time: "2026-10-27T15:00", temp: 14.0, weatherCode: 0 },
    { time: "2026-10-27T18:00", temp: 11.5, weatherCode: 101 },
    { time: "2026-10-27T21:00", temp: 9.6, weatherCode: 101 },
  ],
}
