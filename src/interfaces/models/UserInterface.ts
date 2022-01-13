export interface User {
  id:          number;
  username:    string;
  status:      string;
  id_employee: number;
  created_at:  Date;
  updated_at:  Date;
}

export interface UserLogin {
  id:       number;
  username: string;
}