let express = require('express'),
  path = require('path'),
  http = require('http'),
  socketio = require('socket.io'),
  connectDB = require('./dbconfig'),
  Message = require('./model/Message'),
  dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello');
});

// Connect database
connectDB();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

io.on('connection', socket => {
  // socket.on = 'Anonymous';
  console.log('Socket connected');
  console.log('New user connected');

  // Get the last 10 messages from the database.
  Message.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .exec((err, messages) => {
      if (err) return console.error(err);

      io.sockets.emit('show_message', messages);
    });

  // Listen to connected users for a new message.
  socket.on('new_message', msg => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      content: msg.content,
      username: socket.username,
    });
    console.log(msg);
    io.sockets.emit(' new_message', message);
    console.log('New Message : ', message);

    // Save the message to the database.
    message.save(err => {
      if (err) return console.error('Errooooor: ', err);
    });
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
