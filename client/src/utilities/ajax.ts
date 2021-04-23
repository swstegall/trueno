import C from './constants';
import { NotificationActions } from '../redux/reducers/Notification';
import { UserActions } from '../redux/reducers/User';

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
    console.log('login is successful.');
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
