import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  Open: boolean;
  Message: string;
  Severity: string;
}

const initialState: Notification = {
  Open: false,
  Message: '',
  Severity: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    open: (
      state,
      action: PayloadAction<{ Message: string; Severity: string }>
    ) => {
      state.Open = true;
      state.Message = action.payload.Message;
      state.Severity = action.payload.Severity;
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.Open = action.payload;
    },
  },
});

const { open, setOpen } = notificationSlice.actions;

export const NotificationActions = {
  Open: open,
  SetOpen: setOpen,
};

export default notificationSlice.reducer;
