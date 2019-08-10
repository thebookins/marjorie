// simple placeholder implementation of insulin system
const debug = require('debug')('marjorie:hovorka:insulin');
const Compartment = require('./compartment');
const Action = require('./action');

module.exports = (dt, params, state = { compartments: [undefined, undefined], I: 0 }) => {
  debug(`instantiating insulin subsystem with dt = ${dt} min.`);

  const V = 0.12 * params.bodyMass; // L
  const k_e = 0.138; // min^-1

  const compartments = Array(2).fill().map((e, i) => Compartment(dt, state.compartments[i]));
  const action = Action(dt, state.action);

  let { I } = state; // plasma insulin in mU

  const api = {
    /**
     * Step forward dt seconds with .
     * @param {number} U Insulin infusion (mU/min).
     */
    step: (U) => {
      debug(`stepping ${dt} min with ${U} units of insilin`);
      let u_in = U;
      compartments.forEach((c) => {
        c.step(u_in);
        u_in = c.u_out;
      });
      action.step(api.insulin);
      // TODO consider farming this out to a 'distribution' module
      I += (u_in - k_e * I) * dt;
    },
    /**
     * Bolus.
     * @param {number} u Insulin administration (mU).
     */
    bolus: (u) => {
      debug(`bolusing ${u} units of insulin`);
      compartments[0].bolus(u);
    },
    /**
     * Get plasma insulin concentration.
     * @return {number} Plasma insulin concentration (mU L^-1).
     */
    get insulin() { // mU L^-1
      return I / V;
    },
    /**
     * Get insulin action.
     * @return {number[]} Insulin action vector (min^-1).
     */
    get x() {
      return action.x;
    },
    get state() {
      return {
        I,
        compartments: compartments.map(c => c.state),
        action: action.state,
      };
    },
  };

  return api;
};
