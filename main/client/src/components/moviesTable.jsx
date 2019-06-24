import React, { Component } from 'react';
import Table from './common/table';
import Like from './common/like';

class MoviesTable extends Component {
  render() {
    const { movies, sortColumn, onSort } = this.props;
    const columns = this.getColumnData();
    return (
      <Table
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
        headerTheme="thead-dark"
        keyProperty="_id"
      />
    );
  }

  getColumnData = () => {
    const { onDelete, onLike } = this.props;
    return [
      { label: 'Title', path: 'title' },
      { label: 'Genre', path: 'genre.name' },
      { label: 'Stock', path: 'numberInStock' },
      { label: 'Rate', path: 'dailyRentalRate' },
      {
        key: 'like',
        content: movie => (
          <Like liked={movie.liked} onClick={() => onLike(movie)} />
        )
      },
      {
        key: 'delete',
        content: movie => (
          <button
            onClick={() => onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )
      }
    ];
  };
}

export default MoviesTable;
