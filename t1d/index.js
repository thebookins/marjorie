module.exports = () => {
  // private data
  var bloodGlucose = 120;
  var cob = 0;
  var iob = 0;

  return {
    // API (public) functions
    eat: (g) => {
      COB += units;
    },

    dose: (units) => {
      iob += units;
    },

    sense: () => bloodGlucose,

    doStep: () => {}
  };
}
