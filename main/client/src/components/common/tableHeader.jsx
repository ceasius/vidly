import React, { Component } from 'react';

class TableHeader extends Component {
  render() {
    const { columns } = this.props;
    return (
      <thead className={this.props.theme}>
        <tr>
          {columns.map(column => (
            <th
              className={column.label ? 'clickable' : ''}
              key={column.path || column.key}
              onClick={() => {
                if (column.label) this.raiseSort(column.path);
              }}
              scope="col"
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
  renderSortIcon = column => {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order === 'asc')
      return <i className="fa fa-sort-asc" />;
    else return <i className="fa fa-sort-desc" />;
  };

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };
}

export default TableHeader;
