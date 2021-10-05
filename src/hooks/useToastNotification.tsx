import { useState } from 'react';
import toast from 'react-hot-toast';

export const useToastNotification = () => {

  const displayToast = ( message: string, options: any ) => {
    // toast.success('Hello World', {
    //   duration: Infinity,
    //   // duration
    //   position: 'top-center',
    //   // Styling
    //   style: {},
    //   className: '',
    //   // Custom Icon
    //   icon: '👏',
    //   // Change colors of success/error/loading icon
    //   iconTheme: {
    //     primary: '#000',
    //     secondary: '#fff',
    //   },
    //   // Aria
    //   ariaProps: {
    //     role: 'status',
    //     'aria-live': 'polite',
    //   },
    // });

    toast.custom(
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
          <i className="fas fa-times"></i>
        </button>
      </div>,
      {
        duration: Infinity
      }
    )
  }

  const deleteToast = () => {
  }

  const deleteAllToasts = () => {

  }

  return {
    displayToast,
    deleteToast,
  };
}