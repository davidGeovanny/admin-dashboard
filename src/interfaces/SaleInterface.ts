import { Commission } from './api/Sale/GetCommissions';

export interface SalesContextState {
	loadingCommissions: boolean;
	waterCommissions:  	Commission[];
	icebarCommissions: 	Commission[];
	icecubeCommissions: Commission[];
	deliveryPointCommissions: Commission[];
}