import CurrentWeather from './components/CurrentWeather'

function App() {
  return (
    <main>
      <CurrentWeather
        city="Vancouver"
        temperature={15}
        province="British Columbia"
        country="Canada"
        weatherCode={0} 
        isDay={true}
        feelsLike={13}
        rain={0}
        windSpeed={8}
      />

    </main>
  )
}

export default App