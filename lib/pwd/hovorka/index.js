const debug = require('debug')('marjorie:hovorka');
const Glucose = require('./glucose');
const Insulin = require('./insulin');

module.exports = (dt, state = { glucose: undefined, insulin: undefined }) => {
  const glucose = Glucose(dt, state.glucose);
  const insulin = Insulin(dt, state.insulin);

  const api = {
    /**
     * Step forward dt seconds.
     * @param {number} U_G Gut absorption (mmol/min).
     * @param {number} U_I Insulin infusion (mU/min).
     */
    step: (U_G, U_I) => {
      // TODO: consider removing the insulin absorption model
      // so that the input here is U_I (appearance of insulin in plasma).
      // This would make it consistent with the treatment of glucose absorption.
      debug(`stepping ${dt} min with ${U_G} g/min glucose appearance and ${U_I} mU/min insulin`);
      glucose.step(U_G, insulin.x);
      insulin.step(U_I);
    },
    bolus: (u) => {
      debug(`bolusing ${u} mU insulin`);
      insulin.bolus(u);
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
        glucose: glucose.state,
        insulin: insulin.state,
      };
    },
  };

  return api;
};
