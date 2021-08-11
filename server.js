'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT;

const weather = require('./Weather.js');

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  let lat = parseInt(request.query.lat);
  let lon = parseInt(request.query.lat);
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!')
    });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
