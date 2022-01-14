import { RangePeriod } from '../types/DashboardType';
import { DashboardContextState } from '../interfaces/DashboardInterface';
import { TopBranch, TopClient, TopProduct, TopTypeProduct } from '../interfaces/models/SaleInterface';

type DashboardAction = 
	| { type: 'setLoading' }
	| { type: 'clearLoading' }
	| { type: 'setProductsTopFrequent', payload: TopProduct[] }
	| { type: 'setProductsTopIncome', 	payload: TopProduct[] }
	| { type: 'setClientsTopIncome', 		payload: TopClient[] }
	| { type: 'setBranchesRevenue', 		payload: TopBranch[] }
	| { type: 'setTypeProductRevenue', 	payload: TopTypeProduct[] }
	| { type: 'setPeriod',		payload: RangePeriod }
	| { type: 'setInitDate',	payload: Date }
	| { type: 'setFinalDate', payload: Date }

export const DashboardReducer =  ( state: DashboardContextState, action: DashboardAction ): DashboardContextState => {
	switch ( action.type ) {

		case 'setFinalDate':
			return {
				...state,
				finalDate: action.payload,
			};

		case 'setInitDate':
			return {
				...state,
				initDate: action.payload,
			};

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