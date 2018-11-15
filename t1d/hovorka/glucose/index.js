const debug = require('debug')('glucose');
const NonAccessible = require('./non-accessible');

module.exports = (dt) => {
  const accessible = require('./accessible')(dt);
  const nonAccessible = NonAccessible(dt);

  return api = {
    step: (x) => { // pass x as a vector perhaps?
      accessible.step(nonAccessible.q_out, x[0]);
      nonAccessible.step(0, x[1]);
    },
    get glucose() {
      return accessible.glucose;
    }
  };
}
