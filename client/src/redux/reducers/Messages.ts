import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '..';
import C from '../../utilities/constants';
import { AppActions } from './App';
import { NotificationActions } from './Notification';
import { UserActions } from './User';

interface Message {
  id: number;
  userId: string;
  message: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface Messages {
  Loaded: boolean;
  Active: Array<Message>;
}

const initialState: Messages = {
  Loaded: false,
  Active: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    cycle: (state, action: PayloadAction<Array<Message>>) => {
      state.Active = action.payload;
      state.Loaded = true;
    },
    create: (state, action: PayloadAction<Message>) => {
      state.Active.push(action.payload);
    },
    reset: (state) => {
      state.Active = [];
      state.Loaded = false;
    },
  },
});

const { cycle, create, reset } = messagesSlice.actions;

const Cycle = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: 'post',
      url: `${C.localUrl}getAllMessages`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(cycle(response.data.messages));
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

export const Create = (message: string, token: string) => async (
  dispatch: any
) => {
  dispatch(AppActions.SetLoading(true));
  try {
    const response = await axios({
      method: 'post',
      url: `${C.localUrl}newMessage`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        message,
      },
    });
    dispatch(create(response.data.message));
  } catch (error) {
    dispatch(
      NotificationActions.Open({
        Message: 'Error communicating with server.',
        Severity: 'error',
      })
    );
  }
  dispatch(AppActions.SetLoading(false));
};

const Reset = () => async (dispatch: AppDispatch) => {
  dispatch(reset());
};

export const MessageActions = {
  Cycle,
  Create,
  Reset,
};

export default messagesSlice.reducer;
