// simple placeholder implementation of insulin system
const debug = require('debug')('insulin');
const Compartment = require('./compartment');

module.exports = (dt) => {
  debug(`instantiating insulin subsystem with dt = ${dt} s.`);

  const compartments = Array(2).fill(Compartment(dt));

  const absorption = () => compartments[1].u_out;

  return {
    step: (u) => {
      compartments[0].step(u);
      compartments[1].step(compartments[0].u_out);
    },
    get x() {
      return [0.01, 0, 0];
    },
  };
};
