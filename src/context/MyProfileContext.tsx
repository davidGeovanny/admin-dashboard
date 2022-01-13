import React, { createContext, useState } from 'react';

import { apiGetUserEmployee, apiUpdateUserPassword } from '../api/UserApi';
import { apiUpdateEmployee } from '../api/EmployeeApi';
import { useToastNotification } from '../hooks/useToastNotification';
import { Employee } from '../interfaces/models/EmployeeInterface';
import { User } from '../interfaces/models/UserInterface';
import { UpdateUserPasswordRequest } from '../interfaces/api/User/UpdateUserPasswordInterface';
import { UpdateEmployeeRequest } from '../interfaces/api/Employee/UpdateEmployeeInterface';

interface ContextProps {
  user:     User | null;
  employee: Employee | null;
  loading:  boolean;
  getSpecificUser:    ( id: number ) => void;
  updatePasswordUser: ( data: UpdateUserPasswordRequest ) => void;
  updateEmployee:     ( data: UpdateEmployeeRequest ) => void;
}

export const MyProfileContext = createContext( {} as ContextProps );

export const MyProfileProvider: React.FC = ({ children }) => {
  const { displayToast } = useToastNotification();

  const [ user, setUser ]         = useState<User | null>( null );
  const [ employee, setEmployee ] = useState<Employee | null>( null );
  const [ loading, setLoading ]   = useState( false );

  const getSpecificUser = async ( id: number ) => {
    try {
      setLoading( true );

      const { data: resp } = await apiGetUserEmployee( id );
      const { employee, ...user } = resp.data;

      if( !resp.ok ) {
        // TODO: Mostrar toast con error
        return;
      }

      setUser( user );
      setEmployee( employee );
    } catch ( error ) {
      console.log( {error} );
    }
    
    setLoading( false );
  }

  const updatePasswordUser = async ( request: UpdateUserPasswordRequest ) => {
    try {
      setLoading( true );

      const { data: resp } = await apiUpdateUserPassword( request );

      if( !resp.ok ) {
        // TODO: Mostrar toast con error
        return;
      }

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

  const updateEmployee = async ( request: UpdateEmployeeRequest ) => {
    try {
      setLoading( true );

      const { data: resp } = await apiUpdateEmployee( request );

      if( !resp.ok ) {
        // TODO: Mostrar toast con error
        return;
      }

      setEmployee( resp.data );

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