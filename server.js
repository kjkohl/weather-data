const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.static('.'));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityOrZip}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod !== 200){
            return res.status(404).json({ error: 'City not found'});
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data'});
    }
});

app.listen(port, () => {
    console.log(`Server running on http:\\localhost:${port}`);
});
