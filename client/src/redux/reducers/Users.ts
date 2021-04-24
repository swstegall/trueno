const C = {
  SetUsers: 'Users/SetUsers',
  Reset: 'Users/Reset',
};

const SetUsers = (users: Array<any>) => async (dispatch: any) => {
  dispatch({
    type: C.SetUsers,
    payload: users,
  });
};

const Reset = () => async (dispatch: any) => {
  dispatch({
    type: C.Reset,
  });
};

export const UsersActions = {
  SetUsers,
  Reset,
};

export default (state: Array<any> = [], action: any) => {
  switch (action.type) {
    case C.SetUsers: {
      return [...action.payload.users];
    }
    case C.Reset: {
      return [];
    }
    default: {
      return state;
    }
  }
};
