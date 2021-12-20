import { Profile } from './ProfileInterface';
import { Employee } from './ProfilePageInterface';

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