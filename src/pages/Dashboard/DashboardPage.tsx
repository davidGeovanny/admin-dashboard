import React, { useEffect, useRef, useState } from 'react';
import { 
  TopProduct, 
  TopProductsResponse, 
  TopTypeProductsResponse, 
  TopTypeProduct,
  TopClient, TopClientsResponse, TopBranchesResponse, TopBranches
} from '../../interfaces/SaleInterface';
import { formatDate, formatCurrency, formatNumberWithCommas } from '../../helpers/format';
import adminApi from '../../helpers/adminApi';
import { ChartCard } from '../../components/Chart/ChartCard';
import { ColumnDefinitionType } from '../../types/SimpleTableType';
import { SimpleTable } from '../../components/SimpleTable/SimpleTable';
import { ProfileImage } from '../../components/Image/ProfileImage';
import { SimpleTableCard } from '../../components/SimpleTable/SimpleTableCard';
import { DashoardChart } from './DashoardChart';

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

  const [ loading, setLoading ]           = useState<boolean>( false );
  const [ sales, setSales ]               = useState<TopProduct[]>([]);
  const [ clients, setClients ]           = useState<TopClient[]>([]);
  const [ products, setProducts ]         = useState<TopProduct[]>([]);
  const [ typeProducts, setTypeProducts ] = useState<TopTypeProduct[]>([]);
  const [ branches, setBranches ]         = useState<TopBranches[]>([]);
  const [ initDate, setInitDate ] =   useState<string>('');
  const [ finalDate, setFinalDate ] = useState<string>('');

  const isMounted = useRef( true );

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

  const getTopClients = async () => {
    const data = await getTopFromSales<TopClientsResponse>('top-clients', initDate, finalDate);

    if( !data ) return;

    setClients( data.by_money );
  }

  const getTopProducts = async () => {
    const data = await getTopFromSales<TopProductsResponse>('top-products', initDate, finalDate, { limit: 10 });

    if( !data ) return;

    setSales( data.by_frequency );
    setProducts( data.by_money );
  }

  const getTopBranches = async () => {
    const data = await getTopFromSales<TopBranchesResponse>('top-branches', initDate, finalDate);

    if( !data ) return;

    setBranches( data.by_money );
  }

  const getTopTypeProduct = async () => {
    const data = await getTopFromSales<TopTypeProductsResponse>('top-type-product', initDate, finalDate);

    if( !data ) return;

    setTypeProducts( data.by_frequency );
  }

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    const currentDate = new Date();

    setInitDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), 1 ) ) );
    setFinalDate( formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0 ) ) );
  }, []);

  useEffect(() => {
    if( !isMounted.current || !initDate || !finalDate ) return;
    getTopClients();
    getTopProducts();
    getTopTypeProduct();
    getTopBranches();
  }, [ initDate, finalDate, isMounted ]);

  return (
    <div className='container-fluid'>
      <h2>Información mensual</h2>

      <DashoardChart<TopClientsResponse, TopClient[], 'by_frequency'>
        initDate={ initDate }
        finalDate={ finalDate }
      />

      <div className='row'>
        <div className='col-xl-8 col-lg-7'>
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


        <div className='col-xl-4 col-lg-5'>
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

      <div className='row justify-content-center mb-4'>
        <div className='col-xl-10 col-lg-10'>
          <SimpleTableCard
            data={ products.slice(0, 5) } 
            columns={ productColumns } 
            loading={ loading } 
            title='Productos con mayor ingreso'
          />
        </div>

      </div>

      <div className='row mb-4'>
        <div className='col-xl-4 col-lg-6'>
          <ChartCard
            loading={ true }
            title='Ventas de sucursales'
            chartName='top-branch-month'
            typeChart='pie'
            data={ branches }
            columnName='branch_company'
            columnShortName='branch_company'
            columnValue='money'
            maintainRatio={ false }
          />
        </div>

        <div className='col-xl-8 col-lg-6'>
          <SimpleTableCard
            data={ clients } 
            columns={ clientColumns } 
            loading={ loading } 
            title='Clientes con mayor ingreso'
          />
        </div>

      </div>
    </div>
  );
}