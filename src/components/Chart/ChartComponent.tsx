import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { ChartProps } from '../../types/ChartType';
import { randomColor } from '../../helpers/color';

Chart.register( ...registerables );

interface ChartColor {
  background: string;
  border:     string,
}

export const ChartComponent = <T, K extends keyof T>({ 
  loading, maintainRatio, title, chartName, typeChart, data, columnName, columnShortName, columnValue, legendPosition = 'top'
}: ChartProps<T, K>) => {

  const isMounted = useRef( true );
  const myChart = useRef<Chart<typeof typeChart, T[K][], T[K]>>();
  useEffect(() => {
    if( !isMounted.current ) return;

    if( data.length > 0 ) {
      createChart();
    }

  }, [ data ]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);

  const createChart = () => {
    const ctx = document.querySelector(`#${ chartName }`) as HTMLCanvasElement;

    myChart.current?.destroy();

    myChart.current = new Chart( ctx, {
      type: typeChart,
      data: {
        labels: data.map( item => item[ columnShortName ] ),
        // labels: data.map( item => item[ columnShortName ] ),
        
        datasets: [
          {
            label: '$MXN$',
            data: data.map( item => item[ columnValue ] ),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
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
              // title: (this, tooltipItems) => {
              //   return data.map( item => `${ item[ columnShortName ] }` )
              // }
              // title: function(this, tooltipItems) {
              //   console.log({esto: this});
              //   console.log({tooltipItems});
              //   // return data.map( item => `${ item[ columnShortName ] }` )
              //   return data.filter( item => `${ item[ columnShortName ] }` === tooltipItems[0].label ).map( item => `${ item[ columnName ] }` )
              // },
            },
          }
          // title: {
          //   display: true,
          //   text: 'Chart.js Horizontal Bar Chart'
          // }
        }
      },
    });
  }

  return (
      <canvas id={ chartName } style={{
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      height: '100%',
      width: '100%',
    }}></canvas>
  );
}
