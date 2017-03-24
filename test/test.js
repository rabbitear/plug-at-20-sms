'use strict'

// 3rd party library imports
var cron = require('cron')
var twilio = require('twilio')

// project imports
var forecast = require('../temp_forecast')


// Really basic test just to make sure the zipcodes don't error
forecast.getLowTemps(function(err, data) {
    if (err) throw err

    // console.dir(data, {depth:5, color:true})
})

// Super basic test to make sure the messages.json file is valid
require('../message_text.json')
