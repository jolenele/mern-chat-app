let express = require('express'),
  path = require('path'),
  http = require('http'),
  socketio = require('socket.io'),
  connectDB = require('./dbconfig'),
  Message = require('./model/Message'),
  dotenv = require('dotenv');

dotenv.config();

// Initialize server and socketIO
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;

// Connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Routes
app.get('/', (req, res) => res.send('API is runnning...'));
app.use('/users', require('./routes/users'));

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

io.on('connection', socket => {
  socket.username = 'Anonymous';
  socket.room = 'public';
  socket.join('public');
  console.log('Socket connected');
  console.log('New user connected');

  // Get the last 10 messages from the database.
  Message.find({ room: socket.room })
    .sort({ createdAt: -1 })
    .limit(10)
    .exec((err, messages) => {
      if (err) return console.error(err);
      // io.sockets.to(socket.room).emit('show_message', messages);
      socket.to(socket.room).emit('show_message', messages);
    });

  // Listen to connected users for a new message.
  socket.on('new_message', msg => {
    const message = new Message({
      content: msg.content,
      username: socket.username,
    });
    // Save the message to the database.
    message.save(err => {
      if (err) return console.error(err);
    });
    socket.broadcast.to(socket.room).emit('push_message', msg);
  });
  socket.on('change_room', data => {
    socket.leave(socket.room);
    socket.room = data.room;
    socket.join(data.room);
    Message.find({ room: socket.room })
      .sort({ createdAt: -1 })
      .limit(10)
      .exec((err, messages) => {
        if (err) return console.error(err);
        io.sockets.to(socket.room).emit('show_message', messages);
      });
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', { username: socket.username });
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
