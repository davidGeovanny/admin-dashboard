import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { DashboardRouter } from './DashboardRouter';

export const PrivateRoutes = () => {
  return (
    <Switch>
      <Route
        path='/'
        component={ DashboardRouter }
      />

      <Redirect to='/dashboard' />
    </Switch>
  );
}