import {getWeatherIcon, changeTemperatureColor, showDayMessage } from "../utils/weather"

function CurrentWeather({city, temperature, province, country, weatherCode, isDay, feelsLike, rain, windSpeed}) {
    const code = isDay ? weatherCode : 101;
    
    return (
        <section className="p-6">
            <h2 className="text-2xl font-bold">{city} ★</h2>
            <p className="text-2xl">{province} - {country}</p>
            <p className="text-4xl font-bold" style={{color: changeTemperatureColor(code)}}>{temperature}ºC</p>
            <p className="text-2xl">{showDayMessage(code)}</p>
            <p>{getWeatherIcon(code)}</p>
            <p className="text-2xl">Feeling temperature: {feelsLike}ºC</p>
            <p className="text-2xl">Possibility to rain: {rain}mm</p>
            <p className="text-2xl">Wind speed: {windSpeed}km/h</p>
        </section>
    )
}

export default CurrentWeather