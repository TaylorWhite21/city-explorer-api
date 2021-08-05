'use strict';

// Creating express server requirement
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const axios = require('axios');

require('dotenv').config();

const PORT = process.env.PORT;


// app.get() specifies the route that the server should listen for
// query parameters are used to send extra information to the backend
app.get('/weather', async (request, response) => {
  let lat = parseInt(request.query.lat);
  let lon = parseInt(request.query.lat);
  let searchQuery = request.query.city;
  let weatherResults = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`)
 
  let weatherArray = [];

  if (weatherResults) {
      weatherResults.data.data.map(forecast => 
      {weatherArray.push(new Weather(forecast))
    })
    console.log(weatherArray)
    response.send(weatherArray)
  } else {
    response.status(404).send('Could not find the requested city. Please try again.');
  }
});

app.get('/*', (request, response) => {
  response.status(500).send('Path does not exist');
});

class Weather {
  constructor(forecast){
    this.low = forecast.low_temp
    this.high = forecast.max_temp
    this.desc = forecast.weather.description;
    this.date = forecast.valid_date;
  };
}



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
