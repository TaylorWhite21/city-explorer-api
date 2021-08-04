'use strict';

console.log('Hello World');

// Creating express server requirement
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT;
// Collects data from requested file
let weatherData = require('./data/weather.json');

class Forecast {
  constructor(date, desc) {
    this.date = date;
    this.desc = desc;
  }
}

// app.get() specifies the route that the server should listen for
// query parameters are used to send extra information to the backend
app.get('/weather', (request, response) => {
  let lat = parseInt(request.query.lat);
  let lon = parseInt(request.query.lat);
  let searchQuery = request.query.city;
  weatherData.find(city => city.city_name.includes(searchQuery));

  let forecastArray = [];

  if (searchQuery) {
    forecastArray.push(weatherData[0].data.map(day => new Forecast(`Low of ${day.low_temp}, a high of ${day.high_temp} with ${day.weather.description}. date: ${day.valid_date}`)));
    response.send(forecastArray);
  } else {
    response.status(404).send('Could not find the requested city. Please try again.');
  }
});

app.get('/*', (request, response) => {
  response.status(500).send('Path does not exist');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
