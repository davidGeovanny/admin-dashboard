import React from 'react';
import { SimpleTable } from '../../components/SimpleTable/SimpleTable';
import { TableCommissionsProps } from '../../types/SalesType';

export const CommissionsTable = <T, K extends keyof T>({
  data,
  columns,
  show,
  setShow,
  section,
  title,
  loading,
}: TableCommissionsProps<T, K>): JSX.Element => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h3 className='wrapper justify-content-between'>
          <span> { title } </span>
          <span className='pointer' onClick={ () => setShow( !show, section ) }>
            <i className={`fas ${ show ? 'fa-chevron-up' : 'fa-chevron-down' }`}></i>
          </span>
        </h3>

        <div className={`row table-responsive ${ !show ? 'd-none' : 'fadeIn' }`}>
          <SimpleTable 
            data={ data } 
            columns={ columns } 
            loading={ loading } 
          />
        </div>
      </div>
    </div>
  );
};