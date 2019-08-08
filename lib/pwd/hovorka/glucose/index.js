const debug = require('debug')('marjorie:hovorka:glucose');
const Endogenous = require('./endogenous');
const Accessible = require('./accessible');
const NonAccessible = require('./non-accessible');

module.exports = (dt, state = {
  accessible: undefined,
  nonAccessible: undefined,
}) => {
  debug(`instantiating glucose subsystem with dt = ${dt} min.`);

  const endogenous = Endogenous(dt, 60);
  const accessible = Accessible(dt, state.accessible);
  const nonAccessible = NonAccessible(dt, state.nonAccessible);

  const api = {
    step: (U, x) => {
      debug(`stepping ${dt} min with gut absorption rate ${U} g/min and insulin action ${x}`);
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
