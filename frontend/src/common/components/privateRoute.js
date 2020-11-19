import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Employee from '../utils/Employee';

/**
 * Creates a private route to which a user id must be available
 * Otherwise it will redirect to login
 * @param  {Component} Component to be routed
 * @param  {object} ...rest} Rest of the sections in the component
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      Employee.getToken()
        ? <Component {...props} />
        : <Redirect to="/" />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any
};

export default PrivateRoute;
