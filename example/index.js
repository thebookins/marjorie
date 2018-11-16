const t1d = require('..')(1);

for (let t = 0; t < 10; t += 1) {
  console.log(`${t}, ${t1d.glucose}`);
  // this could return the time, or alternatively, we could
  // change to a stepTo function (or runUntil) with the time as a parameter
  t1d.step();
}
