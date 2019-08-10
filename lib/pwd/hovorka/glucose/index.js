const debug = require('debug')('marjorie:hovorka:glucose');
const Endogenous = require('./endogenous');
const Accessible = require('./accessible');
const NonAccessible = require('./non-accessible');

module.exports = (
  dt,
  params,
  state = { accessible: undefined, nonAccessible: undefined },
) => {
  debug(`instantiating glucose subsystem with dt = ${dt} min.`);

  const endogenous = Endogenous(params.bodyMass);
  const accessible = Accessible(dt, params, state.accessible);
  const nonAccessible = NonAccessible(dt, state.nonAccessible);

  const api = {
    step: (U, x) => {
      debug(`stepping ${dt} min with gut absorption rate ${U} mmol/min and insulin action ${x}`);
      accessible.step(nonAccessible.q_out, x[0], U, endogenous.EGP(x[2]));
      nonAccessible.step(accessible.q_out, x[1]);
    },
    get glucose() {
      return accessible.glucose;
    },
    get state() {
      return {
        accessible: accessible.state,
        nonAccessible: nonAccessible.state,
      };
    },
  };

  return api;
};
