const debug = require('debug')('glucose');
const Accessible = require('./accessible');
const NonAccessible = require('./non-accessible');

module.exports = (dt) => {
  debug(`instantiating glucose subsystem with dt = ${dt} s.`);

  const accessible = Accessible(dt);
  const nonAccessible = NonAccessible(dt);

  const api = {
    step: (x) => { // pass x as a vector perhaps?
      accessible.step(nonAccessible.q_out, x[0]);
      nonAccessible.step(0, x[1]);
    },
    get glucose() {
      return accessible.glucose;
    },
  };

  return api;
};
