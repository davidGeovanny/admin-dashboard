import React, { memo, useState, useEffect } from 'react';
import { Image } from './Image';
import { randomColor } from '../../helpers/color';

interface Props {
  figure:       'circle' | 'square',
  height:       string | number;
  width:        string | number;
  colorRandom?: boolean,
  image?:       string;
  text?:        string;
}

export const ProfileImage = memo(({ figure, height, image, text, width, colorRandom = false }: Props) => {
  const [ bgColor, setBgColor ] = useState<string>();

  useEffect(() => {
    setBgColor( colorRandom ? randomColor( 0.2 ) : '#446AD8' );
  }, []);
  
  return (
    <div style={{
      backgroundColor: bgColor,
      borderRadius:    ( figure === 'circle' ) ? '100%' : '20%',
      textAlign:        'center',
      height,
      width,
    }}>
      {
        ( image )
          ? (
            <Image
              src={ image }
              className='img-profile rounded-circle'
              style={{
                width,
                height
              }}
            />
          )
          : <> { text } </>
      }
    </div>
  );
});