import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';

import { SalesContext } from '../../context/SalesContex';
import { DatePicker } from '../../components/ui/DatePicker/DatePicker';
import { GetCommissionsRequest } from '../../interfaces/api/Sale/GetCommissions';

interface Props { loading: boolean; }

export const CommissionsForm = ({ loading }: Props) => {
  const { getCommissions } = useContext( SalesContext );

  const initialValues: GetCommissionsRequest = {
    initDate:  null,
    finalDate: null,
  };

  const validationSchema: Yup.SchemaOf<GetCommissionsRequest> = Yup.object({
    initDate: Yup.date()
              .required('La fecha inicial es obligatoria')
              .max( Yup.ref('finalDate'), 'La fecha inicial debe ser mayor a la fecha final' )
              .nullable(),
    finalDate: Yup.date()
              .required('La fecha final es obligatoria')
              .min( Yup.ref('initDate'), 'La fecha final debe ser mayor a la fecha inicial' )
              .nullable(),
  });

  const handleSubmit = ( data: GetCommissionsRequest, {  }: FormikHelpers<GetCommissionsRequest> ) => {
    getCommissions({ initDate: data.initDate, finalDate: data.finalDate });
  }

  return (
    <Formik
      initialValues={ initialValues }
      onSubmit={ handleSubmit }
      validationSchema={ validationSchema }
    >
      {( { errors, touched, values } ) => (
        <Form className="user">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-12 mb-lg-0 mb-md-0 mb-2">
              <div className={`input-group ${ ( errors.initDate && touched.initDate ) ? "is-invalid" : "" }`}>
                <span className="input-group-text max-w-40">Fecha inicial</span>
                <DatePicker
                  name="initDate"
                  autoComplete="off"
                  className={`form-control ${ ( errors.initDate && touched.initDate ) ? "is-invalid" : "" }`}
                  placeholderText="Seleccione la fecha inicial"
                  dateFormat="MMMM d, yyyy"
                  startDate={ values.initDate }
                  endDate={ values.finalDate }
                  selectsStart
                />
              </div>
              <ErrorMessage name="initDate" component="div" className="invalid-feedback" />
            </div>

            <div className="col-lg-5 col-md-6 col-12 mb-lg-0 mb-md-0 mb-2">
              <div className={`input-group ${ ( errors.finalDate && touched.finalDate ) ? "is-invalid" : "" }`}>
                <span className="input-group-text max-w-40">Fecha final</span>
                <DatePicker
                  name="finalDate"
                  autoComplete="off"
                  className={`form-control ${ ( errors.finalDate && touched.finalDate ) ? "is-invalid" : "" }`}
                  placeholderText="Seleccione la fecha final"
                  dateFormat="MMMM d, yyyy"
                  startDate={ values.initDate }
                  endDate={ values.finalDate }
                  minDate={ values.initDate }
                  selectsEnd
                  showMonthDropdown
                />
              </div>
              <ErrorMessage name="finalDate" component="div" className="invalid-feedback" />
            </div>

            <div className="col">
              <button
                className="btn btn-primary btn-user btn-block"
                disabled={ loading }
              >
                { loading
                    ? <> <i className="fas fa-spinner fa-pulse"></i> Cargando... </>
                    : 'Obtener comisiones' 
                }
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
