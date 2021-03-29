import { createAction, createReducer } from '@reduxjs/toolkit';

export interface IdentityState {
  ID: string;
  FirstName: string;
  LastName: string;
  DisplayName: string;
}

const SetID = createAction('Identity/SetID');
const SetFirstName = createAction('Identity/SetFirstName');
const SetLastName = createAction('Identity/SetLastName');
const SetDisplayName = createAction('Identity/SetDisplayName');

export const IdentityActions = {
  SetID,
  SetFirstName,
  SetLastName,
  SetDisplayName,
};

const InitialState = {
  ID: '00000000-0000-0000-0000-00000000',
  FirstName: '',
  LastName: '',
  DisplayName: '',
} as IdentityState;

export const Identity = createReducer(InitialState, (builder) => {
  builder
    .addCase(SetID, (state, action) => {
      state.ID = action.payload || '';
    })
    .addCase(SetFirstName, (state, action) => {
      state.FirstName = action.payload || '';
    })
    .addCase(SetLastName, (state, action) => {
      state.LastName = action.payload || '';
    })
    .addCase(SetDisplayName, (state, action) => {
      state.DisplayName = action.payload || '';
    });
});
