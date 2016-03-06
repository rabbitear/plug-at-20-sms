// 3rd party library imports
var express = require('express')
var low = require('lowdb')

// project imports
var text = require('./message_text.json')

var NOTIFICATION_TIME = '8' // 8 pm

var app = express() // instantiate express
var db = low('./db.json'); // instantiate database

// serve files from the public dir for testing via web
app.get('/', express.static(__dirname + '/public'))

// Twilio hits this endpoint. The user's text message is
app.post('/', function(req, res, next) {
    var message = req.body.Body
    var phone_number = req.body.From
    var zipcode_regex = /^\d{5}(?:[-\s]\d{4})?$/
    var zip = null

    var match = message.match(zipcode_regex)
    if (match) zip = match[0]

    // if they sent a zipcode
    if (zip) {
        db.push(phone_number)
        return res.send(text.CONFIRMATION_MESSAGE)
    }
    // else just say Hello
    else {
        return res.send(text.WELCOME_MESSAGE)
    }
});


// start the server
var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('plug at 20 app running on port', port);
});
