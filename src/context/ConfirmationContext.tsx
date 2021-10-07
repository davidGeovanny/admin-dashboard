import React, { createContext, useState } from 'react';
import MicroModal from 'micromodal';

interface ContextProps {
  changeCallback:   ( newCallback: Function ) => void;
  changeBtnMessage: ( text: string ) => void;
  changeTextBody:   ( content: string ) => void;
  closeModal:       () => void;
  openModal:        () => void;
  callback:         Function;
  btnMessage:       string;
  textBody  :       string | JSX.Element;
}

export const ConfirmationContext = createContext({} as ContextProps);

export const ConfirmationProvider: React.FC = ({ children }) => {
  const [ callback, setCallback ]     = useState<Function>( () => () => {} );
  const [ btnMessage, setBtnMessage ] = useState<string>('Continue');
  const [ textBody, setTextBody ] = useState<string | JSX.Element>('Are you sure you want to continue?');

  const changeCallback = ( newCallback: Function ) => {
    setCallback( () => () => newCallback() );
  }

  const changeBtnMessage = ( text: string ) =>  {
    setBtnMessage( text );
  }

  const changeTextBody = ( content: string | JSX.Element ) => {
    setTextBody( content );
  }

  const openModal = () => {
    const exist = document.querySelector('#modal-confirmation');
    if( exist ) {
      MicroModal.show('modal-confirmation');
    }
  }

  const closeModal = () => {
    const exist = document.querySelector('#modal-confirmation');
    if( exist ) {
      MicroModal.close('modal-confirmation');
    }
  }

  return (
    <ConfirmationContext.Provider
      value={{
        changeCallback,
        callback,
        changeBtnMessage,
        btnMessage,
        changeTextBody,
        textBody,
        openModal,
        closeModal,
      }}
    >
      { children }
    </ConfirmationContext.Provider>
  );
}