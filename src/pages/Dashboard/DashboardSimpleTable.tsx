import React, { useEffect, useRef, useState } from 'react';
import { SimpleTableCard } from '../../components/SimpleTable/SimpleTableCard';
import { ColumnDefinitionType } from '../../types/SimpleTableType';

interface Props<T> {
  initDate:         string;
  finalDate:        string;
  getApiData:       ( initDate: string, finalDate: string ) => Promise<T[]>;
  columnDefinition: ColumnDefinitionType<T, keyof T>[];
  title:            string;
}

export const DashboardSimpleTable = <T,>({
  initDate,
  finalDate,
  getApiData,
  columnDefinition,
  title,
}: Props<T>) => {
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
    <SimpleTableCard
      data={ data } 
      columns={ columnDefinition } 
      loading={ loading } 
      title={ title }
    />
  );
}
