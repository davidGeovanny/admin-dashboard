import React, { useContext, useEffect, useState } from 'react';

import { DashboardContext } from '../../context/DashboardContext';
import { DashboardCard } from './DashboardCard';
import { Loading } from '../../components/Loading/Loading';
import { formatCurrency } from '../../helpers/format';

export const DashboardCards = () => {
  const { loading, period, branchesRevenue } = useContext( DashboardContext );
  const [ totalRevenue, setTotalRevenue ]    = useState<number>( 0 );

  useEffect(() => {
    setTotalRevenue( branchesRevenue.reduce( ( a, b ) => a + b.money, 0 ) )
  }, [ branchesRevenue ]);

  return (
    <div className="row">
      {/* Earning period card */}
      <DashboardCard
        title={`Ingresos (${ period })`}
        content={ loading ? <div className="loading-section"><Loading color="#4e73df" /></div> : formatCurrency( totalRevenue ) }
        icon="fa-dollar-sign"
      />
    </div>
  );
}
