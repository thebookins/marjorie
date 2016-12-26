module.exports = (nsp) => {
  // private data
  var reservoirUnits = 300;

  setInterval(() => nsp.emit('reservoir', reservoirUnits), 1000);

  // perhaps move this socket stuff into a comms module?
  nsp.on('connection', (socket) => {
    socket.on('bolus', (units) => {
      units = units || 0;
      reservoirUnits -= units;
    });
  });

  return {
    // public getters
    reservoirUnits,

    // API (public) functions
    bolus: (units) => {
      reservoirUnits -= units;
      return true;
    },

    prime: (reservoirUnits) => {
      reservoirUnits = reservoirUnits;
    }
  };
}
