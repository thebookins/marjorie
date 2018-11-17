class Meal {
  constructor(g) {
    this.g = g;
    this.t = 0;
  }

  absorption(A_G, t_max_G) {
    return (this.g * A_G * this.t * Math.exp(-this.t / t_max_G)) / (t_max_G * t_max_G);
  }

  step(dt) {
    this.t += dt;
  }
}

module.exports = (dt) => {
  const A_G = 0.8; // unitless
  const t_max_G = 40; // min

  const meals = [];

  // API
  const api = {
    step: () => {
      meals.forEach(meal => meal.step(dt));
      // TODO: we need to drop meals after a long enough t
    },
    eat: (g) => {
      meals.push(new Meal(g));
    },
    get absorption() {
      return meals.reduce((a, meal) => a + meal.absorption(A_G, t_max_G), 0);
    },
  };

  api.eat(100);

  return api;
};
