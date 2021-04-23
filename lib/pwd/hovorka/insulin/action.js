module.exports = ({
  dt = 1,
  state = { x: [0, 0, 0] },
} = {}) => {
  // constants
  const k_a = [0.006, 0.06, 0.03]; // min^-1
  const S = [
    51.2e-4, // min^−1 per (mU L^−1)
    8.2e-4, // min^−1 per (mU L^−1)
    520e-4, // per (mU L^−1)
  ];
  const k_b = k_a.map((x, n) => x * S[n]);

  // variables
  let { x } = state;

  // API
  const api = {
    /**
     * Step forward dt minutes.
     * @param {number} I Plasma insulin concentration (mU L^-1).
     */
    step: (I) => {
      x = x.map((value, i) => value + (-value * k_a[i] + k_b[i] * I) * dt);
    },
    /**
     * Get insulin action.
     * @return {number[]} Insulin actions (min^-1, min^-1, unitless).
     */
    get x() {
      return x;
    },
    get state() {
      return { x };
    },
  };

  return api;
};
