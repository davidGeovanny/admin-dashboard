import React, { createContext } from 'react';

interface ContextProps {
}

const employeeInitState: {} = {
};

export const EmployeeContext = createContext( {} as ContextProps );

export const EmployeeProvider: React.FC = ({ children }) => {

  return (
    <EmployeeContext.Provider
      value={{
      }}
    >
      { children }
    </EmployeeContext.Provider>
  );
}