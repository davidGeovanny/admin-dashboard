// api/users/:id
export interface SpecificUserResponse {
  ok:   boolean;
  data: UserComplete;
}

export interface User {
  id:          number;
  username:    string;
  status:      string;
  id_employee: number;
  created_at:  Date;
  updated_at:  Date;
}

export interface UserComplete extends User {
  profiles: Profile[];
  employee: Employee;
}

interface Profile {
  id:         number;
  profile:    string;
  status:     string;
  created_at: Date;
  updated_at: Date;
}

export interface Employee {
  id:              number;
  name:            string;
  first_lastname:  string;
  second_lastname: string;
  gender:          string;
  email:           string;
  created_at:      Date;
  updated_at:      Date;
}