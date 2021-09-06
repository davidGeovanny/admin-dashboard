import React from 'react';
import { Sidebar } from './components/Sidebar';
import { SidebarProvider } from './context/SidebarContext';

const App = () => {
  return (
    <AppState>
      <div className='wrapper'>
        <Sidebar />
      </div>
    </AppState>
  );
}

const AppState: React.FC = ({ children }) => {
  return (
    <SidebarProvider>
      { children }
    </SidebarProvider>
  )
}

export default App;
