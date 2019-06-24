import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column, keyProperty) => {
    return item[keyProperty] + (column.path || column.key);
  };
  render() {
    const { data, columns, keyProperty } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item[keyProperty]}>
            {columns.map(column => (
              <td key={this.createKey(item, column, keyProperty)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
