import React, { createContext, useEffect, useReducer } from 'react';
import { LoginResponse, LoginData, UserLogin } from '../interfaces/LoginInterface';
import { AuthReducer } from '../reducer/AuthReducer';
import { AuthState } from '../interfaces/AuthState';
import { useToastNotification } from '../hooks/useToastNotification';
import adminApi from '../helpers/adminApi';
import { RegisterData, RegisterResponse } from '../interfaces/RegisterInterface';

interface ContextProps {
  errorMessage:   string;
  withError:      boolean;
  token:          string | null;
  user:           UserLogin | null;
  status:         'checking' | 'authenticated' | 'not-authenticated';
  loading:        boolean;
  signUp:         ( registerData: RegisterData ) => Promise<boolean>;
  signIn:         ( loginData: LoginData ) => void;
  logOut:         () => void;
  removeError:    () => void;
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

  const { displayToast } = useToastNotification();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = localStorage.getItem('token');

    if( !token ) {
      return dispatch({ type: 'notAuthenticated' });
    }
    
    const resp = await adminApi.get('/auth');
    if( resp.status !== 200 ) {
      return dispatch({ type: 'notAuthenticated' });
    }

    localStorage.setItem('token', resp.data.token);

    dispatch({
      type: 'signUp',
      payload: {
        token: resp.data.token,
        user: resp.data.user
      }
    });
  }
  
  const signIn = async({ username, password }: LoginData ) => {
    try {
      dispatch({ type: 'setLoading' });

      const { data } = await adminApi.post<LoginResponse>('/auth/login', { username, password });

      localStorage.setItem( 'token', data.token );
      
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.user,
        }
      });
    } catch ( error: any ) {
      displayToast( error.response?.data.msg || 'Incorrect data', { appearance: 'error', autoDismiss: false, type: 'Login' });
      
      dispatch({
        type: 'addError',
        payload: error.response?.data.msg || 'Incorrect data'
      });
    }
  };
  
  const signUp = async ( registerData: RegisterData ): Promise<boolean> =>  {
    try {
      dispatch({ type: 'setLoading' });

      const resp = await adminApi.post<RegisterResponse>('/auth/register', registerData);

      if( resp.status === 201 ) {
        return true;
      } 
      return false;
    } catch ( error: any ) {
      displayToast( error.response?.data.msg || 'Incorrect data', { appearance: 'error', autoDismiss: true, type: 'Login' });
    
      dispatch({
        type: 'addError',
        payload: error.response?.data.msg || 'Incorrect data'
      });

      return false;
    }
  }

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
        signUp,
        signIn,
        logOut,
        removeError,
      }}
    >
      { children }
    </AuthContext.Provider>
  );
}