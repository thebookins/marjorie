module.exports = (io, pump) => {
  const nsp = io.of('/pump');

  pump.on('reservoir', (value) => nsp.emit('reservoir', value));

  nsp.on('connection', (socket) => {
    socket.on('bolus', (units) => {
      units = units || 0;
      pump.bolus(units);
    });
  });
}
