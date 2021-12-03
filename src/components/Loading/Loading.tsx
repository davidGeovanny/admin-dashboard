import React from 'react';

interface Props {
  size?:  number;
  color?: string;
}

export const Loading = ({ size = 1, color = 'white' }: Props) => {
  if( size <= 0 ) size = 1;
  if( size > 10 ) size = 10;
  
  return (
    <div className={`fa-${ size }x`}>
      <i 
        className='fas fa-spinner fa-pulse'
        style={{
          color
        }}
      ></i>
    </div>
  );
}