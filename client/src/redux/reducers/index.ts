import { combineReducers } from 'redux';
import App from './App';
import Messages from './Messages';
import Notification from './Notification';
import User from './User';
import Users from './Users';

export default combineReducers({
  App,
  Messages,
  Notification,
  User,
  Users,
});
