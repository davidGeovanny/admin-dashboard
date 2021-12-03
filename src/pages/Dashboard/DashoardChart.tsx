import React, { useEffect, useState } from 'react';
import { ChartCard } from '../../components/Chart/ChartCard';
import adminApi from '../../helpers/adminApi';
import { ChartComponent } from '../../components/Chart/ChartComponent';
import { ChartTypeRegistry } from 'chart.js';
import { BgLoading } from '../../components/Loading/BgLoading';
import { Loading } from '../../components/Loading/Loading';

interface Props<T, K extends keyof T> {
  initDate: string;
  finalDate: string;
  getApiData: ( initDate: string, finalDate: string ) => Promise<T[]>;
  columnName: K;
  columnShortName: K;
  columnValue: K;
  typeChart: keyof ChartTypeRegistry;
  title: string;
}

export const DashoardChart = <T, K extends keyof T>({ 
  initDate,
  finalDate,
  getApiData,
  columnName,
  columnShortName,
  columnValue,
  title,
  typeChart
}: Props<T, K>) => {
  
  const [ loading, setLoading ] = useState( false );
  const [ data, setData ] = useState<T[]>([]);

  const getData = async () => {
    setLoading( true );
    const datos = await getApiData( initDate, finalDate );
    setData( datos );
    setLoading( false );
  }
  
  useEffect(() => {
    if( !initDate || !finalDate ) return;
    getData();
  }, [ initDate, finalDate ]);

  return (
    <>
      {
        loading
          ? <Loading size={ 3 } />
          : (
            <ChartCard
              loading={ true }
              title={ title }
              chartName='un_test'
              typeChart={ typeChart }
              data={ data }
              columnName={ columnName }
              columnShortName={ columnShortName }
              columnValue={ columnValue }
              maintainRatio={ false }
            />
          )
      }
    </>
  )
    
}
