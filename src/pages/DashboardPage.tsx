import React, { useEffect, useRef, useState } from 'react';
import { useToastNotification } from '../hooks/useToastNotification';
import { formatDate } from '../helpers/format';
import adminApi from '../helpers/adminApi';

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

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    getTopClients();
    getTopProducts();
  }, []);

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-12'>
          <div className='card o-hidden border-0 shadow-lg'>
            <div className='card-body p-0'>
              <div className='row'>
                <div className="progress mb-4">
                  <div 
                    className="progress-bar bg-danger" 
                    role="progressbar" 
                    style={{ width: '20%' }}
                    aria-valuenow={20}
                    aria-valuemin={0} 
                    aria-valuemax={100}
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}