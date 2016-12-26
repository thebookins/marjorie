var activationDate = new Date('February 4, 2006 06:30:00');
var sessionStartDate = new Date('February 4, 2006 06:30:00');

function generate (nsp) {
  setInterval(() => nsp.emit('glucose', 100), 1000);
}

exports = module.exports = generate;
