import React from 'react';
import { SidebarProvider } from './context/SidebarContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';

const App = () => {
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
  )
}

export default App;