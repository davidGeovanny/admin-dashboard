import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import { Toaster } from 'react-hot-toast';
import { ConfirmationProvider } from './context/ConfirmationContext';

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
          { children }
        </ConfirmationProvider>
        <Toaster />
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
