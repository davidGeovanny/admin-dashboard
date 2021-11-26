import React from 'react';
import { SimpleTable } from '../../components/SimpleTable/SimpleTable';
import { TableCommissionsProps } from '../../types/SalesType';
import { CSVLink } from 'react-csv';

const headers = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Email", key: "email" }
];
 
const datas = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
];

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
          <div className='col-12'>
            <div className='row justify-content-end'>
              {/* <button
                className='btn btn-success my-1'
                type='button'
              >
                Descargar
              </button> */}
              <CSVLink data={datas} headers={headers}>
                Download me
              </CSVLink>;
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