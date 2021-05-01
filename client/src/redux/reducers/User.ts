import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '..';
import C from '../../utilities/constants';
import { NotificationActions } from './Notification';
import { MessageActions } from './Messages';
import { UsersActions } from './Users';
import { AppActions } from './App';

interface User {
  Loaded: boolean;
  Username: string;
  Token: string;
}

const initialState: User = {
  Loaded: false,
  Username: '',
  Token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initialize: (
      state,
      action: PayloadAction<{ Username: string; Token: string }>
    ) => {
      state.Username = action.payload.Username;
      state.Token = action.payload.Token;
      state.Loaded = true;
    },
    reset: (state) => {
      state.Username = '';
      state.Token = '';
      state.Loaded = false;
    },
  },
});

const { initialize, reset } = userSlice.actions;

const Initialize = (username: string, token: string) => async (
  dispatch: AppDispatch
) => {
  dispatch(
    initialize({
      Username: username,
      Token: token,
    })
  );
  dispatch(MessageActions.Cycle(token));
  dispatch(UsersActions.Cycle(token));
};

const Login = (username: string, password: string) => async (
  dispatch: AppDispatch
) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: 'post',
      url: `${C.localUrl}login`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        username,
        password,
      },
    });
    dispatch(
      initialize({
        Username: response.data.username,
        Token: response.data.token,
      })
    );
    localStorage.setItem('Username', response.data.username);
    localStorage.setItem('Token', response.data.token);
    dispatch(MessageActions.Cycle(response.data.token));
    dispatch(UsersActions.Cycle(response.data.token));
  } catch (error) {
    dispatch(
      NotificationActions.Open({
        Message: 'Invalid username or password.',
        Severity: 'error',
      })
    );
  }
  dispatch(AppActions.SetLoading(false));
};

const Register = (username: string, password: string) => async (
  dispatch: AppDispatch
) => {
  dispatch(AppActions.SetLoading(true));
  try {
    await axios({
      method: 'post',
      url: `${C.localUrl}addUser`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        username,
        password,
      },
    });
    dispatch(
      NotificationActions.Open({
        Message: 'User has been created successfully.',
        Severity: 'success',
      })
    );
  } catch (error) {
    dispatch(
      NotificationActions.Open({
        Message: 'Error creating user.',
        Severity: 'error',
      })
    );
  }
  dispatch(AppActions.SetLoading(false));
};

const ChangePassword = (password: string, token: string) => async (
  dispatch: AppDispatch
) => {
  try {
    await axios({
      method: 'post',
      url: `${C.localUrl}changePassword`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        password,
      },
    });
    localStorage.clear();
    dispatch(reset());
    dispatch(
      NotificationActions.Open({
        Message: 'Password has been changed successfully.',
        Severity: 'success',
      })
    );
  } catch (error) {
    dispatch(
      NotificationActions.Open({
        Message: 'Error changing password.',
        Severity: 'error',
      })
    );
  }
};

const Reset = () => async (dispatch: AppDispatch) => dispatch(reset());

export const UserActions = {
  Initialize,
  Login,
  Register,
  Reset,
  ChangePassword,
};

export default userSlice.reducer;
