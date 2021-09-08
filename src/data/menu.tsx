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
      name: 'Profile',
      active: false,
      redirection: '/profile'
    },
    icon: 'fa-heart',
  },
  // {
  //   item: {
  //     id: v4(),
  //     name: 'Components',
  //     active: false,
  //     redirection: '#'
  //   },
  //   icon: 'fa-cog',
  //   subitem: {
  //     isOpen: false,
  //     header: 'Custom header',
  //     items: [
  //       {
  //         id: v4(),
  //         name: 'Buttons',
  //         active: false,
  //         redirection: '#'
  //       },
  //       {
  //         id: v4(),
  //         name: 'Cards',
  //         active: false,
  //         redirection: '#'
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