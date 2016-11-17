'use strict'

// 3rd party library imports
var cron = require('cron')
var twilio = require('twilio')

// project imports
var forecast = require('./temp_forecast')


// Really basic test just to make sure the zipcodes don't error
forecast.getLowTemps((err, data) => {
    if (err) throw err

    // console.dir(data, {depth:5, color:true})
})
