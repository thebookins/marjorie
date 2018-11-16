module.exports = (dt) => {
  // constants
  const V = 1; // L

  // variables
  let Q = 6; // mmol
  let q_out = 0; // mmol min^-1

  // API
  const api = {
    step: (q_in, x) => {
      q_out = x * Q;
      Q += q_in * dt;
    },
    get q_out() {
      return q_out;
    },
    get glucose() {
      return Q / V;
    },
  };

  return api;
};
