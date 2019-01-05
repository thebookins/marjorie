module.exports = (dt, state = { x: [0, 0, 0] }) => {
  // constants
  const k_a = [0.006, 0.06, 0.03]; // min^-1
  const S = [51.2e-4, 8.2e-4, 520e-4]; // min^−1 per (mU L^−1)
  const k_b = k_a.map((x, n) => x * S[n]); // min^-2 per (mU L^-1)

  // variables
  let { x } = state;

  // API
  const api = {
    // x appears to be a rate so has units of min^-1
    // u is insulin administration in units? per min
    // or perhaps mU min^-1
    step: (I) => {
      x = x.map((value, i) => value + (-value * k_a[i] + k_b[i] * I) * dt);
    },
    get x() {
      return x;
    },
    get state() {
      return { x };
    },
  };

  return api;
};
