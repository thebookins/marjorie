"use strict";

const events = require('events');

const memjs = require('memjs');
const mc = memjs.Client.create()

module.exports = (t1d) => {
  var eventEmitter = new events.EventEmitter();

  // to do - should make reservoirUnits an int to save on memory
  var reservoirUnits;
  mc.get('reservoir', function(val) {
      reservoirUnits = val || 300;
      console.log("reservoirUnits = ", reservoirUnits);
  })

  // private data
  var timestamp = 0;
  var insulinDeficit_U = 0;

  var basal_rate_U_per_hour = 10;

  setInterval(() => {
    timestamp++;
    insulinDeficit_U += basal_rate_U_per_hour / 3600;
    if (insulinDeficit_U >= 0.05) {
      bolus(0.05);
      insulinDeficit_U -= 0.05;
    }
    if (!(timestamp % 300)) { // every five minutes
      eventEmitter.emit('reservoir', reservoirUnits);
    }
    mc.set('reservoir', reservoirUnits, function(err, val) {
      console.log("set reservoir to " + reservoirUnits)
      mc.get('reservoir', function(val) {
        console.log("reservoirUnits = " + val);
      })
    }, 600);
  }, 1000);

  var bolus = (units) => {
    reservoirUnits -= units;
    t1d.dose(units);
    return true;
  }

  return {
    // API (public) functions
    bolus,

    prime: (reservoirUnits) => {
      reservoirUnits = reservoirUnits;
    },

    on: (message, callback) => eventEmitter.on(message, callback)
  };
}
