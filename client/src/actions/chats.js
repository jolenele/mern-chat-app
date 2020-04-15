import axios from 'axios';
import {
  GET_CHATS,
  GET_ROOMS,
  ADD_CHAT,
  GET_LOGS,
  ROOM_ERROR,
  LOG_ERROR,
  CHAT_ERROR,
  GET_USERS,
  AUTH_ERROR,
} from './types';

const server = 'https://mern-chat-app-ngale.herokuapp.com';

// Add logs
export const addLog = async (log, token) => {
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

export const getChats = async (token) => async (dispatch) => {
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

export const getLogs = async (token) => async (dispatch) => {
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
    // dispatch({
    //   type: LOG_ERROR,
    //   payload: err.response.data.error,
    // });
  }
};

export const getRooms = async (token) => async (dispatch) => {
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
    // dispatch({
    //   type: ROOM_ERROR,
    //   payload: err.response.data.error,
    // });
  }
};

export const addChat = async (chat, token) => async (dispatch) => {
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
