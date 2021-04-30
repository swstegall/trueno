import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import C from '../../utilities/constants';
import { NotificationActions } from './Notification';

interface Message {
  id: number;
  userId: string;
  message: string;
  deletedAt: string;
  createdAt: string;
}

interface Messages {
  Active: Array<Message>;
}

const initialState: Messages = {
  Active: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    cycle: (state, action: PayloadAction<Array<Message>>) => {
      state.Active = [...action.payload];
    },
    create: (state, action: PayloadAction<Message>) => {
      state.Active.push(action.payload);
    },
    reset: (state) => {
      state.Active = [];
    },
  },
});

const { cycle, create, reset } = messagesSlice.actions;

const Cycle = (token: string) => async (dispatch: AppDispatch) => {
  const response = await fetch(`${C.localUrl}getAllMessages`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const responseJson: {
      success: boolean;
      messages: Array<Message>;
    } = await response.json();
    dispatch(cycle(responseJson.messages));
  } else {
    dispatch(
      NotificationActions.Open({
        Message: 'Session invalid. Login again.',
        Severity: 'error',
      })
    );
  }
};

export const Create = (message: string, token: string) => async (
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
      NotificationActions.Open({
        Message: 'Error communicating with server.',
        Severity: 'error',
      })
    );
  }
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
