const C = {
  SetUsername: 'User/SetUsername',
  SetToken: 'User/SetToken',
  Reset: 'User/Reset',
};

const SetUsername = (username: string) => async (dispatch: any) => {
  dispatch({
    type: C.SetUsername,
    payload: username,
  });
};

const SetToken = (token: string) => async (dispatch: any) => {
  dispatch({
    type: C.SetToken,
    payload: token,
  });
};

const Reset = () => async (dispatch: any) => {
  dispatch({
    type: C.Reset,
  });
};

export const UserActions = {
  SetUsername,
  SetToken,
  Reset,
};

export default (state: any = {}, action: any) => {
  switch (action.type) {
    case C.SetUsername: {
      return { ...state, Username: action.payload };
    }
    case C.SetToken: {
      return { ...state, Token: action.payload };
    }
    case C.Reset: {
      return {};
    }
    default: {
      return state;
    }
  }
};
