import CurrentWeather from './components/CurrentWeather'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import { dummyWeather, dummyLocations, dummyFavorites } from './data/dummyWeather'
import SearchBar from './components/SearchBar'
import FavoriteSelect from './components/FavoriteSelect'

function App() {
  return (
    <main>
      <div className='flex gap-4'>
        <FavoriteSelect
          favorites = {dummyFavorites}
          onSelect={(city) => console.log(city)}
        />

        <SearchBar
        results={dummyLocations}
        onSelectLocation={(location) => console.log(location)}
      />
      </div>
      

      

      <CurrentWeather
        city="Vancouver"
        province="British Columbia"
        country="Canada"
        {...dummyWeather.current}
        isFavorite={true}
        onToggleFavorite={() => console.log("toggle favorite")}
      />

      <DailyForecast
        days={dummyWeather.daily}
        selectedDate="2026-10-28"
        onSelectDate={(date) => console.log(date)}
      />

      <HourlyForecast
        hours={dummyWeather.hourly}
      />

      

    </main>
  )
}

export default App