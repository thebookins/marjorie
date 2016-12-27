module.exports = (io, cgm) => {
  const nsp = io.of('/cgm');
  cgm.on('glucose', (message) => {
    var bufArr = new ArrayBuffer(14);
    var dataView = new DataView(bufArr);
    // opcode
    dataView.setUint8(0, 0x31, true /* littleEndian */);
    // status
    dataView.setUint8(1, message.status, true /* littleEndian */);
    // sequence
    dataView.setUint32(2, message.sequence, true /* littleEndian */);
    // timestamp
    dataView.setUint32(6, message.timestamp, true /* littleEndian */);
    // glucose
    dataView.setUint16(10, message.glucose, true /* littleEndian */);
    // state
    dataView.setUint8(12, message.state, true /* littleEndian */);
    // trend
    dataView.setUint8(12, message.trend, true /* littleEndian */);

//    nsp.emit('glucose', bufArr);
    nsp.emit('glucose', buf2hex(bufArr)); // for testing
  })

  nsp.on('connection', (socket) => {
    const sensorTime = cgm.time();
    var bufArr = new ArrayBuffer(14);
    var dataView = new DataView(bufArr);
    // opcode
    dataView.setUint8(0, 0x25, true /* littleEndian */);
    // status
    dataView.setUint8(1, sensorTime.status, true /* littleEndian */);
    // currentTime
    dataView.setUint32(2, sensorTime.timestamp, true /* littleEndian */);
    // sessionStartTime
    dataView.setUint32(6, sensorTime.sessionTimestamp, true /* littleEndian */);

    socket.emit('time', buf2hex(bufArr));
  })

  function buf2hex(buffer) { // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
  }
}
