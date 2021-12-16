export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  ok:    boolean;
  user:  UserLogin;
  token: string;
}

export interface UserLogin {
  id:       number;
  username: string;
}