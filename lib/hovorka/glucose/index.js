const debug = require('debug')('glucose');
const Gut = require('./gut');
const Accessible = require('./accessible');
const NonAccessible = require('./non-accessible');

module.exports = (dt) => {
  debug(`instantiating glucose subsystem with dt = ${dt} s.`);

  const gut = Gut(dt);
  const accessible = Accessible(dt);
  const nonAccessible = NonAccessible(dt);

  const api = {
    step: (x) => { // pass x as a vector perhaps?
      gut.step();
//      accessible.step(nonAccessible.q_out, x[0], gut.absorption);
      accessible.step(0, 0, gut.absorption);
      nonAccessible.step(0, x[1]);
    },
    eat: g => gut.eat(g),
    get glucose() {
      return accessible.glucose;
    },
  };

  return api;
};
