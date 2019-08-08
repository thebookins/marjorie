class Meal {
  constructor(g, t) {
    this.g = g;
    this.t = t;
  }

  absorption(A_G, t_max_G) {
    return (this.g * A_G * this.t * Math.exp(-this.t / t_max_G)) / (t_max_G * t_max_G);
  }

  step(dt) {
    this.t += dt;
  }
}

module.exports = (dt, state = { meals: [] }) => {
  // constants
  const A_G = 0.8; // unitless
  const t_max_G = 40; // min

  // state variables
  const meals = state.meals.map(m => new Meal(m.g, m.t));

  // API
  const api = {
    step: () => {
      meals.forEach(meal => meal.step(dt));
      // TODO: we need to drop meals after a long enough t
    },
    eat: (g) => {
      meals.push(new Meal(g, 0));
    },
    get absorption() {
      return meals.reduce((a, meal) => a + meal.absorption(A_G, t_max_G), 0);
    },
    get state() {
      return { meals };
    },
  };

  return api;
};
