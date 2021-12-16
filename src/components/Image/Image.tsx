import React from 'react';
import photos from '../../assets/svg/photos.svg';

interface Props {
  src:        string;
  className?: string;
  style?:     React.CSSProperties;
}

export const Image = ({ className, src, style = {} }: Props) => {
  const handleError = ( e: React.SyntheticEvent<HTMLImageElement, Event> ) => {
    if( e.currentTarget.src !== src ) {
      e.currentTarget.onerror = null;
      e.currentTarget.src = photos;
    }
  }

  return (
    <img
      className={ className }
      src={ src }
      alt='Profile'
      style={{ ...style }}
      onError={ handleError }
    />
  );
}
