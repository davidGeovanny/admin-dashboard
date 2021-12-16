import React, { useCallback, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { v4 } from 'uuid';

import { Loading } from '../Loading/Loading';
import { ChartProps } from '../../types/ChartType';
import { formatCurrency } from '../../helpers/format';

Chart.register( ...registerables );

export const ChartComponent = <T, K extends keyof T>({ 
  columnName, 
  columnShortName, 
  columnValue, 
  data, 
  loading,
  maintainRatio, 
  typeChart, 
  legendPosition = 'top',
  title          = '',
}: ChartProps<T, K>) => {
  const chartName = useRef( 'chart-' + v4() );
  const isMounted = useRef( true );
  const myChart   = useRef<Chart<typeof typeChart, T[K][], T[K]>>();

  const createChart = useCallback(() => {
    const ctx = document.querySelector(`#${ chartName.current }`) as HTMLCanvasElement;

    if( !ctx ) return;

    myChart.current?.destroy();
    
    myChart.current = new Chart( ctx, {
      type: typeChart,
      data: {
        labels: data.map( item => item[ columnShortName ] ),
        datasets: [
          {
            label: 'Ingresos',
            data: data.map( item => item[ columnValue ] ),
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(75, 192, 192, 0.4)',
              'rgba(153, 102, 255, 0.4)',
              'rgba(255, 205, 86, 0.4)',
              'rgba(255, 159, 64, 0.4)',
              'rgba(201, 203, 207, 0.4)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(201, 203, 207, 1)',
            ],
            borderWidth: 1,
            fill: 'start',
          }
        ]
      },
      options: {
        // indexAxis: 'y',
        maintainAspectRatio: maintainRatio,
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: legendPosition,
          },
          tooltip: {
            callbacks: {
              // afterTitle: () => {
              //   return `${ columnShortName }`
              // },
              title: function( this, tooltipItems ) {
                return data.filter( item => `${ item[ columnShortName ] }` === tooltipItems[0].label ).map( item => `${ item[ columnName ] }` )
              },
              label: function( this, t ) {
                return `${ t.dataset.label }: ${ formatCurrency( this.dataPoints[0].raw as number ) } MXN`;
              }
            },
          },
          title: {
            display: false, // change true if want to display the title
            text: title
          }
        }
      },
    });
  }, [ 
    columnName, 
    columnShortName, 
    columnValue, 
    data, 
    legendPosition, 
    maintainRatio, 
    title, 
    typeChart, 
  ]);

  useEffect(() => {
    if( !isMounted.current ) return;

    if( data.length > 0 && !loading ) {
      createChart();
    }
  }, [ data, loading, createChart ]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);

  return ( loading )
    ? (
      <div className='loading-section'>
        <Loading size={ 3 } color='black' />
      </div>
    )
    : ( data.length === 0 )
      ? (
        <div className='loading-section'>
          No hay información para mostrar
        </div>
      )
      : (
        <canvas 
          id={ chartName.current } 
          style={{
            position: 'absolute',
            top:      '0',
            bottom:   '0',
            left:     '0',
            height:   '100%',
            width:    '100%',
          }}>
        </canvas>
      )
}
