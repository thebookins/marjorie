const events = require('events');

module.exports = () => {
  const eventEmitter = new events.EventEmitter();

  // TODO: in time this will become a schedule
  const basal_rate_U_per_hour = 1;

  let currentRate = basal_rate_U_per_hour;
  let temp = null;

  const api = {
    step: (/* clock */) => {
      // TODO: get current scheduled rate via lookup using clock
      if (temp) {
        temp.timeRemaining -= 1;
        if (temp.timeRemaining < 0) {
          temp = null;
        }
      }
      const previousCurrentRate = currentRate;
      currentRate = temp ? temp.rate : basal_rate_U_per_hour;
      if (currentRate !== previousCurrentRate) {
        eventEmitter.emit('basal', currentRate);
      }
    },
    get currentRate() {
      return currentRate;
    },
    setTemp: (rate, duration) => {
      temp = { rate, timeRemaining: duration };
    },
    cancelTemp: () => {
      temp = null;
    },
  };

  return api;
};
