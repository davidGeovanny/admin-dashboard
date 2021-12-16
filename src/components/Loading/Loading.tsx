import React from 'react';

interface Props {
  color?: string;
  size?:  number;
}

export const Loading = ({ color = 'white', size = 1 }: Props) => {
  if( size <= 0 ) size = 1;
  if( size > 10 ) size = 10;
  
  return (
    <div className={`fa-${ size }x`}>
      <i 
        className='fas fa-spinner fa-pulse'
        style={{ color }}
      ></i>
    </div>
  );
}