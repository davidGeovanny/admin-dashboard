import React, { useEffect, useRef, useState } from 'react';
import { useToastNotification } from '../hooks/useToastNotification';
import { formatDate } from '../helpers/format';
import adminApi from '../helpers/adminApi';
import { ChartComponent } from '../components/Chart/ChartComponent';

export const DashboardPage = () => {

  const [ loading, setLoading ]   = useState<boolean>( false );
  const [ sales, setSales ]       = useState<any[]>([]);
  const [ clients, setClients ]   = useState<any[]>([]);
  const [ products, setProducts ] = useState<any[]>([]);

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
      
      const { data } = await adminApi.get<any>('/sales/sales-product/', {
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
    getSalesPerProduct();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-8 col-lg-7" 
                  >
          <div className="card shadow mb-4">
              
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">10 productos más vendidos</h6>
            </div>
              
            <div className="card-body" style={{
                    width:'100%',
                    height:'100%',
                    float:'left',
                    position:'relative',
                    overflow:'hidden',
                  }}>
              <div className="chart-area" 
                // style={{
                //   width: '100%',
                //   height: '100%',
                //   position: 'relative',
                //   overflow: 'hidden',
                // }}
              >
                <div 
                  
              >
                  <ChartComponent chartname='monthly-sales' data={ sales.slice(0, 10) } typeChart='bar' />

                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="col-xl-4 col-lg-5">
            <div className="card shadow mb-4">
                
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                    <div className="dropdown no-arrow">
                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink">
                            <div className="dropdown-header">Dropdown Header:</div>
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                
                <div className="card-body">
                    <div className="chart-pie pt-4 pb-2">
                        <canvas id="myPieChart"></canvas>
                    </div>
                    <div className="mt-4 text-center small">
                        <span className="mr-2">
                            <i className="fas fa-circle text-primary"></i> Direct
                        </span>
                        <span className="mr-2">
                            <i className="fas fa-circle text-success"></i> Social
                        </span>
                        <span className="mr-2">
                            <i className="fas fa-circle text-info"></i> Referral
                        </span>
                    </div>
                </div>
            </div>
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