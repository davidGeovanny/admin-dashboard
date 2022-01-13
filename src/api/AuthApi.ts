import { AxiosResponse } from 'axios';

import { ValidateTokenResponse, LoginRequest, LoginResponse } from '../interfaces/api/Auth/AuthInterface';
import adminApi from '../helpers/adminApi';

export const apiValidateUserToken = async (): Promise<AxiosResponse<ValidateTokenResponse>> => {
  return await adminApi.get<ValidateTokenResponse>('/auth');
}

export const apiLogin = async ( data: LoginRequest ): Promise<AxiosResponse<LoginResponse>> => {
  const { username, password } = data;

  return await adminApi.post<LoginResponse>('/auth/login', { username, password });
}