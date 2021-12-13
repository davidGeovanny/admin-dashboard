import React, { useContext } from 'react';
import ReactDatePicker from 'react-datepicker';
import { DashboardContext } from '../../context/DashboardContext';
import { Dropdown } from '../../components/ui/Dropdown';
import { dashboard__dropdownData } from '../../data/dropdown';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  show: boolean;
}

export const DashboardForm = ({ show }: Props) => {
  const { 
    changePeriod,
    changeInitDate,
    changeFinalDate,
    getSalesData,
    period,
    initDate,
    finalDate,
  } = useContext( DashboardContext );

  const onSubmit = () => {
    getSalesData();
  }

  return (
    <div className={`row mx-1 my-1 justify-content-end ${ !show ? 'd-none' : 'fadeIn' } `}>
      <div className='col-xl-10 col-lg-10 col-12'>
        <div className='row justify-content-end'>
          <div className='col-xl-4 col-lg-4 col-12 mb-xl-0 mb-lg-0 mb-2'>
            <div className={`input-group ${ period !== 'Personalizado' ? 'd-none' : 'fadeIn' }`}>
              <ReactDatePicker
                className='form-control'
                placeholderText='Desde'
                onChange={ ( date: Date | null ) => {
                  changeInitDate( date );
                }}
                selected={ initDate }
                dateFormat='MMMM d, yyyy'
                disabled={ period !== 'Personalizado' }
              />
            </div>
          </div>

          <div className='col-xl-4 col-lg-4 col-12 mb-xl-0 mb-lg-0 mb-2'>
            <div className={`input-group ${ period !== 'Personalizado' ? 'd-none' : 'fadeIn' }`}>
              <ReactDatePicker
                className='form-control'
                placeholderText='Hasta'
                onChange={ ( date: Date | null ) => {
                  changeFinalDate( date );
                }}
                selected={ finalDate }
                dateFormat='MMMM d, yyyy'
                disabled={ period !== 'Personalizado' }
              />
            </div>
          </div>

          <div className='col-xl-3 col-lg-3 col-12 mr-xl-0 mr-lg-0 mr-2'>
            <div className='row justify-content-end'>
              
              <Dropdown
                data={ dashboard__dropdownData }
                defaultOption={ period }
                onChange={ changePeriod }
                position='left'
              />
              <button 
                type='button' 
                className='btn btn-primary btn-square'
                onClick={ onSubmit }
              >
                <i className='fas fa-sync-alt'></i>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
