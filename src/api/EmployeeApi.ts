import { AxiosResponse } from 'axios';

import { UpdateEmployeeRequest, UpdateEmployeeResponse } from '../interfaces/api/Employee/UpdateEmployeeInterface';
import adminApi from '../helpers/adminApi';

export const apiUpdateEmployee = async ( data: UpdateEmployeeRequest ): Promise<AxiosResponse<UpdateEmployeeResponse>> => {
  const { id, ...rest } = data;

  return await adminApi.put<UpdateEmployeeResponse>(`/employees/${ id }`, { ...rest });
}