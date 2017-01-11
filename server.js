var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require("express");
var port = 3000;
var onlineUsers = [];
console.log(onlineUsers);
app.use(express.static(__dirname + '/'));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on("join", function(user) {
        socket.nickname = user;
        onlineUsers.push(user);
        io.emit("user list", onlineUsers);
        var name = onlineUsers.indexOf(user);
        console.log(name);

    });
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);

        var nickname = socket.nickname;

        io.emit('chat message', nickname + ": " + msg);
      

    });
    socket.on('disconnect', function() {
        console.log('user disconnected');

    });


});

http.listen(port, function() {
    console.log('listening on *:' + port);
});
