import React from 'react'
import { Loading } from './Loading';

export const BgLoading = () => {
  return (
    <div className='loading bg-gradient-primary'>
      <Loading size={ 4 } />
    </div>
  );
}
