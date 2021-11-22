import React, { useEffect, useRef } from 'react';
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import { TopProduct } from '../../interfaces/SaleInterface';

Chart.register( ...registerables );

interface Props {
  chartname: string;
  data: TopProduct[];
  typeChart: keyof ChartTypeRegistry;
};

export const ChartComponent = ({ chartname, data, typeChart }: Props) => {

  const isMounted = useRef( true );
  const myChart = useRef<Chart<typeof typeChart, number[]>>();

  useEffect(() => {
    if( !isMounted.current ) return;
    console.log(data);

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
    const ctx = document.querySelector(`#${ chartname }`) as HTMLCanvasElement;

    myChart.current?.destroy();

    myChart.current = new Chart( ctx, {
      type: typeChart,
      data: {
        labels: data.map( item => item.product ),
        
        datasets: [
          {
            label: '$MXN$',
            data: data.map( item => item.money ),
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
          }
        ]
      },
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        // responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          // title: {
          //   display: true,
          //   text: 'Chart.js Horizontal Bar Chart'
          // }
        }
      },
    });
  }

  return (
      <canvas id={ chartname } style={{
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      width: '100%',
    }}></canvas>
  );
}
