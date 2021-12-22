import React, { createContext, useState } from 'react';
import { User, Employee, SpecificUserResponse } from '../interfaces/UserInterface';
import { useToastNotification } from '../hooks/useToastNotification';
import adminApi from '../helpers/adminApi';

interface UpdateEmployee {
  id:              number;
  name:            string;
  first_lastname:  string;
  second_lastname: string;
  email:           string;
  gender:          string;
};

interface UpdatePassword {
  id:              number;
  password:        string;
  confirmPassword: string;
  currentPassword: string;
}

interface ContextProps {
  user:     User | null;
  employee: Employee | null;
  loading:  boolean;
  getSpecificUser:    ( id: number ) => void;
  updatePasswordUser: ( data: UpdatePassword ) => void;
  updateEmployee:     ( data: UpdateEmployee ) => void;
}

export const MyProfileContext = createContext( {} as ContextProps );

export const MyProfileProvider: React.FC = ({ children }) => {
  const { displayToast, deleteAllToasts } = useToastNotification();

  const [ user, setUser ]         = useState<User | null>( null );
  const [ employee, setEmployee ] = useState<Employee | null>( null );
  const [ loading, setLoading ]   = useState( false );

  const getSpecificUser = async ( id: number ) => {
    try {
      setLoading( true );

      const { data: respData } = await adminApi.get<SpecificUserResponse>(`/users/${ id }`);
      const { ok, data } = respData;

      if( !ok ) {
        return;
      }

      setUser( data );
      setEmployee( data.employee );

    } catch ( error ) {
      console.log( error );
    }
    
    setLoading( false );
  }

  const updatePasswordUser = async ({ id, password, confirmPassword, currentPassword }: UpdatePassword) => {
    try {
      setLoading( true );

      const { data } = await adminApi.put(`/users/${ id }/change-password`, {
        password,
        password_confirmation: confirmPassword,
        current_password:      currentPassword,
      });

      displayToast({
        position: 'top-right',
        message: 'Actualizado con éxito',
        duration: 7000,
        type: 'success'
      });
    } catch ( error ) {
      console.log( {error} );
      displayToast({
        position: 'top-right',
        message: 'Un error',
        duration: 7000,
        type: 'danger'
      });
    }

    setLoading( false );
  }

  const updateEmployee = async ({ id, ...rest }: UpdateEmployee) => {
    try {
      setLoading( true );

      const { data } = await adminApi.put(`/employees/${ id }`, { ...rest });

      setEmployee( data.data );

      displayToast({
        position: 'top-right',
        message: 'Actualizado con éxito',
        duration: 7000,
        type: 'success'
      });
    } catch ( error ) {
      console.log( {error} );
      displayToast({
        position: 'top-right',
        message: 'Un error',
        duration: 7000,
        type: 'danger'
      });
    }

    setLoading( false );
  }

  return (
    <MyProfileContext.Provider
      value={{
        user, 
        employee,
        loading,
        getSpecificUser,
        updatePasswordUser,
        updateEmployee,
      }}
    >
      { children }
    </MyProfileContext.Provider>
  );
}