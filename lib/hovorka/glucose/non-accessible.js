module.exports = (dt) => {
  // constants
  const k = 0.066; // min^-1

  // variables
  let Q = 6; // mmol

  // API
  const api = {
    step: (q_in, x) => { // consider passing a params struct so that they can be named
      Q += (q_in - api.q_out - x * Q) * dt;
    },
    get q_out() {
      return k * Q; // mmol min^-1
    },
  };

  return api;
};
