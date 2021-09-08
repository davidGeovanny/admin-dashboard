import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { SidebarProvider } from '../context/SidebarContext';
import { CommissionsPage } from '../pages/CommissionsPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProfilePage } from '../pages/ProfilePage';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';

export const DashboardRouter = () => {
  return (
    <AppState>
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

              <Redirect to='/dashboard' />
            </Switch>
          </div>
        </div>
      </div>
    </AppState>
  );
}

const AppState: React.FC = ({ children }) => {
  return (
    <SidebarProvider>
      { children }
    </SidebarProvider>
  );
}