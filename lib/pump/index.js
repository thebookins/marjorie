const events = require('events');

const Basal = require('./basal');

module.exports = (state = {
  clock: 0, // time in minutes since epoch
  reservoir: 300,
  bolusing: false,
  basal: undefined,
}) => {
  const eventEmitter = new events.EventEmitter();

  const basal = Basal(state.basal);

  let receiver = (insulin) => {
    console.log(`delivering ${insulin} units into nothing`);
  };

  let {
    clock,
    reservoir,
    bolusing,
  } = state;

  const deliver = (insulin) => {
    reservoir -= insulin;
    receiver(insulin);
  };

  const api = {
    // assume we are stepping every minute
    step: () => {
      clock += 1;
      basal.step(clock);
      deliver(basal.currentRate / 60);
    },
    set clock(date) {
      clock = Math.floor(date.getTime() / 60 / 1000);
    },
    get clock() {
      return new Date(clock * 60 * 1000);
    },
    bolus: (insulin) => {
      const promise = new Promise((resolve, reject) => {
        console.log(`bolusing ${insulin} units`);
        deliver(insulin);
        if (true) {
          // TODO: handle to case of cancelled bolus here
          resolve(insulin);
        } else {
          // TODO: if the pump rejected the bolus
          // because already bolusing, out of insulin or what not
          reject(Error('It broke'));
        }
      });
      return promise;
    },
    reset: () => {
      reservoir = 300;
    },
    set receiver(fn) {
      receiver = fn;
    },
    get reservoir() {
      return reservoir;
    },
    get state() {
      return {
        clock,
        // batteryVolts,
        // batteryStatus,
        suspended: false,
        bolusing: false,
        reservoir,
        // model,
        // pumpID
      };
    },
  };

  return api;
}

// NOTE: temporarily commented out here while we work out what this module does
// const events = require('events');
// const state = require('./state')();
//
// module.exports = (t1d) => {
//   var eventEmitter = new events.EventEmitter();
//
//   // TODO: move this stuff in state.js
//   // private data
//   var timestamp = 0;
//   var insulinDeficit_U = 0;
//
//   var basal_rate_U_per_hour = 10;
//
//   setInterval(() => {
//     timestamp++;
//     insulinDeficit_U += basal_rate_U_per_hour / 3600;
//     if (insulinDeficit_U >= 0.05) {
//       bolus(0.05);
//       insulinDeficit_U -= 0.05;
//     }
//     if (!(timestamp % 10)) { // every five minutes
//       // NOTE: why are we doing this?
//       eventEmitter.emit('reservoir', state.reservoirUnits/100);
//     }
//   }, 1000);
//
//   var bolus = (units) => {
//     state.reservoirUnits -= units*100;
//     t1d.dose(units);
//     return true;
//   }
//
//   return {
//     // API (public) functions
//     bolus,
//
//     prime: (reservoirUnits) => {
//       state.reservoirUnits = reservoirUnits;
//     },
//
//     on: (message, callback) => eventEmitter.on(message, callback)
//   };
// }
