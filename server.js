'use strict';

// Creating express server requirement
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const axios = require('axios');
// Above is what is needed to start an express server

const weather = require('./modules/Weather.js')
const movie = require('./modules/Movie.js')

require('dotenv').config();
const PORT = process.env.PORT;

// calls to the weather module
app.get('/weather', weather);

// calls to the movie module
app.get('/movies', movie);

// Returns error if path is not found
app.get('/*', (request, response) => {
  response.status(404).send('Path does not exist');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
