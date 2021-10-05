import { AuthState } from '../interfaces/AuthState';
import { UserLogin } from '../interfaces/LoginInterface';

type AuthAction =
  | { type: 'signUp', payload: { token: string, user: UserLogin } }
  | { type: 'addError', payload: string }
  | { type: 'removeError' }
  | { type: 'notAuthenticated' }
  | { type: 'logout' }
  | { type: 'setLoading' }

export const AuthReducer = ( state: AuthState, action: AuthAction ): AuthState => {
  switch ( action.type ) {
    case 'addError':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null,
        errorMessage: action.payload,
        withError: true,
        loading: false,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
        withError: false,
        loading: false,
      };

    case 'signUp': 
      return {
        ...state,
        errorMessage: '',
        withError: false,
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      };

    case 'logout':
    case 'notAuthenticated': 
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null,
        loading: false,
      };

    case 'setLoading':
        return {
          ...state,
          loading: true,
        };
  
    default:
      return state;
  }
}