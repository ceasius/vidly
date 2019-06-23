import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount <= 1) return <React.Fragment />;

  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => {
          const active = page === currentPage;
          return createPaginationItem(page, active, onPageChange);
        })}
      </ul>
    </nav>
  );
};

function createPaginationItem(page, active, onPageChange) {
  const pageClass = active ? 'page-item active' : 'page-item';
  return (
    <li key={page} className={pageClass}>
      <button
        className="page-link"
        onClick={() => {
          if (!active) onPageChange(page);
        }}
      >
        {page}
      </button>
    </li>
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
