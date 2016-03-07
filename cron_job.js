'use strict'

// 3rd party library imports
var cron = require('cron')
var twilio = require('twilio')

// project imports
var db = require('./db')
var message_text = require('./message_text.json')


// constants
var NOTIFICATION_TIME = 20 // 8 pm
var TWILIO_SID = 'AC4d903012a56c8cba55657d6f9520846e'
var TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
var TWILIO_NUMBER = '+19073316688'


var job = new cron.CronJob({
    // run every day at the hour specified above
    cronTime: '0 ' + NOTIFICATION_TIME + ' * * *',
    // cronTime: '* * * * *', // every minute
    onTick: sendMessages,
    timeZone: 'America/Anchorage'
});


function sendMessages() {
    console.log('sending', db('subscribers').length, 'text messages')

    // instantiating this here so it'll run without an auth token in dev
    var twilio_client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

    db('subscribers').forEach(function(subscriber) {
        console.log(subscriber)
        twilio_client.sendMessage(
            {
                to: subscriber,
                from: TWILIO_NUMBER,
                body: message_text.NOTIFICATION,
            },
            function (err, response) {
                if (err) return console.log(err)

                console.log(response)
            }
        )
    })
}

module.exports = job
