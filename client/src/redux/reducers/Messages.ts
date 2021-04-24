const C = {
  SetMessages: 'Messages/SetMessages',
  Reset: 'Messages/Reset',
};

const SetMessages = (messages: Array<any>) => async (dispatch: any) => {
  dispatch({
    type: C.SetMessages,
    payload: messages,
  });
};

const Reset = () => async (dispatch: any) => {
  dispatch({
    type: C.Reset,
  });
};

export const MessagesActions = {
  SetMessages,
  Reset,
};

export default (state: Array<any> = [], action: any) => {
  switch (action.type) {
    case C.SetMessages: {
      return [...action.payload.messages];
    }
    case C.Reset: {
      return [];
    }
    default: {
      return state;
    }
  }
};
