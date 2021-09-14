export type Picture = 
  | { type: 'icon',  icon: string, backgroundColor?: string }
  | { type: 'image', src : string, backgroundColor?: string }

type InfoTextColor = 'soft-color' | 'normal-color' | 'bold-color';

export interface TopbarItem {
  id: string;
  read: boolean;
  picture: Picture;
  infoText?: TopbarInfoText;
  description: string;
}

interface TopbarInfoText {
  text    : string;
  color   : InfoTextColor;
  position: 'top' | 'bottom';
}