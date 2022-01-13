import { Employee } from '../../models/EmployeeInterface';
import { User } from '../../models/UserInterface';

export interface GetUserEmployeeResponse {
  ok:   boolean;
  data: Data;
}

interface Data extends User {
  employee: Employee; 
}