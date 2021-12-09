import React, { createContext, useReducer } from 'react';
import {
  TopBranches,
  TopBranchesResponse,
  TopClient,
  TopClientsResponse,
  TopProduct,
  TopTypeProduct,
  TopTypeProductsResponse
} from '../interfaces/SaleInterface';
import adminApi from '../helpers/adminApi';
import { DashboardState } from '../interfaces/DashboardInterface';
import { DashboardReducer } from '../reducer/DashboardReducer';
import { RangePeriod } from '../types/DashboardType';
import { TopProductsResponse } from '../interfaces/SaleInterface';

interface ContextProps {
  period:              RangePeriod;
  productsTopFrequent: TopProduct[];
  productsTopIncome:   TopProduct[];
  clientsTopIncome:    TopClient[];
  branchesRevenue:     TopBranches[];
  typeProductRevenue:  TopTypeProduct[];
  loading:             boolean;
  getSalesData:        ( initDate: string, finalDate: string ) => Promise<void>;
  changePeriod:        ( period: RangePeriod ) => void;
}

interface PropsSales {
  endpoint:  string;
  initDate:  string;
  finalDate: string;
  params?:   { [ x: string ] : string | number };
}

const dashboardInitState: DashboardState = {
  period:  'Mensual',
  loading: false,
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

  const getSalesData = async ( initDate: string, finalDate: string ) => {
    try {
      dispatch({ type: 'setLoading' });
      const commonData: PropsSales = { endpoint: '', initDate, finalDate };
  
      const dataProducts       = await getTopFromSales<TopProductsResponse>({     ...commonData, endpoint: 'top-products', params: { limit: 10 } });
      const clientsIncome      = await getTopFromSales<TopClientsResponse>({      ...commonData, endpoint: 'top-clients' });
      const branchesRevenue    = await getTopFromSales<TopBranchesResponse>({     ...commonData, endpoint: 'top-branches' });
      const typeProductRevenue = await getTopFromSales<TopTypeProductsResponse>({ ...commonData, endpoint: 'top-type-product' });
  
      dispatch({ type: 'setProductsTopFrequent', payload: dataProducts ? dataProducts.by_frequency : [] });
      dispatch({ type: 'setProductsTopIncome',   payload: dataProducts ? dataProducts.by_money.slice(0,5) : [] });
      dispatch({ type: 'setClientsTopIncome',    payload: clientsIncome ? clientsIncome.by_money : [] });
      dispatch({ type: 'setBranchesRevenue',     payload: branchesRevenue ? branchesRevenue.by_money : [] });
      dispatch({ type: 'setTypeProductRevenue',  payload: typeProductRevenue ? typeProductRevenue.by_frequency : [] });

    } catch ( err ) {
      
    }

    dispatch({ type: 'clearLoading' });
  }

  const changePeriod = ( period: RangePeriod ) => {
    dispatch({ type: 'setPeriod', payload: period });
  }

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        getSalesData,
        changePeriod,
      }}
    >
      { children }
    </DashboardContext.Provider>
  )
}