import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';

import { MyProfileContext } from '../../context/MyProfileContext';
import { Input } from '../../components/ui/Input/Input';

interface UserFormData {
  user:             string | undefined;
  password:         string;
  repeat_password:  string;
  current_password: string;
};

export const MyProfileUserForm = () => {
  const { user, loading, updatePasswordUser } = useContext( MyProfileContext );

  const initialValues: UserFormData = {
    user:             user?.username,
    password:         '',
    repeat_password:  '',
    current_password: ''
  };

  const validationSchema: Yup.SchemaOf<UserFormData> = Yup.object({
    user:     Yup.string(),
    password: Yup.string().required('La contraseña es obligatoria'),
    repeat_password: Yup.string()
      .required('Debe confirmar la contraseña')
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
    current_password: Yup.string().required('Necesita ingresar su contraseña actual'),
  });

  const handleSubmit = async ( data: UserFormData, formikHelpers: FormikHelpers<UserFormData> ) => {
    if( !user ) return;

    await updatePasswordUser({
      id:              user.id,
      password:        data.password,
      currentPassword: data.current_password,
      confirmPassword: data.repeat_password,
    });

    formikHelpers.resetForm();
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
              <div className={`input-group ${ ( errors.user && touched.user ) ? "is-invalid" : "" }`}>
                <Input
                  autoComplete="off"
                  name="user"
                  label="Nombre de usuario"
                  placeholder="Ingrese su usuario"
                  className={`${ ( errors.user && touched.user ) ? "is-invalid" : "" }`}
                  disabled
                />
              </div>
              <ErrorMessage name="user" component="div" className="invalid-feedback" />
            </div>

            <div className="col-12">
              <div className={`input-group ${ ( errors.password && touched.password ) ? "is-invalid" : "" }`}>
                <Input
                  autoComplete="off"
                  name="password"
                  type="password"
                  label="Contraseña"
                  placeholder="Ingrese su nueva contraseña"
                  className={`${ ( errors.password && touched.password ) ? "is-invalid" : "" }`}
                />
              </div>
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>

            <div className="col-12">
              <div className={`input-group ${ ( errors.repeat_password && touched.repeat_password ) ? "is-invalid" : "" }`}>
                <Input
                  autoComplete="off"
                  name="repeat_password"
                  type="password"
                  label="Confirmar contraseña"
                  placeholder="Confirme su nueva contraseña"
                  className={`${ ( errors.repeat_password && touched.repeat_password ) ? "is-invalid" : "" }`}
                />
              </div>
              <ErrorMessage name="repeat_password" component="div" className="invalid-feedback" />
            </div>

            <div className="col-12">
              <div className={`input-group ${ ( errors.current_password && touched.current_password ) ? "is-invalid" : "" }`}>
                <Input
                  autoComplete="off"
                  name="current_password"
                  type="password"
                  label="Contraseña actual"
                  placeholder="Ingrese su contraseña actual"
                  className={`${ ( errors.current_password && touched.current_password ) ? "is-invalid" : "" }`}
                />
              </div>
              <ErrorMessage name="current_password" component="div" className="invalid-feedback" />
            </div>

            <div className="col-12 mt-1">
              <button 
                className="btn btn-primary btn-block" 
                type="submit"
                disabled={ loading }
              >
                { 
                  loading 
                    ? <> <i className="fas fa-spinner fa-pulse"></i> Cargando, espere... </>
                    : 'Actualizar usuario' 
                }
              </button>
            </div>

          </div>
        </Form>
      )}
    </Formik>
  );
}