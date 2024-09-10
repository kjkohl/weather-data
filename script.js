// Get references to HTML elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const weatherDisplay = document.getElementById('weatherDisplay');

// Function to fetch weather data from the server
async function getWeather(city) {
    try {
        // Validate city input
        if (!city || city.trim() === '') {
            throw new Error('Please enter a valid city name');
        }

        const apiUrl = `/weather?city=${encodeURIComponent(city)}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        // Validate data structure
        if (!data || !data.name || !data.main || !data.weather) {
            throw new Error('Invalid data structure');
        }

        displayWeather(data);
    } catch (error) {
        console.error(error); // Log error to console for debugging
        weatherDisplay.innerHTML = `<p>${error.message}</p>`;
    }
}

// Function to display weather data
function displayWeather(data) {
    const { name, main, weather } = data;
    const html = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Condition: ${weather[0].description}</p>
    `;
    // Injecting the weather information into the weatherDisplay div
    weatherDisplay.innerHTML = html;
}

// Add event listener to the form
weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value.trim(); // Trim input value
    if (city) {
        getWeather(city);
    }
});
