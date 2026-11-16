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
    { time: "2026-10-28T00:00", temp: 8.1, weatherCode: 101 },
    { time: "2026-10-28T03:00", temp: 7.4, weatherCode: 101 },
    { time: "2026-10-28T06:00", temp: 7.0, weatherCode: 101 },
    { time: "2026-10-28T09:00", temp: 9.0, weatherCode: 3 },
    { time: "2026-10-28T12:00", temp: 11.3, weatherCode: 3 },
    { time: "2026-10-28T15:00", temp: 12.0, weatherCode: 2 },
    { time: "2026-10-28T18:00", temp: 10.1, weatherCode: 101 },
    { time: "2026-10-28T21:00", temp: 8.6, weatherCode: 101 },
    { time: "2026-10-29T00:00", temp: 7.8, weatherCode: 101 },
    { time: "2026-10-29T03:00", temp: 6.9, weatherCode: 101 },
    { time: "2026-10-29T06:00", temp: 6.2, weatherCode: 101 },
    { time: "2026-10-29T09:00", temp: 7.5, weatherCode: 61 },
    { time: "2026-10-29T12:00", temp: 9.4, weatherCode: 63 },
    { time: "2026-10-29T15:00", temp: 10.0, weatherCode: 61 },
    { time: "2026-10-29T18:00", temp: 8.3, weatherCode: 101 },
    { time: "2026-10-29T21:00", temp: 6.7, weatherCode: 101 },
    { time: "2026-10-30T00:00", temp: 1.2, weatherCode: 101 },
    { time: "2026-10-30T03:00", temp: 0.0, weatherCode: 101 },
    { time: "2026-10-30T06:00", temp: -0.8, weatherCode: 101 },
    { time: "2026-10-30T09:00", temp: 0.9, weatherCode: 71 },
    { time: "2026-10-30T12:00", temp: 2.6, weatherCode: 73 },
    { time: "2026-10-30T15:00", temp: 3.0, weatherCode: 71 },
    { time: "2026-10-30T18:00", temp: 1.5, weatherCode: 101 },
    { time: "2026-10-30T21:00", temp: 0.4, weatherCode: 101 },
    { time: "2026-10-31T00:00", temp: 5.9, weatherCode: 101 },
    { time: "2026-10-31T03:00", temp: 5.3, weatherCode: 101 },
    { time: "2026-10-31T06:00", temp: 5.0, weatherCode: 101 },
    { time: "2026-10-31T09:00", temp: 6.8, weatherCode: 3 },
    { time: "2026-10-31T12:00", temp: 8.5, weatherCode: 95 },
    { time: "2026-10-31T15:00", temp: 9.0, weatherCode: 95 },
    { time: "2026-10-31T18:00", temp: 7.2, weatherCode: 101 },
    { time: "2026-10-31T21:00", temp: 6.1, weatherCode: 101 },
  ],
}

// Dummy search results (same keys as the PlaceKit response)
export const dummyLocations = [
  { name: "Toronto", city: "Toronto", administrative: "Ontario", country: "Canada", lat: 43.6534817, lng: -79.3839347 },
  { name: "Toronto Island", city: "Toronto", administrative: "Ontario", country: "Canada", lat: 43.6228, lng: -79.3784 },
  { name: "Vancouver", city: "Vancouver", administrative: "British Columbia", country: "Canada", lat: 49.2608724, lng: -123.1139529 },
]

// Dummy favorite places
export const dummyFavorites = [
  { city: "Vancouver", region: "British Columbia - Canada", lat: 49.2608724, lng: -123.1139529 },
  { city: "Toronto", region: "Ontario - Canada", lat: 43.6534817, lng: -79.3839347 },
  { city: "Montreal", region: "Quebec - Canada", lat: 45.5031824, lng: -73.5698065 },
]
