import { User } from './LoginInterface';

export interface AuthState {
  status:       'checking' | 'authenticated' | 'not-authenticated';
  token:        string | null;
  errorMessage: string;
  user:         User | null;
}