import { DashboardState } from '../interfaces/DashboardInterface';
import { RangePeriod } from '../types/DashboardType';
import { 
	TopProduct, 
	TopClient, 
	TopBranches, 
	TopTypeProduct 
} from '../interfaces/SaleInterface';

type DashboardAction = 
	| { type: 'setLoading' }
	| { type: 'clearLoading' }
	| { type: 'setProductsTopFrequent', payload: TopProduct[] }
	| { type: 'setProductsTopIncome', 	payload: TopProduct[] }
	| { type: 'setClientsTopIncome', 		payload: TopClient[] }
	| { type: 'setBranchesRevenue', 		payload: TopBranches[] }
	| { type: 'setTypeProductRevenue', 	payload: TopTypeProduct[] }
	| { type: 'setPeriod', 	payload: RangePeriod }

export const DashboardReducer =  ( state: DashboardState, action: DashboardAction ): DashboardState => {
	switch ( action.type ) {

		case 'setPeriod':
			return {
				...state,
				period: action.payload,
			};

		case 'setProductsTopFrequent': {
			return {
				...state,
				productsTopFrequent: action.payload,
			};
		}
		
		case 'setProductsTopIncome': {
			return {
				...state,
				productsTopIncome: action.payload,
			};
		}
		
		case 'setClientsTopIncome': {
			return {
				...state,
				clientsTopIncome: action.payload,
			};
		}
		
		case 'setBranchesRevenue': {
			return {
				...state,
				branchesRevenue: action.payload,
			};
		}
		
		case 'setTypeProductRevenue': {
			return {
				...state,
				typeProductRevenue: action.payload,
			};
		}

		case 'setLoading':
			return {
				...state,
				loading: true,
			};

		case 'clearLoading':
			return {
				...state,
				loading: false,
			};
	
		default:
			return state;
	}
}