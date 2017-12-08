var socket = io.connect('http://localhost:8080');

function element(id) {
    return document.getElementById(id);
}
var message = element('message'),
    handle = element('handle'),
    btn = element('send'),
    output = element('output'),
    feedback = element('feedback');
btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
})
message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
    if (event.which === 13 && event.shiftKey == false) {
        socket.emit("chat", {
            message: message.value,
            handle: handle.value
        });
        message.value = "";
    }
})
socket.on('chat', function(data) {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
});
socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})