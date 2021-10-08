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

const paginationComponentOptions = {
  rowsPerPageText: '',
  rangeSeparatorText: '',
  // selectAllRowsItem: true,
  // selectAllRowsItemText: 'Todos',
};

export const CommissionsTable = () => {

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = data.filter(
		item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
	);


  const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<input onChange={e => setFilterText(e.target.value)} />
		);
	}, [filterText, resetPaginationToggle]);

  const customStyles = {
    headRow: {
      style: {
        border: 'none',
      },
    },
    headCells: {
      style: {
        color: '#202124',
        fontSize: '14px',
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: 'rgb(230, 244, 244)',
        borderBottomColor: '#FFFFFF',
        borderRadius: '25px',
        outline: '1px solid #FFFFFF',
      },
    },
    pagination: {
      style: {
        border: 'none',
      },
    },
  };

  return (
    <div>
      <DataTable
        title="Contact List"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        persistTableHead
        actions={<button>Botón</button>}
        paginationPerPage={1}
        paginationRowsPerPageOptions={[]}
        paginationComponentOptions={ paginationComponentOptions }
        highlightOnHover
		    pointerOnHover
        customStyles={customStyles}
      />

      <hr />

    </div>
  );
}
