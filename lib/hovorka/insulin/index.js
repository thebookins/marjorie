// simple placeholder implementation of insulin system
const debug = require('debug')('insulin');
const Compartment = require('./compartment');
const Action = require('./action');

module.exports = (dt) => {
  debug(`instantiating insulin subsystem with dt = ${dt} s.`);

  const V = 7.2; // L
  const k_e = 0.138; // min^-1

  const compartments = Array(2).fill().map(() => Compartment(dt));
  const action = Action(dt);

  let I = 0; // mU

  const api = {
    step: (u) => { // mU min^1
      let u_in = u;
      compartments.forEach((c) => {
        c.step(u_in);
        u_in = c.u_out;
      });
      action.step(api.insulin);
      // TODO consider farming this out to a 'distribution' module
      I += (u_in - k_e * I) * dt;
    },
    get insulin() { // mU L^-1
      return I / V;
    },
    get x() {
      return action.x;
    },
  };

  return api;
};
