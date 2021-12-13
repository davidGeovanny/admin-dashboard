import React from 'react';
import { ChartComponent } from './ChartComponent';
import { ChartProps } from '../../types/ChartType';

export const ChartCard = <T, K extends keyof T>({ 
  data, 
  typeChart, 
  columnName, 
  columnShortName, 
  columnValue, 
  loading, 
  maintainRatio = true, 
  title, 
  legendPosition = 'top'
}: ChartProps<T, K>) => {
  return (
    <div className='card shadow mb-4'>
      <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
        <h6 className='m-0 font-weight-bold text-primary'> { title } </h6>
      </div>
        
      <div 
        className='card-body'
        style={{
          width:    '100%',
          height:   '100%',
          float:    'left',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className='chart-area'>
          <ChartComponent
            loading={ loading }
            maintainRatio={ maintainRatio }
            title={ title }
            typeChart={ typeChart }
            data={ data }
            columnName={ columnName }
            columnShortName={ columnShortName }
            columnValue={ columnValue }
            legendPosition={ legendPosition }
          />
        </div>
      </div>
    </div>
  );
}
