const should = require('chai').should();
const Glucose = require('../lib/pwd/hovorka/glucose');

describe('Glucose', function() {
  it('should instantiate with default state', function () {
    Glucose(1).should.not.throw;
  });
  it('should instantiate with custom state', function () {
    const state = {
      accessible: {
        Q: 65,
        q_out: 0.5,
      },
      nonAccessible: {
        Q: 30,
      },
    };

    const glucose = Glucose(1, state);

    glucose.state.should.eql(state);
  });
//   describe('insulin', function() {
//     it('should be zero with zero administration', function() {
//       const insulin = Insulin(1);
//
//       for (let t = 0; t < 60; t += 1) {
//         insulin.insulin.should.equal(0);
//         insulin.step(0);
//       }
//     });
//
//     // NOTE: not sure about this test
//     it('should peak around 55 min after a bolus', function() {
//       const insulin = Insulin(1);
//
//       let peakTime = 0;
//       let peakInsulin = insulin.insulin;
//       for (let t = 0; t < 10 * 60; t += 1) {
//         insulin.step(t === 0 ? 1000 : 0);
//         if (insulin.insulin > peakInsulin) {
//           peakInsulin = insulin.insulin;
//           peakTime = t;
//         }
//       }
//       peakTime.should.be.within(45, 65);
//     })
//   })
});
