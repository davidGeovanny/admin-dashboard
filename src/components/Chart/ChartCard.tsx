import React from 'react'
import { ChartComponent } from './ChartComponent';
import { ChartProps } from '../../types/ChartType';

export const ChartCard = <T, K extends keyof T>({ 
  loading, title, chartName, typeChart, data, columnName, columnValue, legendPosition = 'top'
}: ChartProps<T, K>) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">10 productos más vendidos</h6>
      </div>
        
      <div className="card-body" style={{
              width:'100%',
              height:'100%',
              float:'left',
              position:'relative',
              overflow:'hidden',
            }}>
        <div className="chart-area">
          <div>
            <ChartComponent
              loading={ loading }
              title={ title }
              chartName={ chartName }
              typeChart={ typeChart }
              data={ data }
              columnName={ columnName }
              columnValue={ columnValue }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
