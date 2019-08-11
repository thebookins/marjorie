const debug = require('debug')('marjorie:hovorka:gut');

const glucoseMW = 180.156; // g mol^-1

class Meal {
  constructor(g, t) {
    this.g = g;
    this.t = t;
  }

  // units: mmol min^-1
  absorption(A_G, t_max_G) {
    const carbs_mmol = 1e3 * this.g / glucoseMW;
    return (carbs_mmol * A_G * this.t * Math.exp(-this.t / t_max_G)) / (t_max_G * t_max_G);
  }

  step(dt) {
    this.t += dt;
  }
}

module.exports = ({
  dt = 1,
  state = { meals: [] },
} = {}) => {
  debug(`instantiating gut subsystem with dt = ${dt} min and meals = ${JSON.stringify(state.meals)}.`);

  // constants
  const A_G = 0.8; // unitless
  const t_max_G = 40; // min

  // state variables
  const meals = state.meals.map(m => new Meal(m.carbohydrates, m.t));

  // API
  const api = {
    step: () => {
      meals.forEach(meal => meal.step(dt));
      // TODO: we need to drop meals after a long enough t
    },
    eat: (g) => {
      meals.push(new Meal(g, 0));
    },
    // units: mmol min^-1
    get absorption() {
      return meals.reduce((a, meal) => a + meal.absorption(A_G, t_max_G), 0);
    },
    get state() {
      return { meals };
    },
  };

  return api;
};
