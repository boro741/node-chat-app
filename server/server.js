const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

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

    // Socket.emit - it emits event to single connection.
    // Emit the custom event - newMessage
    /* socket.emit('newMessage', {
        from: 'pavanboro@gmail.com',
        text: 'same2u',
        createdAt: 123
    }); */

    // Challenge ::
    // socket.emit from Admin text Welcome to the chat app.
    // socket.broadcast.emit from Admin text New user joined.
    socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat app.'));

    socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined.'));

    

    // Creating custom event on server side.
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage',message);

        // io.emit - it emits event to every single connection.
        io.emit('newMessage',generateMessage(message.from, message.text));
        callback();
        /* socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }); */
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



// Since we are now using http server, not express server.
server.listen(port , () => {
    console.log(`Server is up on ${port}`);
});