'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

// t1d
const t1d = require('./t1d')();
// end t1d

// cgm
const cgm = require('./cgm')(t1d);
const cgmNsp = io.of('/cgm');
cgm.on('glucose', (value) => cgmNsp.emit('glucose', value));
// end cmg

// pump
const pump = require('./pump')(t1d);
const pumpNsp = io.of('/pump');
pump.on('reservoir', (value) => pumpNsp.emit('reservoir', value));

pumpNsp.on('connection', (socket) => {
  socket.on('bolus', (units) => {
    units = units || 0;
    pump.bolus(units);
  });
});
// end pump

// global timer - replace with something more accurate
// 1 Hz too fine???
setInterval(() => {
  cgm.doStep();
  pump.doStep();
  t1d.doStep();
}, 1000);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
