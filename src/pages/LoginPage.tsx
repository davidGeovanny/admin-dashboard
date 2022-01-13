import React, { useContext, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';

import { AuthContext } from '../context/AuthContext';
import { LoginRequest } from '../interfaces/api/Auth/AuthInterface';

export const LoginPage = () => {
  const initialValues: LoginRequest = {
    username: '',
    password: '',
  };

  const { signIn, loading } = useContext( AuthContext );
  const handleSubmit = ( data: LoginRequest, formikHelpers: FormikHelpers<LoginRequest> ) => {
    signIn({ username: data.username, password: data.password });
  }

  const validationSchema: Yup.SchemaOf<LoginRequest> = Yup.object({
    username: Yup.string()
                 .required('El nombre de usuario es obligatorio'),
    password: Yup.string()
                 .required('La contraseña es obligatoria'),
  }).defined();

  useEffect(() => {
    const body = document.querySelector('body');
    body?.classList.add('bg-gradient-primary');

    return () => {
      body?.classList.remove('bg-gradient-primary');
    };
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">¡Bienvenido de vuelta!</h1>
                    </div>

                    <Formik 
                      initialValues={ initialValues }
                      onSubmit={ handleSubmit }
                      validationSchema={ validationSchema }
                    >
                      {( { errors, touched } ) => (
                        <Form className="user">
                          <div className="form-group">
                            <Field
                              autoComplete="off"
                              name="username"
                              type="text"
                              className={`form-control form-control-user ${ ( errors.username && touched.username ) ? "is-invalid" : "" }`}
                              placeholder="Ingrese su usuario"
                            />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                          </div>

                          <div className="form-group">
                            <Field
                              name="password"
                              type="password"
                              className={`form-control form-control-user ${ ( errors.password && touched.password ) ? "is-invalid" : "" }`}
                              placeholder="**********"
                            />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                          </div>

                          <button className="btn btn-primary btn-user btn-block" disabled={ loading }>
                            { 
                              loading 
                                ? <> <i className="fas fa-spinner fa-pulse"></i> Cargando, espere... </>
                                : 'Iniciar sesión' 
                            }
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}