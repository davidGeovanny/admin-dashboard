import React, { useContext, useEffect, useState } from 'react';
import { DashboardCard } from './DashboardCard';
import { DashboardContext } from '../../context/DashboardContext';
import { formatCurrency } from '../../helpers/format';



export const DashboardCards = () => {
  const { period, branchesRevenue } = useContext( DashboardContext );
  const [ totalRevenue, setTotalRevenue ] = useState<number>( 0 );

  useEffect(() => {
    setTotalRevenue( branchesRevenue.reduce( ( a, b ) => a + b.money, 0 ) )
  }, [ branchesRevenue ]);

  return (
    <div className="row">
      {/* Earnings (Monthly) Card Example */}
      <DashboardCard
        title={`Ingresos (${ period })`}
        content={ formatCurrency( totalRevenue ) }
        icon='fa-dollar-sign'
      />
    </div>
  );
}
