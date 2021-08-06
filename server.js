'use strict';

// Creating express server requirement
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const axios = require('axios');
const { request, response } = require('express');

require('dotenv').config();

const PORT = process.env.PORT;

class Forecast {
  constructor(date, desc) {
    this.date = date;
    this.desc = desc;
  }
}

class Movies {
  constructor(title, overview, average_votes, total_votes, image_url, popularity, released_on){
  this.title = title;
  this.overview = overview;
  this.average_votes = average_votes;
  this.total_votes = total_votes;
  this.image_url = image_url;
  this.popularity = popularity;
  this.released_on = released_on;
  }
}

// app.get() specifies the route that the server should listen for
// query parameters are used to send extra information to the backend
app.get('/weather', async (request, response) => {
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
});

app.get('/movies', async (request, response) => {
  let searchQuery = request.query.city;
  let movieResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`)
  if (movieResults) {
    let mappedResults = movieResults.data.results.map(movies =>{
      return new Movies(
        movies.title,
        movies.overview,
        movies.average_votes,
        movies.vote_count,
        movies.poster_path,
        movies.popularity,
        movies.release_date,
        );
    })
  response.send(mappedResults)
} else {
  response.status(500).send('Could not find the requested city. Please try again.');
}
});

app.get('/*', (request, response) => {
  response.status(404).send('Path does not exist');
});



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
