import CurrentWeather from './components/CurrentWeather'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import { dummyWeather, dummyLocations, dummyFavorites } from './data/dummyWeather'
import SearchBar from './components/SearchBar'
import FavoriteSelect from './components/FavoriteSelect'
import AlertModal from './components/AlertModal'
import { useState } from 'react'

function App() {
  const [selectedDate, setSelectedDate] = useState(dummyWeather.daily[0].date)
  const [alertMessage, setAlertMessage] = useState("");
  const [location, setLocation] = useState(dummyFavorites[0])

  return (
    <main>
      {alertMessage && (
        <AlertModal message={alertMessage} onClose={() => setAlertMessage("")}/>
      )}

      <div className='flex gap-4'>
        <FavoriteSelect
          favorites = {dummyFavorites}
          onSelect={(city) => {
            const favorite = dummyFavorites.find((fav) =>fav.city===city);
            setLocation(favorite);
          }}
        />

        <SearchBar
        results={dummyLocations}
        onSelectLocation={(result) => 
          setLocation({
            city: result.city,
            province:result.administrative,
            country:result.country,
            lat:result.lat,
            lng:result.lng,
          })
        }
      />
      </div>
      
      <CurrentWeather
        city={location.city}
        province={location.province}
        country={location.country}
        {...dummyWeather.current}
        isFavorite={true}
        onToggleFavorite={() => console.log("toggle favorite")}
      />

      <DailyForecast
        days={dummyWeather.daily}
        selectedDate={selectedDate}
        onSelectDate={(date) => setSelectedDate(date)}
      />

      <HourlyForecast
        hours={dummyWeather.hourly.filter((hour) => 
          (hour.time.startsWith(selectedDate))
          
        )}
      />
    </main>
  )
}

export default App