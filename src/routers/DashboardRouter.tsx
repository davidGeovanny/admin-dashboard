import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { CommissionsPage } from '../pages/Commissions/CommissionsPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
// import { ProfilePage } from '../pages/ProfilePage';
// import { NotificationCenterPage } from '../pages/NotificationCenterPage';
// import { MessageCenterPage } from '../pages/MessageCenterPage';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Topbar } from '../components/Topbar/Topbar';
import { MyProfilePage } from '../pages/MyProfile/MyProfilePage';
import { CommissionsConfigPage } from '../pages/CommissionsConfig/CommissionsConfigPage';

import { MyProfileProvider } from '../context/MyProfileContext';
const MyProfilePageState: React.FC = () => {
  return (
    <MyProfileProvider>
      <MyProfilePage />
    </MyProfileProvider>
  );
}

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
              component={ MyProfilePageState }
            />

            <Route
              exact
              path='/commissions-config'
              component={ CommissionsConfigPage }
            />

            {/* <Route
              exact
              path='/notification-center'
              component={ NotificationCenterPage }
            />

            <Route
              exact
              path='/message-center'
              component={ MessageCenterPage }
            /> */}

            <Redirect to='/dashboard' />
          </Switch>
        </div>
      </div>
    </div>
  );
}