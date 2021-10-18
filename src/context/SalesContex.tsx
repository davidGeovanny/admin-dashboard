import React, { createContext, useReducer } from 'react';
import { 
  SalesState, 
  CommissionResponse, 
  WaterCommission, 
  IceBarCommission, 
  IceCubeCommission, 
  CommissionFormData
} from '../interfaces/SaleInterface';
import { SalesReducer } from '../reducer/SalesReducer';
import adminApi from '../helpers/adminApi';
import { useToastNotification } from '../hooks/useToastNotification';
import { formatDate } from '../helpers/format';

interface ContextProps {
  loadingCommissions: boolean;
  waterCommissions:   WaterCommission[];
  icebarCommissions:  IceBarCommission[];
  icecubeCommissions: IceCubeCommission[];
  getCommissions:     ( dates: CommissionFormData) => void;
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
          message: 'Waiting for response',
          type: 'info',
          duration: 5000
        });

        return;
      }

      dispatch({ type: 'setLoadingCommission' });
      const { data } = await adminApi.get<CommissionResponse>('/sales/commissions/', {
        params: {
          initDate: formatDate( initDate ),
          finalDate: formatDate( finalDate ),
        },
      });

      deleteAllToasts();

      dispatch({ 
        type: 'setCommissions', 
        payload: {
          water: data.water_commissions,
          icebar: data.icebar_commissions,
          icecube: data.icecube_commissions,
        }
      });
    } catch ( error: any ) {
      displayToast({
        message: error.response?.data.msg || 'Incorrect data',
        type: 'danger',
        duration: Infinity
      });

      dispatch({ 
        type: 'setCommissions', 
        payload: {
          water: [],
          icebar: [],
          icecube: [],
        }
      });
    }
  }

  const prueba = () => {

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