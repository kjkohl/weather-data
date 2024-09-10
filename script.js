document.getElementById('getWeather').addEventListener('click', getWeather);
document.getElementById('toggleUnits').addEventListener('click', toggleUnits);

let useCelsius = true;

async function getWeather() {
    showLoadingScreen(true);
    const cityOrZip = document.getElementById('cityOrZip').value;
    const unit = useCelsius ? 'metric' : 'imperial';

    try {
        const response = await fetch(`/weather?cityOrZip=${cityOrZip}&units=${unit}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
        const hourlyApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityOrZip}&appid=${API_KEY}&units=${unit}`;
        const hourlyResponse = await fetch(hourlyApiUrl);
        const hourlyData = await hourlyResponse.json();
        displayHourlyForecast(hourlyData.list);
    } catch (error) {
        alert(error.message);
    } finally {
        showLoadingScreen(false);
    }
}

function toggleUnits() {
    useCelsius = !useCelsius;
    document.getElementById('toggleUnits').textContent = useCelsius ? '°C' : '°F';
    getWeather();
}

function showLoadingScreen(show) {
    document.getElementById('loadingScreen').style.display = show ? 'flex' : 'none';
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>${temp} ${useCelsius ? '°C' : '°F'}</p>
        <p>${description}</p>
        <img src="${icon}" alt="Weather Icon">
    `;
}

function displayHourlyForecast(hours) {
    const hourlyForecast = document.getElementById('hourlyForecast');
    hourlyForecast.innerHTML = '<h3>Hourly Forecast</h3>';
    hours.forEach(hour => {
        const time = new Date(hour.dt * 1000).toLocaleTimeString();
        const temp = hour.main.temp;
        const description = hour.weather[0].description;
        const icon = `http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`;

        const forecastItem = document.createElement('div');
        forecastItem.className = 'hourly-item';
        forecastItem.innerHTML = `
            <p>${time}</p>
            <p>${temp} ${useCelsius ? '°C' : '°F'}</p>
            <p>${description}</p>
            <img src="${icon}" alt="Weather Icon">
        `;
        hourlyForecast.appendChild(forecastItem);
    });
}
