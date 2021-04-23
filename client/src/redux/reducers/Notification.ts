const C = {
  SetOpen: 'Notification/SetOpen',
  OpenNotification: 'Notification/Open',
};

const SetOpen = (isOpen: boolean) => async (dispatch: any) => {
  dispatch({
    type: C.SetOpen,
    payload: isOpen,
  });
};

const OpenNotification = (message: string, severity: string) => async (
  dispatch: any
) => {
  dispatch({
    type: C.OpenNotification,
    payload: { Message: message, Severity: severity },
  });
};

export const NotificationActions = {
  SetOpen,
  OpenNotification,
};

export default (state: any = {}, action: any) => {
  switch (action.type) {
    case C.SetOpen: {
      return { ...state, Open: action.payload };
    }
    case C.OpenNotification: {
      return {
        ...state,
        Open: true,
        Message: action.payload.Message,
        Severity: action.payload.Severity,
      };
    }
    default: {
      return state;
    }
  }
};
