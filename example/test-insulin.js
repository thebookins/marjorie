const insulin = require('../lib/hovorka/insulin')(1);

for (let t = 0; t < 10; t += 1) {
  console.log(`${t}, ${insulin.insulin}`);
  // this could return the time, or alternatively, we could
  // change to a stepTo function (or runUntil) with the time as a parameter
  insulin.step(t === 0 ? 1000 : 0);
}
