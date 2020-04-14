import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ChatBar from './ChatBar';
import Contact from './Contact';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import socketIOClient from 'socket.io-client';
import store from '../../store';
import { loadUser } from '../../actions/auth';
import setAuthToken from '../../actions/setAuthToken';
import {
  addChat,
  addLog,
  getChats,
  getLogs,
  getUser,
  getRooms,
} from '../../actions/chats';
// import combineReducers from '../../reducers/index';
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

const ChatBox = (getChats, getRooms, getLogs, getUser) => {
  useEffect(() => {
    getChats();
    getRooms();
    getLogs();
    getUser();
  }, [getChats]);

  const token = localStorage.getItem('token');

  console.log('chats ne: ' + chats);

  const [message, setMessage] = useState({
    content: '',
    sender: '',
  });

  const handleSubmit = () => {
    newChat({
      content: message,
      sender: user,
      room: room,
    });
    setMessage('');
  };

  const handleTextChange = (log) => {
    handleSubmit();
    log.preventDefault();
  };

  const handleLogout = () => {
    userLeft(user);
    return <Redirect to='/chats' />;
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
      <Contact />
      <div className='chat-box'>
        {[...chats]
          .filter((chat) => chat.room === room)
          .map((chat) => (
            <div key={chat._id}>
              <Typography className='inline' key='message' variant='body1'>
                {chat.message}
              </Typography>
            </div>
          ))}
        <ChatBar
          content={chats}
          handleContent={handleTextChange()}
          handleSubmit={() => {
            handleSubmit();
          }}
        />
        <Button
          variant='contained'
          id='sendButton'
          color='primary'
          onClick={() => {
            handleSubmit();
          }}
        >
          Send
        </Button>
      </div>
    </Fragment>
  );
};

export default ChatBox;

// <Input
//   type='text'
//   id='inputMessage'
//   name='message'
//   value={message}
//   onKeyUp={(e) => handleContent(e)}
//   onChange={(e) => setMessage(e.target.value)}
//   placeholder='Type a message'
// ></Input>;
