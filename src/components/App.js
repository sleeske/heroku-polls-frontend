import React, { Component, Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Polls from './Polls';

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Polls} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
