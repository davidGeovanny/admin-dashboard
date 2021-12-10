import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { AuthContext } from '../context/AuthContext';
import { BgLoading } from '../components/Loading/BgLoading';

export const AppRouter = () => {

  const { status } = useContext( AuthContext );

  if( status === 'checking' ) {
    return (
      <BgLoading />
    );
  }

  return (
    <Router>
      <Switch>
        {
          status === 'authenticated'
            ? <PrivateRoutes />
            : <PublicRoutes />
        }
      </Switch>
    </Router>
  );
}