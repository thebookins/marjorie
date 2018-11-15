module.exports = (dt) => {
  // constants
  const k = 0.066; // min^-1

  // variables
  let Q = 6; // mmol

  // API
  const api = {
    get q_out() {
      return k * Q; // mmol min^-1
    },
    step: (q_in, x) => { // consider passing a params struct so that they can be named
      console.log(api.q_out);
      Q += (q_in - api.q_out - x * Q) * dt;
    }
  }

  return api;
}
