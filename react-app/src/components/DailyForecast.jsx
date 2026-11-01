import ForecastCard from "./ForecastCard";

function DailyForecast({days, selectedDate, onSelectDate}){
    return (
        <section className="p-6">
        <h2 className="text-2xl">Daily Forecast</h2>
        <div className="flex gap-4 overflow-x-auto">
            {days.map((day)=> (
                <ForecastCard key={day.date}
                {...day}
                isSelected={day.date === selectedDate}
                onClick={()=> onSelectDate(day.date)}
                />
            ))}
        </div>
    </section>
    )
    
};

export default DailyForecast;
