// script.js

document.getElementById('getWeather').addEventListener('click', getWeather);
document.getElementById('toggleUnits').addEventListener('click', toggleUnits);

let useCelsius = true;

async function getWeather() {
    const cityOrZip = document.getElementById('city').value.trim();
    if (cityOrZip === '') {
        alert('Please enter a city name or ZIP code');
        return;
    }

    showLoadingScreen(true);

    const apiUrl = `/weather?cityOrZip=${cityOrZip}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        // Display weather data
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} ${useCelsius ? '°C' : '°F'}`;
        document.getElementById('feelsLike').textContent = `Feels Like: ${data.main.feels_like} ${useCelsius ? '°C' : '°F'}`;
        document.getElementById('tempMin').textContent = `Min Temperature: ${data.main.temp_min} ${useCelsius ? '°C' : '°F'}`;
        document.getElementById('tempMax').textContent = `Max Temperature: ${data.main.temp_max} ${useCelsius ? '°C' : '°F'}`;
        document.getElementById('pressure').textContent = `Pressure: ${data.main.pressure} hPa`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById('windDirection').textContent = `Wind Direction: ${data.wind.deg}°`;
        document.getElementById('cloudiness').textContent = `Cloudiness: ${data.clouds.all}%`;
        document.getElementById('visibility').textContent = `Visibility: ${data.visibility / 1000} km`;
        document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
        document.getElementById('icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        document.getElementById('sunrise').textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
        document.getElementById('sunset').textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;

        // Fetch hourly forecast
        const hourlyApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityOrZip}&appid=${process.env.API_KEY}&units=${useCelsius ? 'metric' : 'imperial'}`;
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
    getWeather(); // Refresh the weather data with the new unit
}

function showLoadingScreen(show) {
    document.getElementById('loadingScreen').style.display = show ? 'flex' : 'none';
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
        forecastItem.innerHTML = `
            <p>${time}</p>
            <p>${temp} ${useCelsius ? '°C' : '°F'}</p>
            <p>${description}</p>
            <img src="${icon}" alt="Weather Icon">
        `;
        hourlyForecast.appendChild(forecastItem);
    });
}
