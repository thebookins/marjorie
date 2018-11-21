const should = require('chai').should();
const Insulin = require('../lib/hovorka/insulin');

describe('Insulin', function() {
  describe('insulin', function() {
    it('should be zero with zero administration', function() {
      const insulin = Insulin(1);

      for (let t = 0; t < 60; t += 1) {
        insulin.insulin.should.equal(0);
        insulin.step(0);
      }
    });

    // NOTE: not sure about this test
    it('should peak around 55 min after a bolus', function() {
      const insulin = Insulin(1);

      let peakTime = 0;
      let peakInsulin = insulin.insulin;
      for (let t = 0; t < 10 * 60; t += 1) {
        insulin.step(t === 0 ? 1000 : 0);
        if (insulin.insulin > peakInsulin) {
          peakInsulin = insulin.insulin;
          peakTime = t;
        }
      }
      peakTime.should.be.within(45, 65);
    })
  })
});
