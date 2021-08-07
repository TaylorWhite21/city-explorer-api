'use strict'

const axios = require('axios');

class Forecast {
  constructor(date, desc) {
    this.date = date;
    this.desc = desc;
  }
}

async function getWeather (request, response) {
  let lat = parseInt(request.query.lat);
  let lon = parseInt(request.query.lat);
  let searchQuery = request.query.city;
  let weatherResults = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=3`)
  let weatherArray = [];

  if (weatherResults) {
      weatherResults.data.data.map(forecast => 
      {weatherArray.push(new Forecast(`Low of ${forecast.low_temp}, a high of ${forecast.max_temp} with ${forecast.weather.description}. date: ${forecast.valid_date}`))
    })
    response.send(weatherArray)
  } else {
    response.status(404).send('Could not find the requested city. Please try again.');
  }
}

module.exports = getWeather
