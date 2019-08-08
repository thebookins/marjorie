const events = require('events');

module.exports = (state = {
  battery: 1, // 1 = full, 0 = empty
  clock: 0, // minutes
  // TODO: store other state here
  // e.g. transmitter age, sensor age, calibration etc.
}) => {
  const eventEmitter = new events.EventEmitter();

  let read = () => 0;

  let {
    battery,
    clock,
  } = state;

  const sense = () => read();

  const api = {
    // assume we are stepping every minute
    step: () => {
      clock += 1;
      battery -= 1;
      if (clock % 5 === 0) {
        eventEmitter.emit('glucose', sense());
      }
    },
    get clock() {
      return clock;
    },
    set read(fn) {
      read = fn;
    },
    get state() {
      return {
        battery,
        clock,
      };
    },
    on: (message, callback) => {
      eventEmitter.on(message, callback);
    },
  };

  return api;
};
