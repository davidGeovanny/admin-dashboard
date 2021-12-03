import React from 'react'
import { ChartComponent } from './ChartComponent';
import { ChartProps } from '../../types/ChartType';
import { Loading } from '../Loading/Loading';

export const ChartCard = <T, K extends keyof T>({ 
  loading, 
  maintainRatio = true, 
  title, chartName, 
  typeChart, 
  data, 
  columnName, 
  columnShortName, 
  columnValue, 
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
          {
            true
              ? (
                <div className='loading'>
                  <Loading size={ 3 } color='black' />
                </div>
              )
              : (
                <ChartComponent
                  loading={ loading }
                  maintainRatio={ maintainRatio }
                  title={ title }
                  chartName={ chartName }
                  typeChart={ typeChart }
                  data={ data }
                  columnName={ columnName }
                  columnShortName={ columnShortName }
                  columnValue={ columnValue }
                />
              )
          }
          
        </div>
      </div>
    </div>
  )
}
