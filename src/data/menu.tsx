import { SidebarMenu } from '../interfaces/SidebarInterface';

export const menu: SidebarMenu[] = [
  {
    active: false,
    item: {
      name: 'Dashboard',
      redirection: '#'
    },
    icon: 'fa-tachometer-alt',
  },
  {
    active: true,
    item: {
      name: 'Components',
      redirection: '#'
    },
    icon: 'fa-cog',
    subitem: {
      header: 'Custom header',
      items: [
        {
          name: 'Buttons',
          redirection: '#'
        },
        {
          name: 'Cards',
          redirection: '#'
        },
      ]
    }
  },
  {
    active: false,
    item: {
      name: 'Utilities',
      redirection: '#'
    },
    icon: 'fa-wrench',
    subitem: {
      header: 'Custom header',
      items: [
        {
          name: 'Colors',
          redirection: '#'
        },
        {
          name: 'Borders',
          redirection: '#'
        },
        {
          name: 'Animations',
          redirection: '#'
        },
      ]
    }
  },
]