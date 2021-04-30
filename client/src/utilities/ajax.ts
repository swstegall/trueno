import C from './constants';
import { NotificationActions } from '../redux/reducers/Notification';
import { UsersActions } from '../redux/reducers/Users';

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
      NotificationActions.Open({
        Message: 'Session invalid. Login again.',
        Severity: 'error',
      })
    );
  }
};
