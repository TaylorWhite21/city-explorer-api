'use strict'

const axios = require('axios');
module.exports = getMovies;

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

async function getMovies (request, response) {
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
}
