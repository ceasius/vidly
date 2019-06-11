import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import Like from './common/like';

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
      <table className="table table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col" />
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map(movie => this.getTableItem(movie))}
        </tbody>
      </table>
    );
  }
  getTableItem(movie) {
    return (
      <tr key={movie._id}>
        <th scope="row">{movie.title}</th>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
        </td>
        <td>
          <button
            onClick={() => this.handleDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            <i className="fa fa-trash fa-lg" />
          </button>
        </td>
      </tr>
    );
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies: movies
    });
  };

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
