import React, { useContext } from 'react';
import { SalesContext } from '../../context/SalesContex';
import { formatCurrency } from '../../helpers/format';

import { TableCommissionsProps, Commission } from '../../interfaces/SaleInterface';
import { SimpleTable } from '../../components/SimpleTable/SimpleTable';



// export const CommissionsTable = ({ show, setShow, section }: Props) => {
  export const CommissionsTable = <T, K extends keyof T>({ data, columns, show, setShow, section, title }: TableCommissionsProps<T, K>): JSX.Element => {

    return (
      <div className="card">
        <div className="card-body">
          <h3 className="wrapper justify-content-between">
            <span> { title } </span>
            <span className="pointer" onClick={() => setShow(!show, section)}>
              <i
                className={`fas ${show ? 'fa-chevron-up' : 'fa-chevron-down'}`}
              ></i>
            </span>
          </h3>

          <div className={`row ${ !show ? 'd-none' : 'fadeIn' }`}>
            <SimpleTable data={ data } columns={ columns } />
          </div>

          {/* <table
            className={`table table-hover-custom table-striped ${
              !show ? 'd-none' : 'fadeIn'
            }`}
          >
            <thead>
              <tr className="text-center">
                {header.map((item, index) => (
                  <th key={index}>{item.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loadingCommissions ? (
                <tr>
                  <td colSpan={header.length} className="text-center">
                    <i className="fas fa-spinner fa-pulse"></i> Loading...
                  </td>
                </tr>
              ) : waterCommissions.length === 0 ? (
                <tr>
                  <td colSpan={header.length} className="text-center">
                    No results available
                  </td>
                </tr>
              ) : (
                waterCommissions.map((commission, index) => (
                  <tr key={index}>
                    <td className="text-center"> {commission.branch} </td>
                    <td className="text-center"> {commission.employee} </td>
                    <td className="text-right">
                      {' '}
                      {formatCurrency(commission.commission)}{' '}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table> */}
        </div>
      </div>
    );

  // const { waterCommissions, loadingCommissions } = useContext( SalesContext );

  // const header = [
  //   {
  //     name : 'Branch',
  //     value: 'branch_company'
  //   },
  //   {
  //     name : 'Employee',
  //     value: 'employee'
  //   },
  //   {
  //     name : 'Commission',
  //     value: 'commission'
  //   },
  // ];

  // return (
  //   <div>
  //     <div className='card'>
  //       <div className='card-body'>

  //         <h3 className='wrapper justify-content-between'>
  //           Water commissions
  //           <span
  //             className='pointer'
  //             onClick={ () => setShow( !show, section ) }
  //           >
  //             <i className={`fas ${ show ? 'fa-chevron-up' : 'fa-chevron-down' }`}></i>
  //           </span>
  //         </h3>

  //         <table className={`table table-hover-custom table-striped ${ !show ? 'd-none' : 'fadeIn' }`}>
  //           <thead>
  //             <tr className='text-center'>
  //               {
  //                 header.map( ( item, index ) => (
  //                   <th key={ index }>
  //                     { item.name }
  //                   </th>
  //                 ))
  //               }
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {
  //               loadingCommissions
  //                 ? (
  //                   <tr>
  //                     <td colSpan={ header.length } className='text-center'>
  //                       <i className='fas fa-spinner fa-pulse'></i> Loading...
  //                     </td>
  //                   </tr>
  //                 )
  //                 : waterCommissions.length === 0
  //                   ? (
  //                     <tr>
  //                       <td colSpan={ header.length } className='text-center'>
  //                         No results available
  //                       </td>
  //                     </tr>
  //                   )
  //                   : waterCommissions.map( ( commission, index ) => (
  //                     <tr key={ index }>
  //                       <td className='text-center'> { commission.branch } </td>
  //                       <td className='text-center'> { commission.employee } </td>
  //                       <td className='text-right'> { formatCurrency( commission.commission ) } </td>
  //                     </tr>
  //                   ))
  //             }
  //           </tbody>
  //         </table>

  //       </div>
  //     </div>

  //   </div>
  // );
}
