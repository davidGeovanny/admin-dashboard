import React, { useEffect, useState } from 'react';
import { 
  TopClient, 
  TopProduct, 
  TopBranchesResponse,
  TopClientsResponse, 
  TopProductsResponse, 
  TopTypeProductsResponse, 
} from '../../interfaces/SaleInterface';
import { ColumnDefinitionType } from '../../types/SimpleTableType';
import { DashoardChart } from './DashoardChart';
import { DashboardSimpleTable } from './DashboardSimpleTable';
import { ProfileImage } from '../../components/Image/ProfileImage';
import { formatDate, formatCurrency, formatNumberWithCommas } from '../../helpers/format';
import adminApi from '../../helpers/adminApi';
import { Dropdown } from '../../components/ui/Dropdown';
import { dashboard__dropdownData } from '../../data/dropdown';

const clientColumns: ColumnDefinitionType<TopClient, keyof TopClient>[] = [
  {
    key:    'image',
    header: '',
    align:  'center',
    cell:   ( value ) => (
      <ProfileImage
        colorRandom={ true }
        figure='circle'
        text={ value.client.slice(0, 1) }
        height={ 25 }
        width={ 25 }
      />
    )
  },
  {
    key:    'client',
    header: 'Nombre',
    align:  'center',
  },
  {
    key:    'money',
    header: 'Ingresos',
    align:  'center',
    cell:   ( value ) => ( <>{ formatCurrency( value.money ) }</> )
  }
];

const productColumns: ColumnDefinitionType<TopProduct, keyof TopProduct>[] = [
  {
    key:    'product',
    header: 'Producto',
    align:  'center',
  },
  {
    key:    'frequency',
    header: 'Ventas',
    align:  'center',
    cell:   ( value ) => ( <> { formatNumberWithCommas( value.frequency ) } </> )
  },
  {
    key:    'money',
    header: 'Ingresos',
    align:  'center',
    cell:   ( value ) => ( <>{ formatCurrency( value.money ) }</> )
  }
];

export const DashboardPage = () => {
  const [ periodRange, setPeriodRange ] = useState<string>( dashboard__dropdownData[1] );
  const [ initDate, setInitDate ]   = useState<string>('');
  const [ finalDate, setFinalDate ] = useState<string>('');

  const getTopFromSales = async <T,>( endpoint: string, initDate: string, finalDate: string, params?: {[x: string]: string | number} ): Promise<T | undefined> => {
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

  const getTopProductsSales = async ( initDate: string, finalDate: string ) => {
    const data = await getTopFromSales<TopProductsResponse>( 'top-products', initDate, finalDate, { limit: 10 } );
    return ( data ) ? data.by_frequency : [];
  }

  const getTopProducts = async ( initDate: string, finalDate: string ) => {
    const data = await getTopFromSales<TopProductsResponse>( 'top-products', initDate, finalDate, { limit: 5 } );
    return ( data ) ? data.by_money : [];
  }

  const getTopTypeProduct = async ( initDate: string, finalDate: string ) => {
    const data = await getTopFromSales<TopTypeProductsResponse>( 'top-type-product', initDate, finalDate );
    return ( data ) ? data.by_frequency : [];
  }

  const getTopBranches = async ( initDate: string, finalDate: string ) => {
    const data = await getTopFromSales<TopBranchesResponse>( 'top-branches', initDate, finalDate );
    return ( data ) ? data.by_money : [];
  }

  const getTopClients = async ( initDate: string, finalDate: string ) => {
    const data = await getTopFromSales<TopClientsResponse>( 'top-clients', initDate, finalDate );
    return ( data ) ? data.by_money : [];
  }

  const onReloadPeriodData = () => {
    const currentDate = new Date();

    if( periodRange === 'Semanal' ) {
      setInitDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 6 ) ) );
      setFinalDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() ) ) );
    } else if( periodRange === 'Mensual' ) {
      setInitDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), 1 ) ) );
      setFinalDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0 ) ) );
    } else if( periodRange === 'Trimestral' ) {
      setInitDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() - 2, 1 ) ) );
      setFinalDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0 ) ) );
    }
  }

  useEffect(() => {
    onReloadPeriodData();
  }, []);

  return (
    <div className='container-fluid'>

      <div className="row">
        <div className="col-8">
          <h2>Información mensual</h2>
        </div>

        <div className="col">
          <div className="row justify-content-end">
            <Dropdown
              data={ dashboard__dropdownData }
              defaultOption={ periodRange }
              onChange={ setPeriodRange }
              position='left'
            />
            <button 
              type='button' 
              className='btn btn-primary btn-square'
              onClick={ onReloadPeriodData }
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-xl-8 col-lg-7'>
          <DashoardChart
            chartName='monthly-sales'
            initDate={ initDate }
            finalDate={ finalDate }
            getApiData={ getTopProductsSales }
            typeChart='bar'
            columnName='product'
            columnShortName='short_product'
            columnValue='money'
            title='Ingresos de los 10 productos más vendidos'
          />
        </div>

        <div className='col-xl-4 col-lg-5'>
          <DashoardChart
            chartName='top-type-product'
            initDate={ initDate }
            finalDate={ finalDate }
            getApiData={ getTopTypeProduct }
            typeChart='doughnut'
            columnName='type_product'
            columnShortName='type_product'
            columnValue='money'
            title='Ingresos por tipo de productos'
          />
        </div>
      </div>

      <div className='row justify-content-center mb-4'>
        <div className='col-xl-10 col-lg-10'>
          <DashboardSimpleTable
            initDate={ initDate }
            finalDate={ finalDate }
            getApiData={ getTopProducts }
            columnDefinition={ productColumns }
            title='Productos con mayor ingreso'
          />
        </div>
      </div>

      <div className='row mb-4'>
        <div className='col-xl-4 col-lg-6'>
          <DashoardChart
            chartName='top-branch-month'
            initDate={ initDate }
            finalDate={ finalDate }
            getApiData={ getTopBranches }
            typeChart='pie'
            columnName='branch_company'
            columnShortName='branch_company'
            columnValue='money'
            title='Ventas de sucursales'
          />
        </div>

        <div className='col-xl-8 col-lg-6'>
          <DashboardSimpleTable
            initDate={ initDate }
            finalDate={ finalDate }
            getApiData={ getTopClients }
            columnDefinition={ clientColumns }
            title='Clientes con mayor ingreso'
          />
        </div>

      </div>
    </div>
  );
}