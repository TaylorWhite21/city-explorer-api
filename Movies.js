'use strict';

let cache = require('./cache.js');
const axios = require('axios');

module.exports = getMovies;

function getMovies(cityName) {
  const key = 'movie-' + cityName;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseMovie(response));
  }
  return cache[key].data;
}

function parseMovie(movieData) {

  try {
    const movieSummaries = movieData.data.results.map(movies => {
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

    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
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
