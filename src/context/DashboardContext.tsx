import React, { createContext, useReducer, useEffect } from 'react';
import { DashboardReducer } from '../reducer/DashboardReducer';
import { useToastNotification } from '../hooks/useToastNotification';
import { RangePeriod } from '../types/DashboardType';
import {
  TopBranches,
  TopBranchesResponse,
  TopClient,
  TopClientsResponse,
  TopProduct,
  TopProductsResponse,
  TopTypeProduct,
  TopTypeProductsResponse
} from '../interfaces/SaleInterface';
import { DashboardState, PropsSales } from '../interfaces/DashboardInterface';
import { formatDate } from '../helpers/format';
import adminApi from '../helpers/adminApi';

interface ContextProps {
  period:              RangePeriod;
  initDate:            Date;
  finalDate:           Date;
  productsTopFrequent: TopProduct[];
  productsTopIncome:   TopProduct[];
  clientsTopIncome:    TopClient[];
  branchesRevenue:     TopBranches[];
  typeProductRevenue:  TopTypeProduct[];
  loading:             boolean;
  getSalesData:        () => Promise<void>;
  changePeriod:        ( period: RangePeriod ) => void;
  changeInitDate:      ( date: Date | null ) => void;
  changeFinalDate:     ( date: Date | null ) => void;
}

const dashboardInitState: DashboardState = {
  period:    'Mensual',
  initDate:  new Date(),
  finalDate: new Date(),
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
  const { displayToast }    = useToastNotification();

  const getTopFromSales = async <T,>({ endpoint, initDate, finalDate, params }: PropsSales): Promise<T | undefined> => {
    try {
      const { data } = await adminApi.get<T>(`/sales/${ endpoint }/`, { 
        params: { initDate, finalDate, ...params }
      });
      return data;
    } catch ( err ) {
      return undefined;
    }
  }

  const getSalesData = async () => {
    try {
      const { initDate, finalDate, loading } = state;

      if( loading ) {
        return displayToast({
          message:  'Cargando...',
          type:     'info',
          duration: 5000
        });
      }

      if( !initDate && !finalDate ) return;

      dispatch({ type: 'setLoading' });
      const commonData: PropsSales = { endpoint: '', initDate: formatDate( initDate ), finalDate: formatDate( finalDate ) };
  
      const dataProducts = await getTopFromSales<TopProductsResponse>({ ...commonData, endpoint: 'top-products', params: { limit: 10 } });
      const clientsIncome = await getTopFromSales<TopClientsResponse>({ ...commonData, endpoint: 'top-clients' });
      const branchesRevenue = await getTopFromSales<TopBranchesResponse>({ ...commonData, endpoint: 'top-branches' });
      const typeProductRevenue = await getTopFromSales<TopTypeProductsResponse>({ ...commonData, endpoint: 'top-type-product' });
  
      dispatch({ type: 'setProductsTopFrequent', payload: dataProducts       ? dataProducts.by_frequency         : [] });
      dispatch({ type: 'setProductsTopIncome',   payload: dataProducts       ? dataProducts.by_money.slice(0, 5) : [] });
      dispatch({ type: 'setClientsTopIncome',    payload: clientsIncome      ? clientsIncome.by_money            : [] });
      dispatch({ type: 'setBranchesRevenue',     payload: branchesRevenue    ? branchesRevenue.by_money          : [] });
      dispatch({ type: 'setTypeProductRevenue',  payload: typeProductRevenue ? typeProductRevenue.by_frequency   : [] });
    } catch ( err ) {
      return displayToast({
        message:  'Ha ocurrido un error al cargar la información',
        type:     'danger',
        duration: 5000
      });
    }

    dispatch({ type: 'clearLoading' });
  }

  const changeInitDate = ( date: Date | null ) => {
    if( !date || state.period !== 'Personalizado' ) return;
    dispatch({ type: 'setInitDate',  payload: date });
  }

  const changeFinalDate = ( date: Date | null ) => {
    if( !date || state.period !== 'Personalizado' ) return;
    dispatch({ type: 'setFinalDate',  payload: date });
  }

  const changePeriod = ( period: RangePeriod ) => {
    const { loading } = state;
    const date = new Date();

    if( loading ) {
      return displayToast({
        message:  'No se puede cambiar el periodo mientras se carga.',
        type:     'warning',
        duration: 5000
      });
    }
    
    dispatch({ type: 'setPeriod', payload: period });

    switch ( period ) {
      case 'Semanal':
        dispatch({ type: 'setInitDate',  payload: new Date( date.getFullYear(), date.getMonth(), date.getDate() - 6 ) });
        dispatch({ type: 'setFinalDate', payload: new Date( date.getFullYear(), date.getMonth(), date.getDate() ) });
        break;

      case 'Mensual':
        dispatch({ type: 'setInitDate',  payload: new Date( date.getFullYear(), date.getMonth(), 1 ) });
        dispatch({ type: 'setFinalDate', payload: new Date( date.getFullYear(), date.getMonth() + 1, 0 ) });
        break;

      case 'Trimestral':
        dispatch({ type: 'setInitDate',  payload: new Date( date.getFullYear(), date.getMonth() - 2, 1 ) });
        dispatch({ type: 'setFinalDate', payload: new Date( date.getFullYear(), date.getMonth() + 1, 0 ) });
        break;
    
      default:
        break;
    }
  }

  useEffect(() => {
    changePeriod( 'Mensual' );
  }, []);

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