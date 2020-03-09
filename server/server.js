let express = require('express'),
  app = express(),
  http = require('http').Server(app),
  path = require('path'),
  io = require('socket.io')(http),
  connectDB = require('./config'),
  mongoose = require('mongoose'),
  Message = require('./Message'),
  PORT = process.env.PORT || 4000;

// Connect database
connectDB();

app.use(express.static(path.join(__dirname, '..', 'client')));

io.on('connection', socket => {
  socket.on = 'Anonymous';
  console.log('Socket connected');

  // Get the last 10 messages from the database.
  Message.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .exec((err, messages) => {
      if (err) return console.error(err);

      socket.emit('show_message', messages);
    });

  // Listen to connected users for a new message.
  socket.on('new_message', msg => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      message: msg.message,
      name: msg.name,
    });

    // Save the message to the database.
    message.save(err => {
      if (err) return console.error('Errooooor: ', err);
    });

    // Notify all other users about a new message.
    socket.broadcast.emit('noti_msg', msg);
  });
});

http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
