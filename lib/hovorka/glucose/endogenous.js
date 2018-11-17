const EGP_0_m = 0.0161; // mmol kg^−1 min^−1

module.exports = (dt, m) => {
  // constants
  const EGP_0 = EGP_0_m * m; // mmol min^-1

  // API
  // NOTE: the alternative here is to make this module stateful
  // and return EGP using a getter
  const api = {
    EGP: x => EGP_0 * (1 - x),
  };

  return api;
};
