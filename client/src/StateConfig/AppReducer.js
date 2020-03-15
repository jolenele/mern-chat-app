export default (state, action) => {
  switch (action.type) {
    case 'GET_CHATS':
      return {
        ...state,
        loading: false,
        chats: action.payload,
      };
    case 'GET_ROOMS':
      return {
        ...state,
        loading: false,
        rooms: action.payload,
      };
    case 'GET_USERS':
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case 'GET_LOGS':
      return {
        ...state,
        loading: false,
        logs: action.payload,
      };
    case 'ADD_CHAT':
      return {
        ...state,
        chats: [...state.chats, action.payload],
      };
    case 'CHAT_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'ROOM_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOG_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
