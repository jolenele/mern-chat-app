import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import chat from './chats';

export default combineReducers({
  alert,
  auth,
  chat,
});
