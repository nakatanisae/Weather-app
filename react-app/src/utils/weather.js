export function getWeatherIcon(weatherCode) {
    if (weatherCode === 0) {
        return "☀️";
    }

    if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
        return "🌤️";
    }

    if (weatherCode === 45 || weatherCode === 48) {
        return "☁️";
    }

    if (
        weatherCode === 51 ||
        weatherCode === 53 ||
        weatherCode === 55 ||
        weatherCode === 56 ||
        weatherCode === 57
    ) {
        return "🌦️";
    }

    if (
        weatherCode === 61 ||
        weatherCode === 63 ||
        weatherCode === 65 ||
        weatherCode === 66 ||
        weatherCode === 67
    ) {
        return "🌧️";
    }

    if (
        weatherCode === 71 ||
        weatherCode === 73 ||
        weatherCode === 75 ||
        weatherCode === 77
    ) {
        return "🌨️";
    }

    if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
        return "🌦️";
    }

    if (weatherCode === 85 || weatherCode === 86) {
        return "🌨️";
    }

    if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
        return "⛈️";
    }

    if (weatherCode === 101) {
        return "🌙";
    }
}

export function changeTemperatureColor(code) {
    switch (true) {
        //sunny
        case code === 0:
            return "#ffa62b";

        // cloudy
        case code > 0 && code <= 3:
            return "#aaaaaa";

        // rain
        case (code >= 51 && code <= 67) || (code >= 80 && code <= 82):
            return "#16697a";

        default:
            return "#6c757d";
    }
}

export function showDayMessage(code) {
    switch (true) {
        //sunny
        case code === 0:
            return "It's a beautiful day to have fun!";

        // cloudy
        case code > 0 && code <= 3:
            return "It's a perfect day to read a book and drink hot chocolate!";

        // rain
        case (code >= 51 && code <= 67) || (code >= 80 && code <= 82):
            return "Let's make popcorn and watch a movie today!";

        //night
        case code === 101:
            return "Have a good night!";

        default:
            return "You've been awesome today!";
    }
}

export function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return {
        weekday: date.toLocaleDateString("en-US", {
            weekday: "short",
        }),
        monthDay: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })
    }
}

