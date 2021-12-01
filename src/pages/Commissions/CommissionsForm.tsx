import React, { useContext } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import { CommissionFormData } from '../../interfaces/SaleInterface';
import { SalesContext } from '../../context/SalesContex';
import 'react-datepicker/dist/react-datepicker.css';

interface Props { loading: boolean; }

export const CommissionsForm = ({ loading }: Props) => {

  const { getCommissions } = useContext( SalesContext );

  const { handleSubmit, formState: { errors }, control, setError, clearErrors } = useForm<CommissionFormData>();

  const onSubmit = ( data: CommissionFormData ) => {
    if( !data.initDate ) {
      return setError('initDate', { message: 'La fecha inicial es obligatoria' });
    }

    if( !data.finalDate ) {
      return setError('finalDate', { message: 'La fecha final es obligatoria' });
    }

    if( data.finalDate < data.initDate ) {
      return setError('finalDate', { message: 'La fecha final no puede ser menor que la fecha inicial' });
    }

    getCommissions({ initDate: data.initDate, finalDate: data.finalDate });
  }

  return (
    <div className='row'>
      <div className='col-12'>
        <form
          className='user'
          onSubmit={ handleSubmit( onSubmit ) }
        >
          <div className='row'>
            <div className='col-lg-5 col-md-6 col-12 mb-lg-0 mb-md-0 mb-2'>
              <div className={`input-group ${ errors.initDate ? 'is-invalid' : '' }`}>
                <span className='input-group-text max-w-40 '>Fecha inicial</span>
                <Controller
                  control={ control }
                  name='initDate'
                  render={ ({ field }) => (
                    <ReactDatePicker
                      className={`form-control ${ errors.initDate ? 'is-invalid' : '' }`}
                      placeholderText='Seleccionar fecha inicial'
                      onChange={ ( date ) => {
                        field.onChange( date );
                        clearErrors('initDate');
                      }}
                      selected={ field.value }
                      dateFormat='MMMM d, yyyy'
                    />
                  )}
                  rules={{
                    required: { value: true, message: 'La fecha inicial es requerida' },
                  }}
                />
              </div>

              { errors.initDate && (
                <div className='invalid-feedback'>
                  { errors.initDate.message }
                </div>
              )}
            </div>

            <div className='col-lg-5 col-md-6 col-12 mb-lg-0 mb-md-0 mb-2'>
              <div className={`input-group ${ errors.finalDate ? 'is-invalid' : '' }`}>
                <span className='input-group-text max-w-40 '>Fecha final</span>
                <Controller
                  control={ control }
                  name='finalDate'
                  render={ ({ field }) => (
                    <ReactDatePicker
                      className={`form-control ${ errors.finalDate ? 'is-invalid' : '' }`}
                      placeholderText='Seleccionar fecha final'
                      onChange={ ( date ) => {
                        field.onChange( date );
                        clearErrors('finalDate');
                      }}
                      selected={ field.value }
                      dateFormat='MMMM d, yyyy'
                    />
                  )}
                  rules={{
                    required: { value: true, message: 'La fecha final es requerida' },
                  }}
                />
              </div>

              { errors.finalDate && (
                <div className='invalid-feedback'>
                  { errors.finalDate.message }
                </div>
              )}
            </div>

            <div className='col'>
              <button
                className='btn btn-primary btn-user btn-block'
                disabled={ loading }
              >
                { loading
                    ? <> <i className='fas fa-spinner fa-pulse'></i> Cargando... </>
                    : 'Obtener comisiones' 
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
