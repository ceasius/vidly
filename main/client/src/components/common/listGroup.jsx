import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = props => {
  const { items, onFiltered, currentItem } = props;
  const listItem = 'list-group-item list-group-item-action';
  return (
    <div className="list-group">
      {items.map(item => {
        const active = item === currentItem;
        return (
          <button
            type="button"
            key={item}
            className={active ? listItem + ' active' : listItem}
            onClick={() => {
              if (!active) onFiltered(item);
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

ListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentItem: PropTypes.string.isRequired,
  onFiltered: PropTypes.func.isRequired
};

export default ListGroup;
