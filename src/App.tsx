import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';

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
        { children }
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
