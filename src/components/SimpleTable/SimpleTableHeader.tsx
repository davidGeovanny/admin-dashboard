import { TableHeaderProps } from '../../types/SimpleTableType';

export const SimpleTableHeader = <T, K extends keyof T>({ columns }: TableHeaderProps<T, K>): JSX.Element => {
  const headers = columns.map( ( column, index ) => {
    return (
      <th 
        key={`headCell-${ index }`}
        className='text-center'
      >
        { column.header }
      </th>
    );
  });

  return (
    <thead>
      <tr>{ headers }</tr>
    </thead>
  );
};
