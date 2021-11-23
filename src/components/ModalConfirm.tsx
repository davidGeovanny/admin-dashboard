import React, { useContext } from 'react';
import Micromodal from 'micromodal';
import '../micromodal.css';

import { ConfirmationContext } from '../context/ConfirmationContext';

Micromodal.init();

export const ModalConfirm = () => {

  const { 
    callback,
    btnMessage,
    textBody,
  } = useContext( ConfirmationContext );

  const handleClick = () => {
    callback();
  }

  return (
    <div className='modal micromodal-slide' id='modal-confirmation'>
      <div className='modal__overlay' tabIndex={ -1 } data-micromodal-close>
        <div className='modal__container'>
          <header className='modal__header'>
            <h2 className='modal__title' id='modal-confirmation-title'>
              Confirmación
            </h2>
            <button className='modal__close' data-micromodal-close />
          </header>

          <main className='modal__content' id='modal-confirmation-content'>
            <p>{ textBody }</p>
          </main>

          <footer className='modal__footer'>
            <button 
              className='btn btn-primary' 
              onClick={ handleClick }
            >
              { btnMessage }
            </button>

            <button className='btn btn-secondary' data-micromodal-close>
              Cancelar
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
