import { TableRowsProps } from '../../types/SimpleTable';

export const SimpleTableRows = <T, K extends keyof T>({ data, columns }: TableRowsProps<T, K>): JSX.Element => {
  
  const renderRows = (): JSX.Element | JSX.Element[] => {
    if( data.length > 0 ) {
      return data.map( ( row, index ) => {
        return (
          <tr key={`row-${ index }`}>
            {
              columns.map( ( column, index2 ) => {
                return <td key={`cell-${ index2 }`}> { row[ column.key ] } </td>;
              })
            }
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td colSpan={ columns.length }>
            <div className='text-center'>
              No results available
            </div>
          </td>
        </tr>
      );
    }
  }

  return (
    <tbody>
      { renderRows() }
    </tbody>
  );
};