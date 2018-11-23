const debug = require('debug')('marjorie:havorka:glucose');
const Endogenous = require('./endogenous');
const Gut = require('./gut');
const Accessible = require('./accessible');
const NonAccessible = require('./non-accessible');

module.exports = (dt) => {
  debug(`instantiating glucose subsystem with dt = ${dt} s.`);

  const gut = Gut(dt);
  const endogenous = Endogenous(dt, 60);
  const accessible = Accessible(dt);
  const nonAccessible = NonAccessible(dt);

  const api = {
    step: (x) => {
      debug(`stepping ${dt} min with insulin action ${x}`);
      gut.step();
      accessible.step(nonAccessible.q_out, x[0], gut.absorption, endogenous.EGP(x[2]));
      nonAccessible.step(0, x[1]);
    },
    eat: g => gut.eat(g),
    get glucose() {
      return accessible.glucose;
    },
  };

  return api;
};
