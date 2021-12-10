import React from 'react'
import { SimpleTable } from './SimpleTable';
import { TableProps } from '../../types/SimpleTableType'

export const SimpleTableCard = <T, K extends keyof T>({ data, columns, loading, title }: TableProps<T, K>): JSX.Element => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='wrapper justify-content-between'>
          <span> { title } </span>
        </h5>

        <div className={`row table-responsive`}>
          <SimpleTable
            data={ data } 
            columns={ columns } 
            loading={ loading } 
          />
        </div>
      </div>
    </div>
  )
}
