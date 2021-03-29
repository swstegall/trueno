import {
  createMuiTheme,
  CssBaseline,
  LinearProgress,
  ThemeProvider,
} from '@material-ui/core';
import { deepOrange, teal } from '@material-ui/core/colors';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateIdentity from './components/pages/CreateIdentity';
import SelectIdentity from './components/pages/SelectIdentity';
import Dashboard from './components/pages/Dashboard';
import { useSelector } from 'react-redux';
import { useEffectOnce } from 'react-use';
import checkForIdentity from './utilities/checkForIdentity';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: teal,
    secondary: deepOrange,
  },
});

export default function App() {
  const contents = useSelector((state) => state);
  const loading: boolean = true;

  console.log(window.location.href);

  useEffectOnce(() => {
    checkForIdentity();
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <LinearProgress />
      ) : (
        <Router>
          <Switch>
            <Route path="/createIdentity" component={CreateIdentity} />
            <Route path="/selectIdentity" component={SelectIdentity} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      )}
    </ThemeProvider>
  );
}
