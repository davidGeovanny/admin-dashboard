import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { CommissionsTable } from './Commissions/CommissionsTable';
import { SalesContext } from '../context/SalesContex';
import { CommissionFormData, Commission } from '../interfaces/SaleInterface';
import 'react-datepicker/dist/react-datepicker.css';
import { CommissionsSection } from '../types/SalesType';
import { ColumnDefinitionType } from '../types/SimpleTable';

const columns: ColumnDefinitionType<Commission, keyof Commission>[] = [
  {
    key: 'branch',
    header: 'Branch company',
  },
  {
    key: 'employee',
    header: 'Name employee',
  },
  {
    key: 'commission',
    header: 'Commission'
  }
]

export const CommissionsPage = () => {

  const { 
    getCommissions, 
    loadingCommissions, 
    waterCommissions, 
    icebarCommissions, 
    icecubeCommissions 
  } = useContext( SalesContext );

  const [ showCommissions, setShowCommissions ] = useState({
    water: true,
    icebar: true,
    icecube: true,
  });

  const changeSetShowCommission = ( value: boolean, section: CommissionsSection ) => {
    console.log({
      value, section
    });
    setShowCommissions({
      ...showCommissions,
      [ section ]: value
    });
  }

  const isMounted = useRef<boolean>( true );

  const { handleSubmit, formState: { errors }, control, getValues } = useForm<CommissionFormData>();
  const { initDate } = getValues();

  const onSubmit = ( data: CommissionFormData ) => {
    getCommissions({ initDate: data.initDate, finalDate: data.finalDate });
  }

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);
  
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <form
            className='user'
            onSubmit={ handleSubmit( onSubmit ) }
          >

            <div className='row'>
              <div className='col-lg-5 col-md-6 col-12 mb-lg-0 mb-md-0 mb-2'>
                <div className={`input-group ${ errors.initDate ? 'is-invalid' : '' }`}>
                  <span className='input-group-text max-w-40 '>Initial date</span>
                  <Controller
                    control={ control }
                    name='initDate'
                    render={ ({ field }) => (
                      <ReactDatePicker
                        className={`form-control ${ errors.initDate ? 'is-invalid' : '' }`}
                        placeholderText='Select initial date'
                        onChange={ ( date ) => field.onChange( date ) }
                        selected={ field.value }
                        dateFormat='MMMM d, yyyy'
                      />
                    )}
                    rules={{
                      required: { value: true, message: 'Initial date is required' },
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
                  <span className='input-group-text max-w-40 '>Final date</span>
                  <Controller
                    control={ control }
                    name='finalDate'
                    render={ ({ field }) => (
                      <ReactDatePicker
                        className={`form-control ${ errors.finalDate ? 'is-invalid' : '' }`}
                        placeholderText='Select final date'
                        onChange={ ( date ) => field.onChange( date ) }
                        selected={ field.value }
                        dateFormat='MMMM d, yyyy'
                      />
                    )}
                    rules={{
                      required: { value: true, message: 'Final date is required' },
                      validate: finalDate => ( ( finalDate && initDate ) && finalDate >= initDate ) || "Final date can't be less than the init date"
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
                  disabled={ loadingCommissions }
                >
                  {
                    loadingCommissions
                      ? <> <i className='fas fa-spinner fa-pulse'></i> Loading... </>
                      : 'Get commissions' 
                  }
                </button>
              </div>
            </div>

            <hr />
          </form>
        </div>
      </div>
    
      <div className='row'>
        <div className='col-12'>
          <CommissionsTable 
            show={ showCommissions.water }
            setShow={ changeSetShowCommission }
            section='water'
            data={ waterCommissions }
            columns={ columns }
            title='Water Commissions'
          />
        </div>
        <div className='col-12'>
          {/* <CommissionsTable 
            show={ showCommissions.icebar }
            setShow={ changeSetShowCommission }
            section='icebar'
          /> */}
        </div>
        <div className='col-12'>
          {/* <CommissionsTable 
            show={ showCommissions.icecube }
            setShow={ changeSetShowCommission }
            section='icecube'
          /> */}
        </div>
      </div>
    </div>
  );
}
