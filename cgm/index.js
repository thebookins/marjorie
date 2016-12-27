"use strict";

const events = require('events');

module.exports = (t1d) => {
  const eventEmitter = new events.EventEmitter();

  // private data
//  var activationDate = new Date('February 4, 2006 06:30:00');
//  var sessionStartDate = new Date('February 4, 2006 06:30:00');
  var status = 0;
  var sequence = 0;
  var timestamp = 0;
  var sessionTimestamp = 0;
  var state = 0;
  var trend = 0;

  setInterval(() => {
    if (!(timestamp % 10)) { // every five minutes
      eventEmitter.emit('glucose', {
        status,
        sequence,
        timestamp,
        glucose: t1d.sense(),
        state,
        trend
      });
      sequence++;
    }
    timestamp++;
    sessionTimestamp++;
  }, 1000);

  return {
    on: (message, callback) => eventEmitter.on(message, callback),
    time: () => {
      return {
        status,
        timestamp,
        sessionTimestamp
      };
    }
  };
}
