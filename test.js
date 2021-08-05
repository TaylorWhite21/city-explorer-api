if (weatherResults) {
  weatherResults.data.data.map(forecast => 
  {weatherArray.push(new Weather(forecast))
})
console.log(weatherArray)
response.send(weatherArray)
} else {
response.status(404).send('Could not find the requested city. Please try again.');
}
