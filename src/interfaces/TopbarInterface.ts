import { InfoTextColor, Picture } from '../types/TopbarType';

export interface TopbarItem {
  id:          string;
  read:        boolean;
  picture:     Picture;
  infoText?:   TopbarInfoText;
  description: string;
}

interface TopbarInfoText {
  text:     string;
  color:    InfoTextColor;
  position: 'top' | 'bottom';
}