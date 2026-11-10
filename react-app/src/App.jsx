import CurrentWeather from './components/CurrentWeather'
import {dummyWeather} from './data/dummyWeather'
import  DailyForecast from './components/DailyForecast'
import  HourlyForecast from './components/HourlyForecast'

function App() {
  return (
    <main>
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

    </main>
  )
}

export default App