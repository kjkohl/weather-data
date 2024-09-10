document.getElementById('getWeather').addEventListener('click', getWeather);
document.getElementById('toggleUnits').addEventListener('click', toggleUnits);

let useCelsius = true;

async function getWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const apiKey = 'b512babe4fd716813ee5308de90c7c19'; // Hypothetical API key
    const unit = useCelsius ? 'metric' : 'imperial';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    const hourlyApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} ${useCelsius ? '°C' : '°F'}`;
        document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;

        // Fetch hourly forecast
        const hourlyResponse = await fetch(hourlyApiUrl);
        const hourlyData = await hourlyResponse.json();
        displayHourlyForecast(hourlyData);
    } catch (error) {
        alert(error.message);
    }
}

function displayHourlyForecast(data) {
    const hourlyPanel = document.getElementById('hourlyForecast');
    hourlyPanel.innerHTML = ''; // Clear previous data
    data.list.slice(0, 8).forEach(item => {
        const hour = new Date(item.dt * 1000).getHours();
        const temperature = item.main.temp;
        const description = item.weather[0].description;
        hourlyPanel.innerHTML += `<p>${hour}:00 - ${temperature} ${useCelsius ? '°C' : '°F'} - ${description}</p>`;
    });
}

function toggleUnits() {
    useCelsius = !useCelsius;
    document.getElementById('toggleUnits').textContent = useCelsius ? '°C' : '°F';
    getWeather(); // Refresh weather with new units
}
