// Initiating requesting from client side.
var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');

    // Emitting the event.
    /* socket.emit('createMessage', {
        from: 'Pavan',
        text: 'Happy New year'
    }); */
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

// Custom Event on client side.
socket.on('newMessage', function(message){
    console.log('New Message', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.emit('createMessage',{
    from: 'Sahil',
    text: 'Happy new year'
}, function(){
    console.log('Got it');
});

jQuery('#message-form').on('submit', function(e){
    // Prevents default behaviour of form.
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){
         
    });
});