import { AxiosResponse } from 'axios';

import { GetUserEmployeeResponse } from '../interfaces/api/User/GetUserEmployeeInterface';
import { UpdateUserPasswordRequest, UpdateUserPasswordResponse } from '../interfaces/api/User/UpdateUserPasswordInterface';
import adminApi from '../helpers/adminApi';

export const apiGetUserEmployee = async ( id: number ): Promise<AxiosResponse<GetUserEmployeeResponse>> => {
  return await adminApi.get<GetUserEmployeeResponse>(`/users/${ id }/employee`);
}

export const apiUpdateUserPassword = async ( data: UpdateUserPasswordRequest ): Promise<AxiosResponse<UpdateUserPasswordResponse>> => {
  const { id, password, confirmPassword, currentPassword } = data;

  return await adminApi.put(`/users/${ id }/change-password`, {
    password,
    password_confirmation: confirmPassword,
    current_password:      currentPassword,
  });
}