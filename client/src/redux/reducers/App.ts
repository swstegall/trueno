import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '..';

interface App {
  Loading: boolean;
}

const initialState: App = {
  Loading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<boolean>) => {
      state.Loading = action.payload;
    },
  },
});

const { set } = appSlice.actions;

const SetLoading = (status: boolean) => async (dispatch: AppDispatch) => {
  dispatch(set(status));
};

export const AppActions = {
  SetLoading,
};

export default appSlice.reducer;
