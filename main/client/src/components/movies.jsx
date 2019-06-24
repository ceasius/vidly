import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';

import paginate from '../utils/paginate';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 8,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' },
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
      currentPage,
      pageSize,
      genres,
      sortColumn,
      selectedGenre
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    const count = movies.length;

    if (count === 0) return <p>{this.getHeader(count)}</p>;

    return (
      <React.Fragment>
        <p>{this.getHeader(count)}</p>
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
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
  getPagedData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      sortColumn,
      selectedGenre,
      defaultGenre
    } = this.state;

    const filteredMovies =
      selectedGenre._id === defaultGenre._id
        ? allMovies
        : allMovies.filter(movie => movie.genre.name === selectedGenre.name);

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filteredMovies.length, data: movies };
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleFilter = genre => {
    this.setState({ currentPage: 1, selectedGenre: genre });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
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

  getHeader(totalCount) {
    const plural = totalCount === 1 ? 'movie' : 'movies';
    return totalCount === 0
      ? 'There are no movies to display.'
      : `Showing ${totalCount} ${plural} in the database.`;
  }
}

export default Movies;
