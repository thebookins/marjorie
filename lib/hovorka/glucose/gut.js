module.exports = (dt) => {
  const A_G = 0.8; // unitless
  const t_max_G = 40; // min

  let D_G = 100;
  let t = 0;

  // API
  const api = {
    step: () => {
      t += dt;
    },
    eat: (g) => {},
    get absorption() {
      return (D_G * A_G * t * Math.exp(-t / t_max_G)) / (t_max_G * t_max_G);
    },
  };

  return api;
};
