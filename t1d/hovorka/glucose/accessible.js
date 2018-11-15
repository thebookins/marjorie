module.exports = (dt) => {
  // constants
  const V = 1 // L

  // variables
  let Q = 6; // mmol

  // API
  return api = {
    step: (q_in, x) => {
      Q += q_in * dt;
    },
    get glucose() {
      return Q / V;
    }
  };
}
