import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { LoginPage } from '../pages/LoginPage';
// import { RegisterPage } from '../pages/RegisterPage';

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path='/login'
        component={ LoginPage }
      />

      {/* <Route
        exact
        path='/register'
        component={ RegisterPage }
      /> */}

      <Redirect to='/login' />
    </Switch>
  );
}