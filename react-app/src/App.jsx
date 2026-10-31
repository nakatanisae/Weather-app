import CurrentWeather from './components/CurrentWeather'
import {dummyWeather} from './data/dummyWeather'

function App() {
  return (
    <main>
      <CurrentWeather
        city="Vancouver"
        province="British Columbia"
        country="Canada"
        {...dummyWeather.current}
      />

    </main>
  )
}

export default App