const debug = require('debug')('marjorie:hovorka:glucose');
const Endogenous = require('./endogenous');
const Gut = require('./gut');
const Accessible = require('./accessible');
const NonAccessible = require('./non-accessible');

module.exports = (dt, state = {
  gut: undefined,
  accessible: undefined,
  nonAccessible: undefined,
}) => {
  debug(`instantiating glucose subsystem with dt = ${dt} min.`);

  const gut = Gut(dt, state.gut);
  const endogenous = Endogenous(dt, 60);
  const accessible = Accessible(dt, state.accessible);
  const nonAccessible = NonAccessible(dt, state.nonAccessible);

  const api = {
    step: (x) => {
      debug(`stepping ${dt} min with insulin action ${x}`);
      gut.step();
      accessible.step(nonAccessible.q_out, x[0], gut.absorption, endogenous.EGP(x[2]));
      nonAccessible.step(accessible.q_out, x[1]);
    },
    eat: g => gut.eat(g),
    get glucose() {
      return accessible.glucose;
    },
    get state() {
      return {
        gut: gut.state,
        accessible: accessible.state,
        nonAccessible: nonAccessible.state,
      };
    },
  };

  return api;
};
