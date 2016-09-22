'use strict';

//node modules
const net = require('net');
const EE = require('events');

//app modules
const Client = require('./model/client.js');

//env vars
const PORT = process.env.PORT || 3000;

//module constants
const pool = [];
const ee = new EE();
const server = net.createServer();

ee.on('\\all', function(client, string) {
  console.log(string);
  pool.forEach(c => {
    c.socket.write(`${client.nickname}: ` + string);
  });
});

ee.on('\\nick', function(client, string) {
  client.nickname = string.trim();
});

ee.on('\\dm', function(client, string) {
  var nicknameDirectMessage = string.toString().split(' ').shift(1).trim();
  var message = string.toString().split(' ').slice(1).join(' ');

  pool.forEach(client => {
    if (nicknameDirectMessage === client.nickname) {
      client.socket.write(`message sent to ${client.nickname}`);
      client.socket.write(message);
    }
  });
});

ee.on('default', function(client) {
  client.socket.write('not a valid command. See README for instructions\n');
});

server.on('connection', function(socket) {
  var client = new Client(socket);
  pool.push(client);

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if (command.startsWith('\\')) {
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }

    ee.emit('default', client);

  });

  socket.on('error', function(err) {
    console.error(err);
  });

  socket.on('close', function(client) {
    for (var i = 0; i < pool.length; i++) {
      if (pool[i].id === client.id) {
        var desiredIndex = pool.indexOf(client);
        pool.splice(desiredIndex, 1);
      }
    }
  });
});

server.listen(PORT, function(){
  console.log('server running on port', PORT);
});
