module.exports = (nsp) => {
  // private data
  var activationDate = new Date('February 4, 2006 06:30:00');
  var sessionStartDate = new Date('February 4, 2006 06:30:00');

  setInterval(() => nsp.emit('glucose', 100), 1000);

  return {
    // exampe of API (public) function
    // area: () => width * width
  };
}
