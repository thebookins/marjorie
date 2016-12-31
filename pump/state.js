const memjs = require('memjs');
const mc = memjs.Client.create()

module.exports = () => {
  const buffer = Buffer.alloc(4);

  var reservoirUnits;

  mc.get('reservoir', function(err, val) {
    reservoirUnits = (val)? val.readUInt32LE(0) : 30000;
    console.log("reservoirUnits = ", reservoirUnits);
  })

  function writeState() {
    buffer.writeUInt32LE(reservoirUnits, 0);
    mc.set('reservoir', buffer, function(err, val) {
    });
  }

  return {
    get reservoirUnits() {
      console.log('in getter');
      return reservoirUnits;
    },
    set reservoirUnits(x) {
      console.log('in setter');
      if((x) && (x !== reservoirUnits)) {
        reservoirUnits = x;
        writeState();
      }
    }
  };
}
