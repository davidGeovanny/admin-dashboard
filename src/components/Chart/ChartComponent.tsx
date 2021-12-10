import React, { useEffect, useRef, useState } from 'react';
import { Chart, Color, registerables } from 'chart.js';
import { ChartProps } from '../../types/ChartType';
import { Loading } from '../Loading/Loading';

Chart.register( ...registerables );

export const ChartComponent = <T, K extends keyof T>({ 
  chartName, 
  data, 
  typeChart, 
  columnName, 
  columnShortName, 
  columnValue, 
  maintainRatio, 
  title = '', 
  legendPosition = 'top',
  loading,
}: ChartProps<T, K>) => {

  const isMounted = useRef( true );
  const myChart   = useRef<Chart<typeof typeChart, T[K][], T[K]>>();

  const createChart = () => {
    const ctx = document.querySelector(`#${ chartName }`) as HTMLCanvasElement;

    if( !ctx ) return;

    myChart.current?.destroy();

    myChart.current = new Chart( ctx, {
      type: typeChart,
      data: {
        labels: data.map( item => item[ columnShortName ] ),

        // datasets: data.map( item => {
        //   return {
        //     label: '$MXN$',
        //     data: data.map( item => item[ columnValue ] ),
        //     backgroundColor: [
        //       'rgba(255, 99, 132, 0.3)',
        //       'rgba(54, 162, 235, 0.3)',
        //       'rgba(255, 206, 86, 0.3)',
        //       'rgba(75, 192, 192, 0.3)',
        //       'rgba(153, 102, 255, 0.3)',
        //       'rgba(255, 205, 86, 0.3)',
        //       'rgba(255, 159, 64, 0.3)',
        //       'rgba(201, 203, 207, 0.3)',
        //     ],
        //     borderColor: [
        //       'rgba(255, 99, 132, 1)',
        //       'rgba(54, 162, 235, 1)',
        //       'rgba(255, 206, 86, 1)',
        //       'rgba(75, 192, 192, 1)',
        //       'rgba(153, 102, 255, 1)',
        //       'rgba(255, 205, 86, 1)',
        //       'rgba(255, 159, 64, 1)',
        //       'rgba(201, 203, 207, 1)',
        //     ],
        //     borderWidth: 1,
        //     fill: 'start',
        //   }
        // })
        
        datasets: [
          {
            label: '$MXN$',
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
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
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
            },
          },
          title: {
            display: false, // change true if want to display the title
            text: title
          }
        }
      },
    });
  }

  useEffect(() => {
    if( !isMounted.current ) return;

    if( data.length > 0 && !loading ) {
      createChart();
    }
  }, [ data, loading ]);

  useEffect(() => {
    chartName = chartName.replace(' ', '-');
  }, []);

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
    : (
      <canvas 
        id={ chartName } 
        style={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          height: '100%',
          width: '100%',
        }}>
      </canvas>
    );
}
