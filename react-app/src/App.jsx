import CurrentWeather from './components/CurrentWeather'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import { dummyWeather, dummyLocations, dummyFavorites } from './data/dummyWeather'
import SearchBar from './components/SearchBar'
import FavoriteSelect from './components/FavoriteSelect'
import AlertModal from './components/AlertModal'
import { useState } from 'react'

function App() {
  const [selectedDate, setSelectedDate] = useState(dummyWeather.daily[0].date);
  const [alertMessage, setAlertMessage] = useState("");
  const [location, setLocation] = useState(dummyFavorites[0]);
  const [favorites, setFavorites] = useState(dummyFavorites);

  // derived from state, so not its own state
  const isFavorite = favorites.some((fav) => fav.city === location.city);

  function handleToggleFavorite() {
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.city !== location.city));
    } else if (!location.city || !location.province) {
      setAlertMessage("You can't add this city to favorites!");
    } else {
      setFavorites([...favorites, location]);
    }
  }

  return (
    <main>
      {alertMessage && (
        <AlertModal message={alertMessage} onClose={() => setAlertMessage("")}/>
      )}

      <div className='flex gap-4'>
        <FavoriteSelect
          favorites = {favorites}
          onSelect={(city) => {
            const favorite = favorites.find((fav) =>fav.city===city);
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
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
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