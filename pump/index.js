"use strict";

const events = require('events');

module.exports = (t1d) => {
  var eventEmitter = new events.EventEmitter();

  // private data
  var reservoirUnits = 300;
  var timestamp = 0;
  var insulinDeficit_U = 0;

  var basal_rate_U_per_hour = 10;

  setInterval(() => {
    timestamp++;
    insulinDeficit += basal_rate_U_per_hour / 3600;
    if (insulinDeficit_U >= 0.05) {
      bolus(0.05);
      insulinDeficit -= 0.05;
    }
    if (!(timestamp % 300)) { // every five minutes
      eventEmitter.emit('reservoir', reservoirUnits);
    }
  }, 1000);

  return {
    // API (public) functions
    bolus: (units) => {
      reservoirUnits -= units;
      t1d.dose(units);
      return true;
    },

    prime: (reservoirUnits) => {
      reservoirUnits = reservoirUnits;
    },

    on: (message, callback) => eventEmitter.on(message, callback)
  };
}
