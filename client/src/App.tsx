import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { deepOrange, teal } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CreateUser from './components/pages/CreateUser';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import { useEffectOnce } from 'react-use';
import { useSelector } from 'react-redux';
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
  const [loggedIn, setLoggedIn]: any = React.useState(undefined);
  const Notification = useSelector((state: any) => state.Notification);

  useEffectOnce(() => {
    if (localStorage.getItem('token') === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  });

  setInterval(() => {
    console.log(Notification);
  }, 1000);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Snackbar
        open={Notification.Open}
        autoHideDuration={6000}
        onClose={() => {
          NotificationActions.Reset();
        }}
      >
        <Alert onClose={NotificationActions.Reset()} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      {loggedIn ? (
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route exact path="/createUser" component={CreateUser} />
            <Route exact path="/" component={Login} />
          </Switch>
        </Router>
      )}
    </ThemeProvider>
  );
};
