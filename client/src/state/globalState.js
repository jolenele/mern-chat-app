import React, { createContext, useReducer, useState } from 'react';
import socketIOClient from 'socket.io-client';
import uuid from 'uuid';
// import combineReducers from '../reducers/index';
import reducers from '../reducers/reducers';
import chats from '../reducers/chats';
import axios from 'axios';
import {
  GET_CHATS,
  GET_ROOMS,
  ADD_CHAT,
  GET_LOGS,
  ROOM_ERROR,
  LOG_ERROR,
  CHAT_ERROR,
} from '../actions/types';

const initialState = {
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
  const [state, dispatch] = useReducer(reducers, initialState);
  const [room, setRoom] = useState('');
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
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
  // Add logs
  const addLog = async (log, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(`${server}/api/log`, log, config);
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  const getChats = async (token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`${server}/api/chats`, config);

      dispatch({
        type: GET_CHATS,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: CHAT_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  const getLogs = async (token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`${server}/api/log`, config);

      dispatch({
        type: GET_LOGS,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: LOG_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  const getRooms = async (token) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`${server}/api/room`, config);

      dispatch({
        type: GET_ROOMS,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: ROOM_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  const addChat = async (chat, token) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(`${server}/api/chats`, chat, config);

      dispatch({
        type: ADD_CHAT,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: CHAT_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        // init
        chats: state.chats,
        rooms: state.rooms,
        error: state.error,
        user: state.users,
        logs: state.logs,
        loading: state.loading,
        // User
        room,
        setRoom,
        user,
        setUser,
        token,
        setToken,
        // Chats Actions
        getChats,
        getLogs,
        getRooms,
        addChat,
        addLog,
        // Socket
        newChat,
        newUser,
        joinRoom,
        userLeaveRoom,
        userLeft,
      }}
    >
      {children}
    </Context.Provider>
  );
};
