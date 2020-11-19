import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './common/components/privateRoute';
import ErrorPage from './error/ErrorPage';
import Home from './home/Home';
import Landing from './landing/Landing';
import SignUp from './signup/SignUp';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path= '/' exact={true} component={Landing}/>
        <Route path= '/signup' component={SignUp}/>
        <PrivateRoute path= '/home' component={Home}/>
        <Route path= '/error' component={ErrorPage}/>
        <Route path= '/*' component={ErrorPage}/>
      </Switch>
    </Router>
  );
};

export default App;
