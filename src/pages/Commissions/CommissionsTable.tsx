import React from 'react';
import { SimpleTable } from '../../components/SimpleTable/SimpleTable';
import { ExcelLocalExport } from '../../components/Export/Excel/ExcelLocalExport';
import { TableCommissionsProps } from '../../types/SalesType';
import { formatDate } from '../../helpers/format';

export const CommissionsTable = <T, K extends keyof T, Y>({
  data,
  dataExport,
  columns,
  show,
  setShow,
  section,
  title,
  loading,
}: TableCommissionsProps<T, K, Y>): JSX.Element => {
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
          <div className='col-12'>
            <div className='row justify-content-end'>
              {
                ( dataExport ) && 
                  <ExcelLocalExport
                    fileName={`${ section }-${ formatDate( new Date() ) }`}
                    data={ dataExport }
                  />
              }
            </div>
          </div>

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