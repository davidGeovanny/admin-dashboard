import React, { useEffect, useRef, useState } from 'react';
import { ChartComponent } from '../components/Chart/ChartComponent';
import { useToastNotification } from '../hooks/useToastNotification';
import { 
  TopProduct, 
  TopProductsResponse, 
  TopTypeProductsResponse, 
  TopTypeProduct 
} from '../interfaces/SaleInterface';
import { formatDate } from '../helpers/format';
import adminApi from '../helpers/adminApi';
import { ChartCard } from '../components/Chart/ChartCard';

export const DashboardPage = () => {

  const [ loading, setLoading ]           = useState<boolean>( false );
  const [ sales, setSales ]               = useState<TopProduct[]>([]);
  const [ clients, setClients ]           = useState<any[]>([]);
  const [ products, setProducts ]         = useState<any[]>([]);
  const [ typeProducts, setTypeProducts ] = useState<TopTypeProduct[]>([]);

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
      
      const { data } = await adminApi.get<any>('/sales/top-clients/', {
        params: {
          initDate:  formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), 0 ) ),
          finalDate: formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0 ) ),
        },
      });

      console.log({ data });
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
      
      const { data } = await adminApi.get<any>('/sales/top-products/', {
        params: {
          initDate:  formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), 0 ) ),
          finalDate: formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0 ) ),
        },
      });

      console.log({ data });
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
    } catch ( error ) {
      console.log( error );
    }
  }

  const getSalesPerProduct = async () => {
    try {
      const currentDate = new Date();

      if( loading ) {
        return displayToast({
          message: 'Waiting for response',
          type: 'info',
          duration: 5000
        });
      }
      
      const { data } = await adminApi.get<TopProductsResponse>('/sales/sales-product/', {
        params: {
          initDate:  formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth(), 0 ) ),
          finalDate: formatDate( new Date( currentDate.getFullYear(), currentDate.getMonth() + 1, 0 ) ),
        },
      });

      console.log({ data });
      
      setSales( data.by_frequency );
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
    // getTopClients();
    // getTopProducts();
    getTopTypeProduct();
    getSalesPerProduct();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <ChartCard
            loading={ true }
            title='Ingresos de los 10 productos más frecuentes'
            chartName='monthly-sales'
            typeChart='bar'
            data={ sales }
            columnName='product'
            columnValue='money'
          />
        </div>


        <div className="col-xl-4 col-lg-5">
          <ChartCard
            loading={ true }
            title='Ingresos de los 10 productos más frecuentes'
            chartName='top-type-product'
            typeChart='doughnut'
            data={ typeProducts }
            columnName='type_product'
            columnValue='money'
          />
        </div>

      </div>
    </div>
    // <div className='container'>
    //   <div className='row justify-content-center'>
    //     <div className='col-12'>
    //       <div className='card o-hidden border-0 shadow-lg'>
    //         <div className='card-body p-0'>
    //           <div className='row'>
                
                
    //             <div className="col">
    //                 <div className="progress progress-sm mr-2">
    //                     <div className="progress-bar bg-info" role="progressbar"
    //                         style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0}
    //                         aria-valuemax={100}></div>
    //                 </div>
    //             </div>

    //             <div className="col">
    //               <div className="progress mb-4">
    //                 <div 
    //                   className="progress-bar bg-danger" 
    //                   role="progressbar" 
    //                   style={{ width: '20%' }}
    //                   aria-valuenow={20}
    //                   aria-valuemin={0} 
    //                   aria-valuemax={100}
    //                 >
    //                 </div>
    //               </div>

    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}