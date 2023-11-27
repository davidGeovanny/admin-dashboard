import React, { useContext, useState } from 'react';

import { SalesContext } from '../../context/SalesContex';
import { CommissionsTable } from './CommissionsTable';
import { CommissionsForm } from './CommissionsForm';
import { Commission } from '../../interfaces/api/Sale/GetCommissions';
import { CommissionsSection } from '../../types/SalesType';
import { ColumnDefinitionType } from '../../types/SimpleTableType';
import { formatCurrency } from '../../helpers/format';

const columns: ColumnDefinitionType<Commission, keyof Commission>[] = [
  {
    key:    'branch',
    header: 'Sucursal',
    align:  'center',
  },
  {
    key:    'employee',
    header: 'Nombre del empleado',
    align:  'center',
  },
  {
    key:    'commission',
    header: 'Comisión',
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
    icecubeCommissions, 
    deliveryPointCommissions,
  } = useContext( SalesContext );

  const [ showCommissions, setShowCommissions ] = useState({
    water:   false,
    icebar:  false,
    icecube: false,
    deliveryPoint: false,
  });

  const changeSetShowCommission = ( value: boolean, section: CommissionsSection ) => {
    setShowCommissions({
      ...showCommissions,
      [ section ]: value
    });
  }
  
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-12">
          <CommissionsForm loading={ loadingCommissions } />
        </div>
      </div>

      <hr />
    
      <div className='row'>
        <div className='col-12'>
          <CommissionsTable 
            show={ showCommissions.water }
            setShow={ changeSetShowCommission }
            section='water'
            data={ waterCommissions }
            dataExport={ waterCommissions.map( item => ({ Sucursal: item.branch, Empleado: item.employee, 'Comisión': item.commission }) ) }
            columns={ columns }
            title='Comisiones de agua'
            loading={ loadingCommissions }
          />
        </div>
        <div className='col-12'>
          <CommissionsTable 
            show={ showCommissions.icebar }
            setShow={ changeSetShowCommission }
            section='icebar'
            data={ icebarCommissions }
            dataExport={ icebarCommissions.map( item => ({ Sucursal: item.branch, Empleado: item.employee, 'Comisión': item.commission }) ) }
            columns={ columns }
            title='Comisiones de barra'
            loading={ loadingCommissions }
          />
        </div>
        <div className='col-12'>
          <CommissionsTable 
            show={ showCommissions.icecube }
            setShow={ changeSetShowCommission }
            section='icecube'
            data={ icecubeCommissions }
            dataExport={ icecubeCommissions.map( item => ({ Sucursal: item.branch, Empleado: item.employee, 'Comisión': item.commission }) ) }
            columns={ columns }
            title='Comisiones de cubo'
            loading={ loadingCommissions }
          />
        </div>
        <div className='col-12'>
          <CommissionsTable 
            show={ showCommissions.deliveryPoint }
            setShow={ changeSetShowCommission }
            section='deliveryPoint'
            data={ deliveryPointCommissions }
            dataExport={ deliveryPointCommissions.map( item => ({ Sucursal: item.branch, Empleado: item.employee, 'Comisión': item.commission }) ) }
            columns={ columns }
            title='Comisiones de punto de entrega'
            loading={ loadingCommissions }
          />
        </div>
      </div>
    </div>
  );
}
