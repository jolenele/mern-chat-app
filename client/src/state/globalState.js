import React, { createContext, useReducer, useState } from 'react';
import chats from '../reducers/chats';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const init = {
  chats: [],
  users: [],
  rooms: [],
  logs: [],
  error: null,
  loading: true,
};

let socket;

const newChat = msg => {
  socket.emit('new_message', msg);
};

const newUser = user => {
  socket.emit('new_user', user);
};

const joinRoom = joinRoom => {
  socket.emit('join_room', joinRoom);
};

const userLeaveRoom = leaveRoom => {
  socket.emit('leave_room', leaveRoom);
};

const userLeft = user => {
  socket.emit('user_left', user);
};

export const Context = createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(chats, init);
  const [user, setUser] = useState('');
  const [activeRoom, changeActiveRoom] = useState('General');
  const [token, setToken] = useState('');
  const server = 'http://localhost:5000';

  // Initialize socket client
  if (!socket) {
    socket = socketIOClient.connect(server);
    socket.on('new_message', msg => {
      const token = localStorage.getItem('token');
      addChat(msg, token);
    });

    socket.on('new_user', newUser => {
      const { username, token } = newUser;
      localStorage.setItem('token', token);
      const log = {
        type: 'New user joined',
        user: username,
        source: 'Guest Join',
      };
      addLog(log, token);
    });

    socket.on('join_room', joinRoom => {
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

    socket.on('leave_room', leaveRoom => {
      const { user, room } = leaveRoom;
      if (user) {
        const log = {
          type: 'User leaves room',
          user: user,
          source: room,
        };
        const token = localStorage.getItem('token');
        addLog(log, token);
      }
    });

    socket.on('user_left', leftUser => {
      const event = {
        type: 'User Left',
        user: leftUser,
        source: 'Main Page',
      };
      const token = localStorage.getItem('token');
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
      await axios.post(`${server}/api/eventlog`, log, config);
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  // Get data from database
  const getChats = async token => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`${server}/api/chats`, config);

      dispatch({
        type: 'GET_CHATS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'CHAT_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const getUsers = async token => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`${server}/api/getuser`, config);

      dispatch({
        type: 'GET_USERS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'USER_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const getEvents = async token => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`${server}/api/log`, config);

      dispatch({
        type: 'GET_EVENTS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const getRooms = async token => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`${server}/api/room`, config);

      dispatch({
        type: 'GET_ROOMS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'ROOM_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const addChat = async (chat, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(`${server}/api/chats`, chat, config);

      dispatch({
        type: 'ADD_CHAT',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'CHAT_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  return (
    <Context.Provider
      value={{
        chats: state.chats,
        rooms: state.rooms,
        error: state.error,
        users: state.users,
        logs: state.logs,
        loading: state.loading,
        user,
        setUser,
        token,
        setToken,
        activeRoom,
        changeActiveRoom,
        newChat,
        newUser,
        joinRoom,
        userLeaveRoom,
        userLeft,
        addChat,
        getUsers,
        getChats,
        getRooms,
        getEvents,
      }}
    >
      {children}
    </Context.Provider>
  );
};
