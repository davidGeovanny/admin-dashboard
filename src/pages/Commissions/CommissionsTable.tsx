import React, { useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { v4 } from 'uuid';

interface TableDataColumn {
  id: string;
  title: string;
  year: string;
}

const columns: TableColumn<TableDataColumn>[] = [
  {
    name: 'Title',
    selector: row => row.title,
    // cell: () => <button className='btn btn-primary' onClick={() => console.log('hola')}>+</button>
  },
  {
    name: 'Year',
    selector: row => row.year,
  },
];

const data: TableDataColumn[] = [
  {
    id: v4(),
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: v4(),
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: v4(),
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: v4(),
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: v4(),
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: v4(),
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: v4(),
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: v4(),
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: v4(),
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: v4(),
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: v4(),
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: v4(),
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: v4(),
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: v4(),
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: v4(),
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: v4(),
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: v4(),
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: v4(),
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: v4(),
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: v4(),
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: v4(),
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: v4(),
    title: 'Ghostbusters',
    year: '1984',
  },
]

export const CommissionsTable = () => {

  return (
    <div>
      <div className='card'>
        <div className='card-body'>

          <h3>Water commissions</h3>

          <table className='table table-hover-custom table-striped'>
            <thead>
              <tr>
                <th>Branch</th>
                <th>Employee</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>05 May 2013</td>
                <td>05 May 2013</td>
                <td>Credit Account</td>
              </tr>
              <tr>
                <td>05 May 2013</td>
                <td>05 May 2013</td>
                <td>Credit Account</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>
  );
}
