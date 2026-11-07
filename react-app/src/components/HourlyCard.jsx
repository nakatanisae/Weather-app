import { getWeatherIcon, formatDate,  formatTimeRange  } from "../utils/weather"

function HourlyCard({time, temp, weatherCode}) {
    
    const [datePart, startTime] = time.split('T')
    const { monthDay } = formatDate(datePart)

    return (
        <section className="p-6">
            <span className="text-2xl block">{monthDay}</span>
            <span className="text-2xl block">{formatTimeRange(startTime)}</span>
            <span className="text-2xl block">{getWeatherIcon(weatherCode)}</span>
            <span className="text-2xl block">Temperature: {temp.toFixed(1)}ºC</span>
        </section>

    )
}

export default HourlyCard