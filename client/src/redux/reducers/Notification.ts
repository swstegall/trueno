import { createAction, createReducer } from '@reduxjs/toolkit';

export interface NotificationState {
  Open: boolean;
  Message: string;
  Severity: string;
}

const InitialState = {
  Open: false,
  Message: 'caveat emptor',
  Severity: 'success',
} as NotificationState;

const SetOpen = createAction('Notification/SetOpen', (isOpen: boolean) => {
  return {
    payload: isOpen,
  };
});
const SetMessage = createAction(
  'Notification/SetMessage',
  (message: string) => {
    return {
      payload: message,
    };
  }
);
const SetSeverity = createAction(
  'Notification/SetSeverity',
  (severity: string) => {
    return {
      payload: severity,
    };
  }
);
const OpenNotification = createAction(
  'Notification/Open',
  (message: string, severity: string) => {
    return {
      payload: {
        Open: true,
        Message: message,
        Severity: severity,
      },
    };
  }
);
const Reset = createAction('Notification/Reset', () => {
  return {
    payload: { ...InitialState },
  };
});

export const NotificationActions = {
  SetOpen,
  SetMessage,
  SetSeverity,
  OpenNotification,
  Reset,
};

export const Notification = createReducer(InitialState, (builder) => {
  builder
    .addCase(SetOpen, (state, action) => {
      state.Open = action.payload || false;
    })
    .addCase(SetMessage, (state, action) => {
      state.Message = action.payload || '';
    })
    .addCase(SetSeverity, (state, action) => {
      state.Severity = action.payload || '';
    })
    .addCase(OpenNotification, (_state, action) => {
      return { ...InitialState, ...action.payload };
    })
    .addCase(Reset, () => {
      return { ...InitialState };
    });
});
