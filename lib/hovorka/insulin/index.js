// simple placeholder implementation of insulin system
const debug = require('debug')('insulin');

module.exports = (dt) => {
  debug(`instantiating insulin subsystem with dt = ${dt} s.`);
  return {
    step: () => {},
    get x() {
      return [0.01, 0, 0];
    },
  };
};
