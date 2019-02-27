/* eslint prefer-arrow-callback: "off" */
/* eslint func-names: "off" */

const should = require('chai').should();
const Pump = require('../lib/pump');

describe('Pump', function () {
  it('should suspend and unsuspend', function () {
    const pump = Pump();
    pump.state.suspended.should.be.false;
    pump.suspend();
    pump.state.suspended.should.be.true;
    pump.unsuspend();
    pump.state.suspended.should.be.false;
  });
  it('should not deliver any insulin when suspended', function () {
    const pump = Pump();
    const reservoirStart = pump.reservoir;
    pump.suspend();
    for (let n = 0; n < 30; n += 1) {
      pump.step();
    }
    pump.reservoir.should.be.closeTo(reservoirStart, 1e-3);
  });
  it('should notify on suspend', function (done) {
    const pump = Pump({ suspended: false });
    // NOTE: if we suspend while suspended, what do we expect? no event?
    pump.on('suspend', () => {
      done();
    });
    pump.suspend();
  });
  it('should notify on unsuspend', function (done) {
    const pump = Pump({ suspended: true });
    // NOTE: if we unsuspend while unsuspended, what do we expect? no event?
    pump.on('unsuspend', () => {
      done();
    });
    pump.unsuspend();
  });
  it('should reset reservoir', function () {
    const pump = Pump({ reservoir: 50 });
    pump.reset();
    pump.reservoir.should.equal(300);
  });
  describe('basal', function () {
    it('should set temporary basal rates', function () {
      const pump = Pump();
      const reservoirStart = pump.reservoir;
      pump.basal.currentRate.should.equal(1);
      pump.basal.setTemp(5.0, 30);
      for (let n = 0; n < 30; n += 1) {
        pump.step();
        pump.basal.currentRate.should.equal(5);
      }
      pump.reservoir.should.be.closeTo(reservoirStart - 2.5, 1e-3);
      pump.step();
      pump.basal.currentRate.should.equal(1);
    });
    it('should cancel temporary basal rates', function () {
      const pump = Pump();
      pump.basal.setTemp(5.0, 30);
      for (let n = 0; n < 15; n += 1) {
        pump.step();
        pump.basal.currentRate.should.equal(5);
      }
      pump.basal.cancelTemp();
      pump.step();
      pump.basal.currentRate.should.equal(1);
    });
    it('should notify on basal rate transitions', function (done) {
      const pump = Pump();
      pump.on('basal', (rate) => {
        rate.should.equal(5);
        done();
      });
      pump.basal.setTemp(5, 30);
      pump.step();
    });
  });

  describe('bolus', function () {
    it('should bolus', function (done) {
      const pump = Pump();
      pump.bolus(5).then((dose) => {
        dose.should.equal(5);
        done();
      });
    });
    it('should reject a bolus if requested value exceeds reservoir level', function (done) {
      const pump = Pump({ reservoir: 3 });
      pump.bolus(5).catch(() => {
        done();
      });
    });
    it('should notify on bolus completion', function (done) {
      const pump = Pump();
      pump.on('bolus', (dose) => {
        dose.should.equal(5);
        done();
      });
      pump.bolus(5);
    });
  });
});
