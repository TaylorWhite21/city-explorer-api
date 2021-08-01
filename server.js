'use strict';

console.log('Hello World');

// Creating express server requirement
const express = require('express');
const cors = require('cors');

// Collects data from requested file
let weatherData = require('./data/weather.json');

class Forecast {
  constructor(date, desc) {
    this.date = date;
    this.desc = desc;
  }
}





const app = express();
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT;

// app.get() specifies the route that the server should listen for
// query parameters are used to send extra information to the backend
app.get('/weather', (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lat;
  let searchQuery = request.query.city;
  let answer = weatherData.filter(city => city.city_name.includes(searchQuery));
  let forecastArray = weatherData[0].data.map(day =>{
    return new Forecast (day.valid_date, day.weather.description);
  });
  let weatherDataObject = {
    answer: answer,
    forecastArray: forecastArray,
  };
  console.log(weatherDataObject);
  response.send(weatherDataObject);
});



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
