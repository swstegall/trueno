import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import C from '../../utilities/constants';
import { NotificationActions } from './Notification';

interface User {
  Username: string;
  Token: string;
}

const initialState: User = {
  Username: '',
  Token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<User>) => {
      state.Username = action.payload.Username;
      state.Token = action.payload.Token;
    },
    reset: (state) => {
      state.Username = '';
      state.Token = '';
    },
  },
});

const { initialize, reset } = userSlice.actions;

const Login = (username: string, password: string) => async (
  dispatch: AppDispatch
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
    dispatch(
      initialize({ Username: responseJson.username, Token: responseJson.token })
    );
  } else {
    dispatch(
      NotificationActions.Open({
        Message: 'Invalid username or password.',
        Severity: 'error',
      })
    );
  }
};

const Register = (username: string, password: string) => async (
  dispatch: AppDispatch
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
      NotificationActions.Open({
        Message: 'User has been created successfully.',
        Severity: 'success',
      })
    );
  } else {
    dispatch(
      NotificationActions.Open({
        Message: 'Error creating user.',
        Severity: 'error',
      })
    );
  }
};

const Reset = () => async (dispatch: AppDispatch) => dispatch(reset());

export const UserActions = {
  Login,
  Register,
  Reset,
};

export default userSlice.reducer;
