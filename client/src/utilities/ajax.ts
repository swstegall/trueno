import C from './constants';
import { MessagesActions } from '../redux/reducers/Messages';
import { NotificationActions } from '../redux/reducers/Notification';
import { UserActions } from '../redux/reducers/User';
import { UsersActions } from '../redux/reducers/Users';

export const register = async (
  username: string,
  password: string,
  dispatch: any
) => {
  const response = await fetch(`${C.localUrl}addUser`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (response.status === 200) {
    dispatch(
      NotificationActions.OpenNotification(
        'User has been created successfully.',
        'success'
      )
    );
  } else {
    dispatch(
      NotificationActions.OpenNotification('Error creating user.', 'error')
    );
  }
};

export const login = async (
  username: string,
  password: string,
  dispatch: any
) => {
  const response = await fetch(`${C.localUrl}login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (response.status === 200) {
    const responseJson = await response.json();
    dispatch(UserActions.SetUsername(responseJson.username));
    dispatch(UserActions.SetToken(responseJson.token));
  } else {
    dispatch(
      NotificationActions.OpenNotification(
        'Invalid username or password.',
        'error'
      )
    );
  }
};

export const getUsers = async (token: string, dispatch: any) => {
  const response = await fetch(`${C.localUrl}getAllUsers`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const responseJson = await response.json();
    dispatch(UsersActions.SetUsers(responseJson));
  } else {
    dispatch(
      NotificationActions.OpenNotification(
        'Session invalid. Login again.',
        'error'
      )
    );
  }
};

export const getMessages = async (token: string, dispatch: any) => {
  const response = await fetch(`${C.localUrl}getAllMessages`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const responseJson = await response.json();
    dispatch(MessagesActions.SetMessages(responseJson));
  } else {
    dispatch(
      NotificationActions.OpenNotification(
        'Session invalid. Login again.',
        'error'
      )
    );
  }
};

export const newMessage = async (
  message: string,
  token: string,
  dispatch: any
) => {
  const response = await fetch(`${C.localUrl}newMessage`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message,
    }),
  });
  if (response.status !== 200) {
    dispatch(
      NotificationActions.OpenNotification(
        'Error communicating with server.',
        'error'
      )
    );
  }
};
