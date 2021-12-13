import React, { useContext } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Dropdown } from '../../components/ui/Dropdown';
import { dashboard__dropdownData } from '../../data/dropdown';
import { DashboardContext } from '../../context/DashboardContext';
import { formatDate } from '../../helpers/format';
import { useForm, Controller } from 'react-hook-form';
import { DashboardFormData } from '../../interfaces/DashboardInterface';

export const DashboardForm = () => {

  const { 
    getSalesData,
    changePeriod,
    changeInitDate,
    changeFinalDate,
    period,
    // initDate,
    // finalDate,
  } = useContext( DashboardContext );

  const { handleSubmit, formState: { errors }, control, setError, clearErrors } = useForm<DashboardFormData>();

  const onSubmit = () => {
    // getSalesData( initDate, finalDate );
  }

  return (
    <div className="row mx-1 my-1 justify-content-end">
      <div className="col-xl-10 col-lg-10 col-12">
        <div className="row justify-content-end">
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
                        placeholderText='Desde'
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
                        placeholderText='Hasta'
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

              <div className="col">
                <div className="row justify-content-end">
                  {/* <button
                    className='btn btn-primary btn-user btn-block'
                    disabled={ false }
                  >
                    { false
                        ? <> <i className='fas fa-spinner fa-pulse'></i> Cargando... </>
                        : 'Obtener comisiones' 
                    }
                  </button> */}
                </div>
                
              </div>
            </div>
          </form>

          {/* <div className="col-xl-4 col-lg-4 col-12 mb-xl-0 mb-lg-0 mb-1">
            <ReactDatePicker
              className={`form-control`}
              placeholderText='Desde'
              dateFormat='MMMM d, yyyy'
              onChange={ ( date ) => {
                if( date ) {
                  // changeInitDate( formatDate( date ) );
                }
              }}
              // selected={ field.value }
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-12 mb-xl-0 mb-lg-0 mb-1">
            <ReactDatePicker
              className={`form-control`}
              placeholderText='Hasta'
              dateFormat='MMMM d, yyyy'
              onChange={ ( date ) => {
                
              }}
            />
          </div>

          <div className="col-xl-3 col-lg-3 col-12 mr-xl-0 mr-lg-0 mr-2">
            <div className="row justify-content-end">
              
              <Dropdown
                data={ dashboard__dropdownData }
                defaultOption={ period }
                onChange={ changePeriod }
                position='left'
              />
              <button 
                type='button' 
                className='btn btn-primary btn-square'
                onClick={ handleSubmit }
              >
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
            
          </div> */}

        </div>


      </div>

    </div>
  );
}
