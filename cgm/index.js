const events = require('events');

module.exports = (t1d) => {
  const eventEmitter = new events.EventEmitter();

  // private data
  var activationDate = new Date('February 4, 2006 06:30:00');
  var sessionStartDate = new Date('February 4, 2006 06:30:00');
  var sequence = 0;
  var timestamp = 0;

  setInterval(() => {
    if (!(timestamp % 300)) { // every five minutes
      eventEmitter.emit('glucose', t1d.sense());
      sequence++;
    }
    timestamp++;
  }, 1000);

  return {
    on: (message, callback) => eventEmitter.on(message, callback)
  };
}
