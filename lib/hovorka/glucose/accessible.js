
module.exports = (dt) => {
  // constants
  const V = 10; // L
  // const F_01 = 0.5; // mmol min^-1
  const F_01 = 1; // mmol min^-1


  // variables
  let Q = 60; // mmol
  let q_out = 0; // mmol min^-1

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
