const Model = require('./hovorka');

module.exports = (dt) => {
  const model = Model(dt);

  const api = {
    step: () => {
      model.step();
    },
    eat: () => {},
    dose: () => {},
    sense: () => model.glucose,
  };

  return api;
};
