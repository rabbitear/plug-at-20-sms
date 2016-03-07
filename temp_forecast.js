'use strict'

var request = require('request')
var parseString = require('xml2js').parseString;

// the weather service delivers forecasts in 3 hour blocks
// start and end should be 3 hours apart if you want just one temp
var LOW_TEMP_START_HOUR = '00' // midnight
var LOW_TEMP_END_HOUR = '03' // 3am

// these are all the zipcodes in anchorage that can have weather (there are some
// weird ones that make the weather API error)
var ZIPCODES = require('./zipcodes')

function getWeatherUrl() {
    var d = new Date()
    d.setDate(d.getDate() + 1)
    var tomorrow_string = d.toISOString().substring(0,10)

    return 'http://graphical.weather.gov/' +
        'xml/sample_products/browser_interface/ndfdXMLclient.php?' +
        'whichClient=NDFDgenMultiZipCode&' +
        'lat=&' +
        'lon=&' +
        'listLatLon=&' +
        'lat1=&' +
        'lon1=&' +
        'lat2=&' +
        'lon2=&' +
        'resolutionSub=&' +
        'listLat1=&' +
        'listLon1=&' +
        'listLat2=&' +
        'listLon2=&' +
        'resolutionList=&' +
        'endPoint1Lat=&' +
        'endPoint1Lon=&' +
        'endPoint2Lat=&' +
        'endPoint2Lon=&' +
        'listEndPoint1Lat=&' +
        'listEndPoint1Lon=&' +
        'listEndPoint2Lat=&' +
        'listEndPoint2Lon=&' +
        'zipCodeList=' + ZIPCODES.join('+') + '&' +
        'listZipCodeList=&' +
        'centerPointLat=&' +
        'centerPointLon=&' +
        'distanceLat=&' +
        'distanceLon=&' +
        'resolutionSquare=&' +
        'listCenterPointLat=&' +
        'listCenterPointLon=&' +
        'listDistanceLat=&' +
        'listDistanceLon=&' +
        'listResolutionSquare=&' +
        'citiesLevel=&' +
        'listCitiesLevel=&' +
        'sector=&' +
        'gmlListLatLon=&' +
        'featureType=&' +
        'requestedTime=&' +
        'startTime=&' +
        'endTime=&' +
        'compType=&' +
        'propertyName=&' +
        'product=time-series&' +
        'begin=' + tomorrow_string + 'T' + LOW_TEMP_START_HOUR + '%3A00%3A00&' +
        'end=' + tomorrow_string + 'T' + LOW_TEMP_END_HOUR + '%3A00%3A00&' +
        'Unit=e&' +
        'temp=temp&' +
        'Submit=Submit'
}


function getLowTemps(callback) {
    request.get(
        getWeatherUrl(),
        function (err, response, body) {
            if (err) return callback(err)

            if (response.statusCode != 200) {
                var msg = response.statusCode + ' response from weather.gov'
                return callback(new Error(msg))
            }

            getTempsFromWeatherData(body, callback)
        }
    )
}


function getTempsFromWeatherData(data, callback) {
    var temps

    parseString(data, function (err, result) {
        if (err) return callback(err)

        var temps = ZIPCODES.map(function(zip, i) {
            return {
                zip: zip,
                temp: result.dwml.data[0].parameters[i].temperature[0].value[0],
            }
        })

        callback(temps)
    })
}

module.exports.getLowTemps = getLowTemps

// getLowTemps((e,d)=>{console.log(e); console.dir(d)})
