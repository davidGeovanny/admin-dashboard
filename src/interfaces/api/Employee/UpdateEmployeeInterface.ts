import { Employee } from '../../models/EmployeeInterface';

export interface UpdateEmployeeRequest {
  id:              number;
  name:            string;
  first_lastname:  string;
  second_lastname: string;
  email:           string;
  gender:          string;
};

export interface UpdateEmployeeResponse {
  ok:   boolean;
  data: Employee;
}