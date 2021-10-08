import React, { createContext } from 'react';
import { SalesState } from '../interfaces/SaleInterface';

interface ContextProps {
  
}

const salesInitState: SalesState = {

}

export const SalesContext = createContext( {} as ContextProps );

export const SalesProvider: React.FC = ({ children }) => {
  return (
    <SalesContext.Provider
      value={{

      }}
    >
      { children }
    </SalesContext.Provider>
  )
}