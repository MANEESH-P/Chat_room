var express = require('express');
var socket = require('socket.io')
//app setup
var app = express();
const port = process.env.port || 4000 ;
var server = app.listen(port, function(){
  console.log('listening at port 4000');
});

//static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('made socket connection',socket.id);

  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing',data)
  });
});
