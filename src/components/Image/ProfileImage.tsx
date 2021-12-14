import React, { memo, useState, useEffect } from 'react';
import { randomColor } from '../../helpers/color';

interface Props {
  image?:       string;
  text?:        string;
  width:        string | number;
  height:       string | number;
  figure:       'circle' | 'square',
  colorRandom?: boolean,
}

export const ProfileImage = memo(({ image, text, width, height, figure, colorRandom = false }: Props) => {
  const [ bgColor, setBgColor ] = useState<string>();

  useEffect(() => {
    setBgColor( colorRandom ? randomColor( 0.2 ) : '#446AD8' );
  }, []);
  
  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius:    ( figure === 'circle' ) ? '100%' : '20%',
        textAlign:        'center',
        width,
        height,
      }}
    >
      {
        ( image )
          ? (
            <img
              className='img-profile rounded-circle'
              src={ image }
              alt='Profile'
              style={{
                width,
                height,
              }}
            />
          )
          : <> { text } </>
      }
      
    </div>
  );
})