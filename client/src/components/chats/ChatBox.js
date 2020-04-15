import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ChatBar from './ChatBar';
import Contact from '../admin/Contact';
import { fade, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import socketIOClient from 'socket.io-client';
import store from '../../store';
import ChatIcon from '@material-ui/icons/Chat';
import FaceIcon from '@material-ui/icons/Face';
import { loadUser } from '../../actions/auth';
import setAuthToken from '../../actions/setAuthToken';
import Chip from '@material-ui/core/Chip';
import {
  addChat,
  addLog,
  getChats,
  getLogs,
  getUsers,
  getRooms,
} from './ActionHelper';
// import combineReducers from '../../reducers/index';

const useStyles = makeStyles((theme) => ({
  appBar: {
    bottom: 0,
    top: 'auto',
  },
  inputContainer: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(1),
    position: 'relative',
    width: '100%',
  },
  icon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

let socket;
const newChat = (msg) => {
  socket.emit('new_message', msg);
};

const newUser = (user) => {
  socket.emit('new_user', user);
};

const joinRoom = (joinRoom) => {
  socket.emit('join_room', joinRoom);
};

const userLeaveRoom = (leaveRoom) => {
  socket.emit('leave_room', leaveRoom);
};

const userLeft = (user) => {
  socket.emit('user_left', user);
};

const server = 'http://localhost:5000';

const ChatBox = () => {
  // Styling Declaration
  const classes = useStyles();
  // State Decleration
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState('');
  const [room, setRoom] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  useEffect(async () => {
    const chatRes = await getChats(token);
    console.log(chatRes);
    setChats(chatRes);
    const roomRes = await getRooms(token);
    setRoom(roomRes);
    const userRes = await getUsers(token);
    setUser(userRes);
  }, [getChats]);

  console.log('chats ne: ' + chats);

  const handleSendMessage = () => {
    newChat({
      content: message,
      sender: user,
      room: room,
    });
    setMessage('');
  };

  const handleTextChange = (log) => {
    handleSendMessage();
    log.preventDefault();
  };

  const handleKeypress = (event) => {
    if (event.keyCode === 13) {
      handleSendMessage();
    }
    event.preventDefault();
  };

  // Socket

  if (!socket) {
    socket = socketIOClient.connect(server);
    socket.on('new_message', (msg) => {
      addChat(msg, token);
    });

    socket.on('new_user', (newUser) => {
      const { username, token } = newUser;
      localStorage.setItem('token', token);
      const log = {
        type: 'New user joined',
        user: username,
        source: 'Guest Join',
      };
      addLog(log, token);
    });

    socket.on('join_room', (joinRoom) => {
      const { user, room } = joinRoom;
      if (user) {
        const log = {
          type: 'Join room',
          user: user,
          source: room,
        };
        const token = localStorage.getItem('token');
        addLog(log, token);
      }
    });

    socket.on('leave_room', (leaveRoom) => {
      const { user, room } = leaveRoom;
      if (user) {
        const log = {
          type: 'User leaves room',
          user: user,
          source: room,
        };
        addLog(log, token);
      }
    });

    socket.on('user_left', (leftUser) => {
      const event = {
        type: 'User Left',
        user: leftUser,
        source: 'Main Page',
      };
      addLog(event, token);
      localStorage.removeItem('token');
    });
  }
  return (
    <Fragment>
      <div className='chat-box'>
        {chats.map((chat) => (
          <div key={chat._id}>
            <Typography className='inline' key='message' variant='body1'>
              <Chip icon={<FaceIcon />} label={chat.sender} />
              {chat.content}
            </Typography>
          </div>
        ))}
      </div>
      {/* Chat Bar */}
      <div className='chat-bar'>
        <div
          className={classes.inputContainer}
          style={{ maxWidth: '200px' }}
        ></div>
        <div className={classes.inputContainer}>
          <div className={classes.icon}>
            <ChatIcon />
          </div>
          <Input
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => handleKeypress(e)}
            type='text'
            value={message}
            placeholder='Type your message...'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          ></Input>
          <Button
            variant='contained'
            id='sendButton'
            color='primary'
            onClick={() => {
              handleSendMessage();
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatBox;
