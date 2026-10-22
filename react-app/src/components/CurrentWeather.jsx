function CurrentWeather({city, temperature, province, country, message, feelsLike, rain, windSpeed}) {
    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold">{city} ★</h2>
            <p className="text-2xl">{province} - {country}</p>
            <p className="text-4xl font-bold text-[#ffa62b]">{temperature}ºC</p>
            <p className="text-2xl">{message}</p>
            <p className="text-2xl">Feeling temperature: {feelsLike}ºC</p>
            <p className="text-2xl">Possibility to rain: {rain}%</p>
            <p className="text-2xl">Wind speed: {windSpeed}m/h</p>
        </section>
    )
}

export default CurrentWeather