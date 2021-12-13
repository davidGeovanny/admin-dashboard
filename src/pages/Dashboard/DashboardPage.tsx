import React, { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../../context/DashboardContext';
import { ColumnDefinitionType } from '../../types/SimpleTableType';
import { TopClient, TopProduct } from '../../interfaces/SaleInterface';
import { DashboardForm } from './DashboardForm';
import { ProfileImage } from '../../components/Image/ProfileImage';
import { ChartCard } from '../../components/Chart/ChartCard';
import { SimpleTableCard } from '../../components/SimpleTable/SimpleTableCard';
import { formatCurrency, formatNumberWithCommas } from '../../helpers/format';
import { DashboardCards } from './DashboardCards';

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

  const { 
    getSalesData,
    loading,
    period,
    productsTopFrequent,
    productsTopIncome,
    clientsTopIncome,
    branchesRevenue,
    typeProductRevenue,
  } = useContext( DashboardContext );

  const [ show, setShow ] = useState<boolean>( false );

  useEffect(() => {
    if( period !== 'Personalizado' ) {
      getSalesData();
    }
  }, [ period ]);

  return (
    <div className='container-fluid'>

      <h3 className='wrapper justify-content-between'>
        <span>Información: { period }</span>
        <span 
          className='pointer' 
          onClick={ () => setShow( !show )}
        >
          <i className={`fas ${ show ? 'fa-chevron-up' : 'fa-chevron-down' }`}></i>
        </span>
      </h3>

      <DashboardForm show={ show } />

      <DashboardCards />

      <div className='row'>
        <div className='col-xl-8 col-lg-7'>
          <ChartCard
            loading={ loading }
            title='Ingresos de los 10 productos más vendidos'
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