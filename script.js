const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const weatherDisplay = document.getElementById('weatherDisplay');

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found!'):
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDisplay.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const {name, main, weather} = data;
    const html = `
    <h2>Weather in ${name}</h2>
    <p>Temperature: ${main.temp}°C</p>
    <p>Condition: ${weather[0].description}</p>
    `;
    weatherDisplay.innerHTML = html;
}

weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});
