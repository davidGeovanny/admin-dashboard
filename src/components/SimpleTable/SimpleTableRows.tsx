import { TableRowsProps } from '../../types/SimpleTableType';

export const SimpleTableRows = <T, K extends keyof T>({ data, columns, loading }: TableRowsProps<T, K>): JSX.Element => {
  const renderRows = (): JSX.Element | JSX.Element[] => {
    if( loading ) {
      return (
        <tr>
          <td colSpan={ columns.length } className="text-center">
            <i className="fas fa-spinner fa-pulse"></i> Loading...
          </td>
        </tr>
      );
    }

    if( data.length > 0 ) {
      return data.map( ( row, index ) => {
        return (
          <tr key={`row-${ index }`}>
            { columns.map( ( column, index2 ) => {
                return (
                  <td 
                    key={`cell-${ index2 }`}
                    className={`text-${ column.align ? column.align : 'left' }`}
                  > 
                    {
                      column.cell
                        ? column.cell( row )
                        : row[ column.key ]
                    }
                    
                  </td>
                );
            }) }
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td colSpan={ columns.length }>
            <div className='text-center'> No results available </div>
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