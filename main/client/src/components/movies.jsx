import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';

import paginate from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 8,
    currentPage: 1,
    selectedGenre: {},
    defaultGenre: { name: 'All Genres', _id: '-1' }
  };

  componentDidMount() {
    const genres = [this.state.defaultGenre, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres,
      selectedGenre: this.state.defaultGenre
    });
  }

  render() {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      defaultGenre
    } = this.state;

    const filteredMovies =
      selectedGenre._id === defaultGenre._id
        ? allMovies
        : allMovies.filter(movie => movie.genre.name === selectedGenre.name);

    const movies = paginate(filteredMovies, currentPage, pageSize);
    const count = filteredMovies.length;

    return (
      <React.Fragment>
        <p>{this.getHeader(movies)}</p>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              valueProperty="name"
              keyProperty="_id"
              onItemSelect={this.handleFilter}
              selectedItem={selectedGenre}
            />
          </div>
          <div className="col">
            <MoviesTable
              movies={movies}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
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
    this.setState({ currentPage: 1, selectedGenre: genre });
  };
  handleSort = path => {
    console.log(path);
  };
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
