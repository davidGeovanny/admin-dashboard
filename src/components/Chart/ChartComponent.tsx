import React, { useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register( ...registerables );

interface Props {
  chartname: string;
};

export const ChartComponent = ({ chartname }: Props) => {

  const myChart = useRef<Chart<'bar', number[]>>();

  return (
    <canvas id={ chartname }></canvas>
  );
}
