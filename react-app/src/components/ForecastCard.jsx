import { getWeatherIcon, formatDate } from "../utils/weather"

function ForecastCard({ date, weatherCode, minTemp, maxTemp, isSelected, onClick }) {
    const { weekday, monthDay } = formatDate(date);

    return (
        <button type="button" onClick={onClick} className={`rounded-lg border p-4 ml-6 ${isSelected ? "border-[#ffa62b]" : "border-gray-300"}`}>
            <span className="text-2xl block">{monthDay}</span>
            <span className="text-2xl block">{weekday}</span>
            <span className="text-2xl block">{getWeatherIcon(weatherCode)}</span>
            <span className="text-2xl block">Max temperature: {maxTemp}ºC</span>
            <span className="text-2xl block">Min temperature: {minTemp}ºC</span>
        </button>

    )
}

export default ForecastCard