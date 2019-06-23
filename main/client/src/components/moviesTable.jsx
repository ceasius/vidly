import React from 'react';
import Like from './common/like';

const MoviesTable = props => {
  const { movies, onDelete, onLike, onSort } = props;
  const count = movies.length;
  if (count === 0) return <React.Fragment />;
  return (
    <table className="table table">
      <thead className="thead-dark">
        <tr>
          <th onClick={() => onSort('title')} scope="col">
            Title
          </th>
          <th onClick={() => onSort('genre.name')} scope="col">
            Genre
          </th>
          <th onClick={() => onSort('numberInStock')} scope="col">
            Stock
          </th>
          <th onClick={() => onSort('dailyRentalRate')} scope="col">
            Rate
          </th>
          <th scope="col" />
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => getTableItem(movie, onDelete, onLike))}
      </tbody>
    </table>
  );
};
function getTableItem(movie, onDelete, onLike) {
  return (
    <tr key={movie._id}>
      <th scope="row">{movie.title}</th>
      <td>{movie.genre.name}</td>
      <td>{movie.numberInStock}</td>
      <td>{movie.dailyRentalRate}</td>
      <td>
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      </td>
      <td>
        <button
          onClick={() => onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default MoviesTable;
