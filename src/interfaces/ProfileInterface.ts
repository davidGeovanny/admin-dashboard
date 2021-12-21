




export interface UserResponse {
  ok:    boolean;
  data:  User[];
  page:  number;
  count: number;
  size:  number;
}

export interface User {
  id:          number;
  username:    string;
  status:      string;
  id_employee: number;
  created_at:  Date;
  updated_at:  Date;
}
