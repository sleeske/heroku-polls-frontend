import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import configureRequests from './utils';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    type: 'light',
  },
});

configureRequests();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
