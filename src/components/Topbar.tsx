import React from 'react'
import { TopbarMenu } from './TopbarMenu';
import { topbarNotifications, topbarMessages } from '../data/topbar';
import { TopbarProfileMenu } from './TopbarProfileMenu';

export const Topbar = () => {
  return (
    <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
      <ul className='navbar-nav ml-auto'>

        <TopbarMenu
          picture={{
            type: 'icon',
            icon: 'fa-bell'
          }}
          title='Centro de notificaciones'
          items={ topbarNotifications }
          url='/notification-center'
        />

        <TopbarMenu
          picture={{
            type: 'icon',
            icon: 'fa-envelope'
          }}
          title='Centro de mensajes'
          items={ topbarMessages }
          url='/message-center'
        />

        <div className='topbar-divider d-none d-sm-block'></div>

        <TopbarProfileMenu />
      </ul>
    </nav>
  );
}