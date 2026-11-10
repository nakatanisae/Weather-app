import HourlyCard from "./HourlyCard";

function HourlyForecast({hours}){
    return(
        <section>
            <h2>3 hour range</h2>
            <div className="flex gap-4 overflow-x-auto">
                {hours.map((hour => 
                    <HourlyCard key={hour.time}{...hour}/>
                ))}
            </div>
        </section>
    )
}

export default HourlyForecast