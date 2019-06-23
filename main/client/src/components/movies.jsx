import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import paginate from '../utils/paginate';

class Movies extends Component {
  state = { movies: getMovies(), pageSize: 8, currentPage: 1 };

  render() {
    const { movies: allMovies, currentPage, pageSize } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    const count = allMovies.length;
    return (
      <React.Fragment>
        <p>{this.getHeader(movies)}</p>
        {this.getTable(movies, count)}
        <Pagination
          itemsCount={count}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
          currentPage={this.state.currentPage}
        />
      </React.Fragment>
    );
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  getTable(movies, count) {
    if (count === 0) return;
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
        <tbody>{movies.map(movie => this.getTableItem(movie))}</tbody>
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
            Delete
          </button>
        </td>
      </tr>
    );
  } //<i className="fa fa-trash fa-lg" />

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

  getHeader(movies) {
    const plural = movies.length === 1 ? 'movie' : 'movies';
    return movies.length === 0
      ? 'There are no movies in the database.'
      : `Showing ${movies.length} ${plural} in the database.`;
  }
}

export default Movies;
