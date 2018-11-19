const t_max_I = 55; // min

module.exports = (dt) => {
  // variables
  let S = 0; // TODO: not sure about the units here

  // API
  const api = {
    // u is insulin administration in units? per minute
    step: (u_in) => {
      S += (u_in - api.u_out) * dt;
    },
    get u_out() {
      return S / t_max_I;
    },
  };

  return api;
};
