import { Employee, User } from './UserInterface';

export interface MyProfileState {
  user:     User | null;
  employee: Employee | null;
}