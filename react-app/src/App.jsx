import CurrentWeather from './components/CurrentWeather'
import {dummyWeather} from './data/dummyWeather'
import  ForecastCard from './components/ForecastCard'

function App() {
  return (
    <main>
      <CurrentWeather
        city="Vancouver"
        province="British Columbia"
        country="Canada"
        {...dummyWeather.current}
      />
      <ForecastCard
        {...dummyWeather.daily[0]}
        isSelected={false}
        onClick={()=> console.log("clicked")}
        
      />

    </main>
  )
}

export default App