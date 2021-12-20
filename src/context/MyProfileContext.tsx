import React, { createContext, useState } from 'react';
import { Employee } from '../interfaces/EmployeeInterface';
import { User } from '../interfaces/UserInterface';

interface ContextProps {
  user:        User | null;
  employee:    Employee | null;
  setUser:     ( user: User ) => void;
  setEmployee: ( employee: Employee ) => void;
}

export const MyProfileContext = createContext( {} as ContextProps );

export const MyProfileProvider: React.FC = ({ children }) => {
  const [ user, setUser ]         = useState<User | null>( null );
  const [ employee, setEmployee ] = useState<Employee | null>( null );

  return (
    <MyProfileContext.Provider
      value={{
        user, 
        employee,
        setUser,
        setEmployee,
      }}
    >
      { children }
    </MyProfileContext.Provider>
  );
}