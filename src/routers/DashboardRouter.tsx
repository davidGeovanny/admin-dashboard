import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { CommissionsPage } from '../pages/CommissionsPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProfilePage } from '../pages/ProfilePage';
import { NotificationCenterPage } from '../pages/NotificationCenterPage';
import { MessageCenterPage } from '../pages/MessageCenterPage';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';

export const DashboardRouter = () => {
  return (
    <div className='wrapper'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="d-flex flex-column content-wrapper">
        <div className="content">
          {/* Topbar */}
          <Topbar />
          {/* Content */}
          <Switch>
            <Route
              exact
              path='/dashboard'
              component={ DashboardPage }
            />

            <Route
              exact
              path='/commissions'
              component={ CommissionsPage }
            />

            <Route
              exact
              path='/profile'
              component={ ProfilePage }
            />

            <Route
              exact
              path='/notification-center'
              component={ NotificationCenterPage }
            />

            <Route
              exact
              path='/message-center'
              component={ MessageCenterPage }
            />

            <Redirect to='/dashboard' />
          </Switch>
        </div>
      </div>
    </div>
  );
}