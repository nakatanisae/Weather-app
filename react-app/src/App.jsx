import CurrentWeather from './components/CurrentWeather'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import { dummyWeather, dummyLocations, dummyFavorites } from './data/dummyWeather'
import SearchBar from './components/SearchBar'
import FavoriteSelect from './components/FavoriteSelect'

function App() {
  return (
    <main>
      <SearchBar
        results={dummyLocations}
        onSelectLocation={(location) => console.log(location)}
      />

      <CurrentWeather
        city="Vancouver"
        province="British Columbia"
        country="Canada"
        {...dummyWeather.current}
      />

      <DailyForecast
        days={dummyWeather.daily}
        selectedDate="2026-10-28"
        onSelectDate={(date) => console.log(date)}
      />

      <HourlyForecast
        hours={dummyWeather.hourly}
      />

      <FavoriteSelect
        favorites = {dummyFavorites}
        onSelect={(city) => console.log(city)}
      />

    </main>
  )
}

export default App