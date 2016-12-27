module.exports = (io, cgm) => {
  const nsp = io.of('/cgm');
  cgm.on('glucose', (value) => nsp.emit('glucose', value));
}
