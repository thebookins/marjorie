const glucose = require('../lib/hovorka/glucose')(1);

for (let t = 0; t < 10; t += 1) {
  console.log(`${t}, ${glucose.glucose}`);
  // this could return the time, or alternatively, we could
  // change to a stepTo function (or runUntil) with the time as a parameter
  glucose.step([0, 0, 0]);
}
