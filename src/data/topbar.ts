import { v4 } from 'uuid';
import { TopbarItem } from '../interfaces/TopbarInterface';

export const topbar__notifications: TopbarItem[] = [
  {
    id: v4(),
    read: false,
    picture: {
      type: 'icon',
      icon: 'fa-file-alt',
      backgroundColor: '#4e73df'
    },
    description: 'Un texto de descripción',
    infoText: {
      position: 'top',
      color: 'soft-color',
      text: 'Enero 01, 2021' 
    }
  },
  {
    id: v4(),
    read: true,
    picture: {
      type: 'icon',
      icon: 'fa-exclamation-triangle',
      backgroundColor: '#f6c23e'
    },
    description: 'Una emergencia a comprobar',
    infoText: {
      position: 'top',
      color: 'soft-color',
      text: 'Enero 02, 2021' 
    }
  },
];

export const topbar__messages: TopbarItem[] = [
  {
    id: v4(),
    read: false,
    picture: {
      type: 'image',
      src: 'https://seeklogo.com/images/L/logitech-gaming-logo-B76FC713B0-seeklogo.com.png',
    },
    description: 'Un texto de descripción',
    infoText: {
      position: 'bottom',
      color: 'soft-color',
      text: 'Hace 20 minutos'
    }
  },
  {
    id: v4(),
    read: true,
    picture: {
      type: 'image',
      src: 'https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png',
    },
    description: 'Un mensaje de un usuario inexistente',
    infoText: {
      position: 'bottom',
      color: 'soft-color',
      text: 'Hace 25 minutos'
    }
  },
];