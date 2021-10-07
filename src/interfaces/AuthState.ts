import { UserLogin } from './LoginInterface';

export interface AuthState {
  errorMessage: string;
  withError:    boolean;
  loading:      boolean;
  status:       'checking' | 'authenticated' | 'not-authenticated';
  token:        string | null;
  user:         UserLogin | null;
}