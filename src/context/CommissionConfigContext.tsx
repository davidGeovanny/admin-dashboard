import { createContext, useEffect, useReducer, useState } from 'react';
import { CommissionContextState } from '../interfaces/CommissionInterface';
import { DeliveryPointCommissionConfig } from '../interfaces/models/DeliveryPointCommissionConfigInterface';
import { CommissionConfigReducer } from '../reducer/CommissionConfigReducer';
import { useToastNotification } from '../hooks/useToastNotification';
import { apiDeleteDeliveryPointCommissionConfig, apiGetDeliveryPointCommissionConfig, apiSaveDeliveryPointCommissionConfig } from '../api/CommissionApi';
import { BranchCompany } from '../interfaces/models/BranchCompanyInterface';
import MicroModal from 'micromodal';

interface ContextProps {
	deliveryPointCommissionConfigs: 				DeliveryPointCommissionConfig[];
	branches: 															BranchCompany[];
	selectedBranch: 												BranchCompany | null;
	deliveryPointCommissionConfigByBranch: 	DeliveryPointCommissionConfig[];
	deliveryPointCommissionConfigSelected: 	DeliveryPointCommissionConfig | null;
	loading:																boolean;
	getCommissionDeliveryPointConfigs: 			() => Promise<void>;
	setSelectedBranch: 											(branch: BranchCompany) => void;
	openModal: 															(config: DeliveryPointCommissionConfig | null) => void;
	saveCommissionDeliveryPointConfig: 			(config: DeliveryPointCommissionConfig) => Promise<void>;
	deleteCommissionDeliveryPointConfig: 		(config: DeliveryPointCommissionConfig) => Promise<void>;
}

const commissionConfigInitState: CommissionContextState = {
  deliveryPointCommissionConfigs: [],
	branches: [],
	selectedBranch: null,
	deliveryPointCommissionConfigSelected: null,
	loading: false,
}

export const CommissionConfigContext = createContext( {} as ContextProps );

export const CommissionConfigProvider: React.FC = ({ children }) => {
	const [ state, dispatch ] = useReducer( CommissionConfigReducer, commissionConfigInitState );
	const { displayToast }    = useToastNotification();

	const { selectedBranch, deliveryPointCommissionConfigs } = state;
	const [ deliveryPointCommissionConfigByBranch, setDeliveryPointCommissionConfigByBranch ] = useState<DeliveryPointCommissionConfig[]>([]);

	const getCommissionDeliveryPointConfigs = async () => {
		try {
			const { loading } = state;

			if( loading ) {
				return displayToast({
					message:  'Cargando...',
					type:     'info',
					duration: 5000
				});
			}

			dispatch({ type: 'setLoading' });

			const commissionDeliveryPointConfigData = await apiGetDeliveryPointCommissionConfig();
			dispatch({ type: 'setDeliveryPointConfigs', payload: commissionDeliveryPointConfigData ? commissionDeliveryPointConfigData.data : [] });

			const branchCompanies: BranchCompany[] = [];

			if (commissionDeliveryPointConfigData) {
				commissionDeliveryPointConfigData.data.forEach( config => {
					const branch = branchCompanies.find(b => b.id === config.id_branch_company);

					if (!branch) {
						branchCompanies.push({
							id: config.id_branch_company,
							branch: config.branch!,
							status: '',
						});
					}
				});
			}
			
			dispatch({ type: 'setBranches', payload: branchCompanies });
		} catch (error: any) {
			displayToast({
				message:  error.response.data.msg ?? 'Ha ocurrido un error al cargar la información',
        type:     'danger',
        duration: 5000
      });
		}

		dispatch({ type: 'clearLoading' });
	}

	const saveCommissionDeliveryPointConfig = async (config: DeliveryPointCommissionConfig) => {
		try {
			dispatch({ type: 'setLoading' });

			const { data: resp } = await apiSaveDeliveryPointCommissionConfig(config);

			dispatch({
				type: config.id === 0 ? 'insertDeliveryPointConfig' : 'updateDeliveryPointConfig',
				payload: resp.data
			});

			displayToast({
        position: 'top-right',
        message: 'Configuración guardada con éxito',
        duration: 7000,
        type: 'success'
      });

			clearForm();
			closeModal();
		} catch (error: any) {
			displayToast({
        message:  error.response.data.msg ?? 'Ha ocurrido un error al guardar la información',
        type:     'danger',
        duration: 5000
      });
		}

		dispatch({ type: 'clearLoading' });
	}

	const deleteCommissionDeliveryPointConfig = async (config: DeliveryPointCommissionConfig) => {
		try {
			if (config.id === 0) return;

			dispatch({ type: 'setLoading' });

			const { data: resp } = await apiDeleteDeliveryPointCommissionConfig(config.id);

			dispatch({
				type: 'deleteDeliveryPointConfig',
				payload: config.id
			});

			displayToast({
				position: 'top-right',
				message: 'Configuración eliminada con éxito',
				duration: 7000,
				type: 'success'
			});
		} catch (error: any) {
			displayToast({
				message:  error.response.data.msg ?? 'Ha ocurrido un error al eliminar la información',
				type:     'danger',
				duration: 5000
			});
		}

		dispatch({ type: 'clearLoading' });
	}

	const setSelectedBranch = (branch: BranchCompany) => {
		dispatch({ type: 'setSelectedBranch', payload: branch });
	}

	const openModal = (config: DeliveryPointCommissionConfig | null) => {
		const exist = document.querySelector('#modal-confirmation-form');
		if( exist ) {
			dispatch({ type: 'setDeliveryPointConfigSelected', payload: config });
			clearForm();

		  MicroModal.show('modal-confirmation-form');
		}
	}

	const clearForm = () => {
		const btnClear = document.querySelector('.modal__footer_commission #btn-clear');
		if (!btnClear) return;

		btnClear.dispatchEvent(new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		}));
	}

	const closeModal = () => {
		MicroModal.close('modal-confirmation-form');
	}

	useEffect(() => {
		if (!selectedBranch) {
			setDeliveryPointCommissionConfigByBranch([]);
			return;
		}

		if (deliveryPointCommissionConfigs && deliveryPointCommissionConfigs.length > 0) {
			const commissionConfigDeliveryPointByBranch = deliveryPointCommissionConfigs.filter(config => config.id_branch_company === selectedBranch.id);
			setDeliveryPointCommissionConfigByBranch(commissionConfigDeliveryPointByBranch);
		}
	}, [selectedBranch, deliveryPointCommissionConfigs]);

	return (
		<CommissionConfigContext.Provider
			value={{
				...state,
				deliveryPointCommissionConfigByBranch,
				getCommissionDeliveryPointConfigs,
				setSelectedBranch,
				saveCommissionDeliveryPointConfig,
				deleteCommissionDeliveryPointConfig,
				openModal,
			}}
		>
			{ children }
		</CommissionConfigContext.Provider>
	);
}