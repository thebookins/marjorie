module.exports = ({
  dt = 1,
  state = { Q: 0 },
} = {}) => {
  // constants
  const k = 0.066; // min^-1

  // variables
  let { Q } = state; // mmol

  // API
  const api = {
    step: (q_in, x) => { // consider passing a params struct so that they can be named
      Q += (q_in - api.q_out - x * Q) * dt;
    },
    get q_out() {
      return k * Q; // mmol min^-1
    },
    get state() {
      return { Q };
    },
  };

  return api;
};
