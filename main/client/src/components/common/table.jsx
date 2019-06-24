import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({
  columns,
  sortColumn,
  onSort,
  data,
  keyProperty,
  headerTheme
}) => {
  return (
    <table className="table">
      <TableHeader
        theme={headerTheme}
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody columns={columns} data={data} keyProperty={keyProperty} />
    </table>
  );
};

export default Table;
