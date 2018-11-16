const t1d = require('./t1d/hovorka')(1);
for (t = 0; t < 10; t++) {
  console.log(`${t}, ${t1d.glucose}`);
  // this could return the time, or alternatively, we could
  // change to a stepTo function (or runUntil) with the time as a parameter
  t1d.step();
}
