import React, { createContext, useEffect, useReducer } from 'react';
import { LoginResponse, LoginData, User } from '../interfaces/LoginInterface';
import { AuthReducer } from '../reducer/AuthReducer';
import { AuthState } from '../interfaces/AuthState';
import adminApi from '../helpers/adminApi';

interface ContextProps {
  errorMessage:   string;
  token:          string | null;
  user:           User | null;
  status:         'checking' | 'authenticated' | 'not-authenticated'
  signUp:         () => void;
  signIn:         ( loginData: LoginData ) => void;
  logOut:         () => void;
  removeError:    () => void;
}

const authInitState: AuthState = {
  status:       'checking',
  token:        null,
  user:         null,
  errorMessage: ''
};

export const AuthContext = createContext( {} as ContextProps );

export const AuthProvider: React.FC = ({ children }) => {

  const [ state, dispatch ] = useReducer( AuthReducer , authInitState );

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

  const signUp = () =>  {
  }
  
  const signIn = async({ username, password }: LoginData ) => {
    try {
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
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Incorrect data'
      });
    }
  };

  const logOut = () =>  {

  }

  const removeError = () =>  {

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