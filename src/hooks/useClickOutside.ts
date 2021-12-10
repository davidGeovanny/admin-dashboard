import { useEffect } from 'react';

export const useClickOutside = ( ref: React.RefObject<HTMLElement>, callback: Function ) => {
  const handleClick = ( e: any ) => {
    if( ref.current && !ref.current.contains( e.target ) ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick, true);
  }, []);
};