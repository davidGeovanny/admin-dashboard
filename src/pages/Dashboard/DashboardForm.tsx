import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';

import { DashboardContext } from '../../context/DashboardContext';
import { Dropdown } from '../../components/ui/Dropdown/Dropdown';
import { DatePicker } from '../../components/ui/DatePicker/DatePicker';
import { DashboardFormData } from '../../interfaces/DashboardInterface';

import { dashboard__dropdownData } from '../../data/dropdown';

export const DashboardForm = () => {
  const { 
    changePeriod,
    changeInitDate,
    changeFinalDate,
    getSalesData,
    period,
    initDate,
    finalDate,
    loading,
  } = useContext( DashboardContext );

  const initialValues: DashboardFormData = {
    initDate,
    finalDate,
    period,
  }

  const validationSchema: Yup.SchemaOf<DashboardFormData> = Yup.object({
    initDate: Yup.date()
              .required('La fecha inicial es obligatoria')
              .max( Yup.ref('finalDate'), 'La fecha inicial debe ser mayor a la fecha final' )
              .nullable(),
    finalDate: Yup.date()
              .required('La fecha final es obligatoria')
              .min( Yup.ref('initDate'), 'La fecha final debe ser mayor a la fecha inicial' )
              .nullable(),
    period: Yup.mixed().oneOf([ dashboard__dropdownData ])
  }).defined();

  const handleSubmit = ( data: DashboardFormData, {  }: FormikHelpers<DashboardFormData> ) => {
    getSalesData();
  }

  const handleValidate = ( data: DashboardFormData ) => {
    if( data.initDate ) {
      changeInitDate( data.initDate );
    }
    
    if( data.finalDate ) {
      changeFinalDate( data.finalDate );
    }

    if( data.period !== period ) {
      changePeriod( data.period );
    }
  }

  return (
    <Formik
      initialValues={ initialValues }
      onSubmit={ handleSubmit }
      validationSchema={ validationSchema }
      validate={ handleValidate }
      enableReinitialize={ true }
    >
      {( { errors, touched, values } ) => (
        <Form className="user">
          <div className="row justify-content-end">
            <div className="col-xl-4 col-lg-4 col-12 mb-xl-0 mb-lg-0 mb-2">
              <div className={`input-group ${ period !== 'Personalizado' ? "d-none" : "fadeIn" } ${ ( errors.finalDate && touched.finalDate ) ? "is-invalid" : "" }`}>
                <DatePicker
                  name="initDate"
                  autoComplete="off"
                  className={`form-control ${ ( errors.initDate && touched.initDate ) ? "is-invalid" : "" }`}
                  placeholderText="Seleccione la fecha inicial"
                  dateFormat="MMMM d, yyyy"
                  disabled={ period !== 'Personalizado' }
                  startDate={ values.initDate }
                  endDate={ values.finalDate }
                  selectsStart
                />
              </div>
              <ErrorMessage name="initDate" component="div" className="invalid-feedback" />
            </div>

            <div className="col-xl-4 col-lg-4 col-12 mb-xl-0 mb-lg-0 mb-2">
              <div className={`input-group ${ period !== 'Personalizado' ? 'd-none' : 'fadeIn' } ${ ( errors.finalDate && touched.finalDate ) ? 'is-invalid' : '' }`}>
                <DatePicker
                  name="finalDate"
                  autoComplete="off"
                  className={`form-control ${ ( errors.finalDate && touched.finalDate ) ? 'is-invalid' : '' }`}
                  placeholderText="Seleccione la fecha final"
                  dateFormat="MMMM d, yyyy"
                  disabled={ period !== 'Personalizado' }
                  startDate={ values.initDate }
                  endDate={ values.finalDate }
                  minDate={ values.initDate }
                  selectsEnd
                />
              </div>
              <ErrorMessage name="finalDate" component="div" className="invalid-feedback" />
            </div>

            <div className="col-xl-3 col-lg-3 col-md-8 col-6">
              <div className="row justify-content-end" >
                <div className="col-9" style={{ paddingRight: 0, paddingLeft: 0 }}>
                  <Dropdown
                    data={ dashboard__dropdownData }
                    name="period"
                    position="left"
                    loading={ loading }
                    className="btn-square"
                  />
                </div>
                <div className="col-3" style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <button className="btn btn-primary btn-square w-100">
                    <i className="fas fa-sync-alt"></i>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </Form>
      )}
    </Formik>
  );
}