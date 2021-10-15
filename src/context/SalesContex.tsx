import React, { createContext } from 'react';
import { SalesState, CommissionResponse } from '../interfaces/SaleInterface';

interface ContextProps {
  
}

const salesInitState: SalesState = {

}

export const SalesContext = createContext( {} as ContextProps );

export const SalesProvider: React.FC = ({ children }) => {

  const getCommissions = async ( initDate: Date, finalDate: Date ): Promise<CommissionResponse[]> => {
    try {
      return [];
    } catch ( error: any ) {
      return [];
    }
  }

  return (
    <SalesContext.Provider
      value={{

      }}
    >
      { children }
    </SalesContext.Provider>
  )
}