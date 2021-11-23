import React, { useEffect, useRef, useState } from 'react';
import { ChartComponent } from '../components/Chart/ChartComponent';
import { useToastNotification } from '../hooks/useToastNotification';
import { 
  TopProduct, 
  TopProductsResponse, 
  TopTypeProductsResponse, 
  TopTypeProduct,
  TopClient, TopClientsResponse, TopBranchesResponse, TopBranches
} from '../interfaces/SaleInterface';
import { formatDate, formatCurrency } from '../helpers/format';
import adminApi from '../helpers/adminApi';
import { ChartCard } from '../components/Chart/ChartCard';
import { ColumnDefinitionType } from '../types/SimpleTableType';
import { SimpleTable } from '../components/SimpleTable/SimpleTable';
import { randomColor } from '../helpers/color';

const clientColumns: ColumnDefinitionType<TopClient, keyof TopClient>[] = [
  {
    key:    'image',
    header: '',
    align:  'center',
    cell:   ( value ) => (
      <>
        <div 
          style={{
            backgroundColor: randomColor( 0.2 ),
            borderRadius: '100%',
            width: 25,
            height: 25,
            textAlign: 'center'
          }}
          
        > { value.client.slice(0, 1) } </div>
      </>
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
  },
  {
    key:    'money',
    header: 'Ingresos',
    align:  'center',
    cell:   ( value ) => ( <>{ formatCurrency( value.money ) }</> )
  }
];

export const DashboardPage = () => {

  const [ loading, setLoading ]           = useState<boolean>( false );
  const [ sales, setSales ]               = useState<TopProduct[]>([]);
  const [ clients, setClients ]           = useState<TopClient[]>([]);
  const [ products, setProducts ]         = useState<TopProduct[]>([]);
  const [ typeProducts, setTypeProducts ] = useState<TopTypeProduct[]>([]);
  const [ branches, setBranches ]         = useState<TopBranches[]>([]);

  const isMounted = useRef( true );

  const { displayToast } = useToastNotification();

  const getTopClients = async () => {
    try {
      const currentDate = new Date();

      if( loading ) {
        return displayToast({
          message: 'Waiting for response',
          type: 'info',
          duration: 5000
        });
      }
      
      const { data } = await adminApi.get<TopClientsResponse>('/sales/top-clients/', {
        params: {
          initDate:  formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), 0 ) ),
          finalDate: formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0 ) ),
        },
      });

      setClients( data.by_money );
      if( sales.length > 0 && clients.length > 0 && products.length > 0 && typeProducts.length > 0 && branches.length > 0 ) setLoading( false );
    } catch ( error ) {
      console.log( error );
    }
  }

  const getTopProducts = async () => {
    try {
      const currentDate = new Date();

      if( loading ) {
        return displayToast({
          message: 'Waiting for response',
          type: 'info',
          duration: 5000
        });
      }
      
      const { data } = await adminApi.get<TopProductsResponse>('/sales/top-products/', {
        params: {
          initDate:  formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), 0 ) ),
          finalDate: formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0 ) ),
        },
      });

      setSales( data.by_frequency );
      setProducts( data.by_money );
      if( sales.length > 0 && clients.length > 0 && products.length > 0 && typeProducts.length > 0 && branches.length > 0 ) setLoading( false );
    } catch ( error ) {
      console.log( error );
    }
  }

  const getTopBranches = async () => {
    try {
      const currentDate = new Date();

      if( loading ) {
        return displayToast({
          message: 'Waiting for response',
          type: 'info',
          duration: 5000
        });
      }
      
      const { data } = await adminApi.get<TopBranchesResponse>('/sales/top-branches/', {
        params: {
          initDate:  formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), 0 ) ),
          finalDate: formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0 ) ),
        },
      });

      setBranches( data.by_money );
      if( sales.length > 0 && clients.length > 0 && products.length > 0 && typeProducts.length > 0 && branches.length > 0 ) setLoading( false );
    } catch ( error ) {
      console.log( error );
    }
  }

  const getTopTypeProduct = async () => {
    try {
      const currentDate = new Date();

      if( loading ) {
        return displayToast({
          message: 'Waiting for response',
          type: 'info',
          duration: 5000
        });
      }
      
      const { data } = await adminApi.get<TopTypeProductsResponse>('/sales/top-type-product/', {
        params: {
          initDate:  formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), 0 ) ),
          finalDate: formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0 ) ),
        },
      });

      setTypeProducts( data.by_frequency );
      if( sales.length > 0 && clients.length > 0 && products.length > 0 && typeProducts.length > 0 && branches.length > 0 ) setLoading( false );
    } catch ( error ) {
      console.log( error );
    }
  }

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    getTopClients();
    getTopProducts();
    getTopTypeProduct();
    getTopBranches();
  }, []);

  return (
    <div className="container-fluid">
      <h2>Información mensual</h2>
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <ChartCard
            loading={ true }
            title='Ingresos de los 10 productos más vendidos'
            chartName='monthly-sales'
            typeChart='bar'
            data={ 
              sales.map( sale => ({ ...sale, shortName: `${ sale.product.slice(0, 25).trim() }...` }) )
                   .slice(0, 10) 
            }
            columnName='product'
            columnShortName='product'
            columnValue='money'
            maintainRatio={ false }
          />
        </div>


        <div className="col-xl-4 col-lg-5">
          <ChartCard
            loading={ true }
            title='Ingresos por tipo de productos'
            chartName='top-type-product'
            typeChart='doughnut'
            data={ typeProducts }
            columnName='type_product'
            columnShortName='type_product'
            columnValue='money'
            maintainRatio={ false }
          />
        </div>

      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-xl-10 col-lg-10">
          <div className='card'>
            <div className='card-body'>
              <h5 className='wrapper justify-content-between'>
                <span> Productos con mayor ingreso </span>
              </h5>

              <div className={`row table-responsive`}>
                <SimpleTable
                  data={ products.slice(0, 5) } 
                  columns={ productColumns } 
                  loading={ loading } 
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="row mb-4">
        <div className="col-xl-4 col-lg-6">
          <ChartCard
            loading={ true }
            title='Ventas de sucursales'
            chartName='top-branch-month'
            typeChart='pie'
            data={ branches }
            columnName='client'
            columnShortName='client'
            columnValue='money'
            maintainRatio={ false }
          />
        </div>

        <div className="col-xl-8 col-lg-6">
          <div className='card'>
            <div className='card-body'>
              <h5 className='wrapper justify-content-between'>
                <span> Clientes con mayor ingreso </span>
              </h5>

              <div className={`row table-responsive`}>
                <SimpleTable
                  data={ clients } 
                  columns={ clientColumns } 
                  loading={ loading } 
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}