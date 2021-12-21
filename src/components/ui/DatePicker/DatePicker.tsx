import React from 'react';
import { useField, useFormikContext } from 'formik';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es);

interface Props { 
  [ x: string ]: any; 
  name: string;
}

export const DatePicker = ({ ...props }: Props) => {
  const { setFieldValue } = useFormikContext();
  const [ field ] = useField( props );

  const handleChange = ( value: Date | null ) => {
    setFieldValue( field.name, value );
  }

  return (
    <ReactDatePicker
      { ...field }
      { ...props }
      locale="es"
      selected={ ( field.value ) ? new Date( field.value ) : null }
      onChange={ handleChange }
      closeOnScroll={ true }
    />
  );
}
