export interface RegisterData {
  name:           string;
  firstLastName:  string;
  secondLastName: string;
  email:          string;
  password:       string;
  repeatPassword: string;
}

export interface RegisterResponse {
  ok:   boolean;
  user: UserRegister;
}

export interface UserRegister {
  id:       number;
  username: string;
}
