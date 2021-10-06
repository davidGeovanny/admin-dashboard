import React from 'react';
import toast, { ToastPosition } from 'react-hot-toast';

type ToastType = 'success' | 'danger' | 'info' | 'warning' | 'primary' | 'light' | 'dark'

interface ToastProps {
  message    : string;
  duration  ?: number;
  type      ?: ToastType;
  customIcon?: JSX.Element,
  position  ?: ToastPosition,
};

export const useToastNotification = () => {

  const getToastStyle = ( type: ToastType ): React.CSSProperties => {
    switch ( type ) {
      case 'success':
        return {
          color: '#155724',
          backgroundColor: '#d4edda',
          borderColor: '#c3e6cb',
        };

      case 'danger':
        return {
          color: '#721c24',
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
        };

      case 'info':
        return {
          color: '#0c5460',
          backgroundColor: '#d1ecf1',
          borderColor: '#bee5eb',
        };

      case 'warning':
        return {
          color: '#856404',
          backgroundColor: '#fff3cd',
          borderColor: '#ffeeba',
        };

      case 'primary':
        return {
          color: '#0b3d91',
          backgroundColor: '#d0e0fc',
          borderColor: '#b8d1fb',
        };

      case 'light':
        return {
          color: '#818182',
          backgroundColor: '#fefefe',
          borderColor: '#fdfdfe',
        };

      case 'dark':
        return {
          color: '#171717',
          backgroundColor: '#d4d4d4',
          borderColor: '#bebebe',
        };
    
      default:
        return {};
    }
  }

  const renderIcon = ( customIcon: JSX.Element | undefined, type: ToastType ): JSX.Element | null => {
    if( customIcon ) {
      return customIcon;
    }

    switch ( type ) {
      case 'success':
        return <i className='fas fa-check-circle'></i>;

      case 'danger':
        return <i className='fas fa-times-circle'></i>;

      case 'info':
        return <i className='fas fa-chevron-circle-right'></i>;

      case 'warning':
        return <i className='fas fa-exclamation-triangle'></i>;

      case 'primary':
        return <i className='fas fa-info-circle'></i>;

      case 'light':
      case 'dark':
        return <i className='fas fa-bell'></i>;

      default:
        return null;
    }
  };

  const displayToast = ({ message, customIcon, type = 'light', position = 'top-right', duration = 4000 }: ToastProps) => {
    const id    = new Date().getTime().toString();
    const icon  = renderIcon( customIcon, type );
    const style = getToastStyle( type );
    
    toast.success(
      (
        <div className={`alert-dismissible`}>
          { message }
          <button 
            type='button' 
            className='btn-close'
            onClick={ () => deleteToast( id ) }
          >
            <i className='fas fa-times'></i>
          </button>
        </div>
      ),
      {
        id,
        icon,
        style,
        duration,
        position,
      }
    );
  }

  const deleteToast = ( id: string ) => {
    toast.dismiss( id );
  }

  const deleteAllToasts = () => {
    toast.dismiss();
  }

  return {
    displayToast,
    deleteToast,
    deleteAllToasts,
  };
}