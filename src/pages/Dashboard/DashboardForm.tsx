import React, { useContext } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Dropdown } from '../../components/ui/Dropdown';
import { dashboard__dropdownData } from '../../data/dropdown';
import { DashboardContext } from '../../context/DashboardContext';
import { formatDate } from '../../helpers/format';

export const DashboardForm = () => {

  const { 
    getSalesData,
    changePeriod,
    changeInitDate,
    changeFinalDate,
    period,
    initDate,
    finalDate,
  } = useContext( DashboardContext );

  const handleSubmit = () => {
    getSalesData( initDate, finalDate );
  }

  return (
    <div className="row mx-1 my-1 justify-content-end">
      <div className="col-xl-10 col-lg-10 col-12">
        <div className="row justify-content-end">

          <div className="col-xl-4 col-lg-4 col-12 mb-xl-0 mb-lg-0 mb-1">
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
            
          </div>

        </div>


      </div>

    </div>
  );
}
