import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '..';
import C from '../../utilities/constants';
import { AppActions } from './App';
import { NotificationActions } from './Notification';
import { UserActions } from './User';
import * as _ from 'lodash';

interface User {
  admin: boolean;
  banned: boolean;
  id: number;
  username: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface Users {
  Loaded: boolean;
  Active: Array<User>;
}

const initialState: Users = {
  Loaded: false,
  Active: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    cycle: (state, action: PayloadAction<Array<User>>) => {
      state.Active = _.orderBy([...action.payload], ['username'], 'asc');
      state.Loaded = true;
    },
    reset: (state) => {
      state.Active = [];
      state.Loaded = false;
    },
  },
});

const { cycle, reset } = usersSlice.actions;

export const Cycle = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: 'post',
      url: `${C.localUrl}getAllUsers`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(cycle(response.data.users));
  } catch (error) {
    localStorage.clear();
    dispatch(UserActions.Reset());
    dispatch(
      NotificationActions.Open({
        Message: 'Session invalid. Login again.',
        Severity: 'error',
      })
    );
  }
  dispatch(AppActions.SetLoading(false));
};

export const Ban = (id: string, token: string) => async (
  dispatch: AppDispatch
) => {
  try {
    await axios({
      method: 'post',
      url: `${C.localUrl}banUser`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        id,
      },
    });
    dispatch(
      NotificationActions.Open({
        Message: 'User banned successfully.',
        Severity: 'success',
      })
    );
  } catch (error) {
    dispatch(
      NotificationActions.Open({
        Message: 'Error banning user.',
        Severity: 'error',
      })
    );
  }
};

export const Unban = (id: string, token: string) => async (
  dispatch: AppDispatch
) => {
  try {
    await axios({
      method: 'post',
      url: `${C.localUrl}unbanUser`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        id,
      },
    });
    dispatch(
      NotificationActions.Open({
        Message: 'User unbanned successfully.',
        Severity: 'success',
      })
    );
  } catch (error) {
    dispatch(
      NotificationActions.Open({
        Message: 'Error unbanning user.',
        Severity: 'error',
      })
    );
  }
};

const Reset = () => async (dispatch: AppDispatch) => {
  dispatch(reset());
};

export const UsersActions = {
  Cycle,
  Ban,
  Unban,
  Reset,
};

export default usersSlice.reducer;
