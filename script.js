const apiKey = process.env.OPENWEATHERMAP_API_KEY;
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherContainer = document.querySelector('.weather-container');

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData('London'); // default city
});

searchBtn.addEventListener('click', () => {
    fetchWeatherData(cityInput.value);
});

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            cityInput.value = '';
            cityInput.blur();
            updateWeatherData(data);
        })
        .catch(error => console.error(error));
}

function updateWeatherData(data) {
    const weather = data.weather[0];
    const weatherDescriptionText = weather.description;
    const weatherIcon = weather.icon;
    const temperatureValue = data.main.temp;
    const humidityValue = data.main.humidity;
    const windSpeedValue = data.wind.speed;
    const timeOfDay = new Date().getHours();

    cityName.textContent = data.name;
    weatherDescription.textContent = weatherDescriptionText;
    temperature.textContent = `Temperature: ${temperatureValue}°C`;
    humidity.textContent = `Humidity: ${humidityValue}%`;
    windSpeed.textContent = `Wind Speed: ${windSpeedValue} m/s`;

    updateBackground(weatherIcon, timeOfDay);
}

function updateBackground(weatherIcon, timeOfDay) {
    let backgroundStyle = '';

    switch (weatherIcon) {
        case '01d':
            backgroundStyle = '--background-sunny';
            break;
        case '02d':
        case '03d':
        case '04d':
            backgroundStyle = '--background-cloudy';
            break;
        case '09d':
        case '10d':
            backgroundStyle = '--background-rainy';
            break;
        default:
            if (timeOfDay >= 6 && timeOfDay <= 18) {
                backgroundStyle = '--background-day';
            } else {
                backgroundStyle = '--background-night';
            }
    }

    weatherContainer.style.background = `var(${backgroundStyle})`;
}
