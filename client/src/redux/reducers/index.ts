import { combineReducers } from 'redux';
import Messages from './Messages';
import Notification from './Notification';
import User from './User';
import Users from './Users';

export default combineReducers({
  Messages,
  Notification,
  User,
  Users,
});
