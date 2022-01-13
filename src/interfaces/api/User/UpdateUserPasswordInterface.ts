export interface UpdateUserPasswordRequest {
  id:              number;
  password:        string;
  confirmPassword: string;
  currentPassword: string;
}

export interface UpdateUserPasswordResponse {
  ok:   boolean;
  data: Data;
}

interface Data {
  id:         number;
  username:   string;
  updated_at: Date;
}