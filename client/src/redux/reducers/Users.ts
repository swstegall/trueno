import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '..';
import C from '../../utilities/constants';
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
  Active: Array<User>;
}

const initialState: Users = {
  Active: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    cycle: (state, action: PayloadAction<Array<User>>) => {
      state.Active = [...action.payload];
    },
    reset: (state) => {
      state.Active = [];
    },
  },
});

const { cycle, reset } = usersSlice.actions;

export const Cycle = (token: string) => async (dispatch: AppDispatch) => {
  const response = await axios({
    method: 'post',
    url: `${C.localUrl}getAllUsers`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    dispatch(cycle(response.data.users));
  } else {
    dispatch(
      NotificationActions.Open({
        Message: 'Session invalid. Login again.',
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
  Reset,
};

export default usersSlice.reducer;
