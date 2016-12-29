module.exports = () => {
  // private data
  var bloodGlucose = 100;
  var cob = 0;
  var iob = 0;

  setInterval(() => {
    // doStep
  }, 1000);

  return {
    // API (public) functions
    eat: (g) => {
      COB += units;
    },

    dose: (units) => {
      iob += units;
    },

    sense: () => bloodGlucose,
  };
}
