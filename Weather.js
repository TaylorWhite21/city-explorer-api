'use strict';

let cache = require('./cache.js');
const axios = require('axios');

module.exports = getWeather;

function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  console.log(`key: ${key}`);
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseWeather(response.data));
  }
  return cache[key].data;
}

function parseWeather(weatherData) {

  try {
    const weatherSummaries = weatherData.data.map(day => new Weather(`Low of ${day.low_temp}, a high of ${day.max_temp} with ${day.weather.description}. date: ${day.valid_date}`));
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }

}

class Weather {
  constructor(description, datetime, max_temp, low_temp) {
    this.forecast = description;
    this.time = datetime;
    this.maxTemp = max_temp;
    this.minTemp = low_temp;

  }
}
