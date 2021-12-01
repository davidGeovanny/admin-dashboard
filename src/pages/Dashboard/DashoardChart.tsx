import React, { useEffect, useState } from 'react';
import { ChartCard } from '../../components/Chart/ChartCard';
import adminApi from '../../helpers/adminApi';

interface Props<T, K, Z extends keyof T> {
  initDate: string;
  finalDate: string;

}

export const DashoardChart = <T, K, Z extends keyof T>({ initDate, finalDate, }: Props<T, K, Z>) => {

  // const [ data, setData ] = useState<K>();

  // const getTopFromSales = async <T,>( endpoint: string, initDate: string, finalDate: string, params?: {[x: string]: string | number} ): Promise<T | undefined> => {
  //   try {
  //     const { data } = await adminApi.get<T>(`/sales/${ endpoint }/`, { 
  //       params: { 
  //         initDate, 
  //         finalDate, 
  //         ...params 
  //       }});
  //     return data;
  //   } catch ( err ) {
  //     return undefined;
  //   }
  // }


  // const obtenerDatos = async () => {
  // }

  // useEffect(() => {
  //   if( !initDate || !finalDate ) return;
  //   obtenerDatos();
  // }, [ initDate, finalDate ]);

  return (
    <></>
    // <ChartCard
    //   loading={ true }
    //   title='Ingresos de los 10 productos más vendidos'
    //   chartName='monthly-sales2'
    //   typeChart='bar'
    //   data={ data }
    //   columnName='product'
    //   columnShortName='product'
    //   columnValue='money'
    //   maintainRatio={ false }
    // />
  );
}
