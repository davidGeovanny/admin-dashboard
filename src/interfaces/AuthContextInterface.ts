import { UserLogin } from './models/UserInterface';

export interface AuthContextState {
  errorMessage: string;
  withError:    boolean;
  loading:      boolean;
  status:       'checking' | 'authenticated' | 'not-authenticated';
  token:        string | null;
  user:         UserLogin | null;
}