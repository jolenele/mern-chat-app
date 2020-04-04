import { combineReducers } from 'redux';
import alert from './alert';
import users from './users';
import chat from './chats';

export default combineReducers({
  alert,
  users,
  chat,
});
