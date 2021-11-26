import { v4 } from 'uuid';
import { SidebarMenu } from '../interfaces/SidebarInterface';

export const menu: SidebarMenu[] = [
  {
    item: {
      id: v4(),
      name: 'Dashboard',
      active: false,
      redirection: '/dashboard'
    },
    icon: 'fa-tachometer-alt',
  },
  {
    item: {
      id: v4(),
      name: 'Ventas',
      active: false,
      redirection: '/',
    },
    icon: 'fa-hand-holding-usd',
    subitem: {
      isOpen: false,
      header: 'Información',
      items: [
        {
          id: v4(),
          name: 'Comisiones',
          redirection: '/commissions',
          active: false,
        }
      ]
    }
  },
  {
    item: {
      id: v4(),
      name: 'Profile',
      active: false,
      redirection: '/profile'
    },
    icon: 'fa-user',
  },
  // {
  //   item: {
  //     id: v4(),
  //     name: 'Components',
  //     active: false,
  //     redirection: 'asd'
  //   },
  //   icon: 'fa-bell',
  //   subitem: {
  //     isOpen: false,
  //     header: 'Custom header',
  //     items: [
  //       {
  //         id: v4(),
  //         name: 'Notifications',
  //         active: false,
  //         redirection: '/notification-center'
  //       },
  //       {
  //         id: v4(),
  //         name: 'Messages',
  //         active: false,
  //         redirection: '/message-center'
  //       },
  //     ]
  //   }
  // },
  // {
  //   item: {
  //     id: v4(),
  //     name: 'Charts',
  //     active: false,
  //     redirection: '#'
  //   },
  //   icon: 'fa-chart-line',
  //   subitem: {
  //     isOpen: false,
  //     header: 'Custom graphs',
  //     items: [
  //       {
  //         id: v4(),
  //         name: 'Line chart',
  //         active: false,
  //         redirection: '#'
  //       },
  //       {
  //         id: v4(),
  //         name: 'Circle chart',
  //         active: false,
  //         redirection: '#'
  //       },
  //     ]
  //   }
  // },
]