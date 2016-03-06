'use strict'

// 3rd party library imports
var cron = require('cron')

// constants
var NOTIFICATION_TIME = 20 // 8 pm


var job = new cron.CronJob({
    // run every day at the hour specified above
    cronTime: '0 ' + NOTIFICATION_TIME + ' * * *',

    onTick: function() {
        console.log('sending texts')
    },
    
    timeZone: 'America/Anchorage'
});

module.exports = job
