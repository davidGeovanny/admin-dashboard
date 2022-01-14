import { Commission } from '../interfaces/api/Sale/GetCommissions';
import { 
	SalesContextState, 
	// Commission 
} from '../interfaces/SaleInterface';

type SalesAction = 
	| { type: 'setLoadingCommission' }
	| { type: 'setCommissions', payload: { water: Commission[], icebar: Commission[], icecube: Commission[] } }

export const SalesReducer =  ( state: SalesContextState, action: SalesAction ): SalesContextState => {
	switch ( action.type ) {
		case 'setLoadingCommission':
			return {
				...state,
				loadingCommissions: true,
			};

		case 'setCommissions':
			return {
				...state,
				loadingCommissions: false,
				waterCommissions: 	action.payload.water,
				icebarCommissions: 	action.payload.icebar,
				icecubeCommissions: action.payload.icecube,
			};
	
		default:
			return state;
	}
}