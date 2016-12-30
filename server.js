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

// cgm
const cgm = require('./cgm')(t1d);
require('./cgmIO')(io, cgm);

// pump
const pump = require('./pump')(t1d);
require('./pumpIO')(io, pump);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

const memjs = require('memjs');
const mc = memjs.Client.create()

mc.set('reservoir', 'test', function(err, val) {
});
mc.get('reservoir', function(val) {
  console.log("reservoirUnits = " + val);
})
