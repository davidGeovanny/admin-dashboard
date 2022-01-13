import React, { createContext, useEffect, useReducer } from 'react';

import { AuthReducer } from '../reducer/AuthReducer';
import { apiValidateUserToken, apiLogin } from '../api/AuthApi';
import { useToastNotification } from '../hooks/useToastNotification';
import { LoginRequest } from '../interfaces/api/Auth/AuthInterface';
import { UserLogin } from '../interfaces/models/UserInterface';
import { AuthState } from '../interfaces/AuthState';

interface ContextProps {
  status:       'checking' | 'authenticated' | 'not-authenticated';
  user:         UserLogin | null;
  token:        string | null;
  loading:      boolean;
  withError:    boolean;
  errorMessage: string;
  signIn:       ( loginData: LoginRequest ) => void;
  logOut:       () => void;
  removeError:  () => void;
}

const authInitState: AuthState = {
  status:       'checking',
  loading:      false,
  token:        null,
  user:         null,
  errorMessage: '',
  withError:    false,
};

export const AuthContext = createContext( {} as ContextProps );

export const AuthProvider: React.FC = ({ children }) => {

  const [ state, dispatch ] = useReducer( AuthReducer , authInitState );

  const { displayToast, deleteAllToasts } = useToastNotification();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if( !token ) {
        return dispatch({ type: 'notAuthenticated' });
      }

      const { status, data } = await apiValidateUserToken();

      if( status !== 200 ) {
        return dispatch({ type: 'notAuthenticated' });
      }

      localStorage.setItem('token', data.token);
  
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user:  data.user
        }
      });
    } catch ( error:  any ) {
      dispatch({ type: 'notAuthenticated' });
    }
  }
  
  const signIn = async( request: LoginRequest ) => {
    try {
      dispatch({ type: 'setLoading' });

      const { data } = await apiLogin( request );

      localStorage.setItem( 'token', data.token );

      deleteAllToasts();

      displayToast({
        customIcon: (<i className='fas fa-handshake'></i>),
        position:   'bottom-center',
        message:    '¡Bienvenido de vuelta!',
        duration:   8000,
        type:       'light',
      });
      
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user:  data.user,
        }
      });
    } catch ( error: any ) {
      displayToast({
        message:  error.response?.data.msg || 'Datos incorrectos',
        type:     'danger',
        duration: Infinity
      });
            
      dispatch({
        type:    'addError',
        payload: error.response?.data.msg || 'Datos incorrectos'
      });
    }
  };

  const logOut = () =>  {
    localStorage.removeItem('token');

    dispatch({ type: 'logout' });
  }

  const removeError = () =>  {
    dispatch({ type: 'removeError' });
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        logOut,
        removeError,
      }}
    >
      { children }
    </AuthContext.Provider>
  );
}