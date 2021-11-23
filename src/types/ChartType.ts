import { ChartTypeRegistry } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/types/utils';

export type ChartProps<T, K extends keyof T> = {
  loading:         boolean;
  title:           string;
  chartName:       string;
  typeChart:       keyof ChartTypeRegistry;
  data:            Array<T>;
  columnName:      K;
  columnValue:     K;
  legendPosition?: LegendPosition;
}

type LegendPosition = 'left' | 'right' | 'center' | 'top' | 'bottom' | 'chartArea' | _DeepPartialObject<{
  [scaleId: string]: number;
}> | undefined;