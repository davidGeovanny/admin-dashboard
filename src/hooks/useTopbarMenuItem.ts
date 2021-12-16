import { useRef, useState } from 'react';
import { TopbarItem } from '../interfaces/TopbarInterface';

export const useTopbarMenuItem = ( items: TopbarItem[] ) => {
  const [ isMenuVisible, setIsMenuVisible ] = useState<boolean>( false );
  const isHover = useRef<boolean>( false );
  const divRef  = useRef( null );

  const getCountReadItems = () => items.filter( item => item.read ).length;

  const handleClick = () => {
    setIsMenuVisible( !isMenuVisible );
  }

  const handleBlur = () => {
    if( isMenuVisible && !isHover.current ) {
      handleClick();
    }
  }

  const handleMouseEvent = ( status: boolean ) => {
    isHover.current = status;
  }

  return {
    divRef,
    isMenuVisible,
    getCountReadItems,
    handleClick,
    handleBlur,
    handleMouseEvent,
  };
}