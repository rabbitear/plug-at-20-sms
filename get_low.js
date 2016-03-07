var parseString = require('xml2js').parseString;
var request = require('request');
request('http://api.openweathermap.org/data/2.5/forecast?q=Anchorage,us&mode=xml&appid=44db6a862fba0b067b1930da0d769e98', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    parseString(body, function (err, result) {
    early_morning = parseFloat(result.weatherdata.forecast[0].time[1].temperature[0].$.min);
    console.dir(early_morning);
    morning = parseFloat(result.weatherdata.forecast[0].time[2].temperature[0].$.min);
    console.dir(morning);
    temp_min = Math.min(early_morning,morning);
    console.dir(temp_min);
    });
  }
})