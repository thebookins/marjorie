const should = require('chai').should();
const Pump = require('../lib/pump');

describe('Pump', function() {
  describe('basal', function() {
    it('should set temporary basal rates', function() {
      const pump = Pump();
      const reservoirStart = pump.reservoir;
      pump.basal.currentRate.should.equal(1);
      pump.basal.setTemp(5.0, 30);
      for (let n = 0; n < 30; n += 1) {
        pump.step()
        pump.basal.currentRate.should.equal(5);
      }
      pump.reservoir.should.be.closeTo(reservoirStart - 2.5, 1e-3);
      pump.step()
      pump.basal.currentRate.should.equal(1);
    });
    it('should cancel temporary basal rates', function() {
      const pump = Pump();
      const reservoirStart = pump.reservoir;
      pump.basal.setTemp(5.0, 30);
      for (let n = 0; n < 15; n += 1) {
        pump.step()
        pump.basal.currentRate.should.equal(5);
      }
      pump.basal.cancelTemp();
      pump.step()
      pump.basal.currentRate.should.equal(1);
    });
    it('should notify on basal rate transitions', function(done) {
      const pump = Pump();
      pump.on('basal', rate => {
        rate.should.equal(5);
        done();
      });
     pump.basal.setTemp(5, 30);
     pump.step();
    });
  });
});
