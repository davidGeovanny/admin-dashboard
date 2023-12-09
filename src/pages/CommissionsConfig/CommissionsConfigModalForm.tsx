import React, { useContext } from 'react';

import * as Yup from 'yup';
import { ErrorMessage, Form, Formik, FormikTouched } from 'formik';
import { CommissionConfigContext } from '../../context/CommissionConfigContext';
import { DeliveryPointCommissionConfig } from '../../interfaces/models/DeliveryPointCommissionConfigInterface';
import { Input } from '../../components/ui/Input/Input';
import { Dropdown } from '../../components/ui/Dropdown/Dropdown';
import '../../micromodal.css';

const defaultValues: DeliveryPointCommissionConfig = {
	min_range: 					0,
	max_range: 					1,
	percent:   					0.0,
	id_branch_company: 	0,
	id: 								0,
	type_product: 			'AGUA EMBOTELLADA',
}

export const CommissionsConfigModalForm = () => {
	const {
		deliveryPointCommissionConfigSelected,
		selectedBranch,
		loading,
		saveCommissionDeliveryPointConfig,
	} = useContext( CommissionConfigContext );

	const initialValues: DeliveryPointCommissionConfig = {
		min_range: 					deliveryPointCommissionConfigSelected?.min_range || defaultValues.min_range,
		max_range: 					deliveryPointCommissionConfigSelected?.max_range || defaultValues.max_range,
		percent:   					deliveryPointCommissionConfigSelected?.percent || defaultValues.percent,
		id_branch_company: 	deliveryPointCommissionConfigSelected?.id_branch_company || selectedBranch?.id || defaultValues.id_branch_company,
		id: 								deliveryPointCommissionConfigSelected?.id || defaultValues.id,
		type_product: 			deliveryPointCommissionConfigSelected?.type_product || defaultValues.type_product,
	}

	const handleSubmit = (data: DeliveryPointCommissionConfig) => {
		saveCommissionDeliveryPointConfig(data);
	}

	const validationSchema: Yup.SchemaOf<DeliveryPointCommissionConfig> = Yup.object({
		//-> min_range es obligatorio, debe ser un número, debe ser mayor a cero y menor a max_range
		min_range: Yup.number()
			.required('El rango mínimo es obligatorio')
			.moreThan(-1, 'El rango mínimo debe ser mayor o igual a cero')
			.lessThan(Yup.ref('max_range'), 'El rango mínimo debe ser menor al rango máximo'),
		//-> max_range es obligatorio, debe ser un número, debe ser mayor a min_range
		max_range: Yup.number()
			.required('El rango máximo es obligatorio')
			.moreThan(Yup.ref('min_range'), 'El rango máximo debe ser mayor al rango mínimo'),
		//-> percent es obligatorio, debe ser un número, debe ser mayor a cero y menor a 1 (es decir, es un número decimal)
		percent: Yup.number()
			.required('El porcentaje de comisión es obligatorio')
			.moreThan(0, 'El porcentaje de comisión debe ser mayor a cero')
			.lessThan(1, 'El porcentaje de comisión debe ser menor a 1'),
		//-> id_branch_company es obligatorio
		id_branch_company: Yup.number()
			.required('El id de sucursal es obligatorio'),
		//-> id no es obligatorio
		id: Yup.number()
			.required('El id es obligatorio'),
		//-> branch no es obligatorio
		branch: Yup.string(),
		//-> type_product sí es obligatorio
		type_product: Yup.string()
			.required('El tipo de producto es obligatorio')
			.oneOf(['BARRA', 'CUBO', 'AGUA EMBOTELLADA']),
	});

  return (
    <div className='modal micromodal-slide' id='modal-confirmation-form'>
      <div className='modal__overlay' tabIndex={ -1 }>
        <div className='modal__container' style={{
					width: '40vw',
					maxWidth: '40vw',
				}}>
          <header className='modal__header'>
            <h2 className='modal__title' id='modal-confirmation-form-title'>
              { deliveryPointCommissionConfigSelected ? 'Editar' : 'Nueva' } Configuración de Comisión por Punto de Entrega
            </h2>
            <button className='modal__close' data-micromodal-close />
          </header>

					<Formik
						initialValues={ initialValues }
						validationSchema={ validationSchema }
						onSubmit={ handleSubmit }
						enableReinitialize={ true }
					>
						{( { errors, touched, resetForm, setTouched, setErrors } ) => (
							<>
								<Form className="user">
									<main className='modal__content' id='modal-confirmation-form-content'>
										<div className="row">
											<div className="col-sm-12 col-md-4">
												<div className={`input-group ${ ( errors.min_range && touched.min_range ) ? 'is-invalid' : '' }`}>
													<Input
														type="number"
														autoComplete="off"
														name="min_range"
														label="Rango mínimo"
														placeholder="Rango mínimo"
														className={`${ ( errors.min_range && touched.min_range ) ? 'is-invalid' : '' }`}
													/>
												</div>
												<ErrorMessage name="min_range" component="div" className="invalid-feedback" />
											</div>

											<div className="col-sm-12 col-md-4">
												<div className={`input-group ${ ( errors.max_range && touched.max_range ) ? 'is-invalid' : '' }`}>
													<Input
														type="number"
														autoComplete="off"
														name="max_range"
														label="Rango máximo"
														placeholder="Rango máximo"
														className={`${ ( errors.max_range && touched.max_range ) ? 'is-invalid' : '' }`}
													/>
												</div>
												<ErrorMessage name="max_range" component="div" className="invalid-feedback" />
											</div>

											<div className="col-sm-12 col-md-4">
												<div className={`input-group ${ ( errors.percent && touched.percent ) ? 'is-invalid' : '' }`}>
													<Input
														type="number"
														autoComplete="off"
														name="percent"
														label="Porcentaje de comisión"
														placeholder="Porcentaje de Comisión"
														className={`${ ( errors.percent && touched.percent ) ? 'is-invalid' : '' }`}
													/>
												</div>
												<ErrorMessage name="percent" component="div" className="invalid-feedback" />
											</div>
											
											<div className="col-md-8"></div>

											<div className="col-sm-12 col-md-4 mt-3">
												<div className={`input-group ${ ( errors.type_product && touched.type_product ) ? 'is-invalid' : '' }`}>
													<Dropdown
														data={ ['BARRA', 'CUBO', 'AGUA EMBOTELLADA'] }
														name="type_product"
														position='left'
													/>
												</div>
												<ErrorMessage name="type_product" component="div" className="invalid-feedback" />
											</div>
										</div>
									</main>

									<footer className='modal__footer_commission'>
										<button
											className='btn btn-success'
											type='button'
											id="btn-clear"
											onClick={ () => {
												resetForm();
												setTouched({}, false);
												setErrors({});
											}}
										>
											Limpiar
										</button>

										<button type='button' className='btn btn-secondary' data-micromodal-close>
											Cancelar
										</button>

										<button
											className='btn btn-primary'
											type='submit'
											disabled={ loading }
										>
											{
												loading
													? <> <i className="fas fa-spinner fa-pulse"></i> Cargando, espere... </>
													: 'Aceptar'
											}
										</button>
									</footer>
								</Form>
							</>
						)}
					</Formik>
        </div>
      </div>
    </div>
  )
}