const debug = require('debug')('marjorie:hovorka');
const Gut = require('./gut');
const Glucose = require('./glucose');
const Insulin = require('./insulin');

module.exports = (
  dt,
  params = { bodyMass: 60 }, // kg
  state = { gut: undefined, glucose: undefined, insulin: undefined },
) => {
  const gut = Gut(dt, state.gut);
  const glucose = Glucose(dt, params, state.glucose);
  const insulin = Insulin(dt, params, state.insulin);

  const api = {
    /**
     * Step forward dt seconds.
     * @param {number} U_G Gut absorption (mmol/min).
     * @param {number} U_I Insulin infusion (mU/min).
     */
    step: (U_I) => {
      // TODO: consider removing the insulin absorption model
      // so that the input here is U_I (appearance of insulin in plasma).
      // This would make it consistent with the treatment of glucose absorption.
      debug(`stepping ${dt} min with ${U_I} mU/min insulin`);
      gut.step();
      glucose.step(gut.absorption, insulin.x);
      insulin.step(U_I);
    },
    bolus: (u) => {
      debug(`bolusing ${u} mU insulin`);
      insulin.bolus(u);
    },
    eat: (g) => {
      debug(`eating ${g} g carb`);
      gut.eat(g);
    },
    /**
     * Get plasma gluose concentration.
     * @return {number} Plasma glucose concentration (mmol L^-1).
     */
    get glucose() {
      return glucose.glucose;
    },
    get state() {
      return {
        gut: gut.state,
        glucose: glucose.state,
        insulin: insulin.state,
      };
    },
  };

  return api;
};
