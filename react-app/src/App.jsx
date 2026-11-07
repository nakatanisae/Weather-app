import CurrentWeather from './components/CurrentWeather'
import {dummyWeather} from './data/dummyWeather'
import  ForecastCard from './components/ForecastCard'
import  DailyForecast from './components/DailyForecast'
import  HourlyCard from './components/HourlyCard'

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
      <DailyForecast
        days={dummyWeather.daily}
        selectedDate="2026-10-28"
        onSelectDate={(date) => console.log(date)}
      />

      <HourlyCard
        {...dummyWeather.hourly[3]}
      />
    </main>
  )
}

export default App