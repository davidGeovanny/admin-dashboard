import { AuthState } from '../interfaces/AuthState';
import { User } from '../interfaces/LoginInterface';

type AuthAction =
  | { type: 'signUp', payload: { token: string, user: User } }
  | { type: 'addError', payload: string }
  | { type: 'removeError' }
  | { type: 'notAuthenticated' }
  | { type: 'logout' }

export const AuthReducer = ( state: AuthState, action: AuthAction ): AuthState => {
  switch ( action.type ) {
    case 'addError':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null,
        errorMessage: action.payload,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };

    case 'signUp': 
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user
      };

    case 'logout':
    case 'notAuthenticated': 
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null,
      };
  
    default:
      return state;
  }
}