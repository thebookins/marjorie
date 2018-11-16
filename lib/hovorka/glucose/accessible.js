module.exports = (dt) => {
  // constants
  const V = 10; // L

  // variables
  let Q = 60; // mmol
  let q_out = 0; // mmol min^-1

  // API
  const api = {
    step: (q_in, x, U_G) => {
      q_out = x * Q;
      // TODO: consider putting this renal clearance term in own module???
      const F_R = Math.max(0.003 * (api.glucose - 9) * V, 0);
      Q += (q_in - q_out - F_R + U_G) * dt;
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
