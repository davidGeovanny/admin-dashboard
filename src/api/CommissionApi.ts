import { DeliveryPointCommissionConfigResponse, SaveDeliveryPointCommissionConfigResponse } from '../interfaces/api/CommissionConfig/DeliveryPointInterface';
import adminApi from '../helpers/adminApi';
import { DeliveryPointCommissionConfig } from '../interfaces/models/DeliveryPointCommissionConfigInterface';
import { AxiosResponse } from 'axios';

export const apiGetDeliveryPointCommissionConfig = async (): Promise<DeliveryPointCommissionConfigResponse | undefined> => {
  try {
    const { data } = await adminApi.get<DeliveryPointCommissionConfigResponse>(`/delivery-point-commission-config/`, { 
      params: { paginated: false }
    });
    return data;
  } catch (error) {
    return undefined;
  }
}

export const apiSaveDeliveryPointCommissionConfig = async (data: DeliveryPointCommissionConfig): Promise<AxiosResponse<SaveDeliveryPointCommissionConfigResponse>> => {
  const { id, min_range, max_range, percent, id_branch_company, type_product } = data;

  if (id === 0) {
    return await adminApi.post(`/delivery-point-commission-config/`, {
      min_range,
      max_range,
      percent,
      id_branch_company,
      type_product,
    });
  }

  return await adminApi.put(`/delivery-point-commission-config/${ id }`, {
    min_range,
    max_range,
    percent,
    id_branch_company,
    type_product,
  });
}

export const apiDeleteDeliveryPointCommissionConfig = async (id: number): Promise<AxiosResponse<SaveDeliveryPointCommissionConfigResponse>> => {
  return await adminApi.delete(`/delivery-point-commission-config/${ id }`);
}