import { DeliveryPointCommissionConfig } from '../../models/DeliveryPointCommissionConfigInterface';

export interface DeliveryPointCommissionConfigResponse {
	ok:    boolean;
	data:  DeliveryPointCommissionConfig[];
	page:  number;
	count: number;
	size:  number;
}

export interface SaveDeliveryPointCommissionConfigResponse {
	ok:    boolean;
	data:  DeliveryPointCommissionConfig;
}