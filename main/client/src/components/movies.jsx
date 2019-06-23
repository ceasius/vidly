import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';

import paginate from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 8,
    currentPage: 1,
    currentGenre: '',
    defaultGenre: 'All Genres'
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: getGenres(),
      currentGenre: this.state.defaultGenre
    });
  }

  render() {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      genres,
      currentGenre,
      defaultGenre
    } = this.state;

    const filteredMovies =
      currentGenre === defaultGenre
        ? allMovies
        : allMovies.filter(movie => movie.genre.name === currentGenre);

    const movies = paginate(filteredMovies, currentPage, pageSize);
    const count = filteredMovies.length;
    const genreList = [
      this.state.defaultGenre,
      ...genres.map(genre => genre.name)
    ];
    return (
      <React.Fragment>
        <p>{this.getHeader(movies)}</p>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genreList}
              onFiltered={this.handleFilter}
              currentItem={currentGenre}
            />
          </div>
          <div className="col">
            {this.getTable(movies, count)}
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleFilter = genre => {
    this.setState({ currentGenre: genre });
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
