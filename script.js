const apiKey = process.env.OPENWEATHERMAP_API_KEY;
const cityInput = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData('London'); // default city
});

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            cityInput.textContent = data.name;
            weatherDescription.textContent = data.weather[0].description;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(error => console.error(error));
}

// Add event listener to update weather data when city input changes
cityInput.addEventListener('input', () => {
    fetchWeatherData(cityInput.value);
});
