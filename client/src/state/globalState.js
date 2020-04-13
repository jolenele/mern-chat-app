import React, { createContext, useReducer, useState } from 'react';
import socketIOClient from 'socket.io-client';
import combineReducers from '../reducers/index';
import { addChat, addLog } from '../actions/chats';

const init = {
  chats: [],
  user: [],
  rooms: [],
  logs: [],
  error: null,
  loading: true,
  email: [],
  password: [],
};

export const Context = createContext();

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

export const Provider = ({ children }) => {
  const [state] = useReducer(combineReducers, init);
  const [token] = useState('');
  const server = 'http://localhost:5000';

  // Initialize socket client
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
    <Context.Provider
      value={{
        chats: state.chats,
        rooms: state.rooms,
        error: state.error,
        user: state.users,
        logs: state.logs,
        loading: state.loading,
        token,
      }}
    >
      {children}
    </Context.Provider>
  );
};
