import React from 'react';
import XLSX from 'sheetjs-style';

interface Props<T> {
  data:     T[];
  fileName: string;
}

export const ExcelLocalExport = <T,>({ data, fileName }: Props<T>): JSX.Element => {
  const exportFile = () => {
    if( !fileName.includes('.xlsx') ) {
      fileName = `${ fileName }.xlsx`;
    }
    
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet( data );
    
    autofitColumn( data, ws );
    setStyleToSheet( ws );

    /* Generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet( wb, ws, 'Sheet1' );

    /* Save to file */
    XLSX.writeFile( wb, fileName );
  }

  const setStyleToSheet = ( worksheet: XLSX.WorkSheet ) => {
    if( !worksheet['!ref'] ) return;

    const range = XLSX.utils.decode_range( worksheet['!ref'] );

    for( let row = range.s.r; row <= range.e.r; ++row ) {
      for( let column = range.s.c; column <= range.e.c; ++column ) {
        const cell_address = { c: column, r: row };
        /* if a cell address is needed, encode the address */
        const cell_ref = XLSX.utils.encode_cell( cell_address );

        let style: any;

        if( row === 0 ) {
          // Header style
          style = {
            font: {
              name:  'Arial',
              sz:    13,
              bold:  true,
              color: { rgb: 'ffffff' }
            },
            fill: {
              fgColor: { rgb: '446AD8' }
            },
            alignment: {
              vertical: 'center',
              horizontal: 'center',
            }
          };
        } else {
          style = {
            font: {
              name:  'Arial',
              sz:    12,
              bold:  false,
              color: { rgb: '000000' }
            },
            fill: {
              fgColor: { rgb: 'ffffff' }
            }
          };
        }

        worksheet[ cell_ref ].s = style;
      }
    }
  }

  const autofitColumn = ( json: T[], worksheet: XLSX.WorkSheet ) => {
    let objectMaxLength: number[] = [];

    json.forEach( ( jsonData ) => {
      Object.entries( jsonData ).forEach( ( [ k , v ], idx ) => {
        let columnValue: string;

        if( typeof v === 'number' ) {
          columnValue = v.toString();
        } else {
          columnValue = v;
        }

        if( k.length > columnValue.length ) {
          columnValue = k;
        }

        objectMaxLength[ idx ] = ( objectMaxLength[ idx ] >= columnValue.length )
          ? objectMaxLength[ idx ]
          : ( columnValue.length + 5 );
      });
    });

    const wscols = objectMaxLength.map( ( w: number ) => ( { width: w } ));
    worksheet['!cols'] = wscols;
  };

  return ( data.length > 0 )
    ? (
        <button
          className='btn btn-success'
          type='button'
          onClick={ exportFile }
        >
          Exportar a Excel
        </button>
      )
    : <></>;
}
