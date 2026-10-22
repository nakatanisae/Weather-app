import CurrentWeather from './components/CurrentWeather'

function App() {
  return (
    <main>
      <CurrentWeather
        city="Vancouver"
        temperature={15}
        province="British Columbia"
        country="Canada"
        message="Today is a nice day!"
        feelsLike={13}
        rain={0}
        windSpeed={8}
      />

    </main>
  )
}

export default App