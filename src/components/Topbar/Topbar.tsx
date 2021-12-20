import React, { useContext } from 'react';

// import { TopbarMenu } from './TopbarMenu';
import { TopbarProfileMenu } from './TopbarProfileMenu';
import { SidebarContext } from '../../context/SidebarContext';
// import { TopbarMenu } from './TopbarMenu';
// import { topbar__messages, topbar__notifications } from '../../data/topbar';
// import { topbarNotifications, topbarMessages } from '../../data/topbar';

export const Topbar = () => {
  const { onCollapseSidebar } = useContext( SidebarContext );

  return (
    <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
      <div className='text-center d-none d-md-inline'>
        <button 
          className='rounded-circle border-0 sidebarToggle bg-transparent' 
          onClick={ onCollapseSidebar }
        ></button>
      </div>

      <ul className='navbar-nav ml-auto'>

        {/* <TopbarMenu
          picture={{
            type: 'icon',
            icon: 'fa-bell'
          }}
          title='Centro de notificaciones'
          items={ topbar__notifications }
          url='/notification-center'
        />

        <TopbarMenu
          picture={{
            type: 'icon',
            icon: 'fa-envelope'
          }}
          title='Centro de mensajes'
          items={ topbar__messages }
          url='/message-center'
        /> */}

        <div className='topbar-divider d-none d-sm-block'></div>

        <TopbarProfileMenu />
      </ul>
    </nav>
  );
}