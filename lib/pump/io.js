// TODO: this module can probably be deleted

var PUMP_COLLECTION = "pump";
const util = require('../../util')

module.exports = (io, pump, db) => {
  const nsp = io.of('/pump');

  // pump.on('reservoir', (value) => nsp.emit('reservoir', value));

  // NOTE: not sure of the wisdom of separating pump from io
  // wouldn't it be better to just run a single interval?
  setInterval(() => {
    nsp.emit('date', new Date().toTimeString());
  }, 1000);

  nsp.on('connection', (socket) => {
    socket.on('bolus', (units) => {
      units = units || 0;
      pump.bolus(units * 1000); // change units to mU
    });
    socket.on('temp basal', (unitsPerHour, duration) => {
      // TODO: implement
    })
  });

  return {
    status: function(req, res) {
      const status = {
        // clock,
        // batteryVolts,
        // batteryStatus,
        suspended: false,
        bolusing: false,
        reservoir: pump.reservoir,
        // model,
        // pumpID
      }
      res.json(status);
    },
    history: function(req, res) {
      res.json([]);
    },
    post: function(req, res) {
      var post = req.body;

      if (!post.command) {
        util.handleError(res, "Invalid user input", "Must provide a command.", 400);
      }

      switch (post.command) {
        case 'bolus':
          pump.bolus(post.args.insulin)
          break;
        default:
          // error: unknown command

      }

      // db.collection(PUMP_COLLECTION).insertOne(bolus, function(err, doc) {
      //   if (err) {
      //     handleError(res, err.message, "Failed to create new expense.");
      //   } else {
      //     // TODO: bolus the t1d (do we have a reference???)
      //     res.status(201).json(doc.ops[0]);
      //   }
      // })
    }
  }
}
