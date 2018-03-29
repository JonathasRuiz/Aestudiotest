
angular.module('io.service', []).
factory('io', function ($http) {
  var socket,
    ioServer,
    ioRoom,
    watches = {};

  return {
    init: function (conf) {
      ioServer = conf.ioServer;
      ioRoom = conf.ioRoom;

      socket = io.connect(conf.ioServer);
      socket.on('event.response', function (data) {
        console.log(data);
        console.log(ioRoom);
        if(data.data.room.io==ioRoom.io || data.data.room==ioRoom){
          var message = data;
          return watches['message'](message);
        }

        
      });

      socket.on('event.rooms', function (data) {
        var rooms = data;
        console.log(data);
        console.log(ioRoom);

          return watches['rooms'](data.rooms);

      });

      socket.on('event.getusers', function (data) {
        var users = data;
          return watches['users'](data);
        
      });

    },

    subscribe: function () {
      console.log(ioRoom);
      socket.emit('event.subscribe', ioRoom);
    },

    emit: function (arguments) {
      socket.emit('event.message', {
        room: ioRoom,
        message: arguments,
        //nickname:arguments.nickname
      });
    },

    watch: function (item, data) {
      watches[item] = data;
    },

    unWatch: function (item) {
      delete watches[item];
    },
    setioRoom:function(io){
      ioRoom=io;
    },
    getrooms:function(){
      socket.emit('event.getrooms');
    },
    createroom:function(io){
      socket.emit('event.createroom',io);
    },
    createuser:function(nickname){
      socket.emit('event.createuser', nickname);
    }

  };
});
