const Model = require('..');

// TODO: store this as JSON
const state = {
  glucose: {
    gut: {
      meals: [
        { g: 100, t: 30 },
      ],
    },
    accessible: {
      Q: 60,
      q_out: 0,
    },
    nonAccessible: {
      Q: 0,
    },
  },
  insulin: {
    action: {
      x: [0, 0, 0],
    },
    compartments: [
      { S: 1 },
      { S: 0 },
    ],
  },
};

console.log(JSON.stringify(state));

const model = Model(1);
for (let t = 0; t < 10; t += 1) {
  console.log(`${t}, ${model.glucose}`);
  // this could return the time, or alternatively, we could
  // change to a stepTo function (or runUntil) with the time as a parameter
  model.step(0);
}

console.log(JSON.stringify(model.state));
