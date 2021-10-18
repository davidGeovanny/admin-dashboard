import React, { useContext } from 'react';
import { SalesContext } from '../../context/SalesContex';
import { formatCurrency } from '../../helpers/format';

type Section = 'water' | 'icebar' | 'icecube';

interface Props {
  show:    boolean;
  section: Section;
  setShow: ( value: boolean, section: Section ) => void;
}

export const CommissionsTable = ({ show, setShow, section }: Props) => {

  const { waterCommissions, loadingCommissions } = useContext( SalesContext );

  const header = [
    {
      name : 'Branch',
      value: 'branch_company'
    },
    {
      name : 'Employee',
      value: 'employee'
    },
    {
      name : 'Commission',
      value: 'commission'
    },
  ];

  return (
    <div>
      <div className='card'>
        <div className='card-body'>

          <h3 style={{
            display: 'flex',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}>
            Water commissions
            <span
              onClick={ () => setShow( !show, section ) }
            >
              <i className={`fas ${ show ? 'fa-eye' : 'fa-eye-slash' }`}></i>
            </span>
          </h3>

          

          <table className={`table table-hover-custom table-striped ${ !show ? 'd-none' : '' }`}>
            <thead>
              <tr className='text-center'>
                {
                  header.map( ( item, index ) => (
                    <th key={ index }>
                      { item.name }
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                loadingCommissions
                  ? (
                    <tr>
                      <td colSpan={ header.length } className='text-center'>
                        <i className='fas fa-spinner fa-pulse'></i> Loading...
                      </td>
                    </tr>
                  )
                  : waterCommissions.length === 0
                    ? (
                      <tr>
                        <td colSpan={ header.length } className='text-center'>
                          No results available
                        </td>
                      </tr>
                    )
                    : waterCommissions.map( ( commission, index ) => (
                      <tr key={ index }>
                        <td className='text-center'> { commission.branch } </td>
                        <td className='text-center'> { commission.employee } </td>
                        <td className='text-right'> { formatCurrency( commission.commission ) } </td>
                      </tr>
                    ))
              }
            </tbody>
          </table>

        </div>
      </div>

    </div>
  );
}
