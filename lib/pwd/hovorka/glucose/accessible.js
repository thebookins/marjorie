var assert = require('assert');

module.exports = ({
  dt,
  params = { bodyMass: 60 },
  state = { Q: 60, q_out: 0 },
} = {}) => {
  // constants
  const V = 0.16 * params.bodyMass; // L
  const F_01 = 0.0097 * params.bodyMass; // mmol min^-1

  // state
  let { Q, q_out } = state; // mmol
  // let q_out = 0; // mmol min^-1

  // API
  const api = {
    step: (q_in, x, U_G, EGP) => {
      q_out = x * Q;
      // TODO: consider putting this renal clearance term in own module???
      const F_R = Math.max(0.003 * (api.glucose - 9) * V, 0);
      // NOTE: in the paper, this term is divided by V_G * G then multiplied by
      // Q_1, which together equals 1. So that bit has been
      // ommitted here. Could be missing something though...
      const F_01_c = F_01 * Math.min(api.glucose / 4.5, 1);

      Q += (q_in - q_out - F_01_c - F_R + U_G + EGP) * dt;
      assert(Q >= 0, 'glucose cannot be negative');
    },
    get q_out() {
      return q_out;
    },
    get glucose() {
      return Q / V;
    },
    get state() {
      return { Q, q_out };
    },
  };

  return api;
};
