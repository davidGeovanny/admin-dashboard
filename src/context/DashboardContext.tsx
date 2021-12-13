import React, { createContext, useReducer } from 'react';
import { DashboardReducer } from '../reducer/DashboardReducer';
import {
  TopBranches,
  TopBranchesResponse,
  TopClient,
  TopClientsResponse,
  TopProduct,
  TopTypeProduct,
  TopTypeProductsResponse
} from '../interfaces/SaleInterface';
import { DashboardState, PropsSales } from '../interfaces/DashboardInterface';
import { TopProductsResponse } from '../interfaces/SaleInterface';
import { RangePeriod } from '../types/DashboardType';
import { formatDate } from '../helpers/format';
import adminApi from '../helpers/adminApi';

interface ContextProps {
  period:              RangePeriod;
  initDate:            string;
  finalDate:           string;
  productsTopFrequent: TopProduct[];
  productsTopIncome:   TopProduct[];
  clientsTopIncome:    TopClient[];
  branchesRevenue:     TopBranches[];
  typeProductRevenue:  TopTypeProduct[];
  loading:             boolean;
  getSalesData:        ( initDate: Date | null | undefined, finalDate: Date | null | undefined ) => Promise<void>;
  changePeriod:        ( period: RangePeriod ) => void;
  changeInitDate:      ( date: string ) => void;
  changeFinalDate:     ( date: string ) => void;
}

const dashboardInitState: DashboardState = {
  period:    'Mensual',
  initDate:  '',
  finalDate: '',
  loading:   false,
  productsTopFrequent: [],
  productsTopIncome:   [],
  clientsTopIncome:    [],
  branchesRevenue:     [],
  typeProductRevenue:  [],
}

export const DashboardContext = createContext( {} as ContextProps );

export const DashboardProvider: React.FC = ({ children }) => {

  const [ state, dispatch ] = useReducer( DashboardReducer, dashboardInitState );

  const getTopFromSales = async <T,>({ endpoint, initDate, finalDate, params }: PropsSales): Promise<T | undefined> => {
    try {
      const { data } = await adminApi.get<T>(`/sales/${ endpoint }/`, { 
        params: { 
          initDate, 
          finalDate, 
          ...params 
        }});
      return data;
    } catch ( err ) {
      return undefined;
    }
  }

  const getSalesData = async ( initDate: Date | null | undefined, finalDate: Date | null | undefined ) => {
    try {
      if( !initDate && !finalDate ) return;

      dispatch({ type: 'setLoading' });
      const commonData: PropsSales = { endpoint: '', initDate: formatDate( initDate ), finalDate: formatDate( finalDate ) };
  
      const dataProducts       = await getTopFromSales<TopProductsResponse>({ ...commonData, endpoint: 'top-products', params: { limit: 10 } });
      const clientsIncome      = await getTopFromSales<TopClientsResponse>({ ...commonData, endpoint: 'top-clients' });
      const branchesRevenue    = await getTopFromSales<TopBranchesResponse>({ ...commonData, endpoint: 'top-branches' });
      const typeProductRevenue = await getTopFromSales<TopTypeProductsResponse>({ ...commonData, endpoint: 'top-type-product' });
  
      dispatch({ type: 'setProductsTopFrequent', payload: dataProducts       ? dataProducts.by_frequency        : [] });
      dispatch({ type: 'setProductsTopIncome',   payload: dataProducts       ? dataProducts.by_money.slice(0,5) : [] });
      dispatch({ type: 'setClientsTopIncome',    payload: clientsIncome      ? clientsIncome.by_money           : [] });
      dispatch({ type: 'setBranchesRevenue',     payload: branchesRevenue    ? branchesRevenue.by_money         : [] });
      dispatch({ type: 'setTypeProductRevenue',  payload: typeProductRevenue ? typeProductRevenue.by_frequency  : [] });
    } catch ( err ) {
      
    }

    dispatch({ type: 'clearLoading' });
  }

  const changeInitDate = ( date: string ) => {
    
  }

  const changeFinalDate = ( date: string ) => {

  }

  const changePeriod = ( period: RangePeriod ) => {
    const date = new Date();
    
    dispatch({ type: 'setPeriod', payload: period });

    switch ( period ) {
      case 'Semanal':
        dispatch({ type: 'setInitDate',  payload: formatDate( new Date( date.getFullYear(), date.getMonth(), date.getDate() - 6 ) ) });
        dispatch({ type: 'setFinalDate', payload: formatDate( new Date( date.getFullYear(), date.getMonth(), date.getDate() ) ) });
        break;

      case 'Mensual':
        dispatch({ type: 'setInitDate',  payload: formatDate( new Date( date.getFullYear(), date.getMonth(), 1 ) ) });
        dispatch({ type: 'setFinalDate', payload: formatDate( new Date( date.getFullYear(), date.getMonth() + 1, 0 ) ) });
        break;

      case 'Trimestral':
        dispatch({ type: 'setInitDate',  payload: formatDate( new Date( date.getFullYear(), date.getMonth() - 2, 1 ) ) });
        dispatch({ type: 'setFinalDate', payload: formatDate( new Date( date.getFullYear(), date.getMonth() + 1, 0 ) ) });
        break;
    
      default:
        break;
    }
  }

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        getSalesData,
        changePeriod,
        changeInitDate,
        changeFinalDate,
      }}
    >
      { children }
    </DashboardContext.Provider>
  )
}