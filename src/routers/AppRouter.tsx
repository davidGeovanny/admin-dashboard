import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { DashboardRouter } from './DashboardRouter';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';

export const AppRouter = () => {
  return (
    // <AppState>
      <Router>

        <Switch>
          <Route
            exact
            path='/login'
            component={ LoginPage }
          />

          <Route
            exact
            path='/register'
            component={ RegisterPage }
          />

          <Route
            path='/'
            component={ DashboardRouter }
          />
        </Switch>

      </Router>
    // </AppState>
  );
}

/** TODO: Colocar el provider para el login, para saber si está autenticado o no */