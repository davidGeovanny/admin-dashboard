import React, { createContext, useState } from 'react';
import { User, Employee, SpecificUserResponse } from '../interfaces/UserInterface';
import adminApi from '../helpers/adminApi';

interface ContextProps {
  user:     User | null;
  employee: Employee | null;
  getSpecificUser: ( id: number ) => void;
}

export const MyProfileContext = createContext( {} as ContextProps );

export const MyProfileProvider: React.FC = ({ children }) => {
  const [ user, setUser ]         = useState<User | null>( null );
  const [ employee, setEmployee ] = useState<Employee | null>( null );

  const getSpecificUser = async ( id: number ) => {
    try {
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
  }

  return (
    <MyProfileContext.Provider
      value={{
        user, 
        employee,
        getSpecificUser,
      }}
    >
      { children }
    </MyProfileContext.Provider>
  );
}