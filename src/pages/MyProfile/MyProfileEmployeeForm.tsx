import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';

import { MyProfileContext } from '../../context/MyProfileContext';
import { Input } from '../../components/ui/Input/Input';
import { Dropdown } from '../../components/ui/Dropdown/Dropdown';

interface EmployeeFormData {
  name:            string;
  first_lastname:  string;
  second_lastname: string;
  email:           string;
  gender:          string;
};

export const MyProfileEmployeeForm = () => {
  const { employee, loading, updateEmployee } = useContext( MyProfileContext );

  const initialValues: EmployeeFormData = {
    name:            employee?.name || '',
    first_lastname:  employee?.first_lastname || '',
    second_lastname: employee?.second_lastname || '',
    email:           employee?.email || '',
    gender:          employee?.gender || '',
  };

  const validationSchema: Yup.SchemaOf<EmployeeFormData> = Yup.object({
    name:            Yup.string().required(),
    first_lastname:  Yup.string().required(),
    second_lastname: Yup.string().required(),
    email:           Yup.string().required().email(),
    gender:          Yup.mixed().required().oneOf(['male', 'female']),
  });

  const handleSubmit = async ( data: EmployeeFormData, formikHelpers: FormikHelpers<EmployeeFormData> ) => {
    if( !employee ) return;

    await updateEmployee({
      id:              employee.id,
      name:            data.name,
      first_lastname:  data.first_lastname,
      second_lastname: data.second_lastname,
      email:           data.email,
      gender:          data.gender,
    });
  }

  return (
    <Formik
      initialValues={ initialValues }
      validationSchema={ validationSchema }
      onSubmit={ handleSubmit }
      enableReinitialize={ true }
    >
      {( { errors, touched } ) => (
        <Form>
          <div className="row">
            <div className="col-12">
              <div className={`input-group ${ ( errors.name && touched.name ) ? 'is-invalid' : '' }`}>
                <Input
                  autoComplete="off"
                  name="name"
                  label="Nombre(s) del empleado"
                  placeholder="Ingrese su nombre"
                  className={`${ ( errors.name && touched.name ) ? 'is-invalid' : '' }`}
                />
              </div>
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>

            <div className="col-xl-6 col-12">
              <div className={`input-group ${ ( errors.first_lastname && touched.first_lastname ) ? 'is-invalid' : '' }`}>
                <Input
                  autoComplete="off"
                  name="first_lastname"
                  label="Apellido paterno del empleado"
                  placeholder="Ingrese su apellido paterno"
                  className={`${ ( errors.first_lastname && touched.first_lastname ) ? 'is-invalid' : '' }`}
                />
              </div>
              <ErrorMessage name="first_lastname" component="div" className="invalid-feedback" />
            </div>

            <div className="col-xl-6 col-12">
              <div className={`input-group ${ ( errors.second_lastname && touched.second_lastname ) ? 'is-invalid' : '' }`}>
                <Input
                  autoComplete="off"
                  name="second_lastname"
                  label="Apellido materno del empleado"
                  placeholder="Ingrese su apellido matero"
                  className={`${ ( errors.second_lastname && touched.second_lastname ) ? 'is-invalid' : '' }`}
                />
              </div>
              <ErrorMessage name="second_lastname" component="div" className="invalid-feedback" />
            </div>

            <div className="col-12">
              <div className={`input-group ${ ( errors.email && touched.email ) ? 'is-invalid' : '' }`}>
                <Input
                  autoComplete="off"
                  name="email"
                  label="Correo electrónico del empleado"
                  placeholder="Ingrese su correo electrónico"
                  className={`${ ( errors.email && touched.email ) ? 'is-invalid' : '' }`}
                  type="email"
                />
              </div>
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>

            <div className="col-xl-3 col-12 mt-xl-3 mb-xl-2">
              <div className={`input-group ${ ( errors.email && touched.email ) ? 'is-invalid' : '' }`}>
                <Dropdown
                  data={ ['male', 'female'] }
                  name="gender"
                />
              </div>
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>

            <div className="col-12 mt-1">
              <button className="btn btn-primary btn-block" type="submit">
              { 
                loading 
                  ? <> <i className="fas fa-spinner fa-pulse"></i> Cargando, espere... </>
                  : 'Actualizar empleado' 
              }
              </button>
            </div>

          </div>
        </Form>
      )}
    </Formik>
  );
}
