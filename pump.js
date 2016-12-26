"use strict";

var events = require('events');

module.exports = (t1d) => {
  var eventEmitter = new events.EventEmitter();

  // private data
  var reservoirUnits = 300;
  var timestamp = 0;

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

    doStep: () => {
      if (!(timestamp % 10)) { // every five minutes
        eventEmitter.emit('reservoir', reservoirUnits);
      }
      timestamp++;
    },

    on: (message, callback) => eventEmitter.on(message, callback)
  };
}
