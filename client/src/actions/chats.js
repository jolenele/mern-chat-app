import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CHATS,
  GET_ROOMS,
  GET_USERS,
  ADD_CHAT,
  GET_LOGS,
  ROOM_ERROR,
  LOG_ERROR,
  CHAT_ERROR,
  AUTH_ERROR,
} from '../actions/types';

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

const getChats = async (token) => {
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

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${server}/api/getuser`, config);

    dispatch({
      type: GET_USERS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.error,
    });
  }
};

const getEvents = async (token) => {
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

const getRooms = async (token) => {
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
