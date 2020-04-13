let express = require('express'),
  path = require('path'),
  http = require('http'),
  socketio = require('socket.io'),
  connectDB = require('./database/db'),
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
app.use('/api/users', require('./routes/users')); // register new users
app.use('/api/getUser', require('./routes/getUser')); // retrieve users
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chats', require('./routes/chats'));
app.use('/api/log', require('./routes/log'));
app.use('/api/room', require('./routes/room'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

io.on('connection', (socket) => {
  socket.username = 'Anonymous';
  socket.join('public');
  console.log('Socket connected');
  console.log('New user connected');

  // New Message
  socket.on('new_message', (msg) => {
    io.in(msg.room).emit('new_message', msg);
  });

  // New user join in
  socket.on('new_user', (user) => {
    io.emit('new_user', user);
    console.log('User ', JSON.stringify(user), ' has joined in');
  });

  // Join Room
  socket.on('join_room', (joinRoom) => {
    const { room } = joinRoom;
    socket.join(joinRoom.room);
    io.in(room).emit('join_room', joinRoom);
    console.log('Join room ', JSON.stringify(joinRoom));
  });

  // Leave Room
  socket.on('leave_room', (leaveRoom) => {
    const { room } = leaveRoom;
    socket.leave(leaveRoom.room);
    io.in(room).emit('leave_room', leaveRoom);
    console.log('Leave room ', JSON.stringify(leaveRoom));
  });

  // User left
  socket.on('user_left', (user) => {
    io.emit('user_left', user);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User has left...');
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
