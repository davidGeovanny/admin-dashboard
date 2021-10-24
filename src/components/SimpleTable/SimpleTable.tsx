import { SimpleTableHeader } from './SimpleTableHeader';
import { SimpleTableRows } from './SimpleTableRows';
import { TableProps } from '../../types/SimpleTableType';

export const SimpleTable = <T, K extends keyof T>({ data, columns, loading }: TableProps<T, K>): JSX.Element => {
  return (
    <table className='table table-hover-custom table-striped'>
      <SimpleTableHeader columns={ columns } />
      <SimpleTableRows
        data={ data }
        columns={ columns }
        loading={ loading }
      />
    </table>
  );
};