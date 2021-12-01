import React, { createContext, useReducer } from 'react';
import { 
  SalesState, 
  CommissionResponse, 
  Commission,
  CommissionFormData
} from '../interfaces/SaleInterface';
import { SalesReducer } from '../reducer/SalesReducer';
import { useToastNotification } from '../hooks/useToastNotification';
import { formatDate } from '../helpers/format';
import adminApi from '../helpers/adminApi';

interface ContextProps {
  loadingCommissions: boolean;
  waterCommissions:   Commission[];
  icebarCommissions:  Commission[];
  icecubeCommissions: Commission[];
  getCommissions:     ( dates: CommissionFormData ) => void;
}

const salesInitState: SalesState = {
  loadingCommissions: false,
  waterCommissions:   [],
  icebarCommissions:  [],
  icecubeCommissions: [],
}

export const SalesContext = createContext( {} as ContextProps );

export const SalesProvider: React.FC = ({ children }) => {

  const [ state, dispatch ] = useReducer( SalesReducer, salesInitState );
  const { deleteAllToasts, displayToast } = useToastNotification();

  const getCommissions = async ({ initDate, finalDate }: CommissionFormData) => {
    try {

      if( state.loadingCommissions ) {
        displayToast({
          message:  'Waiting for response',
          type:     'info',
          duration: 5000
        });

        return;
      }

      dispatch({ type: 'setLoadingCommission' });
      const { data } = await adminApi.get<CommissionResponse>('/sales/commissions/', {
        params: {
          initDate:  formatDate( initDate ),
          finalDate: formatDate( finalDate ),
        },
      });

      deleteAllToasts();

      dispatch({ 
        type: 'setCommissions', 
        payload: {
          water:   data.water_commissions,
          icebar:  data.icebar_commissions,
          icecube: data.icecube_commissions,
        }
      });

      displayToast({
        message:  'Commissions from ' + formatDate( initDate ) + ' to ' + formatDate( finalDate ) + ' loaded',
        type:     'success',
        duration: 5000
      });
    } catch ( error: any ) {
      displayToast({
        message:  error.response?.data.msg || 'Incorrect data',
        type:     'danger',
        duration: Infinity
      });

      dispatch({ 
        type: 'setCommissions', 
        payload: {
          water:   [],
          icebar:  [],
          icecube: [],
        }
      });
    }
  }

  return (
    <SalesContext.Provider
      value={{
        ...state,
        getCommissions,
      }}
    >
      { children }
    </SalesContext.Provider>
  )
}