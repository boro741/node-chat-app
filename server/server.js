const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

console.log(publicPath);

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// To register an event listener.
// connection - it lets listen to new connection.
io.on('connection', (socket) => {
    console.log('New user connected');

    // Emit the custom event - newEmail
    socket.emit('newMessage', {
        from: 'pavanboro@gmail.com',
        text: 'same2u',
        createdAt: 123
    });

    // Creating custom event on server side.
    socket.on('createMessage', (message) => {
        console.log('createMessage',message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


// Since we are now using http server, not express server.
server.listen(port , () => {
    console.log(`Server is up on ${port}`);
});