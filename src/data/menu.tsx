import { SidebarMenu } from '../interfaces/SidebarInterface';
import { v4 } from 'uuid';

export const menu: SidebarMenu[] = [
  {
    item: {
      id: v4(),
      name: 'Dashboard',
      active: false,
      redirection: '#'
    },
    icon: 'fa-tachometer-alt',
  },
  {
    item: {
      id: v4(),
      name: 'Components',
      active: false,
      redirection: '#'
    },
    icon: 'fa-cog',
    subitem: {
      isOpen: false,
      header: 'Custom header',
      items: [
        {
          id: v4(),
          name: 'Buttons',
          active: false,
          redirection: '#'
        },
        {
          id: v4(),
          name: 'Cards',
          active: false,
          redirection: '#'
        },
      ]
    }
  },
  {
    item: {
      id: v4(),
      name: 'Charts',
      active: false,
      redirection: '#'
    },
    icon: 'fa-chart-line',
    subitem: {
      isOpen: false,
      header: 'Custom graphs',
      items: [
        {
          id: v4(),
          name: 'Line chart',
          active: false,
          redirection: '#'
        },
        {
          id: v4(),
          name: 'Circle chart',
          active: false,
          redirection: '#'
        },
      ]
    }
  },
  // {
  //   id: v4(),
  //   active: false,
  //   item: {
  //     name: 'Utilities',
  //     redirection: '#'
  //   },
  //   icon: 'fa-wrench',
  //   subitem: {
  //     header: 'Custom header',
  //     items: [
  //       {
  //         name: 'Colors',
  //         redirection: '#'
  //       },
  //       {
  //         name: 'Borders',
  //         redirection: '#'
  //       },
  //       {
  //         name: 'Animations',
  //         redirection: '#'
  //       },
  //     ]
  //   }
  // },
]