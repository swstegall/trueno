import C from './constants';
import { NotificationActions } from '../redux/reducers/Notification';

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

export const login = async (username: string, password: string) => {
  try {
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
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};
