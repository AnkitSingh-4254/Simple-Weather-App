const apiKey = "b685fbef2a3e8c13ebd00db28634833a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon"); // Fixed: added the dot '.'

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
}

    const data = await response.json();

    // 1. Update text elements
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    // 2. Shortened Icon Logic (Object Mapping)
    const iconMap = {
        "Clouds": "images/clouds.png",
        "Clear": "images/clear.png",
        "Rain": "images/rain.png",
        "Drizzle": "images/drizzle.png",
        "Mist": "images/mist.png",
        "Haze": "images/mist.png"
    };

    const weatherCondition = data.weather[0].main;
    
    // Set icon based on condition, fallback to 'clouds' if not in list
    weatherIcon.src = iconMap[weatherCondition] || "images/clouds.png";
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Allow pressing 'Enter' key to search
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});


// Initial load
checkWeather("Bengaluru");