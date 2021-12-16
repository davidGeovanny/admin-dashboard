import React, { createContext, useState } from 'react';
import MicroModal from 'micromodal';

interface ContextProps {
  btnMessage:       string;
  callback:         Function;
  textBody  :       string | JSX.Element;
  changeBtnMessage: ( text: string ) => void;
  changeCallback:   ( newCallback: Function ) => void;
  changeTextBody:   ( content: string ) => void;
  closeModal:       () => void;
  openModal:        () => void;
}

export const ConfirmationContext = createContext( {} as ContextProps );

export const ConfirmationProvider: React.FC = ({ children }) => {
  const [ callback, setCallback ]     = useState<Function>( () => () => {} );
  const [ btnMessage, setBtnMessage ] = useState<string>('Continuar');
  const [ textBody, setTextBody ]     = useState<string | JSX.Element>('¿Está seguro que desea continuar?');

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