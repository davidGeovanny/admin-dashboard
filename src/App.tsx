import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import { Toaster } from 'react-hot-toast';
import { ConfirmationProvider } from './context/ConfirmationContext';
import { SalesProvider } from './context/SalesContex';

const App = () => {
  return (
    <AppState>
      <AppRouter />
    </AppState>
  );
}

const AppState: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <ConfirmationProvider>
          <SalesProvider>
            { children }
          </SalesProvider>
        </ConfirmationProvider>
        <Toaster />
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
