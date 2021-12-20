import { Employee } from './EmployeeInterface';
import { User } from './UserInterface';

export interface MyProfileState {
  user:     User | null;
  employee: Employee | null;
}