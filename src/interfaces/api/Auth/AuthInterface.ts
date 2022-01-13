import { UserLogin } from '../../models/UserInterface';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  ok:    boolean;
  user:  UserLogin;
  token: string;
}

export interface ValidateTokenResponse {
  ok:    boolean;
  user:  UserLogin;
  token: string;
}