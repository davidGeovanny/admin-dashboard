import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { DashboardRouter } from './DashboardRouter';
import { ModalConfirm } from '../components/ModalConfirm';

export const PrivateRoutes = () => {
  return (
    <>
      <Switch>
        <Route
          path='/'
          component={ DashboardRouter }
        />

        <Redirect to='/dashboard' />
      </Switch>

      <ModalConfirm />
    </>
  );
}