const t_max_I = 55; // min

module.exports = (dt, state = { S: 0 }) => {
  // variables
  let { S } = state; // TODO: not sure about the units here

  // API
  const api = {
    // u is insulin administration in units? per minute
    step: (u_in) => {
      S += (u_in - api.u_out) * dt;
    },
    get u_out() {
      return S / t_max_I;
    },
    get state() {
      return { S };
    },
  };

  return api;
};
