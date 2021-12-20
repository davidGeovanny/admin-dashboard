import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, FormikHelpers, Field } from 'formik';
import { Input } from '../../components/ui/Input/Input';

interface UserFormData {
  user:            string | undefined;
  password:        string;
  repeat_password: string;
};

export const MyProfileUser = () => {
  const initialValues: UserFormData = {
    user:            '',
    password:        '',
    repeat_password: '',
  };

  const validationSchema: Yup.SchemaOf<UserFormData> = Yup.object({
    user:            Yup.string(),
    password:        Yup.string().required(),
    repeat_password: Yup.string().required(),
  });

  const handleSubmit = ( data: UserFormData, {  }: FormikHelpers<UserFormData> ) => {

  }

  return (
    <Formik
      initialValues={ initialValues }
      validationSchema={ validationSchema }
      onSubmit={ handleSubmit }
    >
      {( { errors, touched, dirty, values } ) => (
        <Form>
          <div className="row">
            <div className="col-12">
              <label htmlFor="">Usuario</label>
              {/* <Field
                autoComplete="off"
                name="username"
                type="text"
                className={`form-control form-control-user`}
                placeholder="Ingrese su usuario"
              /> */}
              <Input
                name="user"
                id={'userInput'}               
              />
            </div>

            <div className="col-12">
              <label htmlFor="">Contraseña</label>
              <Field
                autoComplete="off"
                name="username"
                type="text"
                className={`form-control form-control-user`}
                placeholder="Ingrese su usuario"
              />
            </div>

            <div className="col-12">
              <label htmlFor="">Repetir contraseña</label>
              <Field
                autoComplete="off"
                name="username"
                type="text"
                className={`form-control form-control-user`}
                placeholder="Ingrese su usuario"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
