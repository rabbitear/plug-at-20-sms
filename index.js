'use strict'

// 3rd party library imports
var express = require('express')
var body_parser = require('body-parser')

// project imports
var text = require('./message_text.json')
var cron_job = require('./cron_job')
var db = require('./db')


var app = express() // instantiate express


// serve files from the public dir for testing via web
app.get('/', express.static(__dirname + '/public'))
// parse POST bodies
app.use(body_parser.urlencoded({ extended: true }))

// Twilio hits this endpoint. The user's text message is
app.post('/', function(req, res, next) {
    var message = req.body.Body
    var phone_number = req.body.From

// Comfirmation message
    return res.send(text.CONFIRMATION_MESSAGE)
});


// start the server
var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('plug at 20 app running on port', port);
});

// start the cron job
cron_job.start()
