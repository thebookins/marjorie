module.exports = (dt) => {
  // constants
  const k_a = [0.006, 0.06, 0.03]; // min^-1
  const S = [51.2e-4, 8.2e-4, 520e-4]; // min^−1 per (mU L^−1)
  const k_b = k_a.map((x, n) => x * S[n]); // min^-2 per (mU L^-1)

  // variables
  let x = Array(3).fill(0);

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
  };

  return api;
};
