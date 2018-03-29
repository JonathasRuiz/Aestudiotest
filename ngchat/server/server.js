var express = require('express');
var server = require('http').createServer(app);
var app = express();
var io = require('socket.io').listen(server);
var rooms=[];
users=[];
connections=[];

var port = 3696;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

io.on('connection', function (socket) {

  console.log('user connected...');
  socket.events = {};

  socket.on('event.createuser',function(data){
    socket.username=data;
    users.push(socket.username);

    updateUserNames();
  });

  function updateUserNames(){
    io.sockets.emit('event.getusers', users);

}  

  socket.on('event.message', function (payload) {

    console.log('message emitted:'+ JSON.stringify(payload));
    io.sockets.emit('event.response', {data:payload,user:socket.username});
  });

  socket.on('event.subscribe', function (room) {
    console.log('subscribing to', room.io);
    socket.join(room.io);
  });

  socket.on('event.unsubscribe', function (room) {
    console.log('unsubscribing to ', room);
    socket.leave(room);
  });

  socket.on('event.createroom',function(room){
    console.log(room);
    rooms.push(room);
    io.sockets.emit('event.rooms', {rooms:rooms});
  });

  socket.on('event.getrooms',function(){
    io.sockets.emit('event.rooms', {rooms:rooms});
  });

  socket.on('disconnect', function () {
    users.splice(users.indexOf(socket.username),1);
    updateUserNames();    
    console.log('user disconnected...');
  });

});
