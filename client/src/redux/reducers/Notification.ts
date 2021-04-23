const C = {
  SetOpen: 'Notification/SetOpen',
  SetMessage: 'Notification/SetMessage',
  SetSeverity: 'Notification/SetSeverity',
  OpenNotification: 'Notification/Open',
};

const SetOpen = (isOpen: boolean) => async (dispatch: any) => {
  dispatch({
    type: C.SetOpen,
    payload: isOpen,
  });
};

const SetMessage = (message: string) => async (dispatch: any) => {
  dispatch({
    type: C.SetMessage,
    payload: message,
  });
};

const SetSeverity = (severity: string) => async (dispatch: any) => {
  dispatch({
    type: C.SetSeverity,
    payload: severity,
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
  SetMessage,
  SetSeverity,
  OpenNotification,
};

export default (state: any = {}, action: any) => {
  switch (action.type) {
    case C.SetOpen: {
      return { ...state, Open: action.payload };
    }
    case C.SetMessage: {
      return { ...state, Message: action.payload };
    }
    case C.SetSeverity: {
      return { ...state, Severity: action.payload };
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
