export type Picture = 
  | { type: 'icon',  icon: string, backgroundColor?: string }
  | { type: 'image', src : string, backgroundColor?: string }

export type InfoTextColor = 
  | 'soft-color' 
  | 'normal-color' 
  | 'bold-color'