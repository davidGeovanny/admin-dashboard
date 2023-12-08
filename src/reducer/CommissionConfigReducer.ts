import { CommissionContextState } from '../interfaces/CommissionInterface';
import { BranchCompany } from '../interfaces/models/BranchCompanyInterface';
import { DeliveryPointCommissionConfig } from '../interfaces/models/DeliveryPointCommissionConfigInterface';

type CommissionConfigAction =
	| { type: 'setLoading' }
	| { type: 'clearLoading' }
	| { type: 'setDeliveryPointConfigs', payload: DeliveryPointCommissionConfig[] }
	| { type: 'setBranches', payload: BranchCompany[] }
	| { type: 'setSelectedBranch', payload: BranchCompany }
	| { type: 'setDeliveryPointConfigSelected', payload: DeliveryPointCommissionConfig | null }
	| { type: 'insertDeliveryPointConfig', payload: DeliveryPointCommissionConfig }
	| { type: 'updateDeliveryPointConfig', payload: DeliveryPointCommissionConfig }
	| { type: 'deleteDeliveryPointConfig', payload: number }

export const CommissionConfigReducer =  ( state: CommissionContextState, action: CommissionConfigAction ): CommissionContextState => {
	switch ( action.type ) {

		case 'setDeliveryPointConfigs': {
			return {
				...state,
				deliveryPointCommissionConfigs: action.payload,
			};
		}

		case 'setBranches': {
			return {
				...state,
				branches: action.payload,
			};
		}

		case 'setSelectedBranch': {
			return {
				...state,
				selectedBranch: action.payload,
			};
		}

		case 'setDeliveryPointConfigSelected': {
			return {
				...state,
				deliveryPointCommissionConfigSelected: action.payload,
			};
		}

		case 'insertDeliveryPointConfig': {
			return {
				...state,
				deliveryPointCommissionConfigs: [ ...state.deliveryPointCommissionConfigs, action.payload ],
			};
		}

		case 'updateDeliveryPointConfig': {
			return {
				...state,
				deliveryPointCommissionConfigs: state.deliveryPointCommissionConfigs.map( deliveryPointCommissionConfig => (
					deliveryPointCommissionConfig.id === action.payload.id
						? action.payload
						: deliveryPointCommissionConfig
				)),
			};
		}

		case 'deleteDeliveryPointConfig': {
			return {
				...state,
				deliveryPointCommissionConfigs: state.deliveryPointCommissionConfigs.filter( deliveryPointCommissionConfig => (
					deliveryPointCommissionConfig.id !== action.payload
				)),
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