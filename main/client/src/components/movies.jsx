import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';

class Movies extends Component {
  state = { movies: getMovies() };
  render() {
    return (
      <React.Fragment>
        <p>{this.getHeader()}</p>
        {this.getTable()}
      </React.Fragment>
    );
  }
  getTable() {
    if (this.state.movies.length === 0) return;
    return (
      <table className="table table-bordered">
        <thead className="thead-dark">
          <th scope="col">Title</th>
          <th scope="col">Genre</th>
          <th scope="col">Stock</th>
          <th scope="col">Rate</th>
          <th scope="col" />
        </thead>
        <tbody>
          {this.state.movies.map(movie => this.getTableItem(movie))}
        </tbody>
      </table>
    );
  }
  getTableItem(movie) {
    return (
      <tr>
        <th scope="row">{movie.title}</th>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <button
            onClick={() => this.handleDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

  handleDelete = movie => {
    deleteMovie(movie._id);
    this.setState({
      movies: getMovies()
    });
  };

  getHeader() {
    const { movies } = this.state;
    const plural = movies.length === 1 ? 'movie' : 'movies';
    return movies.length === 0
      ? 'There are no movies in the database.'
      : `Showing ${movies.length} ${plural} in the database.`;
  }
}

export default Movies;
