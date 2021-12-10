import React, { useContext, useEffect, useState } from 'react';
import { 
  TopClient, 
  TopProduct, 
} from '../../interfaces/SaleInterface';
import { ColumnDefinitionType } from '../../types/SimpleTableType';
import { ProfileImage } from '../../components/Image/ProfileImage';
import { formatDate, formatCurrency, formatNumberWithCommas } from '../../helpers/format';
import { Dropdown } from '../../components/ui/Dropdown';
import { dashboard__dropdownData } from '../../data/dropdown';
import { DashboardContext } from '../../context/DashboardContext';
import { ChartCard } from '../../components/Chart/ChartCard';
import { SimpleTableCard } from '../../components/SimpleTable/SimpleTableCard';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DashboardForm } from './DashboardForm';

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

  

  // useEffect(() => {
  //   if( period !== 'Personalizado' && initDate && finalDate ) {
  //     getSalesData( initDate, finalDate );
  //   }
  // }, [ initDate, finalDate ]);

  return (
    <div className='container-fluid'>

      <h3 className='wrapper justify-content-between'>
        <span>Información inicial</span>
        <span className='pointer'>
          <i className={`fas ${ true ? 'fa-chevron-up' : 'fa-chevron-down' }`}></i>
        </span>
      </h3>

      <DashboardForm
        
      />

      {/* <div className="row">
        <div className="col-xl-7 col-lg-7">
          <p className='h2'>Información trimestral</p>
        </div>

        <div className="col-xl-5 col-lg-5">
          <div className="row">
            <div className="col-xl-4 mb-xl-0 mb-2">
              <ReactDatePicker
                className={`form-control`}
                placeholderText='Desde'
                dateFormat='MMMM d, yyyy'
                onChange={ ( date ) => {
                  
                }}
              />
            </div>

            <div className="col-xl-4 mb-xl-0 mb-2">
              <ReactDatePicker
                className={`form-control`}
                placeholderText='Hasta'
                dateFormat='MMMM d, yyyy'
                onChange={ ( date ) => {
                  
                }}
              />
            </div>

            <div className="col-xl-4 ">
              <div className="row justify-content-center">
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
        </div>
      </div> */}

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