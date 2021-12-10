export type ColumnDefinitionType<T, K extends keyof T> = {
  key:    K;
  header: string;
  align?: CellAlign;
  cell?:  ( value: T ) => JSX.Element;
}

export type TableProps<T, K extends keyof T> = {
  data:    Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  loading: boolean;
  title?:  string;
}

export type TableRowsProps<T, K extends keyof T> = {
  data:    Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  loading: boolean;
}

export type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
}

type CellAlign = 'center' | 'right' | 'left' | 'justify';