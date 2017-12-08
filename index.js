var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);
// var mongo = require("mongodb").MongoClient;
// mongo.connect("mongodb://localhost/chatapp", function(err,db) {
//     console.log("Mongodb connected......");
//     let chat = db.collection;
// });
io.on('connection', function(socket) {
    console.log("A user connected");

    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    })

    socket.on("disconnect", function() {
        console.log("user disconnected");
    });
})

app.use(express.static('public'));
http.listen(process.env.PORT || 8080, function() {
    console.log("Connected to server");
});