import React, { useEffect, useRef, useState } from 'react';
import { ChartTypeRegistry } from 'chart.js';
import { ChartCard } from '../../components/Chart/ChartCard';

interface Props<T, K extends keyof T> {
  chartName:       string;
  initDate:        string;
  finalDate:       string;
  getApiData:      ( initDate: string, finalDate: string ) => Promise<T[]>;
  typeChart:       keyof ChartTypeRegistry;
  columnName:      K;
  columnShortName: K;
  columnValue:     K;
  title:           string;
}

export const DashoardChart = <T, K extends keyof T>({ 
  chartName,
  initDate,
  finalDate,
  getApiData,
  typeChart,
  columnName,
  columnShortName,
  columnValue,
  title,
}: Props<T, K>) => {
  const isMounted               = useRef( true );
  const [ loading, setLoading ] = useState( false );
  const [ data, setData ]       = useState<T[]>([]);

  const getData = async () => {
    if( loading ) return;
    
    setLoading( true );
    const datos = await getApiData( initDate, finalDate );
    setData( datos );
    setLoading( false );
  }
  
  useEffect(() => {
    if( !initDate || !finalDate || !isMounted.current ) return;
    getData();
  }, [ initDate, finalDate ]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);

  return (
    <ChartCard
      loading={ loading }
      title={ title }
      chartName={ chartName }
      typeChart={ typeChart }
      data={ data }
      columnName={ columnName }
      columnShortName={ columnShortName }
      columnValue={ columnValue }
      maintainRatio={ false }
    />
  );
}
