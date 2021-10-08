import { SalesState } from '../interfaces/SaleInterface';

type SalesAction = 
	| { type: '' }

export const SalesReducer =  ( state: SalesState, action: SalesAction ): SalesState => {
	switch ( action.type ) {
		case '':
			return {
				...state,
			}
	
		default:
			return state;
	}
}