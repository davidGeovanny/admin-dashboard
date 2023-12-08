import { CommissionsConfigModalForm } from './CommissionsConfigModalForm';
import { CommissionConfigContext, CommissionConfigProvider } from '../../context/CommissionConfigContext';
import { useContext, useEffect } from 'react';
import { CommissionsConfigBranchForm } from './CommissionsConfigBranchForm';
import { DeliveryPointCommissionConfig } from '../../interfaces/models/DeliveryPointCommissionConfigInterface';
import { ConfirmationContext } from '../../context/ConfirmationContext';

const _CommissionsConfigPage = () => {
	const {
		selectedBranch,
		deliveryPointCommissionConfigByBranch,
		getCommissionDeliveryPointConfigs,
		openModal,
		deleteCommissionDeliveryPointConfig,
	} = useContext( CommissionConfigContext );

	const {
		openModal: openModalConfirmationDelete,
		closeModal: closeModalConfirmationDelete,
		changeCallback,
		changeTextBody,
	} = useContext( ConfirmationContext );

	useEffect(() => {
		getCommissionDeliveryPointConfigs();
	}, []);

	useEffect(() => {
		changeTextBody('¿Está seguro que desea eliminar la configuración de comisión?');
	}, []);

	function handleClickEditar (config: DeliveryPointCommissionConfig) {
		openModal(config);
	}

	function handleClickEliminar (config: DeliveryPointCommissionConfig) {
		changeCallback( () => _deleteDeliveryPointCommissionConfig(config) );
    openModalConfirmationDelete();
	}

	function _deleteDeliveryPointCommissionConfig (config: DeliveryPointCommissionConfig) {
		deleteCommissionDeliveryPointConfig(config);
		closeModalConfirmationDelete();
	}

	return (
		<div className="container-fluid">
			<CommissionsConfigBranchForm />

			<div className="row">
				<div className="col-12">
					<div className="card card-header-actions mb-4">
						<div className="card-header">
							Porcentajes de Comisión: Encargados de Puntos de Entrega
							{
								selectedBranch
									? (
										<button
											className="btn btn-sm btn-primary"
											type="button"
											onClick={ () => openModal(null) }
										>
												Nueva Configuración
										</button>
									)
									: ''
							}
							
						</div>
						<div className="card-body px-3">
							<div>
								<h3>{ selectedBranch ? selectedBranch.branch : 'Seleccione una Sucursal' }</h3>
							</div>

							<table className="table table-sm table-bordered table-hover">
								<thead>
									<tr>
										<th>Rango Mínimo</th>
										<th>Rango Máximo</th>
										<th>Porcentaje de Comisión</th>
										{/* El TH de acciones debe abarcar solo lo que los botones ocupen */}
										<th className='text-right w-15'>Acciones</th>
									</tr>
								</thead>
								<tbody>
									{
										deliveryPointCommissionConfigByBranch.map( config => (
											<tr key={ config.id }>
												<td className='align-middle'>{ config.min_range }</td>
												<td className='align-middle'>{ config.max_range }</td>
												<td className='align-middle'>{ config.percent }</td>
												<td className='align-middle' style={{
													display: 'flex',
													justifyContent: 'flex-end',
													gap: '5px',
												}}>
													<button className="btn btn-sm btn-primary" type="button" onClick={ () => handleClickEditar(config) }>Editar</button>
													<button className="btn btn-sm btn-danger" type="button" onClick={ () => handleClickEliminar(config) }>Eliminar</button>
												</td>
											</tr>
										))
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<CommissionsConfigModalForm />
		</div>
	);
}

export const CommissionsConfigPage = () => {
	return (
    <CommissionConfigProvider>
			<_CommissionsConfigPage />
    </CommissionConfigProvider>
  );
}