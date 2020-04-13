import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import chats from './chats';
import users from './users';

export default combineReducers({
  alert,
  auth,
  users,
  chats,
});
