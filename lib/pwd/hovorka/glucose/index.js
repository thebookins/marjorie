const debug = require('debug')('marjorie:hovorka:glucose');
const Endogenous = require('./endogenous');
const Accessible = require('./accessible');
const NonAccessible = require('./non-accessible');

module.exports = ({
  dt = 1,
  params = { bodyMass: 60 },
  state = { accessible: undefined, nonAccessible: undefined },
} = {}) => {
  debug(`instantiating glucose subsystem with dt = ${dt} min.`);

  const endogenous = Endogenous(params.bodyMass);
  const accessible = Accessible({ dt, params, state: state.accessible });
  const nonAccessible = NonAccessible({ dt, state: state.nonAccessible });

  const api = {
    /**
     * Step forward dt minutes.
     * @param {number} U Gut absoprtion rate (mmol min^-1).
     * @param {Array} x Array of insulin actions ([min^-1, min^-1, (unitless)]).
     */
    step: (U, x) => {
      debug(`stepping ${dt} min with gut absorption rate ${U} mmol/min and insulin action ${x}`);
      accessible.step(nonAccessible.q_out, x[0], U, endogenous.EGP(x[2]));
      nonAccessible.step(accessible.q_out, x[1]);
    },
    /**
     * Get plasma gluose concentration.
     * @return {number} Plasma glucose concentration (mmol L^-1).
     */
    get glucose() {
      return accessible.glucose;
    },
    /**
     * Get state.
     * @return {Object} Module state variables.
     */
    get state() {
      return {
        accessible: accessible.state,
        nonAccessible: nonAccessible.state,
      };
    },
  };

  return api;
};
