module.exports = () => {
  // TODO: in time this will become a schedule
  const basal_rate_U_per_hour = 1;

  let temp = null;

  const api = {
    step: (/* clock */) => {
      // TODO: get current scheduled rate via lookup using clock
      if (temp) {
        temp.timeRemaining -= 1;
        if (temp.timeRemaining <= 0) {
          temp = null;
        }
      }
    },
    get currentRate() {
      return temp ? temp.rate : basal_rate_U_per_hour;
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
