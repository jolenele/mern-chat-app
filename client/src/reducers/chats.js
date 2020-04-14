import {
  GET_CHATS,
  GET_ROOMS,
  GET_USERS,
  ADD_CHAT,
  GET_LOGS,
  ROOM_ERROR,
  LOG_ERROR,
  CHAT_ERROR,
} from '../actions/types';
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CHATS:
      return {
        ...state,
        loading: false,
        chats: payload,
      };
    case GET_ROOMS:
      return {
        ...state,
        loading: false,
        rooms: payload,
      };
    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: payload,
      };
    case GET_LOGS:
      return {
        ...state,
        loading: false,
        logs: payload,
      };
    case ADD_CHAT:
      return {
        ...state,
        loading: false,
        chats: [...state.chats, payload],
      };
    case ROOM_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case LOG_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CHAT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
