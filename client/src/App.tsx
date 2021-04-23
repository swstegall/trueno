import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { deepOrange, teal } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CreateUser from './components/pages/CreateUser';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationActions } from './redux/reducers/Notification';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: teal,
    secondary: deepOrange,
  },
});

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default () => {
  const dispatch: any = useDispatch();
  const Notification: any = useSelector((state: any) => state.Notification);
  const User: any = useSelector((state: any) => state.User);
  const loggedIn: boolean =
    User.Username !== undefined && User.Token !== undefined;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Notification.Open}
        autoHideDuration={2000}
        onClose={() => {
          dispatch(NotificationActions.SetOpen(false));
        }}
      >
        <Alert
          onClose={() => {
            dispatch(NotificationActions.SetOpen(false));
          }}
          severity={Notification.Severity}
        >
          {Notification.Message}
        </Alert>
      </Snackbar>
      {loggedIn ? (
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Dashboard dispatch={dispatch} />}
            />
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route
              exact
              path="/createUser"
              render={() => <CreateUser dispatch={dispatch} />}
            />
            <Route
              exact
              path="/"
              render={() => <Login dispatch={dispatch} />}
            />
          </Switch>
        </Router>
      )}
    </ThemeProvider>
  );
};
