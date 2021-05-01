import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '..';
import C from '../../utilities/constants';
import { AppActions } from './App';
import { NotificationActions } from './Notification';

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
      state.Active = [...action.payload];
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
    dispatch(
      NotificationActions.Open({
        Message: 'Session invalid. Login again.',
        Severity: 'error',
      })
    );
  }
  dispatch(AppActions.SetLoading(false));
};

const Reset = () => async (dispatch: AppDispatch) => {
  dispatch(reset());
};

export const UsersActions = {
  Cycle,
  Reset,
};

export default usersSlice.reducer;
