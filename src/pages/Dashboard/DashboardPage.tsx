import React, { useContext, useEffect, useState } from 'react';
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
import { DashboardContext } from '../../context/DashboardContext';
import { ChartCard } from '../../components/Chart/ChartCard';
import { SimpleTableCard } from '../../components/SimpleTable/SimpleTableCard';

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
  const [ initDate, setInitDate ]   = useState<string>('');
  const [ finalDate, setFinalDate ] = useState<string>('');

  const { 
    getSalesData,
    changePeriod,
    loading,
    period,
    productsTopFrequent,
    productsTopIncome,
    clientsTopIncome,
    branchesRevenue,
    typeProductRevenue,
  } = useContext( DashboardContext );

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

    if( period === 'Semanal' ) {
      setInitDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 6 ) ) );
      setFinalDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() ) ) );
    } else if( period === 'Mensual' ) {
      setInitDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), 1 ) ) );
      setFinalDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0 ) ) );
    } else if( period === 'Trimestral' ) {
      setInitDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() - 2, 1 ) ) );
      setFinalDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0 ) ) );
    }
  }
  
  useEffect(() => {
    if( period !== 'Personalizado' ) {
      onReloadPeriodData();
    }
  }, [ period ]);

  useEffect(() => {
    if( period !== 'Personalizado' && initDate && finalDate ) {
      getSalesData( initDate, finalDate );
    }
  }, [ initDate, finalDate ]);

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
              defaultOption={ period }
              onChange={ changePeriod }
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
          <ChartCard
            loading={ loading }
            title='Ingresos de los 10 productos más vendidos'
            chartName='monthly-sales'
            typeChart='bar'
            data={ productsTopFrequent }
            columnName='product'
            columnShortName='short_product'
            columnValue='money'
            maintainRatio={ false }
          />
        </div>

        <div className='col-xl-4 col-lg-5'>
          <ChartCard
            loading={ loading }
            title='Ingresos por tipo de productos'
            chartName='top-type-product'
            typeChart='doughnut'
            data={ typeProductRevenue }
            columnName='type_product'
            columnShortName='type_product'
            columnValue='money'
            maintainRatio={ false }
          />
        </div>
      </div>

      <div className='row justify-content-center mb-4'>
        <div className='col-xl-10 col-lg-10'>
          <SimpleTableCard
            data={ productsTopIncome } 
            columns={ productColumns } 
            loading={ loading } 
            title='Productos con mayor ingreso'
          />
        </div>
      </div>

      <div className='row mb-4'>
        <div className='col-xl-4 col-lg-6'>
          <ChartCard
            loading={ loading }
            title='Ventas de sucursales'
            chartName='top-branch-month'
            typeChart='pie'
            data={ branchesRevenue }
            columnName='branch_company'
            columnShortName='branch_company'
            columnValue='money'
            maintainRatio={ false }
          />
        </div>

        <div className='col-xl-8 col-lg-6'>
          <SimpleTableCard
            data={ clientsTopIncome } 
            columns={ clientColumns } 
            loading={ loading } 
            title='Clientes con mayor ingreso'
          />
          
        </div>

      </div>
    </div>
  );
}