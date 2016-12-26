var events = require('events');

module.exports = (t1d) => {
  var eventEmitter = new events.EventEmitter();

  // private data
  var activationDate = new Date('February 4, 2006 06:30:00');
  var sessionStartDate = new Date('February 4, 2006 06:30:00');
  var timestamp = 0;

  return {
    // exampe of API (public) function
    doStep: () => {
      if (!(timestamp % 10)) { // every five minutes
        eventEmitter.emit('glucose', t1d.sense());
      }
      timestamp++;
      console.log('completed step ' + timestamp);
    },

    on: (message, callback) => eventEmitter.on(message, callback)
  };
}
