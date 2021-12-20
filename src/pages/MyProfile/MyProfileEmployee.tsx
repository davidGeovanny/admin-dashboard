import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';

interface EmployeeFormValues {
  name:            string;
  first_lastname:  string;
  second_lastname: string;
  email:           string;
  gender:          string;
};

export const MyProfileEmployee = () => {
  const [ initialValues, setInitialValues ] = useState<EmployeeFormValues>();

  return (
    <div>
      
    </div>
  );
}
