import React, { useContext, useState } from 'react';
import { SalesContext } from '../../context/SalesContex';
import { CommissionsTable } from './CommissionsTable';
import { CommissionsForm } from './CommissionsForm';
import { Commission } from '../../interfaces/SaleInterface';
import { CommissionsSection } from '../../types/SalesType';
import { ColumnDefinitionType } from '../../types/SimpleTableType';
import { formatCurrency } from '../../helpers/format';

const columns: ColumnDefinitionType<Commission, keyof Commission>[] = [
  {
    key:    'branch',
    header: 'Branch company',
    align:  'center',
  },
  {
    key:    'employee',
    header: 'Name employee',
    align:  'center',
  },
  {
    key:    'commission',
    header: 'Commission',
    align:  'right',
    cell:   ( value ) => (
      <>{ formatCurrency( value.commission ) }</>
    )
  }
];

export const CommissionsPage = () => {
  const { 
    loadingCommissions, 
    waterCommissions, 
    icebarCommissions, 
    icecubeCommissions 
  } = useContext( SalesContext );

  const [ showCommissions, setShowCommissions ] = useState({
    water: false,
    icebar: false,
    icecube: false,
  });

  const changeSetShowCommission = ( value: boolean, section: CommissionsSection ) => {
    setShowCommissions({
      ...showCommissions,
      [ section ]: value
    });
  }
  
  return (
    <div className='container-fluid'>
      <CommissionsForm loading={ loadingCommissions } />

      <hr />
    
      <div className='row'>
        <div className='col-12'>
          <CommissionsTable 
            show={ showCommissions.water }
            setShow={ changeSetShowCommission }
            section='water'
            data={ waterCommissions }
            columns={ columns }
            title='Water Commissions'
            loading={ loadingCommissions }
          />
        </div>
        <div className='col-12'>
          <CommissionsTable 
            show={ showCommissions.icebar }
            setShow={ changeSetShowCommission }
            section='icebar'
            data={ icebarCommissions }
            columns={ columns }
            title='Icebar Commissions'
            loading={ loadingCommissions }
          />
        </div>
        <div className='col-12'>
          <CommissionsTable 
            show={ showCommissions.icecube }
            setShow={ changeSetShowCommission }
            section='icecube'
            data={ icecubeCommissions }
            columns={ columns }
            title='Icecube Commissions'
            loading={ loadingCommissions }
          />
        </div>
      </div>
    </div>
  );
}